#!/usr/bin/env python3
"""Weak-point report from on-call case attempts.

Usage: python3 scripts/weakpoints.py STATE.json [--json]
STATE.json is the synced app state (the `data` column of rmo_revision_state, or an exported backup).

Rules (agreed with the user):
- The first try at a case counts most (weight 2); later tries count once each.
- A concept answered poor or harmful on a first try stays weak until it is answered best on a LATER DAY.
- A case is mastered (retire it) after two attempts on different days, each at least 80% with no poor or harmful answers.
"""
import json, sys, datetime, collections, re, os

PTS = {'best': 2, 'ok': 1, 'poor': 0, 'harm': -1}
IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))
def day(ms): return datetime.datetime.fromtimestamp(ms / 1000, IST).date().isoformat()

def concept_names(tool):
    p = os.path.join(os.path.dirname(__file__), '..', 'tools', 'cases', tool + '.js')
    try:
        s = open(p).read()
        return dict(re.findall(r'^\s*([a-zA-Z0-9_]+): \{ n: "([^"]+)"', s, re.M))
    except OSError:
        return {}

def analyse(state):
    atts = sorted(state.get('attempts', []), key=lambda a: a['at'])
    by_case = collections.defaultdict(list)
    for a in atts: by_case[(a['tool'], a['cs'])].append(a)
    concepts = collections.defaultdict(lambda: {'first': [], 'later': [], 'wrong': [], 'first_days': set(), 'best_days': set()})
    cases = []
    for (tool, cs), lst in by_case.items():
        first = lst[0]
        for i, a in enumerate(lst):
            for d in a.get('d', []):
                c = concepts[(tool, d['tag'])]
                (c['first'] if i == 0 else c['later']).append(d['q'])
                if d['q'] in ('poor', 'harm', 'ok'): c['wrong'].append({'q': d['q'], 'chose': d.get('c', ''), 'case': a.get('title', cs), 'day': day(a['at']), 'first_try': i == 0})
                if i == 0 and d['q'] in ('poor', 'harm'): c['first_days'].add(day(a['at']))
                if d['q'] == 'best': c['best_days'].add(day(a['at']))
        good = [a for a in lst if a['pts'] >= 0.8 * a['max'] and all(d['q'] in ('best', 'ok') for d in a.get('d', []))]
        mastered = len({day(a['at']) for a in good}) >= 2
        cases.append({'tool': tool, 'case': cs, 'title': first.get('title'), 'attempts': len(lst), 'first_pct': round(100 * first['pts'] / first['max']), 'last_pct': round(100 * lst[-1]['pts'] / lst[-1]['max']), 'mastered': mastered})
    out = []
    for (tool, tag), c in concepts.items():
        w = sum(2 * PTS[q] for q in c['first']) + sum(PTS[q] for q in c['later'])
        mx = 2 * 2 * len(c['first']) + 2 * len(c['later'])
        if c['first_days']:
            fixed = any(b > min(c['first_days']) for b in c['best_days'])
            status = 'fixed later' if fixed else 'WEAK'
        else:
            status = 'shaky' if any(q == 'ok' for q in c['first']) else 'strong'
        out.append({'tool': tool, 'tag': tag, 'name': concept_names(tool).get(tag, tag), 'score_pct': round(100 * w / mx) if mx else None, 'status': status, 'n': len(c['first']) + len(c['later']), 'wrong': c['wrong'][-4:]})
    order = {'WEAK': 0, 'shaky': 1, 'fixed later': 2, 'strong': 3}
    out.sort(key=lambda x: (order[x['status']], x['score_pct'] if x['score_pct'] is not None else 999))
    return {'attempts': len(atts), 'concepts': out, 'cases': sorted(cases, key=lambda c: (c['tool'], c['case']))}

if __name__ == '__main__':
    st = json.load(open(sys.argv[1]))
    if 'data' in st and 'attempts' not in st: st = st['data']
    r = analyse(st)
    if '--json' in sys.argv: print(json.dumps(r, indent=1)); sys.exit()
    print(f"{r['attempts']} case attempts recorded\n")
    print('Concepts, weakest first:')
    for c in r['concepts']:
        print(f"  [{c['status']}] {c['tool']} / {c['name']} ({c['tag']}): {c['score_pct']}% over {c['n']} answers")
        for w in c['wrong']: print(f"      {w['day']} {'first try' if w['first_try'] else 'replay'} {w['q']}: {w['chose']}  ({w['case']})")
    print('\nCases:')
    for c in r['cases']:
        print(f"  {c['tool']} {c['case']} '{c['title']}': {c['attempts']} tries, first {c['first_pct']}%, latest {c['last_pct']}%{'  -> MASTERED, retire' if c['mastered'] else ''}")
