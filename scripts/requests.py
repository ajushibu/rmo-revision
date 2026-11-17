#!/usr/bin/env python3
"""List what the user asked for on recall cards: extra context to fold into the answer, and cards to turn into cases.

Usage: python3 scripts/requests.py STATE.json
- Context (state.ctx[cardId] = {text, t}) is pending until the card in recall.js carries cx >= t.
- A case request (state.caseReq[cardId] = {on, t, topic}) is pending until some case file has a case with fromCard:"<cardId>".
"""
import json, re, sys, os, glob
here = os.path.dirname(__file__)
st = json.load(open(sys.argv[1]))
if 'data' in st and 'attempts' not in st and 'ctx' not in st: st = st['data']
js = "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.RECALL))"
import subprocess
RC = json.loads(subprocess.check_output(['node', '-e', js, os.path.join(here, '..', 'recall.js')]))
cards = {it['id']: (tid, it) for tid, v in RC.items() for it in v.get('items', [])}
cases = ''.join(open(f).read() for f in glob.glob(os.path.join(here, '..', 'tools', 'cases', '*.js')))
made = set(re.findall(r"fromCard:\s*['\"]([^'\"]+)['\"]", cases))
ctx = [(k, v) for k, v in st.get('ctx', {}).items() if v.get('text') and k in cards and v['t'] > (cards[k][1].get('cx') or 0)]
req = [(k, v) for k, v in st.get('caseReq', {}).items() if v.get('on') and k not in made]
if not ctx and not req: print('No card context or case requests waiting.'); sys.exit()
if ctx:
    print('CONTEXT TO FOLD INTO THE ANSWER (rewrite `k` so it stands alone, keep every source line and flag, then set cx:<t> on the card):')
    for k, v in ctx:
        tid, it = cards[k]
        print(f"\n{k}  [{tid}]  cx:{v['t']}\n  Q: {it['t']}\n  A: {it['k']}\n  CONTEXT: {v['text']}")
if req:
    print('\n\nCARDS TO TURN INTO CASES (write Easy and Hard for the card\'s concept, set fromCard:"<id>" on the new case):')
    for k, v in req:
        tid, it = cards.get(k, (v.get('topic', ''), {'t': '?', 'k': '?'}))
        c = st.get('ctx', {}).get(k, {}).get('text', '')
        print(f"\n{k}  [{tid}]\n  Q: {it['t']}\n  A: {it['k']}" + (f"\n  CONTEXT: {c}" if c else ''))
