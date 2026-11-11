#!/usr/bin/env python3
"""List recall cards that may duplicate each other, so they can be merged by hand.

Usage: node-free; reads recall.js. Run: python3 scripts/dupes.py [THRESHOLD]
Compares every pair of cards (items and suggestions) inside the same topic by shared
words in the cue and key point. It only lists candidates: judge each pair yourself.
"""
import re, sys, json, subprocess, os
here = os.path.dirname(__file__)
js = "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.RECALL))"
RC = json.loads(subprocess.check_output(['node', '-e', js, os.path.join(here, '..', 'recall.js')]))
th = float(sys.argv[1]) if len(sys.argv) > 1 else 0.30
STOP = set('the a an of to and or in on is are be it its for with as at by from that this not no if then than so you your do does can may per after before into over under up down'.split())
def words(x): return set(w for w in re.findall(r'[a-z0-9]+', (x.get('t', '') + ' ' + x.get('k', '')).lower()) if w not in STOP and len(w) > 2)
for tid, r in RC.items():
    cards = [('item', x) for x in r.get('items', []) if not x.get('dup')] + [('sug', x) for x in r.get('sg', [])]
    W = [words(x) for _, x in cards]
    out = []
    for i in range(len(cards)):
        for j in range(i + 1, len(cards)):
            a, b = W[i], W[j]
            if not a or not b: continue
            s = len(a & b) / min(len(a), len(b))
            if s >= th: out.append((s, i, j))
    for s, i, j in sorted(out, reverse=True):
        (ka, xa), (kb, xb) = cards[i], cards[j]
        print(f"{s:.2f}  [{tid}]  {xa['id']} ({ka}, {xa.get('g')}) '{xa['t']}'  <->  {xb['id']} ({kb}, {xb.get('g')}) '{xb['t']}'")
