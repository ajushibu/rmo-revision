(function () {
  var D = window.RMO, SYS = D.systems, TOP = D.topics, RC = window.RECALL || {};
  TOP.forEach(function (t) { t.tools = t.tools || []; });
  var INT = [1, 3, 7, 14, 28], KEY = 'rmo-revision-v1';
  var mem = null;

  /* ---------- storage ---------- */
  function load() {
    try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) { if (mem) return mem; }
    return mem || { topics: {}, errors: [] };
  }
  var S = load();
  /* The 11 step-by-step kits used to tick after 30 seconds; those early ticks are dropped. They tick now only on the last slide. */
  var STEPKITS = ['acidbase', 'aki', 'hyperca', 'hyperk', 'hyperna', 'hypok', 'hypona', 'macid', 'malk', 'stone', 'uti'].map(function (x) { return x + '_kit.html'; });
  function falseKitTick(key, ts) { var f = String(key).split(':')[1]; return STEPKITS.indexOf(f) >= 0 && (ts || 0) < 1794899700000; }
  function fix() { S.topics = S.topics || {}; S.errors = S.errors || []; S.items = S.items || {}; S.custom = S.custom || {}; S.added = S.added || {}; S.addedAt = S.addedAt || {}; S.dead = S.dead || {}; S.resetAt = S.resetAt || 0; S.attempts = S.attempts || []; S.notes = S.notes || {}; S.highlights = S.highlights || []; S.stars = S.stars || {}; S.pace = S.pace || []; S.revtime = S.revtime || {}; S.caseSkip = S.caseSkip || {}; S.ctx = S.ctx || {}; S.caseReq = S.caseReq || {}; S.skipRev = S.skipRev || {}; S.kitdone = S.kitdone || {}; Object.keys(S.kitdone).forEach(function (k) { if (falseKitTick(k, S.kitdone[k])) delete S.kitdone[k]; }); }
  fix();
  function store() { mem = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: stays in memory */ } }
  function save() { store(); if (window.RMOSync) window.RMOSync.soon(); }
  function touch(id) { ts(id).t = Date.now(); }
  function ts(id) { return S.topics[id] || (S.topics[id] = { status: 'new', studied: null, rev: {} }); }

  /* ---------- helpers ---------- */
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function kfmt(k) {
    var lines = String(k).split('\n'), many = lines.filter(function (l) { return !/^\(/.test(l); }).length >= 2, under = false;
    return lines.map(function (ln, i) {
      var note = /^\(/.test(ln), sub = /^\s*→/.test(ln), t = ln.trim(), s, ar, cls = '';
      var head = !note && !sub && /:$/.test(t) && t.length <= 70 && i < lines.length - 1 && !/^\(/.test(lines[i + 1]);
      var m = !note && !sub && !head && /^([^:→]{2,64}?):(\s|$)/.exec(ln);
      if (m && /\.\s/.test(m[1] + ' ')) m = null;
      if (note || sub || (m && !head)) under = false; else if (head) under = true;
      var kid = under && !head && !note;
      if (head) s = esc(ln);
      else if (m) { s = '<b class="lb">' + esc(m[1]) + ':</b>' + esc(ln.slice(m[0].length - (m[2] ? 1 : 0))); if (/^(Not verified|Could not|Unverified)/i.test(m[1])) cls += ' nv'; else if (/^Avoid$/i.test(m[1])) cls += ' av'; }
      else if (!note && !sub && ln.indexOf('→') > 0) {
        var seg = ln.split(' → ');
        if (seg.length >= 3 && seg.every(function (x) { return x.length <= 34; })) { s = esc(ln); cls += ' ch'; }
        else if ((ar = /^([^→]{2,48}?)\s→\s/.exec(ln))) s = '<b class="lb">' + esc(ar[1]) + '</b> →' + esc(ln.slice(ar[0].length - 1));
        else s = esc(ln);
      } else s = esc(ln);
      s = s.replace(/→/g, '<span class="ar">→</span>');
      return '<span class="kl' + (note ? ' kn' : '') + (head ? ' hd' : '') + (kid ? ' in' : '') + cls + (!note && !head && !kid && many && !sub ? ' bl' : '') + (sub ? ' sub' : '') + (i === 0 && many && !note ? ' lead' : '') + '">' + s + '</span>';
    }).join('');
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { return iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diff(a, b) { return Math.round((parse(a) - parse(b)) / 86400000); }
  function nice(s) { return parse(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); }
  function longToday() { return new Date().toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }); }
  function byId(id) { for (var i = 0; i < TOP.length; i++) if (TOP[i].id === id) return TOP[i]; return null; }
  function sysById(id) { for (var i = 0; i < SYS.length; i++) if (SYS[i].id === id) return SYS[i]; return null; }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  /* ---------- topic review schedule ---------- */
  function nextDue(t) {
    var st = S.topics[t.id]; if (!st || !st.studied) return null;
    for (var i = 0; i < INT.length; i++) {
      if (!st.rev[INT[i]]) { var due = addDays(st.studied, INT[i]); return { k: INT[i], due: due, late: diff(today(), due) }; }
    }
    return null;
  }
  function topicReviews() {
    var out = [];
    TOP.forEach(function (t) { var n = nextDue(t); if (n && n.late >= 0) out.push({ t: t, n: n }); });
    out.sort(function (a, b) { return b.n.late - a.n.late; });
    return out;
  }
  function revCan(st, k) {
    k = +k; var i = INT.indexOf(k); if (!st.studied || i < 0) return false;
    if (st.rev[k]) { for (var j = i + 1; j < INT.length; j++) if (st.rev[INT[j]]) return false; return true; } // only the latest tick can be undone
    for (var m = 0; m < i; m++) if (!st.rev[INT[m]]) return false; // earlier reviews first
    return diff(today(), addDays(st.studied, k)) >= 0; // and only once it is due
  }
  var STATUS = { 'new': 'Not started', learning: 'Learning', done: 'Done' };

  /* ---------- recall items ---------- */
  var SECT = { R: 'Recognise', A: 'Assess and investigate', T: 'Treat now', C: 'Complications and traps', F: 'After and follow-up', Y: 'Your subtopics' };
  var GORD = { R: 0, A: 1, T: 2, C: 3, F: 4, Y: 5 };
  var PRI = { 1: 'Must know', 2: 'Good to know', 3: 'Detail' };
  var SRC = { p: 'Point of Care page', a: 'Australian guidance (ANZCOR)', b: 'Point of Care page and Australian guidance', n: 'Your own notes, checked where an Australian source is named', q: 'A Test yourself question you saved', g: 'Australian guidance (Asthma Handbook, TSANZ, NSW ACI, Therapeutic Guidelines); the Study Kit says what could not be verified', k: 'From the Study Kit. Checked against an Australian source only where one is named in the answer; the rest is standard teaching' };
  var openSet = {}, revealed = false;
  function skipped(id) { return !!(S.skipRev && S.skipRev[id] && S.skipRev[id].on); }
  function topicItems(tid) {
    var rc = RC[tid] || { items: [], sg: [] }, out = [], added = S.added[tid] || [];
    rc.items.forEach(function (x, i) { if (!x.dup) out.push({ it: x, o: i, tid: tid }); });
    rc.sg.forEach(function (x) { if (added.indexOf(x.id) >= 0) out.push({ it: x, o: 500, tid: tid }); });
    (S.custom[tid] || []).forEach(function (x, i) { out.push({ it: x, o: 1000 + i, tid: tid, mine: true }); });
    out.sort(function (a, b) { return (GORD[a.it.g || 'Y'] - GORD[b.it.g || 'Y']) || (a.o - b.o); });
    return out;
  }
  function itState(id) {
    var s = S.items[id];
    if (!s) return { k: 'new' };
    return { k: diff(today(), s.due) >= 0 ? 'due' : 'ok', s: s };
  }
  var undo = null;
  /* Four recall buttons. Again: back to the first rung (1 day). Hard: the same rung again. Good: up one rung. Easy: up two.
     The ladder is INT (1, 3, 7, 14, 28 days). Good and Easy cannot be pressed before a card is due, so the spacing stays honest.
     The Kindle plugin (rmo_core.lua) copies this rule; keep them the same. Older ratings used 'shaky' (= again) and 'got' (= good). */
  var HOWS = { again: 1, hard: 1, good: 1, easy: 1 };
  function normHow(h) { return h === 'shaky' ? 'again' : h === 'got' ? 'good' : h; }
  function nextStep(prev, how) {
    var p = prev || 0, top = INT.length - 1;
    return how === 'again' ? 0 : how === 'hard' ? p : how === 'good' ? Math.min(p + 1, top) : Math.min(p + 2, top);
  }
  function previewTxt(id, how) {
    var s = S.items[id], d = INT[nextStep(s ? s.step : 0, how)];
    return d === 1 ? '1 day' : d + ' days';
  }
  /* Level of a card, worked out from its rating: new, weak (last answer was Again), learning (rung 0 to 1), young (rung 2 to 3), mature (rung 4 = 28 days). */
  var LV = { new: 'New', weak: 'Weak', learning: 'Learning', young: 'Young', mature: 'Mature' };
  function levelOf(id) {
    var s = S.items[id]; if (!s) return 'new';
    if (s.r === 'again' || s.r === 'shaky') return 'weak';
    var n = s.step || 0; return n >= 4 ? 'mature' : n >= 2 ? 'young' : 'learning';
  }
  function rate(id, how) {
    how = normHow(how); if (!HOWS[how]) return false;
    var st = itState(id);
    if ((how === 'good' || how === 'easy') && st.k === 'ok') return false; // not due yet: cannot be marked known early
    var n = nextStep(S.items[id] ? S.items[id].step : 0, how);
    undo = { id: id, prev: S.items[id] ? JSON.parse(JSON.stringify(S.items[id])) : null, how: how, at: Date.now() };
    S.items[id] = { step: n, due: addDays(today(), INT[n]), last: today(), r: how, t: Date.now() };
    save();
    return true;
  }
  function undoRate() {
    if (!undo) return;
    if (undo.skip) { S.skipRev[undo.id] = { on: false, t: Date.now() }; undo = null; save(); return; }
    if (undo.prev) { undo.prev.t = Date.now(); S.items[undo.id] = undo.prev; }
    else { delete S.items[undo.id]; S.dead[undo.id] = Date.now(); }
    undo = null; save();
  }
  function queue() {
    var due = [], fresh = [];
    TOP.forEach(function (t) {
      var studied = (S.topics[t.id] || {}).studied;
      topicItems(t.id).forEach(function (x) {
        if (skipped(x.it.id)) return;
        var k = itState(x.it.id).k;
        if (k === 'due') due.push(x); else if (k === 'new' && studied) fresh.push(x);
      });
    });
    return { due: due, fresh: fresh, all: due.concat(fresh) };
  }
  function topicDueCount(tid) { return topicItems(tid).filter(function (x) { return !skipped(x.it.id) && itState(x.it.id).k === 'due'; }).length; }
  function tagFor(st, id) {
    if (st.k === 'new') return '<span class="tag">Not rated</span>';
    var lv = levelOf(id), lt = '<span class="tag lv-' + lv + '">' + LV[lv] + '</span>';
    if (st.k === 'due') return '<span class="tag due">Due</span>' + lt;
    return lt + '<span class="tag">Next ' + nice(st.s.due) + '</span>';
  }
  function KH(k) { return '<kbd class="kh" aria-hidden="true">' + k + '</kbd>'; }
  function rateButtons(id, keys) {
    var st = itState(id);
    if (st.k === 'ok') return '<p class="src">Next review ' + nice(st.s.due) + '. You can mark it known again on that day, so the spacing stays honest.</p><button class="link" data-rate="again" data-it="' + id + '">I have forgotten this: bring it back tomorrow</button>';
    function b(how, label, key) { return '<button class="b r-' + how + '" data-rate="' + how + '" data-it="' + id + '"><span>' + label + (keys ? KH(key) : '') + '</span><small>' + previewTxt(id, how) + '</small></button>'; }
    return '<div class="rate four">' + b('again', 'Again', '1') + b('hard', 'Hard', '2') + b('good', 'Good', '3') + b('easy', 'Easy', '4') + '</div>';
  }

  /* ---------- merge (used by sync and import) ---------- */
  function merge(a, b) {
    a = a || {}; b = b || {};
    var r = Math.max(a.resetAt || 0, b.resetAt || 0), out = { topics: {}, errors: [], items: {}, custom: {}, added: {}, addedAt: {}, dead: {}, resetAt: r };
    [a.dead || {}, b.dead || {}].forEach(function (d) { Object.keys(d).forEach(function (k) { out.dead[k] = Math.max(out.dead[k] || 0, d[k]); }); });
    function newer(x, y) { if (!x) return y; if (!y) return x; return (y.t || 0) > (x.t || 0) ? y : x; }
    ['topics', 'items'].forEach(function (f) {
      var A = a[f] || {}, B = b[f] || {};
      Object.keys(A).concat(Object.keys(B)).forEach(function (k) { var v = newer(A[k], B[k]); if (f === 'items' && out.dead[k] && (v.t || 0) <= out.dead[k]) return; if ((v.t || 0) >= r || !r) out[f][k] = v; });
    });
    function idTime(id) { var n = Number(String(id).replace(/^u/, '')); return isNaN(n) ? 0 : n; }
    var seen = {};
    (a.errors || []).concat(b.errors || []).forEach(function (e) { if (seen[e.id] || out.dead[e.id] || idTime(e.id) < r) return; seen[e.id] = 1; out.errors.push(e); });
    [a.custom || {}, b.custom || {}].forEach(function (c) {
      Object.keys(c).forEach(function (tid) { (c[tid] || []).forEach(function (x) {
        var L = out.custom[tid] = out.custom[tid] || [];
        if (out.dead[x.id] || idTime(x.id) < r || L.some(function (y) { return y.id === x.id; })) return; L.push(x);
      }); });
    });
    [a, b].forEach(function (s) { Object.keys(s.addedAt || {}).forEach(function (k) { out.addedAt[k] = Math.max(out.addedAt[k] || 0, s.addedAt[k]); }); });
    [a.added || {}, b.added || {}].forEach(function (ad) {
      Object.keys(ad).forEach(function (tid) { (ad[tid] || []).forEach(function (id) {
        var L = out.added[tid] = out.added[tid] || [];
        if ((out.addedAt[id] || 0) < r || L.indexOf(id) >= 0) return; L.push(id);
      }); });
    });
    var seenA = {}; out.attempts = [];
    (a.attempts || []).concat(b.attempts || []).forEach(function (x) { if (seenA[x.id] || (x.at || 0) < r) return; seenA[x.id] = 1; out.attempts.push(x); });
    out.attempts.sort(function (x, y) { return x.at - y.at; });
    out.notes = {};
    [a.notes || {}, b.notes || {}].forEach(function (n) { Object.keys(n).forEach(function (k) { if (!out.notes[k] || (n[k].t || 0) > (out.notes[k].t || 0)) out.notes[k] = n[k]; }); });
    Object.keys(out.notes).forEach(function (k) { if ((out.notes[k].t || 0) < r) delete out.notes[k]; });
    ['ctx', 'caseReq', 'skipRev'].forEach(function (f) {
      out[f] = {};
      [a[f] || {}, b[f] || {}].forEach(function (n) { Object.keys(n).forEach(function (k) { if (!out[f][k] || (n[k].t || 0) > (out[f][k].t || 0)) out[f][k] = n[k]; }); });
      Object.keys(out[f]).forEach(function (k) { if ((out[f][k].t || 0) < r) delete out[f][k]; });
    });
    var seenH = {}; out.highlights = [];
    (a.highlights || []).concat(b.highlights || []).forEach(function (x) { if (seenH[x.id] || out.dead[x.id] || (x.at || 0) < r) return; seenH[x.id] = 1; out.highlights.push(x); });
    out.highlights.sort(function (x, y) { return x.at - y.at; });
    out.stars = {};
    [a.stars || {}, b.stars || {}].forEach(function (st) { Object.keys(st).forEach(function (k) { if (!out.stars[k] || (st[k].t || 0) > (out.stars[k].t || 0)) out.stars[k] = st[k]; }); });
    Object.keys(out.stars).forEach(function (k) { if ((out.stars[k].t || 0) < r) delete out.stars[k]; });
    var seenP = {}; out.pace = [];
    (a.pace || []).concat(b.pace || []).forEach(function (x) { if (!x || !x.id || seenP[x.id] || out.dead[x.id] || (x.at || 0) < r || !(x.ms > 0)) return; seenP[x.id] = 1; out.pace.push(x); });
    out.pace.sort(function (x, y) { return x.at - y.at; }); out.pace = out.pace.slice(-60);
    out.caseSkip = {};
    [a.caseSkip || {}, b.caseSkip || {}].forEach(function (src) { Object.keys(src).forEach(function (k) { if ((src[k] || 0) >= r) out.caseSkip[k] = Math.max(out.caseSkip[k] || 0, src[k]); }); });
    out.kitdone = {};
    [a.kitdone || {}, b.kitdone || {}].forEach(function (src) { Object.keys(src).forEach(function (k) { if (falseKitTick(k, src[k])) return; if ((src[k] || 0) >= r) out.kitdone[k] = Math.max(out.kitdone[k] || 0, src[k]); }); });
    out.revtime = {};
    [a.revtime || {}, b.revtime || {}].forEach(function (src) { Object.keys(src).forEach(function (day) { var d = src[day] || {}; Object.keys(d).forEach(function (dev) { var v = d[dev]; if (!v || !(v.ms >= 0) || (v.t || 0) < r) return; var o = out.revtime[day] || (out.revtime[day] = {}); if (!o[dev] || v.ms > o[dev].ms) o[dev] = { ms: v.ms, t: v.t }; }); }); });
    Object.keys(out.revtime).sort().slice(0, -14).forEach(function (day) { delete out.revtime[day]; });
    return out;
  }

  /* ---------- case attempts reported by the on-call pages ---------- */
  function drainAttempts() {
    var q = [];
    try { q = JSON.parse(localStorage.getItem('rmo-attempt-queue') || '[]'); localStorage.removeItem('rmo-attempt-queue'); } catch (e) { return; }
    if (!q.length) return;
    var have = {}; S.attempts.forEach(function (x) { have[x.id] = 1; });
    q.forEach(function (x) { if (x && x.id && !have[x.id]) S.attempts.push(x); });
    save();
  }
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data && e.data.rmoAttempt) drainAttempts(); if (e.origin === location.origin && e.data && e.data.rmoStar) drainStars(); if (e.origin === location.origin && e.data && e.data.rmoCard) drainCards(); });

  /* ---------- Test yourself questions saved as recall cards (custom items with qk = the question's key) ---------- */
  function mirrorCards() {
    try { var m = {}; Object.keys(S.custom).forEach(function (t) { (S.custom[t] || []).forEach(function (x) { if (x.qk) m[x.qk] = 1; }); }); localStorage.setItem('rmo-qcards', JSON.stringify(m)); } catch (e) {}
  }
  function drainCards() {
    var q = [];
    try { q = JSON.parse(localStorage.getItem('rmo-card-queue') || '[]'); localStorage.removeItem('rmo-card-queue'); } catch (e) { return; }
    var changed = false;
    q.forEach(function (x, i) {
      if (!x || !x.tid || !x.key) return;
      var L = S.custom[x.tid] = S.custom[x.tid] || [], ex = L.filter(function (y) { return y.qk === x.key; })[0];
      if (x.on && !ex) { L.push({ id: 'u' + (Date.now() + i), p: 2, g: x.g || 'T', s: 'q', t: x.t, k: x.k, qk: x.key }); changed = true; }
      if (!x.on && ex) { S.custom[x.tid] = L.filter(function (y) { return y.id !== ex.id; }); delete S.items[ex.id]; S.dead[ex.id] = Date.now(); changed = true; }
    });
    if (changed) save();
    mirrorCards();
  }

  /* ---------- starred night-shift cases (synced; the refresh writes similar new cases for them) ---------- */
  function mirrorStars() {
    try { var m = {}; Object.keys(S.stars).forEach(function (k) { if (S.stars[k].on) m[k] = 1; }); localStorage.setItem('rmo-stars', JSON.stringify(m)); } catch (e) {}
  }
  function drainStars() {
    var q = [];
    try { q = JSON.parse(localStorage.getItem('rmo-star-queue') || '[]'); localStorage.removeItem('rmo-star-queue'); } catch (e) { return; }
    var changed = false;
    q.forEach(function (x) { if (x && x.id && (!S.stars[x.id] || (x.t || 0) > (S.stars[x.id].t || 0))) { S.stars[x.id] = { on: !!x.on, t: x.t || Date.now(), tool: x.tool || '', title: x.title || '' }; changed = true; } });
    if (changed) save();
    mirrorStars();
  }

  /* ---------- cloud sync (Supabase) ---------- */
  var SB = 'https://omuzlqabwlzhbrfipwqx.supabase.co', SBK = 'sb_publishable_wQHqdu55ZO72ujh-1iq98A_gBS5E3FB', SKEY = 'rmo-sync-session';
  var sess = null, syncState = { status: 'off', at: null, msg: '' }, timer = null, busy = false, again = false;
  try { sess = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) { sess = null; }
  function keepSess(s) { sess = s; try { if (s) localStorage.setItem(SKEY, JSON.stringify(s)); else localStorage.removeItem(SKEY); } catch (e) {} }
  function jwtClaims(t) { try { return JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); } catch (e) { return {}; } }
  function fromAuth(d) {
    var c = jwtClaims(d.access_token);
    return { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at || (Math.floor(Date.now() / 1000) + (+d.expires_in || 3600)), uid: c.sub, email: c.email || (d.user && d.user.email) || '' };
  }
  function api(path, opt) {
    opt = opt || {}; var h = { apikey: SBK, 'Content-Type': 'application/json' };
    if (opt.auth) h.Authorization = 'Bearer ' + sess.access_token;
    Object.keys(opt.headers || {}).forEach(function (k) { h[k] = opt.headers[k]; });
    return fetch(SB + path, { method: opt.method || 'GET', headers: h, body: opt.body ? JSON.stringify(opt.body) : undefined }).then(function (res) {
      return res.text().then(function (t) { var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {} if (!res.ok) { var err = new Error((j && (j.msg || j.error_description || j.message || j.error)) || ('HTTP ' + res.status)); err.status = res.status; throw err; } return j; });
    });
  }
  function fresh() {
    if (!sess) return Promise.reject(new Error('signed out'));
    if (sess.expires_at - 120 > Date.now() / 1000) return Promise.resolve();
    return api('/auth/v1/token?grant_type=refresh_token', { method: 'POST', body: { refresh_token: sess.refresh_token } }).then(function (d) { keepSess(fromAuth(d)); });
  }
  function setSync(st, msg) { syncState.status = st; syncState.msg = msg || ''; if (st === 'ok') syncState.at = new Date(); var el = document.getElementById('syncline'); if (el) el.innerHTML = syncLine(); }
  function syncNow() {
    if (!sess) { setSync('off'); return Promise.resolve(); }
    if (busy) { again = true; return Promise.resolve(); }
    busy = true; setSync('busy');
    var before = JSON.stringify(S);
    return fresh().then(function () {
      return api('/rest/v1/rmo_revision_state?select=data&user_id=eq.' + sess.uid, { auth: true });
    }).then(function (rows) {
      var remote = rows && rows[0] ? rows[0].data : {};
      S = merge(S, remote); fix(); store(); mirrorStars(); mirrorCards();
      return api('/rest/v1/rmo_kindle_ratings?select=card_id,item,t&user_id=eq.' + sess.uid, { auth: true }).catch(function () { return []; }).then(function (kr) {
        (kr || []).forEach(function (r) { // ratings made on the Kindle: newest wins, same rule as merge()
          var cur = S.items[r.card_id], t = +r.t || 0;
          if (t < (S.resetAt || 0) || (S.dead[r.card_id] || 0) >= t || (cur && (cur.t || 0) >= t) || !r.item || !r.item.due) return;
          S.items[r.card_id] = r.item;
        });
        fix(); store();
        return api('/rest/v1/rmo_revision_state', { method: 'POST', auth: true, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: { user_id: sess.uid, data: S, updated_at: new Date().toISOString() } });
      });
    }).then(function () {
      busy = false; setSync('ok');
      if (JSON.stringify(S) !== before) softRender();
      if (again) { again = false; syncNow(); }
    }).catch(function (e) {
      busy = false;
      if (e.status === 401 || e.status === 400 && /refresh/i.test(e.message)) { keepSess(null); setSync('off', 'Your sign-in expired. Sign in again to keep syncing.'); }
      else setSync('err', navigator.onLine === false ? 'Offline. Changes will sync when you reconnect.' : 'Could not sync: ' + e.message);
    });
  }
  function softRender() { var a = document.activeElement; if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return; keepScroll = true; render(); }
  window.RMOSync = { soon: function () { if (!sess) return; clearTimeout(timer); timer = setTimeout(syncNow, 2500); } };
  function syncLine() {
    if (!sess) return '<a href="#/settings">Turn on sync</a> to use your progress on all your devices.';
    if (syncState.status === 'busy') return 'Syncing…';
    if (syncState.status === 'err') return esc(syncState.msg) + ' <a href="#/settings">Details</a>';
    if (syncState.status === 'ok' && syncState.at) return 'Synced at ' + syncState.at.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) + ' as ' + esc(sess.email) + '.';
    return 'Sync is on as ' + esc(sess.email) + '.';
  }
  function takeLinkTokens() {
    var h = location.hash;
    if (h.indexOf('access_token=') < 0) {
      if (h.indexOf('error_description=') >= 0) { var q0 = new URLSearchParams(h.slice(1)); syncState.msg = 'Sign-in link failed: ' + q0.get('error_description'); history.replaceState(null, '', location.pathname + '#/settings'); }
      return;
    }
    var q = new URLSearchParams(h.slice(1));
    keepSess(fromAuth({ access_token: q.get('access_token'), refresh_token: q.get('refresh_token'), expires_in: q.get('expires_in'), expires_at: +q.get('expires_at') || 0 }));
    history.replaceState(null, '', location.pathname + '#/settings');
  }
  takeLinkTokens();


  /* ---------- soft "new" nudge (yellow, per device, never blocks anything) ---------- */
  /* ---------- new on-call cases ----------
     The case refresh gives each new case an id with its date (c20261115a). A dated case shows on Today
     until it is played (synced attempts) or skipped (synced S.caseSkip). Cases without a date are the
     originals and never show as new. New recall cards are silent: they appear in the topic checklist. */
  var caseAll = false, caseData = null; // { asth: [{id, title, blurb, where}] }
  function caseFile(f) { for (var i = 0; i < TOP.length; i++) { var ts_ = TOP[i].tools || []; for (var j = 0; j < ts_.length; j++) if (ts_[j].file === f + '_shift.html' || (/_ward$/.test(f) && ts_[j].file === f + '.html')) return { topic: TOP[i], i: j }; } return null; }
  function loadCases() {
    var files = []; // { f: key used in skip keys, js: case file, ward: order-sheet file }
    TOP.forEach(function (t) { (t.tools || []).forEach(function (x) {
      var m = /^(.*)_shift\.html$/.exec(x.file), w = /^(.*_ward)\.html$/.exec(x.file), f = m ? m[1] : w ? w[1] : null;
      if (f && !files.some(function (z) { return z.f === f; })) files.push({ f: f, js: m ? 'tools/cases/' + f + '_shift.js' : 'tools/cases/' + f + '.js', ward: !m });
    }); });
    var out = {}, left = files.length;
    if (!left) { caseData = {}; return; }
    files.forEach(function (z) {
      fetch(z.js).then(function (r) { return r.ok ? r.text() : ''; }).catch(function () { return ''; }).then(function (txt) {
        try { var w = {}; if (txt) new Function('window', txt)(w); var arr = z.ward ? (w.WARD && w.WARD.cases) : w.RMO_CASES; out[z.f] = (arr || []).filter(function (c) { return c && c.id && !c.retired; }).map(function (c) { return { id: String(c.id), title: c.title || '', blurb: c.blurb || '', where: c.where || '', hard: !!(c.hard && c.hard.steps && !z.ward), fc: c.fromCard || '' }; }); } catch (e) { /* a broken case file: skip it */ }
        if (--left === 0) { caseData = out; var r0 = route[0] || ''; if ((r0 === '' && newCaseList().length) || r0 === 't') render(); }
      });
    });
  }
  /* An attempt belongs to a case file when its tool is <f>_shift (Easy), <f>_ward (Hard order sheet) or <f> itself (resp_ward). */
  function caseTries(f, id) { return (S.attempts || []).filter(function (x) { return x && (x.tool === f + '_shift' || x.tool === f + '_ward' || x.tool === f) && x.cs === id; }); }
  function playedCase(f, id) { return caseTries(f, id).length > 0; }
  function hardTried(f, id) { return caseTries(f, id).some(function (x) { return x.mode === 'hard' || x.tool === f + '_ward'; }); }
  function newCaseList() {
    if (!caseData) return [];
    var o = [];
    Object.keys(caseData).forEach(function (f) {
      var loc = caseFile(f); if (!loc) return;
      caseData[f].forEach(function (c) {
        var m = /^[cw](\d{8})/.exec(c.id);
        if (!m || playedCase(f, c.id) || (S.caseSkip || {})[f + ':' + c.id]) return;
        o.push({ f: f, id: c.id, title: c.title, blurb: c.blurb, where: c.where, topic: loc.topic, i: loc.i, d: m[1] });
      });
    });
    return o.sort(function (x, y) { return x.d < y.d ? 1 : x.d > y.d ? -1 : x.id < y.id ? -1 : 1; });
  }
  var TICK = '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  function shortDay(ms) { var d = new Date(ms); return d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()]; }
  // Next to each study tool: a yellow dot with the number of new cases, "Done" with the date once every case is played, or a tick for a kit scrolled to the end.
  function toolBadge(t, x) {
    var m = /^(.*)_shift\.html$/.exec(x.file) || /^(.*_ward)\.html$/.exec(x.file);
    if (!m) { var kd = (S.kitdone || {})[t.id + ':' + x.file]; return kd ? '<span class="tb tb-done" title="Read to the end ' + esc(shortDay(kd)) + '">' + TICK + '<span class="sr">Done</span></span>' : ''; }
    if (!caseData || !caseData[m[1]] || !caseData[m[1]].length) return '';
    var f = m[1], nw = newCaseList().filter(function (c) { return c.f === f; }).length;
    if (nw) return '<span class="tb tb-new" title="' + nw + ' new ' + (nw === 1 ? 'case' : 'cases') + '"><i></i>' + nw + '<span class="sr"> new ' + (nw === 1 ? 'case' : 'cases') + '</span></span>';
    var last = 0, all = caseData[f].every(function (c) { var hit = caseTries(f, c.id); hit.forEach(function (a) { last = Math.max(last, a.at || 0); }); return hit.length; });
    if (!all || !last) return '';
    // A case with a Hard version is only done once it has been played Hard. Easy alone shows "Easy done".
    var easyOnly = caseData[f].some(function (c) { return c.hard && !hardTried(f, c.id); });
    return '<span class="tb tb-done' + (easyOnly ? ' tb-easy' : '') + '"' + (easyOnly ? ' title="Played in Easy. Try Hard to finish it."' : '') + '>' + CLOCK + (easyOnly ? 'Easy done ' : 'Done ') + esc(shortDay(last)) + '</span>';
  }
  function caseHref(c) { return '#/tool/' + c.topic.id + '/' + c.i + '/' + encodeURIComponent(c.id) + '/today'; }
  // Called from inside a case page (same origin) when a case started from Today ends.
  window.RMOCases = {
    left: function (cur) { return newCaseList().filter(function (c) { return c.f + ':' + c.id !== cur; }).length; },
    next: function (cur) { var l = newCaseList().filter(function (c) { return c.f + ':' + c.id !== cur; }); location.hash = l.length ? caseHref(l[0]) : '#/'; }
  };
  function newCasesHTML() {
    var l = newCaseList(); if (!l.length) return '';
    var shown = caseAll ? l : l.slice(0, 3);
    return '<section class="ncases" aria-label="New on-call cases"><div class="nchead"><h2>New on-call cases <span class="n nc">' + l.length + '</span></h2>' + (l.length > 1 ? '<a class="btn small" href="' + caseHref(l[0]) + '">Play all ' + l.length + '</a>' : '') + '</div><p class="meta">Short refreshers written from your weak points. About 5 minutes each.</p><ul class="list">' + shown.map(function (c) {
      return '<li class="ncase"><div class="nct"><span class="ncm">' + esc(c.topic.name) + (c.where ? ' · ' + esc(c.where) : '') + '</span><b>' + esc(c.title) + '</b>' + (c.blurb ? '<span class="ncb">' + esc(c.blurb) + '</span>' : '') + '</div>' +
        '<div class="ncbtn"><a class="btn primary small" href="' + caseHref(c) + '">Play</a><button class="link" data-skipcase="' + esc(c.f + ':' + c.id) + '">Skip</button></div></li>';
    }).join('') + '</ul>' + (l.length > shown.length ? '<p><button class="link" data-act="allcases">Show ' + (l.length - shown.length) + ' more</button></p>' : '') + '</section>';
  }

  /* ---------- revise timer ----------
     Counts only active time on the Revise page while a card is showing: stops when the app is hidden,
     after 2 minutes without a touch or key, and ignores any gap over 5 s between ticks (sleep, throttling,
     clock changes). Durations use performance.now(), which does not jump when the wall clock is changed.
     Today's total and an optional short goal live on this device (rmo-revtime); per-card times (capped
     at 2 min) are synced in S.pace, and the estimate is count x mean pace, separately for new and due cards
     (slow outliers capped, pulled toward a prior while samples are few). Only one tab counts at a time. */
  var RT_KEY = 'rmo-revtime', RT_IDLE = 120000, RT_MAXDT = 5000, RT_CAP = 120000, RT_MIN = 1000, RT_DEF = 25000;
  var rtTab = Math.random().toString(36).slice(2), rtLast = null, rtInput = performance.now(), rtShown = null, rtMem = null, rtLastRate = null, rtTouched = true, rtMsAtInput = 0, rtWasIdle = false, RT_GRACE = 30000;
  function rtFresh() { return { day: today(), ms: 0, cards: 0, card: null, cardAt: 0, goal: null, owner: null, beat: 0 }; }
  function rtLoad() {
    var s = rtMem;
    try { var v = localStorage.getItem(RT_KEY); if (v) s = JSON.parse(v); } catch (e) {}
    if (!s || s.day !== today() || typeof s.ms !== 'number' || !(s.ms >= 0)) { s = rtFresh(); var mine = ((S.revtime || {})[s.day] || {})[rtDev]; if (mine && mine.ms > 0) s.ms = mine.ms; }
    return s;
  }
  function rtSave(s) { rtMem = s; try { localStorage.setItem(RT_KEY, JSON.stringify(s)); } catch (e) {} }
  /* Today's total across devices: each device writes its own total into S.revtime[day][device] (synced; merge keeps the larger). */
  var rtDev = (function () { var d = null; try { d = localStorage.getItem('rmo-dev'); if (!d) { d = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); localStorage.setItem('rmo-dev', d); } } catch (e) { d = 'd-mem'; } return d; })();
  function rtOthers() { var d = (S.revtime || {})[today()] || {}, t = 0; Object.keys(d).forEach(function (k) { if (k !== rtDev && d[k] && d[k].ms > 0) t += d[k].ms; }); return t; }
  function rtPublish(push) {
    var s = rtLoad(); if (!(s.ms > 0)) return;
    S.revtime = S.revtime || {}; var day = S.revtime[s.day] || (S.revtime[s.day] = {}), cur = day[rtDev];
    if (cur && cur.ms >= Math.round(s.ms)) return;
    day[rtDev] = { ms: Math.round(s.ms), t: Date.now() };
    if (push) save(); else store();
  }
  function rtOther(s) { return s.owner && s.owner !== rtTab && Math.abs(Date.now() - (s.beat || 0)) < 4000; }
  function rtTick(force) {
    var now = performance.now(), dt = rtLast == null ? 0 : now - rtLast; rtLast = now;
    var on = route[0] === 'revise' && rtShown && (force || document.visibilityState === 'visible');
    if (!on) return;
    var s = rtLoad(), idle = now - rtInput > RT_IDLE;
    if (rtOther(s)) { rtPaint(s, 'other'); return; }
    s.owner = rtTab; s.beat = Date.now();
    if (rtTouched) { rtTouched = false; rtMsAtInput = s.ms; }
    if (dt > 0 && dt <= RT_MAXDT && !idle) s.ms += dt;
    if (idle && !rtWasIdle) { s.ms = Math.max(0, Math.min(s.ms, rtMsAtInput + RT_GRACE)); s.cardAt = Math.min(s.cardAt, s.ms); if (s.goal) s.goal.start = Math.min(s.goal.start, s.ms); } // walked away: keep only 30 s after the last touch
    rtWasIdle = idle;
    if (s.card !== rtShown) { s.card = rtShown; s.cardAt = s.ms; }
    rtSave(s); rtPaint(s, idle ? 'idle' : '');
  }
  /* Pace for one kind of card ('n' new, 'd' due). A total is count x mean, so the mean (not the median) is the right
     estimator; slow outliers are capped at 3x the median so one distracted card cannot inflate it. With few samples
     it is pulled toward a prior (the other kind, scaled, else 25 s) as if 4 prior cards had been timed. */
  function rtMeanOf(a) {
    if (!a.length) return null;
    var so = a.slice().sort(function (x, y) { return x - y; }), med = so[so.length >> 1], cap = Math.max(med * 3, 8000);
    return a.reduce(function (t, m) { return t + Math.min(m, cap); }, 0) / a.length;
  }
  function rtPace(kind) {
    kind = kind === 'n' ? 'n' : 'd';
    var all = (S.pace || []).filter(function (x) { return x.ms > 0; }).slice(-60);
    var own = all.filter(function (x) { return (x.k || 'd') === kind; }).slice(-30).map(function (x) { return x.ms; });
    var oth = all.filter(function (x) { return (x.k || 'd') !== kind; }).slice(-30).map(function (x) { return x.ms; });
    var om = rtMeanOf(oth), prior = om ? om * (kind === 'n' ? 1.5 : 0.7) : RT_DEF, N = 4;
    if (!own.length) return { ms: prior, rough: true };
    var m = rtMeanOf(own);
    return { ms: (m * own.length + prior * N) / (own.length + N), rough: own.length < 8 };
  }
  function rtEst(q) { return q.due.length * rtPace('d').ms + q.fresh.length * rtPace('n').ms; }
  function rtClock(ms) { var t = Math.floor(Math.max(0, ms) / 1000), h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, x = t % 60; return (h ? h + ':' + pad(m) : m) + ':' + pad(x); }
  function rtAbout(ms) { var m = Math.round(ms / 60000); if (m < 1) return '<1 min'; if (m < 60) return '~' + m + ' min'; return '~' + Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + m % 60 + ' min' : ''); }
  var rtMenu = false;
  var RT_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>';
  function rtGoalLeft(s) { return s.goal ? s.goal.min * 60000 - (s.ms - s.goal.start) : 0; }
  function rtGoalHTML(s, n) {
    if (!s.goal) return rtMenu ? '<div class="rgoal" data-k="menu"><span class="rlab">Short session</span>' + [5, 10, 15].map(function (m) { return '<button class="rpill" data-act="rtgoal" data-min="' + m + '">' + m + ' min</button>'; }).join('') + '</div>' : '<div data-k="none"></div>';
    if (rtGoalLeft(s) > 0) return '<div class="rgoal" data-k="run"><span class="rrun">' + RT_ICON + '<b id="rgleft">' + rtClock(rtGoalLeft(s)) + '</b> left<span class="dot">·</span><span id="rgfit">' + rtFit(s, n) + '</span></span><button class="rx" data-act="rtgoaloff" aria-label="Cancel short session">×</button></div>';
    var done = s.cards - s.goal.cards0;
    return '<div class="rgoal done" data-k="done"><span><b>' + s.goal.min + ' min done</b><span class="dot">·</span>' + plural(done, 'card', 'cards') + '</span><span class="btns"><button class="rpill on" data-act="rtstop">Stop here</button><button class="rpill" data-act="rtgoaloff">Keep going</button></span></div>';
  }
  function rtFit(s, n) { var k = Math.max(1, Math.min(n, Math.floor(rtGoalLeft(s) / rtPace().ms))); return k >= n ? 'all ' + n + ' cards' : '~' + plural(k, 'card', 'cards'); }
  function rtPaint(s, state) {
    var c = document.getElementById('rtclock'); if (!c) return;
    c.textContent = rtClock(s.ms + rtOthers());
    var st = document.getElementById('rtstate'), msg = state === 'idle' ? 'paused' : state === 'other' ? 'in other window' : 'today';
    if (st && st.textContent !== msg) { st.textContent = msg; st.classList.toggle('warn', msg !== 'today'); }
    var b = document.querySelector('.rtbtn'); if (b) { b.hidden = !!s.goal; b.setAttribute('aria-expanded', rtMenu ? 'true' : 'false'); b.classList.toggle('on', rtMenu); }
    var g = document.getElementById('rgoal'); if (!g) return;
    var n = +g.getAttribute('data-n') || 0, want = !s.goal ? (rtMenu ? 'menu' : 'none') : rtGoalLeft(s) > 0 ? 'run' : 'done', box = g.firstElementChild;
    if (!box || box.getAttribute('data-k') !== want) { g.innerHTML = rtGoalHTML(s, n); return; }
    if (want === 'run') { var l = document.getElementById('rgleft'), f = document.getElementById('rgfit'); if (l) l.textContent = rtClock(rtGoalLeft(s)); if (f) { var fv = rtFit(s, n); if (f.textContent !== fv) f.textContent = fv; } }
  }
  function rtBlock(q) {
    var s = rtLoad(), n = q.all.length;
    return '<div class="rtline"><span>' + [q.due.length ? q.due.length + ' due' : '', q.fresh.length ? q.fresh.length + ' new' : ''].filter(Boolean).join(' + ') + '</span><span class="dot">·</span><span>' + rtAbout(rtEst(q)) + ' left</span><span class="dot">·</span><span><b id="rtclock">' + rtClock(s.ms + rtOthers()) + '</b> <span id="rtstate">today</span></span>' +
      '<button class="rtbtn' + (rtMenu ? ' on' : '') + '" data-act="rtmenu" aria-label="Short session" aria-expanded="' + rtMenu + '"' + (s.goal ? ' hidden' : '') + '>' + RT_ICON + '</button></div>' +
      '<div id="rgoal" data-n="' + n + '">' + rtGoalHTML(s, n) + '</div>';
  }
  function rtRated(id, kind) {
    rtLastRate = null;
    if (route[0] !== 'revise') return false;
    rtTick(true);
    var s = rtLoad(); if (s.card !== id || rtOther(s)) return false;
    var d = Math.max(0, s.ms - s.cardAt), smp = null;
    s.cards++; s.card = null; rtSave(s);
    if (d >= RT_MIN) { smp = { id: 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), at: Date.now(), k: kind === 'n' ? 'n' : 'd', ms: Math.round(Math.min(d, RT_CAP)) }; S.pace.push(smp); if (S.pace.length > 60) S.pace = S.pace.slice(-60); }
    rtLastRate = { id: id, d: d, smp: smp };
    return !!smp;
  }
  function rtUndo(id) {
    var r = rtLastRate; rtLastRate = null;
    if (!r || r.id !== id) return;
    if (r.smp) { S.pace = S.pace.filter(function (x) { return x.id !== r.smp.id; }); S.dead[r.smp.id] = Date.now(); }
    var s = rtLoad(); s.cards = Math.max(0, s.cards - 1); s.card = id; s.cardAt = Math.max(0, s.ms - r.d); rtSave(s);
  }
  function rtActive() { rtInput = performance.now(); rtTouched = true; }
  ['pointerdown', 'keydown', 'touchstart', 'wheel'].forEach(function (ev) { document.addEventListener(ev, rtActive, { passive: true, capture: true }); });
  window.addEventListener('scroll', rtActive, { passive: true });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') { rtTick(true); rtLast = null; var hs = rtLoad(); if (hs.owner === rtTab) { hs.beat = 0; rtSave(hs); } rtPublish(false); if (sess) syncNow(); } else { rtLast = performance.now(); rtActive(); } });
  window.addEventListener('pagehide', function () { rtTick(true); rtLast = null; var ps = rtLoad(); if (ps.owner === rtTab) { ps.beat = 0; rtSave(ps); } rtPublish(false); });
  setInterval(function () { rtTick(false); }, 1000);

  /* ---------- shell ---------- */
  var route = [];
  function navLink(href, label, on, count, extra) {
    return '<a href="' + href + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '><span>' + label + '</span><span class="ns">' + (count ? '<span class="n">' + count + '</span>' : '') + (extra || '') + '</span></a>';
  }
  function sidebar(cur) {
    var q = queue(), curSys = cur.sys || '';
    var h = '<aside class="side" aria-label="Navigation"><a class="brand" href="#/">RMO Revision</a><nav class="nav">' +
      navLink('#/', 'Today', cur.page === 'home', 0, newCaseList().length ? '<span class="n nc">' + newCaseList().length + '</span>' : '') +
      navLink('#/revise', 'Revise', cur.page === 'revise', q.all.length) +
      '<button type="button" class="navfocus" data-focus="full"><span>Focus</span><span class="ns fl" data-focus-label></span></button>' + '</nav><nav class="nav sys" aria-label="Systems">';
    SYS.forEach(function (s) {
      var open = s.id === curSys, tps = TOP.filter(function (t) { return t.system === s.id; });
      var d = tps.reduce(function (a, t) { return a + topicDueCount(t.id); }, 0);
      h += '<a href="#/s/' + s.id + '" data-sys="' + s.id + '" class="grp' + (open && cur.page === 'system' ? ' on' : '') + '"><span>' + esc(s.name) + '</span><span class="ns">' + (d ? '<span class="n">' + d + '</span>' : '') + '</span></a>';
      if (open) h += tps.map(function (t) { var c = topicDueCount(t.id); return '<a href="#/t/' + t.id + '" class="sub' + (cur.topic === t.id ? ' on' : '') + '"><span>' + esc(t.name) + '</span>' + (c ? '<span class="n">' + c + '</span>' : '') + '</a>'; }).join('');
    });
    return h + '</nav><a class="foot" href="#/settings">Settings</a></aside>';
  }
  var IC = {
    today: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2.5-6 4 12 2.5-6h5"/></svg>',
    topics: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h14M5 18h9"/></svg>',
    revise: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="7" width="13" height="12" rx="2"/><path d="M8 4h10a2 2 0 0 1 2 2v10"/></svg>',
    focus: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.2 1.6M9.5 3h5"/></svg>'
  };
  function tabbar(cur) {
    var n = queue().all.length;
    function tab(href, ic, label, on, c, nw) { return '<a href="' + href + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '><span class="ti">' + IC[ic] + (c ? '<span class="n">' + c + '</span>' : '') + (nw ? '<span class="n nc">' + nw + '</span>' : '') + '</span><span class="tl">' + label + '</span></a>'; }
    return '<nav class="tabs" aria-label="Sections">' + tab('#/', 'today', 'Today', cur.page === 'home', 0, newCaseList().length) + tab('#/topics', 'topics', 'Topics', cur.page === 'topics' || cur.page === 'system' || cur.page === 'topic') + tab('#/revise', 'revise', 'Revise', cur.page === 'revise', n) + '<button type="button" class="navfocus" data-focus="short"><span class="ti">' + IC.focus + '</span><span class="tl" data-focus-label>Focus</span></button></nav>';
  }
  function backIn(due) {
    var n = diff(due, today());
    return n <= 0 ? 'back today' : n === 1 ? 'back tomorrow' : n <= 14 ? 'back in ' + n + ' days' : 'back ' + nice(due);
  }
  function undoBar() {
    if (!undo || Date.now() - undo.at > 8000) return '';
    var btn = '<button class="undo-btn" data-act="undo">Undo</button>';
    if (undo.skip) return '<div class="undo" role="status"><span>Removed from Revise</span>' + btn + '</div>';
    var it = S.items[undo.id], hw = normHow(undo.how), got = hw === 'good' || hw === 'easy';
    return '<div class="undo" role="status"><span><b class="' + (got ? 'u-got' : 'u-shaky') + '">' + ({ again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy' }[hw] || hw) + '</b>' + (it ? ' \u00B7 ' + backIn(it.due) : '') + '</span>' + btn + '</div>';
  }
  function shell(inner, cur) { return '<div class="app">' + sidebar(cur) + '<main class="main pg-' + (cur.page || 'x') + '"' + (cur.sys ? ' data-sys="' + cur.sys + '"' : '') + ' id="main">' + inner + '</main>' + tabbar(cur) + undoBar() + '</div>'; }
  function row(href, title, right, sub, sys) {
    return '<li' + (sys ? ' data-sys="' + sys + '"' : '') + '><a class="row" href="' + href + '"><span class="t"><span>' + title + '</span>' + (sub ? '<small>' + sub + '</small>' : '') + '</span>' + (right || '') + '</a></li>';
  }

  /* ---------- views ---------- */
  function home() {
    var q = queue(), studied = 0;
    TOP.forEach(function (t) { var s = S.topics[t.id] || {}; if (s.studied) studied++; });
    var h = '<header class="head"><h1>Today</h1><p class="meta">' + esc(longToday()) + '</p><p class="meta small"><span id="syncline">' + syncLine() + '</span> <a class="phone-only-i" href="#/settings">Settings</a></p></header>';
    var mins = Math.max(1, Math.round(rtEst(q) / 60000));
    var side = '<section class="vitals" aria-label="Today\'s revision"><div class="vrow">' +
      '<div class="vt"><span class="vl">Due</span><b class="vn' + (q.due.length ? ' v-due' : '') + '">' + q.due.length + '</b></div>' +
      '<div class="vt"><span class="vl">New</span><b class="vn v-new">' + q.fresh.length + '</b></div>' +
      '<div class="vt"><span class="vl">About</span><b class="vn v-time">' + (q.all.length ? mins : 0) + '<i>min</i></b></div></div>' +
      (q.all.length ? '<a class="btn primary big" href="#/revise">Start revising</a>' : '<p class="vnone">Nothing to recall. Open a topic you have studied and press "Studied today".</p>') + '</section>' +
      '<p class="meta small">' + studied + ' of ' + TOP.length + ' topics studied.</p>' + (window.RMOFocus ? window.RMOFocus.line() : '');
    var mainc = newCasesHTML();
    if (q.all.length) {
      var by = {}, order = [];
      q.all.forEach(function (x) { if (!by[x.tid]) { by[x.tid] = { due: 0, fresh: 0 }; order.push(x.tid); } if (itState(x.it.id).k === 'due') by[x.tid].due++; else by[x.tid].fresh++; });
      mainc += '<section><h2>In today\'s queue</h2><ul class="list">' + order.map(function (tid) {
        var c = by[tid]; return row('#/t/' + tid, esc(byId(tid).name), '<span class="tags">' + (c.due ? '<span class="tag due">' + c.due + ' due</span>' : '') + (c.fresh ? '<span class="tag">' + c.fresh + ' new</span>' : '') + '</span>');
      }).join('') + '</ul></section>';
    }
    if (!mainc) mainc = '<section><h2>No new cases today</h2><p class="meta">New on-call cases appear here after each refresh. Every topic\'s cases are under its Study tools.</p></section>';
    h += '<div class="today"><aside class="tside">' + side + '</aside><div class="tmain">' + mainc + '</div></div>';
    h += '<h2 class="phone-only">Systems</h2><ul class="list phone-only">' + SYS.map(function (s) { return row('#/s/' + s.id, esc(s.name), '<span class="tag">' + TOP.filter(function (t) { return t.system === s.id; }).length + '</span>', '', s.id); }).join('') + '</ul>';
    h += '<p class="fine">Study aid, not a clinical decision tool. Check every dose against eTG and your hospital guideline.</p>';
    return shell(h, { page: 'home' });
  }
  function topicsPage() {
    var h = '<header class="head"><h1>Topics</h1><p class="meta">' + TOP.length + ' topics in ' + SYS.length + ' systems</p></header><ul class="list cols">' +
      SYS.map(function (s) { var n = TOP.filter(function (t) { return t.system === s.id; }).length; return row('#/s/' + s.id, esc(s.name), '<span class="tag">' + n + '</span>', '', s.id); }).join('') + '</ul>';
    return shell(h, { page: 'topics' });
  }
  function system(id) {
    var s = sysById(id); if (!s) return notFound();
    var list = TOP.filter(function (t) { return t.system === id; });
    var h = '<a class="back" href="#/topics">Topics</a><header class="head"><h1>' + esc(s.name) + '</h1><p class="meta">' + plural(list.length, 'topic', 'topics') + '</p></header><ul class="list cols">' + list.map(function (t) {
      var st = S.topics[t.id] || {}, its = topicItems(t.id), d = topicDueCount(t.id), rated = its.filter(function (x) { return itState(x.it.id).k !== 'new'; }).length;
      var sub = [];
      if (its.length) sub.push(rated + ' of ' + its.length + ' rated');
      if (t.tools.length) sub.push(plural(t.tools.length, 'tool', 'tools'));
      var right = d ? '<span class="tag due">' + d + ' due</span>' : st.studied ? '<span class="tag good">Studied</span>' : '';
      return row('#/t/' + t.id, esc(t.name), right, sub.join(', '), id);
    }).join('') + '</ul>';
    return shell(h, { page: 'system', sys: id });
  }
  function noteOf(id) { var n = S.notes[id]; return n && n.text ? n.text : ''; }
  function setNote(id, text) { text = (text || '').trim(); if (text === noteOf(id)) return; S.notes[id] = { text: text, t: Date.now() }; }
  /* Extra context the user adds to a card (ctx) and a request to turn a card into a case (caseReq). Both sync.
     The refresh (CASES.md) folds ctx into the card's answer and sets cx on the card; it writes a case with fromCard on it for each request. */
  var ctxOpen = {};
  function ctxOf(id) { var n = S.ctx[id]; return n && n.text ? n.text : ''; }
  function setCtx(id, text) { text = (text || '').trim(); if (text === ctxOf(id)) return; S.ctx[id] = { text: text, t: Date.now() }; }
  function cardItem(id) { var f = null; Object.keys(RC).forEach(function (tid) { (RC[tid].items || []).forEach(function (it) { if (it.id === id) f = it; }); }); return f; }
  function caseMadeFor(id) {
    var m = null; Object.keys(caseData || {}).forEach(function (f) { (caseData[f] || []).forEach(function (c) { if (c.fc === id) m = { f: f, title: c.title }; }); });
    return m;
  }
  function ctxBlock(id, tid) {
    var txt = ctxOf(id), it = cardItem(id), wait = txt && S.ctx[id].t > ((it && it.cx) || 0), op = !!ctxOpen[id];
    var made = caseMadeFor(id), req = S.caseReq[id] && S.caseReq[id].on;
    var h = '<div class="ctxblock">';
    if (txt && !op) h += '<p class="mynote ctxline"><b>Context:</b> ' + esc(txt) + (wait ? ' <small>(Claude will fold this into the answer at the next refresh)</small>' : '') + '</p>';
    h += '<div class="ctxbtns"><button class="link" data-ctxt="' + id + '" aria-expanded="' + op + '">' + (op ? 'Close context' : txt ? 'Edit context' : 'Add context') + '</button>';
    if (made) h += '<span class="meta">Case made: ' + esc(made.title) + '</span>';
    else if (req) h += '<span class="meta">Queued for a case</span><button class="link" data-mkcase="' + id + '" data-tp="' + tid + '">Undo</button>';
    else h += '<button class="link" data-mkcase="' + id + '" data-tp="' + tid + '">Make this a case</button>';
    h += '<button class="link" data-skiprev="' + id + '">' + (skipped(id) ? 'Put back in Revise' : 'Remove from Revise') + '</button>';
    h += '</div>';
    if (op) h += '<label class="note"><span>Extra context that makes the answer make sense</span><textarea rows="3" data-ctx="' + id + '" placeholder="Why it works this way, an example, a link to something you already know. Claude will use it to rewrite the answer.">' + esc(txt) + '</textarea></label>';
    return h + '</div>';
  }
  function noteLine(id) { var n = noteOf(id); if (!n) return ''; return '<span class="rownote"><b>Your note:</b> ' + esc(n.length > 110 ? n.slice(0, 110) + '...' : n) + '</span>'; }
  function noteBox(id, label, keys) {
    return '<label class="note"><span>' + label + (keys ? ' ' + KH('N') : '') + '</span><textarea rows="2" data-note="' + id + '" placeholder="What did you miss? Next time it shows before the answer.">' + esc(noteOf(id)) + '</textarea></label>';
  }
  var cardFrom = null;
  function processedHighlights() {
    if (cardFrom) return cardFrom; cardFrom = {};
    Object.keys(RC).forEach(function (tid) { (RC[tid].items || []).concat(RC[tid].sg || []).forEach(function (it) { (it.from || []).forEach(function (h) { cardFrom[h] = it.id; }); }); });
    return cardFrom;
  }
  function pendingHighlights(tid) { var done = processedHighlights(); return S.highlights.filter(function (h) { return h.topic === tid && !done[h.id]; }); }
  function itemRow(x) {
    var it = x.it, st = itState(it.id), op = !!openSet[it.id];
    var h = '<li class="item' + (op ? ' open' : '') + '"><button class="row" data-rv="' + it.id + '" aria-expanded="' + op + '"><span class="t"><span>' + esc(it.t) + '</span>' + (function () { var bits = []; if (it.p === 1) bits.push('<b class="must">Must know</b>'); if (x.mine) bits.push('added by you'); if (it.from) bits.push('from your highlight'); if (noteOf(it.id)) bits.push('has your note'); return bits.length ? '<small>' + bits.join(', ') + '</small>' : ''; })() + '</span>' + (skipped(it.id) ? '<span class="tag">Not in Revise</span>' : tagFor(st, it.id)) + '</button>';
    if (op) h += '<div class="ans">' + (noteOf(it.id) ? '<p class="mynote"><b>Your note:</b> ' + esc(noteOf(it.id)) + '</p>' : '') + '<div class="kbody">' + (it.k ? kfmt(it.k) : 'No key point written for this item.') + '</div><p class="src">' + SRC[it.s || 'p'] + '</p>' + noteBox(it.id, 'Your note') + ctxBlock(it.id, x.tid) + rateButtons(it.id) + (x.mine ? '<button class="link danger" data-delitem="' + it.id + '" data-tp="' + x.tid + '">Delete this item</button>' : '') + '</div>';
    return h + '</li>';
  }
  function topic(id) {
    var t = byId(id); if (!t) return notFound();
    var s = sysById(t.system), st = ts(t.id), dy = D.days[t.day] || {}, its = topicItems(t.id);
    var rated = its.filter(function (x) { return itState(x.it.id).k !== 'new'; }).length;
    var h = '<a class="back" href="#/s/' + t.system + '">' + esc(s.name) + '</a><header class="head"><h1>' + esc(t.name) + '</h1><p class="meta">' + (its.length ? rated + ' of ' + its.length + ' recall items rated' : '') + '</p></header>';
    h += '<div class="tgrid">';
    if (t.tools.length) h += '<section class="tg-tools"><h2>Study tools</h2><div class="tools">' + t.tools.map(function (x, i) { return '<a href="#/tool/' + t.id + '/' + i + '"><span class="tr"><b>' + esc(x.label) + '</b>' + toolBadge(t, x) + '</span><span>' + esc(x.desc) + '</span></a>'; }).join('') + '</div></section>';
    h += '<div class="tg-main">';

    h += '<h2>Recall checklist</h2>';
    if (its.length) h += st.studied ? '<p class="meta">In Revise since ' + nice(st.studied) + '. <button class="link" data-act="unstudy">Take out of Revise</button></p>' : '<p class="studyrow"><button class="btn primary" data-act="studied">Studied today</button><span class="meta">Puts these cards into Revise.</span></p>';
    if (its.length) {
      var gs = [];
      its.forEach(function (x) { var g = x.it.g || 'Y'; if (!gs.length || gs[gs.length - 1].g !== g) gs.push({ g: g, xs: [] }); gs[gs.length - 1].xs.push(x); });
      h += gs.map(function (grp) { return '<h3 class="sect">' + SECT[grp.g] + '</h3><ul class="list">' + grp.xs.map(itemRow).join('') + '</ul>'; }).join('');
    } else h += '<p class="meta">No checklist for this topic yet. Ask Claude in chat to add cards.</p>';
    var added = S.added[t.id] || [], sg = (RC[t.id] || { sg: [] }).sg.filter(function (x) { return added.indexOf(x.id) < 0; });
    if (sg.length) h += '<h3>Suggested subtopics</h3><ul class="list">' + sg.map(function (x) { return '<li><div class="row static"><span class="t"><span>' + esc(x.t) + '</span><small>' + SECT[x.g || 'Y'] + ': ' + esc(x.k) + '</small></span><button class="btn small" data-addsg="' + x.id + '" data-tp="' + t.id + '">Add</button></div></li>'; }).join('') + '</ul>';
    var hl = pendingHighlights(t.id);
    if (hl.length) h += '<h3>Your highlights, waiting for Claude</h3><p class="meta">Claude turns these into recall cards in the right section when you ask in chat, or in the every-other-day refresh. Pasted notes are checked against Australian sources first.</p><ul class="list">' + hl.map(function (x) { var shown = x.tool === 'paste' && x.text.length > 240 ? x.text.slice(0, 240) + '...' : x.text; return '<li><div class="row static"><span class="t"><span>' + esc(shown) + '</span><small>' + esc(x.toolLabel || '') + (x.where ? ', ' + esc(x.where) : '') + ', ' + nice(iso(new Date(x.at))) + '</small></span><button class="link danger" data-delhl="' + x.id + '">Delete</button></div></li>'; }).join('') + '</ul>';

    h += '</div><section class="tg-more"><h2>Read</h2><ul class="list">';
    if (t.url) h += '<li><a class="row" href="' + esc(t.url) + '" target="_blank" rel="noopener"><span class="t"><span>Point of Care Medicine template</span><small>Opens in a new tab</small></span></a></li>';
    if (t.rch) h += '<li><a class="row" href="https://www.rch.org.au/clinicalguide/" target="_blank" rel="noopener"><span class="t"><span>Royal Children\'s Hospital guidelines</span><small>Opens in a new tab</small></span></a></li>';
    if (t.pages) h += '<li><div class="row static"><span class="t"><span>Rosen and Barkin</span><small>PDF pages ' + esc(t.pages) + '</small></span></div></li>';
    h += '</ul>';
    if (dy.done || dy.dont) h += '<div class="plan">' + (dy.done ? '<p><b>Done when</b> ' + esc(dy.done) + '</p>' : '') + (dy.dont ? '<p><b>Skip</b> ' + esc(dy.dont.replace(/^[Dd]on't /, '')) + '</p>' : '') + '</div>';

    h += '<details class="fold"><summary>Paste a note for Claude</summary><p class="meta">Paste an answer from Gemini, a book or a senior. Claude checks it against Australian sources and turns it into cards at the next refresh.</p><form id="pasteform" class="form"><label><span>What you are pasting</span><textarea id="pastetext" rows="5" maxlength="8000" placeholder="Paste the explanation here"></textarea></label><div class="inline"><label><span>Where it came from</span><input type="text" id="pastesrc" placeholder="Gemini, Harrison, my registrar" autocomplete="off"></label><button class="btn primary" type="submit">Save for Claude</button></div></form></details></section></div>';
    return shell(h, { page: 'topic', sys: t.system, topic: t.id });
  }
  var later = [];   // cards sent to the back of today's queue, this page load only; they stay unrated
  /* Study one level at a time: all, weak, learning, young, mature or new. Kept on this device only. */
  var revLevel = (function () { try { return localStorage.getItem('rmo-revlevel') || 'all'; } catch (e) { return 'all'; } })();
  function levelBar(all) {
    var c = { all: all.length }; Object.keys(LV).forEach(function (k) { c[k] = 0; });
    all.forEach(function (x) { c[levelOf(x.it.id)]++; });
    var order = ['all', 'weak', 'learning', 'young', 'mature', 'new'];
    return '<div class="lvbar" role="group" aria-label="Study one level">' + order.map(function (k) {
      if (k !== 'all' && !c[k] && revLevel !== k) return '';
      return '<button type="button" class="chip lv-' + k + (revLevel === k ? ' on' : '') + '" data-lvl="' + k + '" aria-pressed="' + (revLevel === k) + '">' + (k === 'all' ? 'All' : LV[k]) + ' <b>' + c[k] + '</b></button>';
    }).join('') + '</div>';
  }
  function revise() {
    var q = queue(), every = q.all.slice();
    if (revLevel !== 'all') { q.all = q.all.filter(function (x) { return levelOf(x.it.id) === revLevel; }); q.due = q.due.filter(function (x) { return levelOf(x.it.id) === revLevel; }); q.fresh = q.fresh.filter(function (x) { return levelOf(x.it.id) === revLevel; }); }
    if (later.length) { var lo = {}; later.forEach(function (id, i) { lo[id] = i + 1; }); var ix = {}; q.all.forEach(function (x, i) { ix[x.it.id] = i; }); q.all.sort(function (a, b) { return (lo[a.it.id] || 0) - (lo[b.it.id] || 0) || ix[a.it.id] - ix[b.it.id]; }); }
    var h = '<header class="head"><h1>Revise</h1>' + (q.all.length ? rtBlock(q) : '<p class="meta">' + (every.length ? 'Nothing at this level right now' : 'All caught up') + '</p>') + '</header>' + (every.length ? levelBar(every) : '');
    if (!q.all.length && every.length) { return shell(h + '<p class="meta">Pick another level above, or All to see everything that is due.</p>', { page: 'revise' }); }
    if (!q.all.length) {
      h += '<p class="meta">Nothing to recall right now. Items you rate come back on their date. To add a topic, open it and press "Studied today".</p><p><a class="btn" href="#/topics">Browse topics</a></p>';
      return shell(h, { page: 'revise' });
    }
    var x = q.all[0], t = byId(x.tid), st = itState(x.it.id);
    rtShown = x.it.id;
    h += '<section class="flash" aria-live="polite"><p class="ctx"><a href="#/t/' + x.tid + '">' + esc(t.name) + '</a><span>' + SECT[x.it.g || 'Y'] + (x.it.p === 1 ? ', must know' : '') + (st.k === 'new' ? ', first time' : '') + '</span></p><h2>' + esc(x.it.t) + '</h2>';
    if (noteOf(x.it.id)) h += '<p class="mynote"><b>Your note from last time:</b> ' + esc(noteOf(x.it.id)) + '</p>';
    if (!revealed) h += '<p class="meta">Say the answer to yourself first.</p><button class="btn primary big" data-act="reveal">Show answer' + KH('Space') + '</button><p class="ctxbtns">' + (q.all.length > 1 ? '<button class="link" data-later="' + x.it.id + '">Bring back later' + KH('L') + '</button>' : '') + '<button class="link" data-skiprev="' + x.it.id + '">Remove from Revise</button></p>';
    else h += '<div class="answer kbody">' + (x.it.k ? kfmt(x.it.k) : 'No key point written for this item.') + '</div><p class="src">' + SRC[x.it.s || 'p'] + '</p>' + noteBox(x.it.id, 'What did you miss this time? (optional)', true) + ctxBlock(x.it.id, x.tid) + rateButtons(x.it.id, true) + (q.all.length > 1 ? '<p class="ctxbtns"><button class="link" data-later="' + x.it.id + '">Not sure yet: bring back at the end' + KH('L') + '</button></p>' : '');
    h += '</section>';
    return shell(h, { page: 'revise' });
  }
  function tool(id, i, cs, fromToday) {
    var t = byId(id); if (!t || !t.tools[i]) return notFound();
    var n = pendingHighlights(t.id).length;
    return '<div class="toolbar">' + (fromToday ? '<a class="back" href="#/">Today</a>' : '<a class="back" href="#/t/' + t.id + '">' + esc(t.name) + '</a>') + '<b>' + esc(t.tools[i].label) + '</b><span class="hlcount" id="hlcount">' + (n ? n + ' saved' : 'Select text to save it') + '</span><button type="button" class="btn small navfocus" data-focus="tool"><span data-focus-label>Focus</span></button><button class="btn small" id="hlbtn" data-act="highlight" disabled>Save highlight</button></div><iframe class="frame" title="' + esc(t.tools[i].label) + '" src="tools/' + t.tools[i].file + (cs ? '?case=' + encodeURIComponent(cs) + (fromToday ? '&run=today' : '') : '') + '"></iframe>';
  }
  var kcode = '', kmsg = '';
  function settings() {
    var h = '<header class="head"><h1>Settings</h1></header>';
    var lk = window.RMOLook ? window.RMOLook.get() : 'auto';
    h += '<h2>Look</h2><p class="meta">Applies to the app, the cases and the study kits on this device.</p><div class="looks" role="radiogroup" aria-label="Look">' +
      [['auto', 'Match device', 'Chart paper by day, Night ward when your device is dark'], ['night', 'Night ward', 'Dark. Colour only where it means something'], ['paper', 'Chart paper', 'Light, like an observation chart'], ['classic', 'Classic blue', 'The earlier blue look']].map(function (x) {
        return '<button type="button" class="look lk-' + x[0] + (lk === x[0] ? ' on' : '') + '" role="radio" aria-checked="' + (lk === x[0]) + '" data-look-set="' + x[0] + '"><span class="sw" aria-hidden="true"><i></i><i></i><i></i></span><b>' + x[1] + '</b><small>' + x[2] + '</small></button>';
      }).join('') + '</div>';
    h += '<h2>Sync between devices</h2>';
    if (sess) {
      h += '<p class="meta" id="syncline">' + syncLine() + '</p><p class="meta">Your ratings, notes, highlights, case results and topic progress are kept the same on every device where you sign in with this account. Changes made offline sync when you reconnect.</p><p class="btns"><button class="btn primary" data-act="syncnow">Sync now</button><button class="btn" data-act="signout">Sign out on this device</button></p>';
    } else {
      h += '<p class="meta">Sign in on each device with the same account. Use the email and password you already use for your other apps on this Supabase account (Stride, Margin).</p>' + (syncState.msg ? '<p class="meta" style="color:var(--due)">' + esc(syncState.msg) + '</p>' : '') +
        '<form id="signin" class="form"><label><span>Email</span><input type="email" id="si-email" autocomplete="username" required></label><label><span>Password</span><input type="password" id="si-pass" autocomplete="current-password"></label><div class="btns"><button class="btn primary" type="submit">Sign in and sync</button><button class="btn" type="button" data-act="sendcode">Email me a code instead</button></div></form>' +
        '<div id="codebox" hidden><p class="meta">Check your email. Type the code here, or open the link on this device.</p><form id="codeform" class="form"><label><span>Code from the email</span><input type="text" id="si-code" inputmode="numeric" autocomplete="one-time-code"></label><div><button class="btn primary" type="submit">Sign in</button></div></form></div><p class="meta" id="simsg"></p>';
    }
    if (sess) h += '<h2>Kindle</h2><p class="meta">Revise on a jailbroken Kindle with KOReader. Make a one-time code and type it on the Kindle. The Kindle can read your card schedule and add Again, Hard, Good or Easy ratings. It cannot see your notes, highlights or account.</p>' +
      (kcode ? '<p class="kcode" style="font:700 26px/1.3 ui-monospace,Menlo,monospace;letter-spacing:.08em">' + kcode + '</p><p class="meta">Type this on the Kindle now. It is shown once and not saved here.</p>' : '') + (kmsg ? '<p class="meta">' + esc(kmsg) + '</p>' : '') +
      '<p class="btns"><button class="btn" data-act="kmake">Make a Kindle code</button><button class="btn" data-act="kunlink">Unlink all Kindles</button></p>';
    h += '<h2>Backup file</h2><p class="meta">A copy you keep yourself. Importing merges it with what is on this device.</p><p class="btns"><button class="btn" data-act="export">Export backup</button><label class="btn">Import backup<input type="file" id="imp" accept="application/json" hidden></label></p><p class="meta" id="msg"></p>' +
      '<h2>Reset</h2><p class="meta">Deletes all progress, ratings and notes' + (sess ? ' on every synced device' : ' on this device') + '.</p><p><button class="btn danger" data-act="reset">Reset everything</button></p>';
    return shell(h, { page: 'settings' });
  }
  function notFound() { return shell('<header class="head"><h1>Page not found</h1></header><p><a class="btn" href="#/">Go to Today</a></p>', { page: '' }); }

  /* ---------- router ---------- */
  var app = document.getElementById('app'), keepScroll = false;
  function render() {
    var r = location.hash.replace(/^#\/?/, '').split('/'), h, y = 0;
    if (keepScroll) y = window.scrollY;
    route = r; app.className = ''; rtShown = null; if (r[0] !== 'settings') { kcode = ''; kmsg = ''; }
    if (r[0] === 's') h = system(r[1]);
    else if (r[0] === 't') h = topic(r[1]);
    else if (r[0] === 'tool') { h = tool(r[1], +r[2], r[3], r[4] === 'today'); app.className = 'tool'; }
    else if (r[0] === 'topics') h = topicsPage();
    else if (r[0] === 'revise') h = revise();
    else if (r[0] === 'settings') h = settings();
    else h = home();
    var sideY = 0, sd = document.querySelector('.side'); if (sd) sideY = sd.scrollTop;
    app.innerHTML = h;
    var sd2 = document.querySelector('.side'); if (sd2) sd2.scrollTop = sideY;
    window.scrollTo(0, keepScroll ? y : 0);
    keepScroll = false;
    wire();
    if (window.RMOFocus) window.RMOFocus.paint();
    rtTick(false);
  }
  window.addEventListener('hashchange', function () { revealed = false;  render(); });
  function topicId() { return route[1]; }

  var lastSel = null;
  function headingBefore(doc, node) {
    var hs = doc.querySelectorAll('h1, h2, h3'), best = null;
    for (var i = 0; i < hs.length; i++) { if (hs[i].compareDocumentPosition(node) & 4 || hs[i].contains(node)) best = hs[i]; }
    return best ? best.textContent.trim().slice(0, 80) : '';
  }
  function wireTool() {
    var f = document.querySelector('iframe.frame'); if (!f) return;
    function attach() {
      var d; try { d = f.contentDocument; } catch (e) { return; } if (!d || d.URL === 'about:blank') return;
      var tl0 = byId(route[1]) && byId(route[1]).tools[+route[2]];
      if (tl0 && !/_shift\.html$|_ward\.html$/.test(tl0.file)) {
        var kk = route[1] + ':' + tl0.file, doneKit = function () { S.kitdone = S.kitdone || {}; if (S.kitdone[kk]) return; S.kitdone[kk] = Date.now(); save(); };
        var stepKit = false; try { stepKit = !!f.contentWindow.KIT; } catch (e) {}
        if (stepKit) {
          if (window.__kitMsg) window.removeEventListener('message', window.__kitMsg);
          window.__kitMsg = function (ev) { if (ev.source === f.contentWindow && ev.data && ev.data.rmoKitEnd) doneKit(); };
          window.addEventListener('message', window.__kitMsg);
        } else if (!(S.kitdone || {})[kk]) {
          d.addEventListener('scroll', function (ev) { var el = ev.target && ev.target.nodeType === 1 ? ev.target : d.documentElement; if (el.scrollHeight > el.clientHeight + 40 && el.scrollTop + el.clientHeight >= el.scrollHeight - 48) doneKit(); }, true);
          setTimeout(function () { try { var e0 = d.documentElement; if (e0.scrollHeight <= e0.clientHeight + 40) doneKit(); } catch (e) {} }, 30000); // a short kit that never scrolls: counts after 30 seconds
        }
      }
      function hookSel(doc, win, outerEl) {
        doc.addEventListener('selectionchange', function () {
          var s = win.getSelection(), txt = s ? String(s).replace(/\s+/g, ' ').trim() : '';
          var b = document.getElementById('hlbtn'); if (!b) return;
          if (txt.length >= 3) {
            var r = s.getRangeAt(0), where = headingBefore(doc, r.startContainer);
            if (outerEl) { var step = headingBefore(d, outerEl); where = step && where ? step + ' > ' + where : (where || step); }
            lastSel = { text: txt.slice(0, 600), where: where, range: r.cloneRange() }; b.disabled = false;
          } else b.disabled = !lastSel;
        });
      }
      hookSel(d, f.contentWindow, null);
      /* pictures shown inside a study kit step are frames of their own: hook each one too */
      function hookEmbeds() {
        Array.prototype.forEach.call(d.querySelectorAll('iframe.embf'), function (ef) {
          if (ef.__hl) return; ef.__hl = 1;
          var go = function () { try { hookSel(ef.contentDocument, ef.contentWindow, ef); } catch (e) {} };
          ef.addEventListener('load', go); try { if (ef.contentDocument && ef.contentDocument.readyState === 'complete' && ef.contentDocument.URL !== 'about:blank') go(); } catch (e) {}
        });
      }
      hookEmbeds(); try { new MutationObserver(hookEmbeds).observe(d.body, { childList: true, subtree: true }); } catch (e) {}
    }
    f.addEventListener('load', attach); if (f.contentDocument && f.contentDocument.readyState === 'complete') attach();
  }
  function saveHighlight() {
    if (!lastSel) return;
    var tid = route[1], t = byId(tid), tl = t && t.tools[+route[2]];
    S.highlights.push({ id: 'h' + Date.now(), topic: tid, tool: tl ? tl.file.replace('.html', '') : '', toolLabel: tl ? tl.label : '', where: lastSel.where, text: lastSel.text, at: Date.now() });
    try { var m = lastSel.range.startContainer.ownerDocument.createElement('mark'); m.style.background = '#FFE58F'; lastSel.range.surroundContents(m); } catch (e) { /* selection crosses elements: saved without the yellow mark */ }
    try { lastSel.range.startContainer.ownerDocument.defaultView.getSelection().removeAllRanges(); } catch (e) {}
    lastSel = null; save();
    var b = document.getElementById('hlbtn'); if (b) b.disabled = true;
    var c = document.getElementById('hlcount'); if (c) c.textContent = pendingHighlights(tid).length + ' saved. Claude turns them into cards';
  }
  function wire() {
    wireTool();
    var pf = document.getElementById('pasteform');
    if (pf) pf.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = document.getElementById('pastetext').value.trim(); if (!v) return;
      var src = document.getElementById('pastesrc').value.trim() || 'Pasted note';
      S.highlights.push({ id: 'h' + Date.now(), topic: topicId(), tool: 'paste', toolLabel: src, where: 'Pasted doubt', text: v, at: Date.now() }); save(); keepScroll = true; render();
    });
    var itf = document.getElementById('itform');
    if (itf) itf.addEventListener('submit', function (e) {
      e.preventDefault();
      var tt = document.getElementById('ittitle').value.trim(); if (!tt) return;
      var tid = topicId(); (S.custom[tid] = S.custom[tid] || []).push({ id: 'u' + Date.now(), p: document.getElementById('itmust').checked ? 1 : 2, g: document.getElementById('itsec').value, s: 'p', t: tt, k: document.getElementById('itkey').value.trim() });
      save(); keepScroll = true; render();
    });
    var si = document.getElementById('signin');
    if (si) si.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = document.getElementById('si-email').value.trim(), pw = document.getElementById('si-pass').value, m = document.getElementById('simsg');
      if (!pw) { m.textContent = 'Enter your password, or use "Email me a code instead".'; return; }
      m.textContent = 'Signing in…';
      api('/auth/v1/token?grant_type=password', { method: 'POST', body: { email: em, password: pw } }).then(function (d) { keepSess(fromAuth(d)); syncState.msg = ''; render(); return syncNow(); })
        .catch(function (err) { m.textContent = err.status === 400 ? 'Email or password is wrong. Try again or use "Email me a code instead".' : 'Could not sign in: ' + err.message; });
    });
    var cf = document.getElementById('codeform');
    if (cf) cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var em = document.getElementById('si-email').value.trim(), code = document.getElementById('si-code').value.replace(/\s/g, ''), m = document.getElementById('simsg');
      m.textContent = 'Checking the code…';
      api('/auth/v1/verify', { method: 'POST', body: { type: 'email', email: em, token: code } }).then(function (d) { keepSess(fromAuth(d)); syncState.msg = ''; render(); return syncNow(); })
        .catch(function (err) { m.textContent = 'That code did not work (' + err.message + '). Codes expire after a while; ask for a new one.'; });
    });
    var imp = document.getElementById('imp');
    if (imp) imp.addEventListener('change', function () {
      var file = imp.files[0]; if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        try { var o = JSON.parse(rd.result); if (!o.topics || !o.errors) throw 0; S = merge(S, o); fix(); save(); document.getElementById('msg').textContent = 'Backup imported and merged with this device.'; }
        catch (e) { document.getElementById('msg').textContent = 'That file is not an RMO Revision backup. Choose the .json file you exported.'; }
      };
      rd.readAsText(file);
    });
  }

  var lockUntil = 0;
  app.addEventListener('click', function (e) {
    var el;
    if (Date.now() < lockUntil && e.target.closest('[data-rate],[data-rv],[data-act=reveal]')) { e.preventDefault(); return; }
    if ((el = e.target.closest('[data-ctxt]'))) { var cid = el.getAttribute('data-ctxt'), cbx = document.querySelector('[data-ctx="' + cid + '"]'); if (cbx) setCtx(cid, cbx.value); ctxOpen[cid] = !ctxOpen[cid]; save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-later]'))) { var lid = el.getAttribute('data-later'), nb2 = document.querySelector('[data-note="' + lid + '"]'); if (nb2) setNote(lid, nb2.value); later = later.filter(function (i) { return i !== lid; }); later.push(lid); revealed = false; keepScroll = false; save(); render(); return; }
    if ((el = e.target.closest('[data-skiprev]'))) { var sid = el.getAttribute('data-skiprev'), son = !skipped(sid); S.skipRev[sid] = { on: son, t: Date.now() }; if (son) { undo = { id: sid, skip: true, at: Date.now() }; setTimeout(function () { var u = document.querySelector('.undo'); if (u && undo && undo.skip && Date.now() - undo.at >= 8000) u.remove(); }, 8100); } revealed = false; save(); keepScroll = route[0] !== 'revise'; render(); return; }
    if ((el = e.target.closest('[data-mkcase]'))) { var mid = el.getAttribute('data-mkcase'), cur = S.caseReq[mid] && S.caseReq[mid].on; S.caseReq[mid] = { on: !cur, t: Date.now(), topic: el.getAttribute('data-tp') || '' }; var cb2 = document.querySelector('[data-ctx="' + mid + '"]'); if (cb2) setCtx(mid, cb2.value); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-rv]'))) { lockUntil = Date.now() + 350; var rid = el.getAttribute('data-rv'); openSet[rid] = !openSet[rid]; keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-lvl]'))) { revLevel = el.getAttribute('data-lvl'); try { localStorage.setItem('rmo-revlevel', revLevel); } catch (er) {} revealed = false; keepScroll = false; render(); return; }
    if ((el = e.target.closest('[data-rate]'))) { var iid = el.getAttribute('data-it'); lockUntil = Date.now() + 700; var nb = document.querySelector('[data-note="' + iid + '"]'); if (nb) setNote(iid, nb.value); var cb = document.querySelector('[data-ctx="' + iid + '"]'); if (cb) setCtx(iid, cb.value); var wasNew = itState(iid).k === 'new'; if (!rate(iid, el.getAttribute('data-rate'))) { render(); return; } rtRated(iid, wasNew ? 'n' : 'd'); rtPublish(false); save(); setTimeout(function () { if (undo && Date.now() - undo.at >= 8000) { var u = document.querySelector('.undo'); if (u) u.remove(); } }, 8100); delete openSet[iid]; revealed = false; keepScroll = route[0] !== 'revise'; render(); return; }
    if ((el = e.target.closest('[data-look-set]'))) { if (window.RMOLook) window.RMOLook.set(el.getAttribute('data-look-set')); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-skipcase]'))) { S.caseSkip = S.caseSkip || {}; S.caseSkip[el.getAttribute('data-skipcase')] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-addsg]'))) { var tp = el.getAttribute('data-tp'); (S.added[tp] = S.added[tp] || []).push(el.getAttribute('data-addsg')); S.addedAt[el.getAttribute('data-addsg')] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-delitem]'))) { var tq = el.getAttribute('data-tp'), did = el.getAttribute('data-delitem'); S.custom[tq] = (S.custom[tq] || []).filter(function (x) { return x.id !== did; }); delete S.items[did]; S.dead[did] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-delhl]'))) { var hid = el.getAttribute('data-delhl'); S.highlights = S.highlights.filter(function (x) { return x.id !== hid; }); S.dead[hid] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-del]'))) { var id = el.getAttribute('data-del'); S.errors = S.errors.filter(function (x) { return x.id !== id; }); S.dead[id] = Date.now(); save(); keepScroll = true; render(); return; }
    if (!(el = e.target.closest('[data-act]'))) return;
    var a = el.getAttribute('data-act'), t;
    if (a === 'syncnow') { syncNow(); return; }
    if (a === 'kmake') {
      var AL = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', raw = '', rnd = new Uint8Array(12); crypto.getRandomValues(rnd);
      for (var ki = 0; ki < 12; ki++) raw += AL[rnd[ki] % 32];
      kmsg = 'Making the code…'; kcode = ''; keepScroll = true; render();
      crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw)).then(function (buf) {
        var hex = Array.prototype.map.call(new Uint8Array(buf), function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
        return fresh().then(function () { return api('/rest/v1/rmo_kindle_links', { method: 'POST', auth: true, headers: { Prefer: 'return=minimal' }, body: { token_hash: hex, label: 'Kindle' } }); });
      }).then(function () { kcode = raw.slice(0, 4) + '-' + raw.slice(4, 8) + '-' + raw.slice(8); kmsg = ''; }).catch(function (e) { kcode = ''; kmsg = 'Could not make a code: ' + e.message; }).then(function () { keepScroll = true; render(); });
      return;
    }
    if (a === 'kunlink') {
      if (!window.confirm('Unlink every Kindle? Each one will need a new code.')) return;
      fresh().then(function () { return api('/rest/v1/rmo_kindle_links?user_id=eq.' + sess.uid, { method: 'DELETE', auth: true, headers: { Prefer: 'return=minimal' } }); })
        .then(function () { kmsg = 'All Kindles unlinked.'; kcode = ''; }).catch(function (e) { kmsg = 'Could not unlink: ' + e.message; }).then(function () { keepScroll = true; render(); });
      return;
    }
    if (a === 'signout') { keepSess(null); setSync('off'); render(); return; }
    if (a === 'sendcode') {
      var em = (document.getElementById('si-email') || {}).value || '', m = document.getElementById('simsg');
      if (!em.trim()) { m.textContent = 'Type your email first.'; return; }
      m.textContent = 'Sending…';
      api('/auth/v1/otp?redirect_to=' + encodeURIComponent(location.origin + location.pathname), { method: 'POST', body: { email: em.trim(), create_user: false } })
        .then(function () { m.textContent = 'Sent to ' + em.trim() + '.'; document.getElementById('codebox').hidden = false; })
        .catch(function (err) { m.textContent = err.status === 429 ? 'Too many emails sent. Wait a few minutes and try again.' : 'Could not send: ' + err.message; });
      return;
    }
    if (a === 'highlight') { saveHighlight(); return; }
    if (a === 'undo') { var uid = undo && !undo.skip && undo.id; undoRate(); if (uid) { rtUndo(uid); save(); } keepScroll = true; render(); return; }
    if (a === 'rtmenu') { rtMenu = !rtMenu; rtPaint(rtLoad(), ''); return; }
    if (a === 'rtgoal') { rtMenu = false; var gs = rtLoad(); gs.goal = { min: +el.getAttribute('data-min'), start: gs.ms, cards0: gs.cards }; rtSave(gs); rtPaint(gs, ''); return; }
    if (a === 'rtgoaloff') { rtMenu = false; var go = rtLoad(); go.goal = null; rtSave(go); rtPaint(go, ''); return; }
    if (a === 'rtstop') { var gt = rtLoad(); gt.goal = null; rtSave(gt); location.hash = '#/'; return; }
    if (a === 'allcases') { caseAll = true; keepScroll = true; render(); return; }
    if (a === 'reveal') { lockUntil = Date.now() + 500; revealed = true; keepScroll = true; render(); }
    else if (a === 'studied' || a === 'restudy') { t = ts(topicId()); t.studied = today(); t.rev = {}; if (t.status === 'new') t.status = 'learning'; t.t = Date.now(); save(); keepScroll = true; render(); }
    else if (a === 'unstudy') { t = ts(topicId()); t.studied = null; t.rev = {}; t.t = Date.now(); save(); keepScroll = true; render(); }
    else if (a === 'export') {
      var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), u = URL.createObjectURL(blob), l = document.createElement('a');
      l.href = u; l.download = 'rmo-revision-backup-' + today() + '.json'; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
    }
    else if (a === 'reset') {
      if (el.getAttribute('data-sure') !== '1') { el.setAttribute('data-sure', '1'); el.textContent = 'Press again to delete everything'; return; }
      S = { topics: {}, errors: [] }; fix(); S.resetAt = Date.now(); save(); rtMem = null; try { localStorage.removeItem(RT_KEY); } catch (e) {} location.hash = '#/'; render();
    }
  });
  app.addEventListener('change', function (e) {
    var cx = e.target.closest('[data-ctx]'); if (cx) { setCtx(cx.getAttribute('data-ctx'), cx.value); save(); return; }
    var nt = e.target.closest('[data-note]'); if (nt) { setNote(nt.getAttribute('data-note'), nt.value); save(); return; }
    var c = e.target.closest('[data-rev]'); if (!c) return;
    var t = ts(topicId()), k = c.getAttribute('data-rev');
    if (!revCan(t, k)) { c.checked = !c.checked; return; }
    t.t = Date.now();
    if (c.checked) t.rev[k] = true; else { delete t.rev[k]; if (t.status === 'done') t.status = 'learning'; }
    if (INT.every(function (x) { return t.rev[x]; })) t.status = 'done';
    save(); keepScroll = true; render();
  });

  drainAttempts(); drainStars(); drainCards(); mirrorCards();
  loadCases();
  render();
  if (sess) syncNow();
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') { drainAttempts(); drainStars(); drainCards(); if (sess) syncNow(); } });
  window.addEventListener('online', function () { if (sess) syncNow(); });
  /* Keyboard shortcuts on Revise: Space shows the answer, 1 or J = Again, 2 = Hard, 3 or K = Good, 4 = Easy, L = bring back later, N = note box, Esc leaves the box.
     Ignored while typing, with modifier keys, and on key repeat. Key hints show once a key is pressed, and hide on touch. */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key && e.key.length === 1 || e.key === 'Escape' || e.key === 'Enter') document.documentElement.classList.add('kbd');
    if (route[0] !== 'revise' || (window.RMOFocus && window.RMOFocus.isOpen())) return;
    var t = e.target, typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
    if (typing) { if (e.key === 'Escape') t.blur(); return; }
    if (e.repeat) { if (e.key === ' ') e.preventDefault(); return; }
    var k = e.key === ' ' ? 'space' : (e.key || '').toLowerCase(), el = null;
    if (k === 'space') el = document.querySelector('[data-act="reveal"]');
    else if (k === 'j' || k === '1') el = document.querySelector('.flash [data-rate="again"]');
    else if (k === '2') el = document.querySelector('.flash [data-rate="hard"]');
    else if (k === 'k' || k === '3') el = document.querySelector('.flash [data-rate="good"]');
    else if (k === '4') el = document.querySelector('.flash [data-rate="easy"]');
    else if (k === 'l') el = document.querySelector('.flash [data-later]');
    else if (k === 'n') { var nb = document.querySelector('.flash textarea[data-note]'); if (nb) { e.preventDefault(); nb.focus(); } return; }
    else return;
    if (k === 'space') e.preventDefault();   // no page scroll, and no double press on a focused button
    if (!el) return;
    if (document.activeElement && document.activeElement !== document.body && document.activeElement.blur) document.activeElement.blur();
    el.click();
  });
  document.addEventListener('keyup', function (e) { if (e.key === ' ' && route[0] === 'revise' && !(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))) e.preventDefault(); });
  document.addEventListener('pointerdown', function (e) { if (e.pointerType === 'touch') document.documentElement.classList.remove('kbd'); }, { passive: true });

  /* Updates: the service worker activates new versions straight away, but an open page keeps its old code until reloaded.
     Check for a new version whenever the app comes back to the front, and offer a one-tap reload. */
  if ('serviceWorker' in navigator) {
    var swHad = !!navigator.serviceWorker.controller, swReg = null, swChecked = 0;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (!swHad) { swHad = true; return; }
      if (document.getElementById('updpill')) return;
      var b = document.createElement('button'); b.id = 'updpill'; b.className = 'updpill'; b.type = 'button';
      b.innerHTML = 'Update ready <span>Tap to refresh</span>';
      b.onclick = function () { rtTick(true); rtPublish(false); location.reload(); };
      document.body.appendChild(b);
    });
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').then(function (r) { swReg = r; swChecked = Date.now(); }).catch(function () {}); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && swReg && Date.now() - swChecked > 60000) { swChecked = Date.now(); swReg.update().catch(function () {}); } });
  }
})();
