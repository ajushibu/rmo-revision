#!/usr/bin/env python3
"""Weak-point report from on-call case attempts.

Usage: python3 scripts/weakpoints.py STATE.json [--json]
STATE.json is the synced app state (the `data` column of rmo_revision_state, or an exported backup).

Rules (agreed with the user):
- The first try at a case counts most (weight 2); later tries count once each.
- A concept answered poor or harmful on a first try stays weak until it is answered best on a LATER DAY.
- A case is mastered (retire it) after two attempts on different days, each at least 80% with no poor or harmful answers.
- Easy and Hard are two formats of the same case (same concept tags, same case id). Easy attempts have mode 'easy' and tool <pid>_shift; Hard attempts have mode 'hard' and tool <pid>_ward, and are folded into <pid>_shift here.
- A case that has a Hard version is only mastered when at least one of the two good attempts was Hard. Two good Easy attempts alone mean "play it Hard", not "retire".
- Hard attempts also record per step the orders missed (m), the orders that cost points (x, harmful or unneeded) and the plan points the user did not tick in the self-check (pw, e.g. call:not said): use them when you remake a case.
"""
import json, sys, datetime, collections, re, os

PTS = {'best': 2, 'ok': 1, 'poor': 0, 'harm': -1}
IST = datetime.timezone(datetime.timedelta(hours=5, minutes=30))
def day(ms): return datetime.datetime.fromtimestamp(ms / 1000, IST).date().isoformat()

def concept_names(tool):
    p = os.path.join(os.path.dirname(__file__), '..', 'tools', 'cases', tool + '.js')
    try:
        s = open(p).read()
        out = {}
        for m in re.finditer(r"^\s*['\"]?([A-Za-z0-9_-]+)['\"]?: \{ n: (?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")", s, re.M):
            out[m.group(1)] = (m.group(2) if m.group(2) is not None else m.group(3)).replace("\\'", "'")
        return out
    except OSError:
        return {}

CASES = os.path.join(os.path.dirname(__file__), '..', 'tools', 'cases')

def case_file(tool):
    """Hard attempts (<pid>_ward) belong to <pid>_shift when that case file exists. resp_ward stands alone."""
    if tool.endswith('_ward') and os.path.exists(os.path.join(CASES, tool[:-5] + '_shift.js')): return tool[:-5] + '_shift'
    return tool

_hard_cache = {}
def hard_capable(tool, cs):
    """True when the case has a hard: block in its case file."""
    try:
        if tool not in _hard_cache: _hard_cache[tool] = open(os.path.join(CASES, tool + '.js')).read()
        s = _hard_cache[tool]
        i = s.find("id: '" + cs + "'")
        if i < 0: return False
        j = s.find("\n  {\n    id: ", i)
        return 'hard: {' in s[i: j if j > 0 else len(s)]
    except OSError:
        return False

_names = {}
def order_name(oid):
    if not _names:
        try:
            for m in re.finditer(r"\{ id: '(\w+)', c: '[^']*', n: '([^']*)'", open(os.path.join(os.path.dirname(__file__), '..', 'tools', 'orders.js')).read()): _names[m.group(1)] = m.group(2)
        except OSError: pass
        _names['call'] = 'Make the call'
    return _names.get(oid, oid)

def analyse(state):
    atts = sorted(state.get('attempts', []), key=lambda a: a['at'])
    by_case = collections.defaultdict(list)
    for a in atts: by_case[(case_file(a['tool']), a['cs'])].append(a)
    concepts = collections.defaultdict(lambda: {'first': [], 'later': [], 'wrong': [], 'first_days': set(), 'best_days': set()})
    cases = []
    for (tool, cs), lst in by_case.items():
        first = lst[0]
        for i, a in enumerate(lst):
            for d in a.get('d', []):
                c = concepts[(tool, d['tag'])]
                missed = [order_name(x) for x in d.get('m', [])]; bad = [order_name(x) for x in d.get('x', [])]; planw = d.get('pw', [])
                (c['first'] if i == 0 else c['later']).append(d['q'])
                if d['q'] in ('poor', 'harm', 'ok'): c['wrong'].append({'q': d['q'], 'chose': d.get('c', ''), 'case': a.get('title', cs), 'day': day(a['at']), 'first_try': i == 0, 'mode': a.get('mode', 'easy'), 'missed': missed, 'costly': bad, 'plan_wrong': planw})
                if i == 0 and d['q'] in ('poor', 'harm'): c['first_days'].add(day(a['at']))
                if d['q'] == 'best': c['best_days'].add(day(a['at']))
        good = [a for a in lst if a['pts'] >= 0.8 * a['max'] and all(d['q'] in ('best', 'ok') for d in a.get('d', []))]
        two_days = len({day(a['at']) for a in good}) >= 2
        hc = hard_capable(tool, cs)
        hard_good = any(a.get('mode') == 'hard' for a in good)
        mastered = two_days and (not hc or hard_good)
        promote = two_days and hc and not hard_good
        miss_ct = collections.Counter(oid for a in lst if a.get('mode') == 'hard' for d in a.get('d', []) for oid in d.get('m', []))
        cost_ct = collections.Counter(oid for a in lst if a.get('mode') == 'hard' for d in a.get('d', []) for oid in d.get('x', []))
        cases.append({'tool': tool, 'case': cs, 'title': first.get('title'), 'attempts': len(lst), 'modes': sorted({a.get('mode', 'easy') for a in lst}), 'hard_capable': hc, 'first_pct': round(100 * first['pts'] / first['max']), 'last_pct': round(100 * lst[-1]['pts'] / lst[-1]['max']), 'mastered': mastered, 'promote_to_hard': promote, 'missed_orders': [order_name(k) for k, _ in miss_ct.most_common(6)], 'costly_orders': [order_name(k) for k, _ in cost_ct.most_common(4)]})
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
    stars = [{'tool': v.get('tool', ''), 'case': k, 'title': v.get('title', ''), 'starred': day(v['t'])} for k, v in sorted((state.get('stars') or {}).items()) if v.get('on')]
    return {'attempts': len(atts), 'stars': stars, 'concepts': out, 'cases': sorted(cases, key=lambda c: (c['tool'], c['case']))}

if __name__ == '__main__':
    st = json.load(open(sys.argv[1]))
    if 'data' in st and 'attempts' not in st: st = st['data']
    r = analyse(st)
    if '--json' in sys.argv: print(json.dumps(r, indent=1)); sys.exit()
    print(f"{r['attempts']} case attempts recorded\n")
    if r['stars']:
        print('STARRED cases (the user wants more cases like these; write one similar new case each, in a different setting):')
        for s in r['stars']: print(f"  {s['tool']} {s['case']} '{s['title']}' starred {s['starred']}")
        print()
    print('Concepts, weakest first:')
    for c in r['concepts']:
        print(f"  [{c['status']}] {c['tool']} / {c['name']} ({c['tag']}): {c['score_pct']}% over {c['n']} answers")
        for w in c['wrong']:
            extra = ''
            if w.get('mode') == 'hard':
                extra = ' [Hard' + (f"; missed: {', '.join(w['missed'])}" if w['missed'] else '') + (f"; cost points: {', '.join(w['costly'])}" if w['costly'] else '') + (f"; plan: {', '.join(w['plan_wrong'])}" if w['plan_wrong'] else '') + ']'
            print(f"      {w['day']} {'first try' if w['first_try'] else 'replay'} {w['q']}: {w['chose']}  ({w['case']}){extra}")
    print('\nCases:')
    for c in r['cases']:
        tag = '  -> MASTERED, retire' if c['mastered'] else '  -> Easy is mastered: play it Hard before retiring' if c['promote_to_hard'] else ''
        print(f"  {c['tool']} {c['case']} '{c['title']}': {c['attempts']} tries ({'+'.join(c['modes'])}{', has Hard' if c['hard_capable'] else ''}), first {c['first_pct']}%, latest {c['last_pct']}%{tag}")
        if c['missed_orders']: print(f"      Hard: most missed orders: {', '.join(c['missed_orders'])}" + (f"; cost points: {', '.join(c['costly_orders'])}" if c['costly_orders'] else ''))
