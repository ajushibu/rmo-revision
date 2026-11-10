#!/usr/bin/env python3
"""List highlights the user saved in study tools that have not yet become recall cards.

Usage: python3 scripts/highlights.py STATE.json
A highlight is processed once some item in recall.js carries its id in `from: ["h..."]`.
"""
import json, re, sys, os, datetime
st = json.load(open(sys.argv[1]))
if 'data' in st and 'highlights' not in st: st = st['data']
recall = open(os.path.join(os.path.dirname(__file__), '..', 'recall.js')).read()
done = set(re.findall(r'"(h\d+)"', ''.join(re.findall(r'from:\[[^\]]*\]', recall))))
pend = [h for h in st.get('highlights', []) if h['id'] not in done]
if not pend: print('No new highlights.'); sys.exit()
for h in pend:
    d = datetime.datetime.fromtimestamp(h['at'] / 1000).strftime('%d %b')
    print(f"{h['id']}  [{h['topic']}]  {h.get('toolLabel','')} > {h.get('where','')}  ({d})\n    {h['text']}\n")
