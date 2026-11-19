#!/usr/bin/env python3
"""Write kindle/cards.json for the KOReader plugin from recall.js and data.js.

Run after any change to recall.js or the topic list (then bump sw.js and push, so the Kindle's
"Update cards" picks it up from https://rmo-revision-app.vercel.app/kindle/cards.json).
Cards are plain text. User-added subtopics (S.added) and custom cards live in the synced state only
and are not on the Kindle.
"""
import json, os, subprocess
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, '..')
js = ("global.window={};require(process.argv[1]);require(process.argv[2]);"
      "console.log(JSON.stringify({top:window.RMO.topics,rc:window.RECALL}))")
d = json.loads(subprocess.check_output(['node', '-e', js, os.path.join(root, 'data.js'), os.path.join(root, 'recall.js')]))
GORD = {'R': 0, 'A': 1, 'T': 2, 'C': 3, 'F': 4, 'Y': 5}
topics, n = [], 0
for t in d['top']:
    items = [(i, x) for i, x in enumerate(d['rc'].get(t['id'], {}).get('items', [])) if not x.get('dup')]
    items.sort(key=lambda p: (GORD.get(p[1].get('g', 'Y'), 5), p[0]))
    cards = [{'id': x['id'], 'g': x.get('g', 'Y'), 'p': x.get('p', 3), 't': x['t'], 'k': x['k']} for _, x in items]
    if cards:
        topics.append({'id': t['id'], 'name': t['name'], 'cards': cards}); n += len(cards)
out = {'v': 1, 'int': [1, 3, 7, 14, 28], 'topics': topics}
os.makedirs(os.path.join(root, 'kindle'), exist_ok=True)
with open(os.path.join(root, 'kindle', 'cards.json'), 'w') as f:
    json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
import shutil
shutil.copy(os.path.join(root, 'kindle', 'cards.json'), os.path.join(root, 'kindle', 'rmorevision.koplugin', 'cards.json'))
print(f'{len(topics)} topics, {n} cards -> kindle/cards.json ({os.path.getsize(os.path.join(root, "kindle", "cards.json"))//1024} KB)')
