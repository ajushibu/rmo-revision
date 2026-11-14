/* Focus block: a timer for any study, anywhere in the app.
   It cannot block other apps. It makes leaving visible: every time the app goes to the
   background during a block is counted, the screen is kept awake, urges are parked, and
   phone checks are scheduled into a break. State is device-local (localStorage). */
(function () {
  var KEY = 'rmo-focus', LOG = 'rmo-focus-log', BREAK_MIN = 5, MIN_AWAY = 2000, URGE_MS = 60000;
  var mem = {}, st = null, urgeEnd = 0, open = false, note = null, noteT = 0, wl = null, sure = false;

  function get(k, d) { try { var s = localStorage.getItem(k); if (s) return JSON.parse(s); } catch (e) { if (mem[k]) return mem[k]; } return mem[k] || d; }
  function put(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* blocked: memory only */ } }
  function load() { var s = get(KEY, null); return s && typeof s === 'object' && s.ph ? s : null; }
  function save() { if (st) put(KEY, st); else { mem[KEY] = null; try { localStorage.removeItem(KEY); } catch (e) {} } }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function clock(ms) { var s = Math.max(0, Math.ceil(ms / 1000)); return Math.floor(s / 60) + ':' + pad(s % 60); }
  function dur(ms) { var s = Math.round(ms / 1000); return s < 60 ? s + ' s' : Math.floor(s / 60) + ' min ' + pad(s % 60) + ' s'; }
  function day(t) { var d = new Date(t); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function logs() { var l = get(LOG, []); return Array.isArray(l) ? l : []; }

  /* ---------- state changes ---------- */
  function finish(early) {
    if (!st || st.ph !== 'run') return;
    var now = Date.now(), stop = early ? now : Math.min(now, st.end);
    if (st.awayAt) { var d = stop - st.awayAt; if (d >= MIN_AWAY) { st.leaves++; st.away += d; } st.awayAt = null; }
    var res = { min: st.min, leaves: st.leaves, away: st.away, early: !!early, intent: st.intent || '', parked: st.parked || [], done: Math.min(stop - st.start, st.min * 60000) };
    var l = logs(); l.push({ t: st.start, d: day(st.start), min: st.min, leaves: res.leaves, away: res.away, early: res.early }); put(LOG, l.slice(-60));
    st = { ph: 'done', res: res, last: st.min };
    save(); releaseLock(); sure = false; paint(true);
    try { if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(early ? 0 : [200, 100, 200]); } catch (e) {}
  }
  function away() { if (st && st.ph === 'run' && !st.awayAt) { st.awayAt = Date.now(); save(); } }
  function back() {
    if (!st || st.ph !== 'run' || !st.awayAt) return;
    var now = Date.now(), d = Math.min(now, st.end) - st.awayAt;
    st.awayAt = null;
    if (d >= MIN_AWAY) { st.leaves++; st.away += d; save(); if (now < st.end) say('You were away for ' + dur(d) + '. ' + clock(st.end - now) + ' left.'); }
    else save();
    if (now >= st.end) finish(false);
  }
  function say(msg) { note = msg; noteT = Date.now() + 7000; paint(false); }

  function start(min, intent) {
    var now = Date.now(); st = { ph: 'run', min: min, start: now, end: now + min * 60000, leaves: 0, away: 0, awayAt: null, intent: (intent || '').slice(0, 120), parked: [], last: min };
    save(); open = false; sure = false; getLock(); paint(true);
  }
  function startBreak() { var now = Date.now(); st = { ph: 'brk', end: now + BREAK_MIN * 60000, last: (st && st.last) || 25 }; save(); open = false; paint(true); }

  function getLock() { try { if (navigator.wakeLock && document.visibilityState === 'visible' && !wl) navigator.wakeLock.request('screen').then(function (l) { wl = l; l.addEventListener('release', function () { wl = null; }); }).catch(function () {}); } catch (e) {} }
  function releaseLock() { try { if (wl) { wl.release(); wl = null; } } catch (e) {} }

  /* ---------- history line for Today ---------- */
  function line() {
    var l = logs(); if (!l.length) return '';
    var from = day(Date.now() - 6 * 86400000), wk = l.filter(function (x) { return x.d >= from; }), clean = wk.filter(function (x) { return !x.leaves && !x.early; }).length, streak = 0;
    for (var i = l.length - 1; i >= 0; i--) { if (!l[i].leaves && !l[i].early) streak++; else break; }
    var mins = wk.reduce(function (a, x) { return a + (x.early ? 0 : x.min); }, 0);
    return '<p class="meta small">Focus, last 7 days: ' + wk.length + (wk.length === 1 ? ' block' : ' blocks') + ' (' + mins + ' min), ' + clean + ' without leaving the app. Clean streak: ' + streak + '.</p>';
  }

  /* ---------- view ---------- */
  var fab = document.createElement('button'); fab.id = 'ffab'; fab.type = 'button'; fab.className = 'ffab';
  var toast = document.createElement('div'); toast.id = 'ftoast'; toast.className = 'ftoast'; toast.setAttribute('role', 'status'); toast.hidden = true;
  var host = document.createElement('div'); host.id = 'fhost';
  document.body.appendChild(fab); document.body.appendChild(toast); document.body.appendChild(host);

  function remaining() { return st && (st.ph === 'run' || st.ph === 'brk') ? st.end - Date.now() : 0; }
  function fabText() {
    if (!st || st.ph === 'idle') return 'Focus';
    if (st.ph === 'run') return clock(remaining()) + ' · ' + (st.leaves ? st.leaves + (st.leaves === 1 ? ' leave' : ' leaves') : 'no leaves');
    if (st.ph === 'brk') return 'Break ' + clock(remaining());
    return 'Block done';
  }
  function sheet() {
    var h = '<div class="fback" data-f="close"></div><div class="fsheet" id="fsheet" role="dialog" aria-modal="true" aria-label="Focus block" tabindex="-1"><button class="fx" data-f="close" aria-label="Close">×</button>';
    if (!st || st.ph === 'idle') {
      var last = (st && st.last) || 25;
      h += '<h2>Focus block</h2><p class="meta">One thing, no phone. Leaving this app is counted, and the screen stays awake.</p><div class="fseg" role="group" aria-label="Length">' +
        [15, 25, 45].map(function (m) { return '<button type="button" data-f="len" data-m="' + m + '" class="' + (m === last ? 'on' : '') + '" aria-pressed="' + (m === last) + '">' + m + ' min</button>'; }).join('') + '</div>' +
        '<label class="flab">What will you do?<input id="fintent" maxlength="120" placeholder="e.g. Learn hyponatraemia, then 10 cards" autocomplete="off"></label>' +
        '<ul class="fcheck">' + ['Phone face down and out of reach', 'Do Not Disturb is on', 'Water ready'].map(function (x, i) { return '<li><label><input type="checkbox" id="fc' + i + '"> ' + x + '</label></li>'; }).join('') + '</ul>' +
        '<button class="btn primary big" data-f="start" data-m="' + last + '">Start ' + last + ' min</button>' + (line() ? line() : '');
    } else if (st.ph === 'run') {
      h += '<h2>Focus</h2><p class="fbig" id="fbig">' + clock(remaining()) + '</p>' + (st.intent ? '<p class="meta">' + esc(st.intent) + '</p>' : '') +
        '<p class="meta" id="fleft">' + (st.leaves ? 'Left the app ' + st.leaves + (st.leaves === 1 ? ' time' : ' times') + ' (' + dur(st.away) + ').' : 'No leaves yet.') + '</p>';
      if (urgeEnd > Date.now()) h += '<div class="furge"><b id="furge">' + clock(urgeEnd - Date.now()) + '</b><p>The urge peaks and passes within about a minute. Breathe out slowly. Write what you wanted to check, and it goes on your break list.</p></div>';
      else h += '<button class="btn" data-f="urge">I want to check my phone</button>';
      h += '<form class="fpark" data-f="park"><input id="fpark" maxlength="80" placeholder="Park it for the break" autocomplete="off"><button class="btn" type="submit">Park</button></form>';
      if (st.parked && st.parked.length) h += '<ul class="fparked">' + st.parked.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      h += sure ? '<p class="meta">End now? This block will not count as clean. <button class="link" data-f="endyes">End</button> <button class="link" data-f="endno">Keep going</button></p>' : '<p class="meta"><button class="link" data-f="end">End early</button></p>';
    } else if (st.ph === 'done') {
      var r = st.res || {}, clean = !r.leaves && !r.early;
      h += '<h2>' + (r.early ? 'Ended early' : 'Block done') + '</h2><p class="fbig">' + (r.early ? Math.round(r.done / 60000) + ' of ' + r.min + ' min' : r.min + ' min') + '</p><p class="meta">' +
        (clean ? 'No leaves. A clean block.' : (r.leaves ? 'Left the app ' + r.leaves + (r.leaves === 1 ? ' time' : ' times') + ', ' + dur(r.away) + ' away in total.' : 'You ended it early.')) + '</p>';
      if (r.parked && r.parked.length) h += '<p class="meta">Check these in your break, not before:</p><ul class="fparked">' + r.parked.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      h += '<p class="btns"><button class="btn primary" data-f="brk">' + BREAK_MIN + ' min break, phone allowed</button><button class="btn" data-f="again">New block</button></p>' + line();
    } else if (st.ph === 'brk') {
      h += '<h2>Break</h2><p class="fbig" id="fbig">' + clock(remaining()) + '</p><p class="meta">Phone is allowed now. Check what you parked, then come back.</p><p class="btns"><button class="btn primary" data-f="again">Start next block</button><button class="btn" data-f="stop">Finish for now</button></p>';
    }
    return h + '</div>';
  }
  function paint(full) {
    fab.textContent = fabText();
    fab.className = 'ffab' + (st && st.ph === 'run' ? ' run' : st && st.ph === 'brk' ? ' brk' : st && st.ph === 'done' ? ' done' : '');
    fab.setAttribute('aria-label', st && st.ph === 'run' ? 'Focus block running. ' + fabText() : 'Focus block');
    if (note && Date.now() < noteT) { toast.textContent = note; toast.hidden = false; } else { toast.hidden = true; note = null; }
    if (full || !open) {
      if (open) { var keep = document.getElementById('fintent'); var v = keep ? keep.value : null; host.innerHTML = sheet(); var k2 = document.getElementById('fintent'); if (k2 && v) k2.value = v; }
      else host.innerHTML = '';
    }
    var b = document.getElementById('fbig'); if (b && st) b.textContent = clock(remaining());
    var u = document.getElementById('furge'); if (u) { if (urgeEnd > Date.now()) u.textContent = clock(urgeEnd - Date.now()); else { urgeEnd = 0; host.innerHTML = sheet(); } }
  }
  function openSheet() { open = true; paint(true); var s = document.getElementById('fsheet'); if (s) s.focus(); }
  function closeSheet() { open = false; sure = false; paint(true); try { fab.focus(); } catch (e) {} }

  fab.addEventListener('click', function () { open ? closeSheet() : openSheet(); });
  host.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-f]') : null; if (!el) return;
    var a = el.getAttribute('data-f');
    if (a === 'close') closeSheet();
    else if (a === 'len') { var m = +el.getAttribute('data-m'); st = st && st.ph === 'idle' ? st : { ph: 'idle' }; st.last = m; save(); paint(true); }
    else if (a === 'start') { var it = document.getElementById('fintent'); start(+el.getAttribute('data-m') || 25, it ? it.value : ''); }
    else if (a === 'urge') { urgeEnd = Date.now() + URGE_MS; paint(true); var p = document.getElementById('fpark'); if (p) p.focus(); }
    else if (a === 'end') { sure = true; paint(true); }
    else if (a === 'endno') { sure = false; paint(true); }
    else if (a === 'endyes') finish(true);
    else if (a === 'brk') startBreak();
    else if (a === 'again') { st = { ph: 'idle', last: (st && st.last) || 25 }; save(); paint(true); }
    else if (a === 'stop') { st = null; save(); open = false; paint(true); }
  });
  host.addEventListener('submit', function (e) {
    e.preventDefault(); var i = document.getElementById('fpark'), v = i ? i.value.trim() : '';
    if (v && st && st.ph === 'run') { st.parked = (st.parked || []).concat(v.slice(0, 80)).slice(-20); save(); paint(true); var n = document.getElementById('fpark'); if (n) n.focus(); }
  });
  document.addEventListener('keydown', function (e) { if (open && e.key === 'Escape') { e.stopPropagation(); closeSheet(); } }, true);

  /* ---------- timing and leaving ---------- */
  setInterval(function () {
    if (document.visibilityState !== 'visible' || !st) return;
    if (st.ph === 'run' && Date.now() >= st.end) { back(); finish(false); return; }
    if (st.ph === 'brk' && Date.now() >= st.end) { st = { ph: 'idle', last: st.last || 25 }; save(); say('Break over. Ready for the next block?'); paint(true); return; }
    paint(false);
  }, 1000);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') { away(); releaseLock(); }
    else { st = load() || st; back(); if (st && st.ph === 'run') getLock(); if (st && st.ph === 'brk' && Date.now() >= st.end) { st = { ph: 'idle', last: st.last || 25 }; save(); } paint(true); }
  });
  window.addEventListener('pagehide', away);
  window.addEventListener('storage', function (e) { if (e.key === KEY) { st = load(); paint(true); } });

  /* ---------- start up: a block may have survived a reload or a killed app ---------- */
  st = load();
  if (st && st.ph === 'run') { back(); if (st && st.ph === 'run') { if (Date.now() >= st.end) finish(false); else { getLock(); } } }
  if (st && st.ph === 'brk' && Date.now() >= st.end) { st = null; save(); }
  paint(true);
  window.RMOFocus = { line: line, running: function () { return !!(st && st.ph === 'run'); }, isOpen: function () { return open; } };
})();
