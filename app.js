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
  function fix() { S.topics = S.topics || {}; S.errors = S.errors || []; S.items = S.items || {}; S.custom = S.custom || {}; S.added = S.added || {}; S.addedAt = S.addedAt || {}; S.dead = S.dead || {}; S.resetAt = S.resetAt || 0; S.attempts = S.attempts || []; S.notes = S.notes || {}; S.highlights = S.highlights || []; }
  fix();
  function store() { mem = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: stays in memory */ } }
  function save() { store(); if (window.RMOSync) window.RMOSync.soon(); }
  function touch(id) { ts(id).t = Date.now(); }
  function ts(id) { return S.topics[id] || (S.topics[id] = { status: 'new', studied: null, rev: {} }); }

  /* ---------- helpers ---------- */
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
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
  var SRC = { p: 'Point of Care page', a: 'Australian guidance (ANZCOR)', b: 'Point of Care page and Australian guidance' };
  var openSet = {}, revealed = false;
  function topicItems(tid) {
    var rc = RC[tid] || { items: [], sg: [] }, out = [], added = S.added[tid] || [];
    rc.items.forEach(function (x, i) { out.push({ it: x, o: i, tid: tid }); });
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
  function rate(id, how) {
    var st = itState(id);
    if (how === 'got' && st.k === 'ok') return false; // not due yet: cannot be marked known early
    var s = S.items[id] || { step: 0 }, n = how === 'got' ? Math.min((s.step || 0) + 1, INT.length - 1) : 0;
    undo = { id: id, prev: S.items[id] ? JSON.parse(JSON.stringify(S.items[id])) : null, how: how, at: Date.now() };
    S.items[id] = { step: n, due: addDays(today(), INT[n]), last: today(), r: how, t: Date.now() };
    save();
    return true;
  }
  function undoRate() {
    if (!undo) return;
    if (undo.prev) { undo.prev.t = Date.now(); S.items[undo.id] = undo.prev; }
    else { delete S.items[undo.id]; S.dead[undo.id] = Date.now(); }
    undo = null; save();
  }
  function queue() {
    var due = [], fresh = [];
    TOP.forEach(function (t) {
      var studied = (S.topics[t.id] || {}).studied;
      topicItems(t.id).forEach(function (x) {
        var k = itState(x.it.id).k;
        if (k === 'due') due.push(x); else if (k === 'new' && studied) fresh.push(x);
      });
    });
    return { due: due, fresh: fresh, all: due.concat(fresh) };
  }
  function topicDueCount(tid) { return topicItems(tid).filter(function (x) { return itState(x.it.id).k === 'due'; }).length; }
  function tagFor(st) {
    if (st.k === 'new') return '<span class="tag">Not rated</span>';
    if (st.k === 'due') return '<span class="tag due">Due</span>';
    if (st.s.r === 'shaky') return '<span class="tag shaky">Shaky, ' + nice(st.s.due) + '</span>';
    return '<span class="tag">Next ' + nice(st.s.due) + '</span>';
  }
  function rateButtons(id) {
    var st = itState(id);
    if (st.k === 'ok') return '<p class="src">Next review ' + nice(st.s.due) + '. You can mark it known again on that day, so the spacing stays honest.</p><button class="link" data-rate="shaky" data-it="' + id + '">I have forgotten this: bring it back tomorrow</button>';
    return '<div class="rate"><button class="b got" data-rate="got" data-it="' + id + '">Got it</button><button class="b shaky" data-rate="shaky" data-it="' + id + '">Shaky</button></div>';
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
    var seenH = {}; out.highlights = [];
    (a.highlights || []).concat(b.highlights || []).forEach(function (x) { if (seenH[x.id] || out.dead[x.id] || (x.at || 0) < r) return; seenH[x.id] = 1; out.highlights.push(x); });
    out.highlights.sort(function (x, y) { return x.at - y.at; });
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
  window.addEventListener('message', function (e) { if (e.origin === location.origin && e.data && e.data.rmoAttempt) drainAttempts(); });

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
      S = merge(S, remote); fix(); store();
      return api('/rest/v1/rmo_revision_state', { method: 'POST', auth: true, headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: { user_id: sess.uid, data: S, updated_at: new Date().toISOString() } });
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

  /* ---------- shell ---------- */
  var route = [];
  function navLink(href, label, on, count) {
    return '<a href="' + href + '" class="' + (on ? 'on' : '') + '"' + (on ? ' aria-current="page"' : '') + '><span>' + label + '</span>' + (count ? '<span class="n">' + count + '</span>' : '') + '</a>';
  }
  function sidebar(cur) {
    var q = queue(), curSys = cur.sys || '';
    var h = '<aside class="side" aria-label="Navigation"><a class="brand" href="#/">RMO Revision</a><nav class="nav">' +
      navLink('#/', 'Today', cur.page === 'home') +
      navLink('#/revise', 'Revise', cur.page === 'revise', q.all.length) +
      navLink('#/log', 'Error log', cur.page === 'log') + '</nav><nav class="nav sys" aria-label="Systems">';
    SYS.forEach(function (s) {
      var open = s.id === curSys, tps = TOP.filter(function (t) { return t.system === s.id; });
      var d = tps.reduce(function (a, t) { return a + topicDueCount(t.id); }, 0);
      h += '<a href="#/s/' + s.id + '" class="grp' + (open && cur.page === 'system' ? ' on' : '') + '"><span>' + esc(s.name) + '</span>' + (d ? '<span class="n">' + d + '</span>' : '') + '</a>';
      if (open) h += tps.map(function (t) { var c = topicDueCount(t.id); return '<a href="#/t/' + t.id + '" class="sub' + (cur.topic === t.id ? ' on' : '') + '"><span>' + esc(t.name) + '</span>' + (c ? '<span class="n">' + c + '</span>' : '') + '</a>'; }).join('');
    });
    return h + '</nav><a class="foot" href="#/settings">Sync and backup</a></aside>';
  }
  function tabbar(cur) {
    var n = queue().all.length;
    function tab(href, label, on, c) { return '<a href="' + href + '" class="' + (on ? 'on' : '') + '">' + label + (c ? ' <span class="n">' + c + '</span>' : '') + '</a>'; }
    return '<nav class="tabs" aria-label="Sections">' + tab('#/', 'Today', cur.page === 'home') + tab('#/topics', 'Topics', cur.page === 'topics' || cur.page === 'system' || cur.page === 'topic') + tab('#/revise', 'Revise', cur.page === 'revise', n) + tab('#/log', 'Error log', cur.page === 'log') + '</nav>';
  }
  function undoBar() {
    if (!undo || Date.now() - undo.at > 8000) return '';
    var it = S.items[undo.id];
    return '<div class="undo" role="status"><span>Marked ' + (undo.how === 'got' ? 'Got it' : 'Shaky') + (it ? '. Next review ' + nice(it.due) : '') + '.</span><button class="link" data-act="undo">Undo</button></div>';
  }
  function shell(inner, cur) { return '<div class="app">' + sidebar(cur) + '<main class="main" id="main">' + inner + '</main>' + tabbar(cur) + undoBar() + '</div>'; }
  function row(href, title, right, sub) {
    return '<li><a class="row" href="' + href + '"><span class="t"><span>' + title + '</span>' + (sub ? '<small>' + sub + '</small>' : '') + '</span>' + (right || '') + '</a></li>';
  }

  /* ---------- views ---------- */
  function home() {
    var q = queue(), rv = topicReviews(), done = 0, studied = 0;
    TOP.forEach(function (t) { var s = S.topics[t.id] || {}; if (s.status === 'done') done++; if (s.studied) studied++; });
    var h = '<header class="head"><h1>Today</h1><p class="meta">' + esc(longToday()) + '</p><p class="meta small" id="syncline">' + syncLine() + '</p></header>';
    h += '<div class="stats"><div><b>' + q.due.length + '</b><span>due to recall</span></div><div><b>' + q.fresh.length + '</b><span>new to rate</span></div><div><b>' + studied + '</b><span>topics studied</span></div><div><b>' + done + '</b><span>of ' + TOP.length + ' done</span></div></div>';
    h += q.all.length ? '<p><a class="btn primary big" href="#/revise">Start revising</a></p>' : '<p class="meta">Nothing to recall. Open a topic you have studied and press "Studied today", or rate its checklist.</p>';
    if (q.all.length) {
      h += '<h2>Up next</h2><ul class="list">' + q.all.slice(0, 8).map(function (x) {
        var t = byId(x.tid); return row('#/t/' + x.tid, esc(x.it.t), itState(x.it.id).k === 'due' ? '<span class="tag due">Due</span>' : '<span class="tag">New</span>', esc(t.name));
      }).join('') + '</ul>' + (q.all.length > 8 ? '<p class="meta"><a href="#/revise">' + plural(q.all.length - 8, 'more item', 'more items') + ' in Revise</a></p>' : '');
    }
    if (rv.length) {
      h += '<h2>Topic reviews</h2><p class="meta">Re-read these topics, then tick the review on the topic page.</p><ul class="list">' + rv.map(function (x) {
        var late = x.n.late === 0 ? 'due today' : x.n.late + (x.n.late === 1 ? ' day late' : ' days late');
        return row('#/t/' + x.t.id, esc(x.t.name), '<span class="tag due">Day ' + x.n.k + '</span>', late);
      }).join('') + '</ul>';
    }
    h += '<h2 class="phone-only">Systems</h2><ul class="list phone-only">' + SYS.map(function (s) { return row('#/s/' + s.id, esc(s.name), '<span class="tag">' + TOP.filter(function (t) { return t.system === s.id; }).length + '</span>'); }).join('') + '</ul>';
    h += '<p class="fine">Study aid, not a clinical decision tool. Check every dose against eTG and your hospital guideline.</p>';
    return shell(h, { page: 'home' });
  }
  function topicsPage() {
    var h = '<header class="head"><h1>Topics</h1><p class="meta">' + TOP.length + ' topics in ' + SYS.length + ' systems</p></header><ul class="list">' +
      SYS.map(function (s) { var n = TOP.filter(function (t) { return t.system === s.id; }).length; return row('#/s/' + s.id, esc(s.name), '<span class="tag">' + n + '</span>'); }).join('') + '</ul>';
    return shell(h, { page: 'topics' });
  }
  function system(id) {
    var s = sysById(id); if (!s) return notFound();
    var list = TOP.filter(function (t) { return t.system === id; });
    var h = '<a class="back" href="#/topics">Topics</a><header class="head"><h1>' + esc(s.name) + '</h1><p class="meta">' + plural(list.length, 'topic', 'topics') + '</p></header><ul class="list">' + list.map(function (t) {
      var st = S.topics[t.id] || {}, its = topicItems(t.id), d = topicDueCount(t.id), rated = its.filter(function (x) { return itState(x.it.id).k !== 'new'; }).length;
      var sub = ['Plan day ' + t.day];
      if (its.length) sub.push(rated + ' of ' + its.length + ' rated');
      if (t.tools.length) sub.push(plural(t.tools.length, 'tool', 'tools'));
      var right = d ? '<span class="tag due">' + d + ' due</span>' : st.status && st.status !== 'new' ? '<span class="tag ' + (st.status === 'done' ? 'good' : '') + '">' + STATUS[st.status] + '</span>' : '';
      return row('#/t/' + t.id, esc(t.name), right, sub.join(', '));
    }).join('') + '</ul>';
    return shell(h, { page: 'system', sys: id });
  }
  function noteOf(id) { var n = S.notes[id]; return n && n.text ? n.text : ''; }
  function setNote(id, text) { text = (text || '').trim(); if (text === noteOf(id)) return; S.notes[id] = { text: text, t: Date.now() }; }
  function noteBox(id, label) {
    return '<label class="note"><span>' + label + '</span><textarea rows="2" data-note="' + id + '" placeholder="What did you miss? Next time it shows before the answer.">' + esc(noteOf(id)) + '</textarea></label>';
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
    var h = '<li class="item' + (op ? ' open' : '') + '"><button class="row" data-rv="' + it.id + '" aria-expanded="' + op + '"><span class="t"><span>' + esc(it.t) + '</span>' + (function () { var bits = []; if (it.p === 1) bits.push('<b class="must">Must know</b>'); if (x.mine) bits.push('added by you'); if (it.from) bits.push('from your highlight'); if (noteOf(it.id)) bits.push('has your note'); return bits.length ? '<small>' + bits.join(', ') + '</small>' : ''; })() + '</span>' + tagFor(st) + '</button>';
    if (op) h += '<div class="ans">' + (noteOf(it.id) ? '<p class="mynote"><b>Your note:</b> ' + esc(noteOf(it.id)) + '</p>' : '') + '<p>' + (it.k ? esc(it.k) : 'No key point written for this item.') + '</p><p class="src">' + SRC[it.s || 'p'] + '</p>' + noteBox(it.id, 'Your note') + rateButtons(it.id) + (x.mine ? '<button class="link danger" data-delitem="' + it.id + '" data-tp="' + x.tid + '">Delete this item</button>' : '') + '</div>';
    return h + '</li>';
  }
  function topic(id) {
    var t = byId(id); if (!t) return notFound();
    var s = sysById(t.system), st = ts(t.id), n = nextDue(t), dy = D.days[t.day] || {}, its = topicItems(t.id);
    var rated = its.filter(function (x) { return itState(x.it.id).k !== 'new'; }).length;
    var h = '<a class="back" href="#/s/' + t.system + '">' + esc(s.name) + '</a><header class="head"><h1>' + esc(t.name) + '</h1><p class="meta">' + (t.day ? 'Plan day ' + t.day : '') + (its.length ? (t.day ? '. ' : '') + rated + ' of ' + its.length + ' recall items rated' : '') + '</p></header>';
    if (t.tools.length) h += '<div class="tools">' + t.tools.map(function (x, i) { return '<a href="#/tool/' + t.id + '/' + i + '"><b>' + esc(x.label) + '</b><span>' + esc(x.desc) + '</span></a>'; }).join('') + '</div>';

    h += '<h2>Recall checklist</h2><p class="meta">In the order you would think it through on the ward. Say the answer to yourself, then tap to check it. Got it brings an item back in 3, 7, 14, then 28 days. Shaky brings it back tomorrow.</p>';
    if (its.length) {
      var gs = [];
      its.forEach(function (x) { var g = x.it.g || 'Y'; if (!gs.length || gs[gs.length - 1].g !== g) gs.push({ g: g, xs: [] }); gs[gs.length - 1].xs.push(x); });
      h += gs.map(function (grp) { return '<h3 class="sect">' + SECT[grp.g] + '</h3><ul class="list">' + grp.xs.map(itemRow).join('') + '</ul>'; }).join('');
    } else h += '<p class="meta">No checklist for this topic yet. Add your own subtopics below.</p>';
    var added = S.added[t.id] || [], sg = (RC[t.id] || { sg: [] }).sg.filter(function (x) { return added.indexOf(x.id) < 0; });
    if (sg.length) h += '<h3>Suggested subtopics</h3><ul class="list">' + sg.map(function (x) { return '<li><div class="row static"><span class="t"><span>' + esc(x.t) + '</span><small>' + SECT[x.g || 'Y'] + ': ' + esc(x.k) + '</small></span><button class="btn small" data-addsg="' + x.id + '" data-tp="' + t.id + '">Add</button></div></li>'; }).join('') + '</ul>';
    var hl = pendingHighlights(t.id);
    if (hl.length) h += '<h3>Your highlights, waiting for Claude</h3><p class="meta">Claude turns these into recall cards in the right section when you ask in chat, or in the Sunday refresh.</p><ul class="list">' + hl.map(function (x) { return '<li><div class="row static"><span class="t"><span>' + esc(x.text) + '</span><small>' + esc(x.toolLabel || '') + (x.where ? ', ' + esc(x.where) : '') + ', ' + nice(iso(new Date(x.at))) + '</small></span><button class="link danger" data-delhl="' + x.id + '">Delete</button></div></li>'; }).join('') + '</ul>';
    h += '<h3>Add your own subtopic</h3><form id="itform" class="form"><label><span>Subtopic</span><input type="text" id="ittitle" placeholder="Digoxin toxicity signs" autocomplete="off"></label><label><span>Key point to recall</span><textarea id="itkey" rows="2" placeholder="Optional"></textarea></label><div class="inline"><label><span>Section</span><select id="itsec"><option value="R">Recognise</option><option value="A">Assess and investigate</option><option value="T" selected>Treat now</option><option value="C">Complications and traps</option><option value="F">After and follow-up</option></select></label><label class="check"><input type="checkbox" id="itmust"> Must know</label><button class="btn primary" type="submit">Add subtopic</button></div></form>';

    h += '<h2>Read</h2><ul class="list">';
    if (t.url) h += '<li><a class="row" href="' + esc(t.url) + '" target="_blank" rel="noopener"><span class="t"><span>Point of Care Medicine template</span><small>Opens in a new tab</small></span></a></li>';
    if (t.rch) h += '<li><a class="row" href="https://www.rch.org.au/clinicalguide/" target="_blank" rel="noopener"><span class="t"><span>Royal Children\'s Hospital guidelines</span><small>Opens in a new tab</small></span></a></li>';
    if (t.pages) h += '<li><div class="row static"><span class="t"><span>Rosen and Barkin</span><small>PDF pages ' + esc(t.pages) + '</small></span></div></li>';
    h += '</ul>';
    if (dy.done || dy.dont) h += '<div class="plan">' + (dy.done ? '<p><b>Done when</b> ' + esc(dy.done) + '</p>' : '') + (dy.dont ? '<p><b>Skip</b> ' + esc(dy.dont.replace(/^[Dd]on't /, '')) + '</p>' : '') + '</div>';

    h += '<h2>Topic reviews</h2><label class="form"><span>Status</span><select id="status">' + Object.keys(STATUS).map(function (k) { return '<option value="' + k + '"' + (st.status === k ? ' selected' : '') + '>' + STATUS[k] + '</option>'; }).join('') + '</select></label>';
    if (!st.studied) h += '<p class="meta">Press this when you finish studying. It schedules re-reads at 1, 3, 7, 14 and 28 days and puts this topic\'s checklist into Revise.</p><p><button class="btn primary" data-act="studied">Studied today</button></p>';
    else {
      h += '<p class="meta">First studied ' + nice(st.studied) + '. Tick each re-read when you have done it.</p><div class="sched">' + INT.map(function (k) {
        var due = addDays(st.studied, k), isDone = !!st.rev[k], late = diff(today(), due), can = revCan(st, k);
        var cls = isDone ? 'ok' : (late >= 0 && n && n.k === k ? 'due' : '');
        return '<label class="' + cls + (can ? '' : ' locked') + '"><input type="checkbox" data-rev="' + k + '"' + (isDone ? ' checked' : '') + (can ? '' : ' disabled') + '><span><b>Day ' + k + '</b><small>' + nice(due) + (isDone ? ', done' : late >= 0 ? (n && n.k === k ? ', due' : ', after the earlier one') : ', not yet') + '</small></span></label>';
      }).join('') + '</div><p class="btns"><button class="btn small" data-act="restudy">Studied again today</button><button class="btn small" data-act="unstudy">Clear schedule</button></p>';
    }

    var errs = S.errors.filter(function (e) { return e.topic === t.id; });
    h += '<h2>Error log</h2><p class="meta">Write what you got wrong and the fact that fixes it.</p><form id="errform" class="form"><textarea id="errtext" rows="3" placeholder="Wrong: gave IV diltiazem in EF 25%. Fix: no diltiazem or verapamil with LV systolic dysfunction."></textarea><div><button class="btn primary" type="submit">Add to log</button></div></form>' +
      (errs.length ? '<ul class="list">' + errs.map(function (e) { return '<li><div class="row static"><span class="t"><span>' + esc(e.text) + '</span><small>' + nice(e.date) + '</small></span><button class="link danger" data-del="' + e.id + '">Delete</button></div></li>'; }).join('') + '</ul>' : '');
    return shell(h, { page: 'topic', sys: t.system, topic: t.id });
  }
  function revise() {
    var q = queue(), h = '<header class="head"><h1>Revise</h1><p class="meta">' + (q.all.length ? q.due.length + ' due and ' + q.fresh.length + ' new' : 'All caught up') + '</p></header>';
    if (!q.all.length) {
      h += '<p class="meta">Nothing to recall right now. Items you rate come back on their date. To add a topic, open it and press "Studied today".</p><p><a class="btn" href="#/topics">Browse topics</a></p>';
      return shell(h, { page: 'revise' });
    }
    var x = q.all[0], t = byId(x.tid), st = itState(x.it.id);
    h += '<section class="flash" aria-live="polite"><p class="ctx"><a href="#/t/' + x.tid + '">' + esc(t.name) + '</a><span>' + SECT[x.it.g || 'Y'] + (x.it.p === 1 ? ', must know' : '') + (st.k === 'new' ? ', first time' : '') + '</span></p><h2>' + esc(x.it.t) + '</h2>';
    if (noteOf(x.it.id)) h += '<p class="mynote"><b>Your note from last time:</b> ' + esc(noteOf(x.it.id)) + '</p>';
    if (!revealed) h += '<p class="meta">Say the answer to yourself first.</p><button class="btn primary big" data-act="reveal">Show answer</button>';
    else h += '<p class="answer">' + (x.it.k ? esc(x.it.k) : 'No key point written for this item.') + '</p><p class="src">' + SRC[x.it.s || 'p'] + '</p>' + noteBox(x.it.id, 'What did you miss this time? (optional)') + rateButtons(x.it.id);
    h += '</section>';
    if (q.all.length > 1) h += '<h2>Coming up</h2><ul class="list">' + q.all.slice(1, 9).map(function (y) { return row('#/t/' + y.tid, esc(y.it.t), '', esc(byId(y.tid).name)); }).join('') + '</ul>';
    return shell(h, { page: 'revise' });
  }
  function tool(id, i) {
    var t = byId(id); if (!t || !t.tools[i]) return notFound();
    var n = pendingHighlights(t.id).length;
    return '<div class="toolbar"><a class="back" href="#/t/' + t.id + '">' + esc(t.name) + '</a><b>' + esc(t.tools[i].label) + '</b><span class="hlcount" id="hlcount">' + (n ? n + ' saved' : 'Select text to save it') + '</span><button class="btn small" id="hlbtn" data-act="highlight" disabled>Save highlight</button></div><iframe class="frame" title="' + esc(t.tools[i].label) + '" src="tools/' + t.tools[i].file + '"></iframe>';
  }
  function log() {
    var h = '<header class="head"><h1>Error log</h1><p class="meta">Everything you wrote down as wrong, newest first. Read it before a test day.</p></header>';
    if (!S.errors.length) h += '<p class="meta">Nothing yet. Add entries from the bottom of any topic page.</p>';
    else h += '<ul class="list">' + S.errors.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; }).map(function (e) {
      var t = byId(e.topic);
      return '<li><div class="row static"><span class="t"><span>' + esc(e.text) + '</span><small><a href="#/t/' + e.topic + '">' + esc(t ? t.name : e.topic) + '</a>, ' + nice(e.date) + '</small></span><button class="link danger" data-del="' + e.id + '">Delete</button></div></li>';
    }).join('') + '</ul>';
    return shell(h, { page: 'log' });
  }
  function settings() {
    var h = '<header class="head"><h1>Sync and backup</h1></header>';
    h += '<h2>Sync between devices</h2>';
    if (sess) {
      h += '<p class="meta" id="syncline">' + syncLine() + '</p><p class="meta">Your ratings, topic progress, error log and your own subtopics are kept the same on every device where you sign in with this account. Changes made offline sync when you reconnect.</p><p class="btns"><button class="btn primary" data-act="syncnow">Sync now</button><button class="btn" data-act="signout">Sign out on this device</button></p>';
    } else {
      h += '<p class="meta">Sign in on each device with the same account. Use the email and password you already use for your other apps on this Supabase account (Stride, Margin).</p>' + (syncState.msg ? '<p class="meta" style="color:var(--due)">' + esc(syncState.msg) + '</p>' : '') +
        '<form id="signin" class="form"><label><span>Email</span><input type="email" id="si-email" autocomplete="username" required></label><label><span>Password</span><input type="password" id="si-pass" autocomplete="current-password"></label><div class="btns"><button class="btn primary" type="submit">Sign in and sync</button><button class="btn" type="button" data-act="sendcode">Email me a code instead</button></div></form>' +
        '<div id="codebox" hidden><p class="meta">Check your email. Type the code here, or open the link on this device.</p><form id="codeform" class="form"><label><span>Code from the email</span><input type="text" id="si-code" inputmode="numeric" autocomplete="one-time-code"></label><div><button class="btn primary" type="submit">Sign in</button></div></form></div><p class="meta" id="simsg"></p>';
    }
    h += '<h2>Backup file</h2><p class="meta">A copy you keep yourself. Importing merges it with what is on this device.</p><p class="btns"><button class="btn" data-act="export">Export backup</button><label class="btn">Import backup<input type="file" id="imp" accept="application/json" hidden></label></p><p class="meta" id="msg"></p>' +
      '<h2>Reset</h2><p class="meta">Deletes all progress, ratings and the error log' + (sess ? ' on every synced device' : ' on this device') + '.</p><p><button class="btn danger" data-act="reset">Reset everything</button></p>';
    return shell(h, { page: 'settings' });
  }
  function notFound() { return shell('<header class="head"><h1>Page not found</h1></header><p><a class="btn" href="#/">Go to Today</a></p>', { page: '' }); }

  /* ---------- router ---------- */
  var app = document.getElementById('app'), keepScroll = false;
  function render() {
    var r = location.hash.replace(/^#\/?/, '').split('/'), h, y = 0;
    if (keepScroll) y = window.scrollY;
    route = r; app.className = '';
    if (r[0] === 's') h = system(r[1]);
    else if (r[0] === 't') h = topic(r[1]);
    else if (r[0] === 'tool') { h = tool(r[1], +r[2]); app.className = 'tool'; }
    else if (r[0] === 'topics') h = topicsPage();
    else if (r[0] === 'revise') h = revise();
    else if (r[0] === 'log') h = log();
    else if (r[0] === 'settings') h = settings();
    else h = home();
    var sideY = 0, sd = document.querySelector('.side'); if (sd) sideY = sd.scrollTop;
    app.innerHTML = h;
    var sd2 = document.querySelector('.side'); if (sd2) sd2.scrollTop = sideY;
    window.scrollTo(0, keepScroll ? y : 0);
    keepScroll = false;
    wire();
  }
  window.addEventListener('hashchange', function () { revealed = false; render(); });
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
      var d; try { d = f.contentDocument; } catch (e) { return; } if (!d) return;
      d.addEventListener('selectionchange', function () {
        var s = f.contentWindow.getSelection(), txt = s ? String(s).replace(/\s+/g, ' ').trim() : '';
        var b = document.getElementById('hlbtn'); if (!b) return;
        if (txt.length >= 3) { var r = s.getRangeAt(0); lastSel = { text: txt.slice(0, 600), where: headingBefore(d, r.startContainer), range: r.cloneRange() }; b.disabled = false; }
        else b.disabled = !lastSel;
      });
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
    var st = document.getElementById('status');
    if (st) st.addEventListener('change', function () { ts(topicId()).status = st.value; touch(topicId()); save(); keepScroll = true; render(); });
    var f = document.getElementById('errform');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = document.getElementById('errtext').value.trim(); if (!v) return;
      S.errors.push({ id: String(Date.now()), topic: topicId(), text: v, date: today() }); save(); keepScroll = true; render();
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
    if ((el = e.target.closest('[data-rv]'))) { lockUntil = Date.now() + 350; var rid = el.getAttribute('data-rv'); openSet[rid] = !openSet[rid]; keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-rate]'))) { var iid = el.getAttribute('data-it'); lockUntil = Date.now() + 700; var nb = document.querySelector('[data-note="' + iid + '"]'); if (nb) setNote(iid, nb.value); if (!rate(iid, el.getAttribute('data-rate'))) { render(); return; } setTimeout(function () { if (undo && Date.now() - undo.at >= 8000) { var u = document.querySelector('.undo'); if (u) u.remove(); } }, 8100); delete openSet[iid]; revealed = false; keepScroll = route[0] !== 'revise'; render(); return; }
    if ((el = e.target.closest('[data-addsg]'))) { var tp = el.getAttribute('data-tp'); (S.added[tp] = S.added[tp] || []).push(el.getAttribute('data-addsg')); S.addedAt[el.getAttribute('data-addsg')] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-delitem]'))) { var tq = el.getAttribute('data-tp'), did = el.getAttribute('data-delitem'); S.custom[tq] = (S.custom[tq] || []).filter(function (x) { return x.id !== did; }); delete S.items[did]; S.dead[did] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-delhl]'))) { var hid = el.getAttribute('data-delhl'); S.highlights = S.highlights.filter(function (x) { return x.id !== hid; }); S.dead[hid] = Date.now(); save(); keepScroll = true; render(); return; }
    if ((el = e.target.closest('[data-del]'))) { var id = el.getAttribute('data-del'); S.errors = S.errors.filter(function (x) { return x.id !== id; }); S.dead[id] = Date.now(); save(); keepScroll = true; render(); return; }
    if (!(el = e.target.closest('[data-act]'))) return;
    var a = el.getAttribute('data-act'), t;
    if (a === 'syncnow') { syncNow(); return; }
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
    if (a === 'undo') { undoRate(); keepScroll = true; render(); return; }
    if (a === 'reveal') { lockUntil = Date.now() + 500; revealed = true; keepScroll = true; render(); }
    else if (a === 'studied' || a === 'restudy') { t = ts(topicId()); t.studied = today(); t.rev = {}; if (t.status === 'new') t.status = 'learning'; t.t = Date.now(); save(); keepScroll = true; render(); }
    else if (a === 'unstudy') { t = ts(topicId()); t.studied = null; t.rev = {}; t.t = Date.now(); save(); keepScroll = true; render(); }
    else if (a === 'export') {
      var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), u = URL.createObjectURL(blob), l = document.createElement('a');
      l.href = u; l.download = 'rmo-revision-backup-' + today() + '.json'; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
    }
    else if (a === 'reset') {
      if (el.getAttribute('data-sure') !== '1') { el.setAttribute('data-sure', '1'); el.textContent = 'Press again to delete everything'; return; }
      S = { topics: {}, errors: [] }; fix(); S.resetAt = Date.now(); save(); location.hash = '#/'; render();
    }
  });
  app.addEventListener('change', function (e) {
    var nt = e.target.closest('[data-note]'); if (nt) { setNote(nt.getAttribute('data-note'), nt.value); save(); return; }
    var c = e.target.closest('[data-rev]'); if (!c) return;
    var t = ts(topicId()), k = c.getAttribute('data-rev');
    if (!revCan(t, k)) { c.checked = !c.checked; return; }
    t.t = Date.now();
    if (c.checked) t.rev[k] = true; else { delete t.rev[k]; if (t.status === 'done') t.status = 'learning'; }
    if (INT.every(function (x) { return t.rev[x]; })) t.status = 'done';
    save(); keepScroll = true; render();
  });

  drainAttempts();
  render();
  if (sess) syncNow();
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible') { drainAttempts(); if (sess) syncNow(); } });
  window.addEventListener('online', function () { if (sess) syncNow(); });
  if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
})();
