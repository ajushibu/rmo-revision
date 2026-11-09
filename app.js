(function () {
  var D = window.RMO, SYS = D.systems, TOP = D.topics;
  TOP.forEach(function (t) { t.tools = t.tools || []; });
  var INT = [1, 3, 7, 14, 28], KEY = 'rmo-revision-v1';
  var mem = null;

  function load() {
    try { var s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) { if (mem) return mem; }
    return mem || { topics: {}, errors: [] };
  }
  var S = load();
  function save() { mem = S; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage blocked: stays in memory */ } }
  function ts(id) { return S.topics[id] || (S.topics[id] = { status: 'new', studied: null, rev: {} }); }

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { return iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diff(a, b) { return Math.round((parse(a) - parse(b)) / 86400000); }
  function nice(s) { return parse(s).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); }
  function byId(id) { for (var i = 0; i < TOP.length; i++) if (TOP[i].id === id) return TOP[i]; return null; }
  function sysById(id) { for (var i = 0; i < SYS.length; i++) if (SYS[i].id === id) return SYS[i]; return null; }

  function nextDue(t) {
    var st = S.topics[t.id]; if (!st || !st.studied) return null;
    for (var i = 0; i < INT.length; i++) {
      if (!st.rev[INT[i]]) { var due = addDays(st.studied, INT[i]); return { k: INT[i], due: due, late: diff(today(), due) }; }
    }
    return null;
  }
  function dueList() {
    var out = [];
    TOP.forEach(function (t) { var n = nextDue(t); if (n && n.late >= 0) out.push({ t: t, n: n }); });
    out.sort(function (a, b) { return b.n.late - a.n.late; });
    return out;
  }
  var STATUS = { 'new': 'Not started', learning: 'Learning', done: 'Done' };

  function topicRow(t, extra) {
    var st = S.topics[t.id] || {}, n = nextDue(t), chips = '';
    if (t.tools.length) chips += '<span class="chip tool">' + t.tools.length + (t.tools.length > 1 ? ' tools' : ' tool') + '</span>';
    if (n && n.late >= 0) chips += '<span class="chip due">review due</span>';
    if (st.status && st.status !== 'new') chips += '<span class="chip ' + st.status + '">' + STATUS[st.status] + '</span>';
    return '<li><a class="row" href="#/t/' + t.id + '"><span class="nm"><b>' + esc(t.name) + '</b><span class="hint">' + esc(extra || ('Day ' + t.day)) + '</span></span><span class="chips">' + chips + '</span></a></li>';
  }

  /* ---------- views ---------- */
  function home() {
    var due = dueList(), done = 0, withTools = 0;
    TOP.forEach(function (t) { if ((S.topics[t.id] || {}).status === 'done') done++; if (t.tools.length) withTools++; });
    var h = '<div class="wrap"><div class="top"><div><h1>RMO Revision</h1><p class="hint">' + TOP.length + ' topics · ' + withTools + ' with interactive tools · ' + done + ' done</p></div><a class="btn small" href="#/log">Error log</a></div>';
    h += '<div class="card"><h2>Due for review</h2>';
    if (due.length) {
      h += '<ul class="list">' + due.slice(0, 12).map(function (x) {
        var late = x.n.late === 0 ? 'due today' : x.n.late + (x.n.late === 1 ? ' day late' : ' days late');
        return topicRow(x.t, 'Day-' + x.n.k + ' review · ' + late);
      }).join('') + '</ul>' + (due.length > 12 ? '<p class="hint">and ' + (due.length - 12) + ' more</p>' : '');
    } else {
      h += '<p class="hint">Nothing due. After you study a topic, open it and press "Studied today". Reviews appear here at 1, 3, 7, 14 and 28 days.</p>';
    }
    h += '</div>';
    h += '<div class="field"><span>Search topics</span><input type="search" id="q" placeholder="e.g. fibrillation, sepsis, croup" autocomplete="off"></div><div id="results"></div>';
    h += '<div class="grid">' + SYS.map(function (s) {
      var ts_ = TOP.filter(function (t) { return t.system === s.id; }), dn = ts_.filter(function (t) { return (S.topics[t.id] || {}).status === 'done'; }).length;
      var tl = ts_.filter(function (t) { return t.tools.length; }).length;
      return '<a class="sys" href="#/s/' + s.id + '"><b>' + esc(s.name) + '</b><span class="hint">' + ts_.length + ' topics' + (tl ? ' · ' + tl + ' with tools' : '') + '</span><div class="bar"><i style="width:' + (ts_.length ? dn / ts_.length * 100 : 0) + '%"></i></div><span class="hint">' + dn + ' of ' + ts_.length + ' done</span></a>';
    }).join('') + '</div>';
    h += '<p class="hint"><a href="#/settings">Backup and reset</a> · Study aid, not a clinical decision tool. Check every dose against eTG and your hospital guideline.</p></div>';
    return h;
  }
  function system(id) {
    var s = sysById(id); if (!s) return notFound();
    var list = TOP.filter(function (t) { return t.system === id; });
    return '<div class="wrap"><button class="back" data-go="#/">← All systems</button><h1>' + esc(s.name) + '</h1><div class="card"><ul class="list">' + list.map(function (t) { return topicRow(t); }).join('') + '</ul></div></div>';
  }
  function topic(id) {
    var t = byId(id); if (!t) return notFound();
    var s = sysById(t.system), st = ts(t.id), n = nextDue(t), dy = D.days[t.day] || {};
    var h = '<div class="wrap"><button class="back" data-go="#/s/' + t.system + '">← ' + esc(s.name) + '</button><div><p class="mono">' + esc(s.name) + (t.day ? ' · Plan day ' + t.day : '') + '</p><h1>' + esc(t.name) + '</h1></div>';
    if (t.tools.length) {
      h += '<div class="tools">' + t.tools.map(function (x, i) { return '<button class="toolbtn" data-go="#/tool/' + t.id + '/' + i + '"><b>' + esc(x.label) + '</b><span class="hint">' + esc(x.desc) + '</span></button>'; }).join('') + '</div>';
    }
    h += '<div class="card"><h2>Read</h2><div class="top"><span>' + (t.url ? 'Point of Care Medicine template' : esc(t.src || '')) + '</span>' + (t.url ? '<a class="btn small" href="' + esc(t.url) + '" target="_blank" rel="noopener">Open page</a>' : '') + '</div>' +
      (t.rch ? '<div class="top"><span>Royal Children\'s Hospital guidelines</span><a class="btn small" href="https://www.rch.org.au/clinicalguide/" target="_blank" rel="noopener">Open</a></div>' : '') +
      (t.pages ? '<p class="hint">Rosen and Barkin PDF pages ' + esc(t.pages) + '</p>' : '') +
      (dy.done ? '<div class="dd"><b>Done when (plan day ' + t.day + ')</b>' + esc(dy.done) + '</div>' : '') +
      (dy.dont ? '<div class="dd"><b>Do not</b>' + esc(dy.dont.replace(/^Don't /, '').replace(/^don't /, '')) + '</div>' : '') + '</div>';
    h += '<div class="card"><h2>Progress</h2><div class="field"><span>Status</span><select id="status">' + Object.keys(STATUS).map(function (k) { return '<option value="' + k + '"' + (st.status === k ? ' selected' : '') + '>' + STATUS[k] + '</option>'; }).join('') + '</select></div>';
    if (!st.studied) h += '<p class="hint">Press the button when you finish studying. It starts the review schedule.</p><button class="btn primary" data-act="studied">Studied today</button>';
    else {
      h += '<p class="hint">First studied ' + nice(st.studied) + '. Tick each review when you have done it from memory.</p><div class="sched">' + INT.map(function (k) {
        var due = addDays(st.studied, k), isDone = !!st.rev[k], late = diff(today(), due);
        var cls = isDone ? 'ok' : (late >= 0 && n && n.k === k ? 'due' : '');
        return '<label class="' + cls + '"><input type="checkbox" data-rev="' + k + '"' + (isDone ? ' checked' : '') + '><b>Day ' + k + '</b><span class="d">' + nice(due) + (isDone ? ' · done' : late >= 0 ? ' · due' : '') + '</span></label>';
      }).join('') + '</div><div><button class="btn small" data-act="restudy">Studied again today</button> <button class="btn small" data-act="unstudy">Clear</button></div>';
    }
    h += '</div>';
    var errs = S.errors.filter(function (e) { return e.topic === t.id; });
    h += '<div class="card"><h2>Error log</h2><p class="hint">Write what you got wrong and the fact that fixes it. Review these before your next test day.</p><form id="errform" class="field"><textarea id="errtext" placeholder="Wrong: gave IV diltiazem in EF 25%. Fix: no diltiazem or verapamil with LV systolic dysfunction; use amiodarone."></textarea><div><button class="btn primary small" type="submit">Add to log</button></div></form>' +
      errs.map(function (e) { return '<div class="entry"><span>' + esc(e.text) + '</span><span class="hint">' + nice(e.date) + ' · <button class="back" data-del="' + e.id + '">delete</button></span></div>'; }).join('') + '</div></div>';
    return h;
  }
  function tool(id, i) {
    var t = byId(id); if (!t || !t.tools[i]) return notFound();
    return '<div class="toolbar"><button class="back" data-go="#/t/' + t.id + '">← Back</button><b>' + esc(t.name + ' · ' + t.tools[i].label) + '</b></div><iframe class="frame" title="' + esc(t.tools[i].label) + '" src="tools/' + t.tools[i].file + '"></iframe>';
  }
  function log() {
    var h = '<div class="wrap"><button class="back" data-go="#/">← Home</button><h1>Error log</h1>';
    if (!S.errors.length) h += '<div class="card"><p class="hint">Nothing yet. Add entries from any topic page.</p></div>';
    else {
      var items = S.errors.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
      h += '<div class="card">' + items.map(function (e) {
        var t = byId(e.topic);
        return '<div class="entry"><a href="#/t/' + e.topic + '"><b>' + esc(t ? t.name : e.topic) + '</b></a><span>' + esc(e.text) + '</span><span class="hint">' + nice(e.date) + ' · <button class="back" data-del="' + e.id + '">delete</button></span></div>';
      }).join('') + '</div>';
    }
    return h + '</div>';
  }
  function settings() {
    return '<div class="wrap"><button class="back" data-go="#/">← Home</button><h1>Backup and reset</h1>' +
      '<div class="card"><h2>Your data</h2><p class="hint">Progress, review dates and the error log live only on this device. Export a copy now and then.</p><div class="top"><button class="btn primary" data-act="export">Export backup</button><label class="btn">Import backup<input type="file" id="imp" accept="application/json" hidden></label></div><p class="hint" id="msg"></p></div>' +
      '<div class="card"><h2>Reset</h2><p class="hint">Deletes all progress and the error log on this device.</p><div><button class="btn danger" data-act="reset" id="rst">Reset everything</button></div></div></div>';
  }
  function notFound() { return '<div class="wrap"><button class="back" data-go="#/">← Home</button><div class="card"><p>That page does not exist.</p></div></div>'; }

  /* ---------- router ---------- */
  var app = document.getElementById('app');
  function render() {
    var r = location.hash.replace(/^#\/?/, '').split('/'), h;
    app.className = '';
    if (r[0] === 's') h = system(r[1]);
    else if (r[0] === 't') h = topic(r[1]);
    else if (r[0] === 'tool') { h = tool(r[1], +r[2]); app.className = 'tool'; }
    else if (r[0] === 'log') h = log();
    else if (r[0] === 'settings') h = settings();
    else h = home();
    app.innerHTML = h;
    if (r[0] !== 'tool') window.scrollTo(0, 0);
    wire();
  }
  window.addEventListener('hashchange', render);

  function wire() {
    var q = document.getElementById('q');
    if (q) q.addEventListener('input', function () {
      var v = q.value.trim().toLowerCase(), box = document.getElementById('results');
      if (!v) { box.innerHTML = ''; return; }
      var m = TOP.filter(function (t) { return t.name.toLowerCase().indexOf(v) >= 0 || sysById(t.system).name.toLowerCase().indexOf(v) >= 0; }).slice(0, 15);
      box.innerHTML = '<div class="card">' + (m.length ? '<ul class="list">' + m.map(function (t) { return topicRow(t, sysById(t.system).name + ' · Day ' + t.day); }).join('') + '</ul>' : '<p class="hint">No topic matches.</p>') + '</div>';
    });
    var st = document.getElementById('status');
    if (st) st.addEventListener('change', function () { ts(topicId()).status = st.value; save(); });
    var f = document.getElementById('errform');
    if (f) f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = document.getElementById('errtext').value.trim(); if (!v) return;
      S.errors.push({ id: String(Date.now()), topic: topicId(), text: v, date: today() }); save(); render();
    });
    var imp = document.getElementById('imp');
    if (imp) imp.addEventListener('change', function () {
      var file = imp.files[0]; if (!file) return;
      var rd = new FileReader();
      rd.onload = function () {
        try { var o = JSON.parse(rd.result); if (!o.topics || !o.errors) throw 0; S = o; save(); document.getElementById('msg').textContent = 'Backup imported.'; }
        catch (e) { document.getElementById('msg').textContent = 'That file is not a valid backup.'; }
      };
      rd.readAsText(file);
    });
  }
  function topicId() { return location.hash.replace(/^#\/?/, '').split('/')[1]; }

  app.addEventListener('click', function (e) {
    var b = e.target.closest('[data-go],[data-act],[data-del]');
    if (!b) return;
    if (b.hasAttribute('data-go')) { location.hash = b.getAttribute('data-go'); return; }
    if (b.hasAttribute('data-del')) { var id = b.getAttribute('data-del'); S.errors = S.errors.filter(function (x) { return x.id !== id; }); save(); render(); return; }
    var a = b.getAttribute('data-act'), t;
    if (a === 'studied' || a === 'restudy') { t = ts(topicId()); t.studied = today(); t.rev = {}; if (t.status === 'new') t.status = 'learning'; save(); render(); }
    else if (a === 'unstudy') { t = ts(topicId()); t.studied = null; t.rev = {}; save(); render(); }
    else if (a === 'export') {
      var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' }), u = URL.createObjectURL(blob), l = document.createElement('a');
      l.href = u; l.download = 'rmo-revision-backup-' + today() + '.json'; document.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 1000);
    }
    else if (a === 'reset') {
      if (b.getAttribute('data-sure') !== '1') { b.setAttribute('data-sure', '1'); b.textContent = 'Press again to confirm'; return; }
      S = { topics: {}, errors: [] }; save(); location.hash = '#/'; render();
    }
  });
  app.addEventListener('change', function (e) {
    var c = e.target.closest('[data-rev]'); if (!c) return;
    var t = ts(topicId()), k = c.getAttribute('data-rev');
    if (c.checked) t.rev[k] = true; else delete t.rev[k];
    var all = INT.every(function (x) { return t.rev[x]; });
    if (all) t.status = 'done';
    save(); render();
  });

  render();
  if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
})();
