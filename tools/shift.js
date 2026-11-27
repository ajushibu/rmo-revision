/* Shared Easy-mode case player (multiple choice). A page sets window.KITFILE and loads cases/<topic>_shift.js first.
   Hard mode is ward.js on the companion <topic>_ward.html page; both read the same case file (a case with a `hard` block has both). */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var PTS = { best: 2, ok: 1, poor: 0, harm: -1 };
  var LABEL = { best: 'Best move', ok: 'Acceptable', poor: 'Poor choice', harm: 'Harmful' };
  var KIT = window.KITFILE || '';
  var WARDPAGE = (location.pathname.split('/').pop() || '').replace('_shift.html', '_ward.html');
  var RUN = false; try { RUN = new URLSearchParams(location.search).get('run') === 'today'; } catch (e) {}
  function getMode() { try { return localStorage.getItem('rmo-casemode') === 'hard' ? 'hard' : 'easy'; } catch (e) { return 'easy'; } }
  function setMode(m) { try { localStorage.setItem('rmo-casemode', m); } catch (e) {} }
  function modes() { try { return JSON.parse(localStorage.getItem('rmo-casemodes') || '{}') || {}; } catch (e) { return {}; } }
  function getCaseMode(id) { var m = modes()[id]; return m === 'hard' ? 'hard' : 'easy'; }
  function setCaseMode(id, m) { try { var o = modes(); o[id] = m; localStorage.setItem('rmo-casemodes', JSON.stringify(o)); } catch (e) {} setMode(m); }
  function hasHard(c) { return !!(c && c.hard && c.hard.steps && c.hard.steps.length); }
  function goHard(id) { location.href = WARDPAGE + (id ? '?case=' + encodeURIComponent(id) + (RUN ? '&run=today' : '') : ''); }
  function modeSeg(c) {
    var m = getCaseMode(c.id), ok = hasHard(c);
    return '<div class="modeseg" data-m="' + m + '" role="radiogroup" aria-label="Case mode"><button type="button" role="radio" data-mode="easy" data-id="' + c.id + '" aria-checked="' + (m === 'easy') + '">Easy</button><button type="button" role="radio" data-mode="hard" data-id="' + c.id + '" aria-checked="' + (m === 'hard') + '"' + (ok ? '' : ' disabled title="No Hard version yet"') + '>Hard</button></div>';
  }
  var CONCEPTS = window.RMO_CONCEPTS;
  var CASES = (window.RMO_CASES || []).filter(function (c) { return !c.retired; });

  /* ---------- state ---------- */
  var S = { mode: 'home', run: [], ci: 0, di: 0, vit: {}, facts: [], newFacts: [], order: [], picked: null, results: {}, t0: 0 };

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function merge(a, b) { var o = {}; for (var k in a) o[k] = a[k]; for (var k2 in b) o[k2] = b[k2]; return o; }
  function bestStore(id, val) { try { if (val !== undefined) { var cur = JSON.parse(localStorage.getItem('shift-best-' + location.pathname) || '{}'); if (cur[id] === undefined || val > cur[id]) { cur[id] = val; localStorage.setItem('shift-best-' + location.pathname, JSON.stringify(cur)); } } return JSON.parse(localStorage.getItem('shift-best-' + location.pathname) || '{}')[id]; } catch (e) { return undefined; } }

  /* ---------- monitor ---------- */
  function cls(k, v) {
    if (v === 0) return 'bad';
    if (k === 'spo2') return v < 88 ? 'bad' : v < 92 ? 'warn' : 'ok';
    if (k === 'hr') return v > 130 || v < 40 ? 'bad' : v > 100 ? 'warn' : 'ok';
    if (k === 'sbp') return v < 90 ? 'bad' : v < 100 ? 'warn' : 'ok';
    if (k === 'rr') return v > 30 ? 'bad' : v > 24 ? 'warn' : 'ok';
    return 'ok';
  }
  function monitorHTML(c) {
    var v = S.vit;
    var arrest = v.hr === 0;
    var dur = arrest ? 0 : Math.max(0.35, 60 / v.hr);
    return '<div class="monitor" aria-label="Bedside monitor"><div class="head"><span>' + c.where + '</span><span>' + c.time + '</span></div>' + (window.ecgTag ? ecgTag(v) : '') + '<div class="vit">' +
      '<div><span class="l"><i class="dot" style="' + (arrest ? 'animation:none;background:var(--mon-bad)' : 'animation-duration:' + dur.toFixed(2) + 's') + '"></i>HR</span><span class="v ' + cls('hr', v.hr) + '">' + (arrest ? '--' : v.hr) + '<span class="u">bpm</span></span></div>' +
      '<div><span class="l">BP</span><span class="v ' + cls('sbp', v.sbp) + '">' + (arrest ? '--/--' : v.sbp + '/' + v.dbp) + '<span class="u">mmHg</span></span></div>' +
      '<div><span class="l">SpO2</span><span class="v ' + cls('spo2', v.spo2) + '">' + (arrest ? '--' : v.spo2) + '<span class="u">%</span></span></div>' +
      '<div><span class="l">RR</span><span class="v ' + cls('rr', v.rr) + '">' + (arrest ? '--' : v.rr) + '<span class="u">/min</span></span></div>' +
      '</div></div>';
  }
  function chartHTML() {
    return '<div class="card chart"><span class="mono">Chart</span><ul>' +
      S.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('') +
      S.newFacts.map(function (f) { return '<li class="new">New: ' + f + '</li>'; }).join('') + '</ul></div>';
  }

  /* ---------- flow ---------- */

  /* ---------- report attempts to the app (synced, used for weak-point analysis) ---------- */
  var TOOL = (location.pathname.split('/').pop() || '').replace('.html', '');
  function report(c) {
    try {
      var r = S.results[c.id] || [], pts = 0;
      r.forEach(function (x) { pts += PTS[x.q]; });
      var rec = { id: 'a' + Date.now() + Math.random().toString(36).slice(2, 6), tool: TOOL, cs: c.id, title: c.title, at: Date.now(), pts: Math.max(0, pts), max: c.decisions.length * 2, mode: 'easy',
        d: r.map(function (x) { return { tag: x.tag, q: x.q, c: x.c }; }) };
      var q = JSON.parse(localStorage.getItem('rmo-attempt-queue') || '[]'); q.push(rec); localStorage.setItem('rmo-attempt-queue', JSON.stringify(q));
      if (window.parent !== window) window.parent.postMessage({ rmoAttempt: true }, location.origin);
    } catch (e) { /* storage blocked: attempt not recorded */ }
  }

  /* ---------- star a case: the next refresh writes similar new cases (synced through the app) ---------- */
  function starMap() { try { return JSON.parse(localStorage.getItem('rmo-stars') || '{}'); } catch (e) { return {}; } }
  var SEEN_FILE = TOOL.replace('_shift', '');
  function caseIsNew(id) { return /^c\d{8}/.test(String(id)); } // dated ids come from a case refresh
  function caseStatus(c, b) {
    if (b !== undefined) return '<p class="cs-played">Played. Best on this device: ' + b + '%</p>';
    return '<p class="cs-unplayed">' + (caseIsNew(c.id) ? 'New, not played yet' : 'Not played yet') + '</p>';
  }
  function starBtn(c) {
    var on = !!starMap()[TOOL + ':' + c.id];
    return '<button class="star" data-a="star" data-id="' + c.id + '" aria-pressed="' + on + '">' + (on ? '\u2605 Starred' : '\u2606 Star this case') + '</button>';
  }
  function toggleStar(id) {
    var c = CASES.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    try {
      var key = TOOL + ':' + id, m = starMap(), on = !m[key]; if (on) m[key] = 1; else delete m[key]; localStorage.setItem('rmo-stars', JSON.stringify(m));
      var q = JSON.parse(localStorage.getItem('rmo-star-queue') || '[]'); q.push({ id: key, on: on, t: Date.now(), tool: TOOL, title: c.title }); localStorage.setItem('rmo-star-queue', JSON.stringify(q));
      if (window.parent !== window) window.parent.postMessage({ rmoStar: true }, location.origin);
    } catch (e) { /* storage blocked: star not saved */ }
  }
  function start(idxs) {
    if (idxs.length === 1 && getCaseMode(CASES[idxs[0]].id) === 'hard' && hasHard(CASES[idxs[0]])) { goHard(CASES[idxs[0]].id); return; }
    S.run = idxs; S.ci = 0; S.results = {}; S.t0 = Date.now();
    startCase();
  }
  function startCase() {
    var c = CASES[S.run[S.ci]];
    S.di = 0; S.vit = merge({}, c.vit); S.facts = c.facts.slice(); S.newFacts = []; S.picked = null;
    S.results[c.id] = [];
    S.mode = 'intro'; render();
  }
  function beginDecision() {
    var c = CASES[S.run[S.ci]], d = c.decisions[S.di];
    if (d.vit) S.vit = merge(S.vit, d.vit);
    if (d.reveal) { S.facts = S.facts.concat(S.newFacts); S.newFacts = d.reveal.slice(); }
    else { S.facts = S.facts.concat(S.newFacts); S.newFacts = []; }
    S.order = shuffle(d.opts.map(function (o, i) { return i; }));
    S.picked = null; S.mode = 'decide'; render();
  }
  function pick(i) {
    var c = CASES[S.run[S.ci]], d = c.decisions[S.di], o = d.opts[i];
    if (S.picked !== null) return;
    S.picked = i;
    if (o.vit) S.vit = merge(S.vit, o.vit);
    if (o.reveal) { S.facts = S.facts.concat(S.newFacts); S.newFacts = o.reveal.slice(); }
    S.results[c.id][S.di] = { q: o.q, tag: d.tag, c: String(o.t).slice(0, 90) };
    render();
  }
  function next() {
    var c = CASES[S.run[S.ci]];
    if (S.di + 1 < c.decisions.length) { S.di++; beginDecision(); }
    else { S.mode = 'caseend'; report(c); render(); }
  }
  function caseScore(c) {
    var r = S.results[c.id] || [], pts = 0;
    r.forEach(function (x) { pts += PTS[x.q]; });
    return Math.max(0, pts);
  }
  function caseMax(c) { return c.decisions.length * 2; }
  function afterCase() {
    if (S.ci + 1 < S.run.length) { S.ci++; startCase(); } else { S.mode = 'debrief'; render(); }
  }

  /* ---------- views ---------- */
  function render() { render0(); resBar(); resSave(); }
  function render0() {
    var v = $('#view'), p = $('#progress');
    window.scrollTo(0, 0);
    if (S.mode === 'home') { p.textContent = ''; v.innerHTML = homeHTML(); return; }
    var c = CASES[S.run[S.ci]];
    if (S.mode === 'debrief') { p.textContent = 'Debrief'; v.innerHTML = debriefHTML(); return; }
    p.textContent = 'Case ' + (S.ci + 1) + ' of ' + S.run.length + (S.mode === 'decide' ? ' · Decision ' + (S.di + 1) + ' of ' + c.decisions.length : '');
    if (S.mode === 'intro') {
      v.innerHTML = '<div class="grid"><div class="col">' + monitorHTML(c) + chartHTML() + '</div><div class="col"><div class="card"><div class="casehead"><h2>' + c.title + '</h2>' + modeSeg(c) + '</div><div class="pager"><b>' + c.time + ' · ' + c.where.toUpperCase() + '</b><p style="margin:6px 0 0">' + c.intro + '</p></div><div class="btns" style="margin-top:14px"><button class="btn primary" data-a="go">Go to the bedside</button></div></div></div></div>';
      return;
    }
    if (S.mode === 'decide') {
      var d = c.decisions[S.di], o = S.picked !== null ? d.opts[S.picked] : null;
      var opts = S.order.map(function (i) {
        var oo = d.opts[i], chosen = S.picked === i;
        return '<button class="opt' + (chosen ? ' chosen ' + oo.q : '') + '" data-i="' + i + '"' + (S.picked !== null ? ' disabled' : '') + '>' + oo.t + '</button>';
      }).join('');
      var fb = '';
      if (o) {
        var last = (S.di + 1 === c.decisions.length);
        fb = '<div class="fb ' + o.q + '" role="status"><span class="tag">' + LABEL[o.q] + '</span><p>' + o.fb + '</p>' + bestHint(d, o) + '<button class="btn primary" data-a="next">' + (last ? 'Hand over' : 'Next') + '</button></div>';
      }
      v.innerHTML = '<div class="grid"><div class="col">' + monitorHTML(c) + chartHTML() + '</div><div class="col"><div class="card"><p class="scene">' + d.scene + '</p><div class="opts">' + opts + '</div>' + fb + '</div></div></div>';
      return;
    }
    if (S.mode === 'caseend') {
      var sc = caseScore(c), mx = caseMax(c), pct = Math.round(sc / mx * 100);
      var end = pct >= 80 ? c.ends.hi : pct >= 50 ? c.ends.mid : c.ends.lo;
      var bestPrev = bestStore(c.id, pct);
      v.innerHTML = '<div class="grid"><div class="col">' + monitorHTML(c) + chartHTML() + '</div><div class="col"><div class="card"><span class="mono">Handover</span><h2>' + c.title + '</h2><p class="big">' + pct + '%</p><p class="muted" style="margin:4px 0 12px">' + sc + ' of ' + mx + ' points' + (bestPrev !== undefined ? ' · best on this device ' + bestPrev + '%' : '') + '</p><p>' + end + '</p><div class="btns"><button class="btn primary" data-a="after">' + (S.ci + 1 < S.run.length ? 'Next case' : 'See debrief') + '</button></div><p style="margin:12px 0 0">' + starBtn(c) + '</p><p class="star-note">Star it to get more cases like this at the next refresh, even if you got it all right.</p></div></div></div>';
    }
  }
  function bestHint(d, o) {
    if (o.q === 'best') return '';
    var b = d.opts.filter(function (x) { return x.q === 'best'; })[0];
    return b ? '<p><b>Best move:</b> ' + b.t + '</p>' : '';
  }
  function homeHTML() {
    var cards = CASES.map(function (c, i) {
      var b = bestStore(c.id);
      return '<div class="case-card"><span class="mono">' + c.time + ' · ' + c.where + '</span>' + (b === undefined && caseIsNew(c.id) ? ' <span class="cs-new">New</span>' : '') + '<h3>' + c.title + '</h3><p>' + c.blurb + '</p>' + caseStatus(c, b) + '<div class="btns" style="margin-top:4px">' + modeSeg(c) + '<button class="btn" data-a="one" data-i="' + i + '">Play</button>' + starBtn(c) + '</div></div>';
    }).join('');
    return '<div class="card"><h2>You are the RMO on call</h2><p style="max-width:62ch">' + CASES.length + ' patients, ' + CASES.reduce(function (n, c) { return n + c.decisions.length; }, 0) + ' decisions. Make the call, see what it does to the monitor, and read why. Answers are shuffled each time, so you can replay. Close the Study Kit first: this is the test.</p>' + '<p class="muted modehint">Pick Easy (choose from options) or Hard (type your orders) on each case.</p><div class="btns"><button class="btn primary" data-a="all">Start the whole shift on Easy</button></div>' + '<div class="cases">' + cards + '</div></div>';
  }
  function debriefHTML() {
    var byTag = {}, tot = 0, mx = 0;
    S.run.forEach(function (ci) {
      var c = CASES[ci];
      (S.results[c.id] || []).forEach(function (r) {
        byTag[r.tag] = byTag[r.tag] || { p: 0, m: 0 };
        byTag[r.tag].p += Math.max(0, PTS[r.q]); byTag[r.tag].m += 2;
      });
      tot += caseScore(c); mx += caseMax(c);
    });
    var pct = Math.round(tot / mx * 100);
    var rows = Object.keys(byTag).map(function (k) {
      var x = byTag[k], f = Math.round(x.p / x.m * 100), cn = CONCEPTS[k];
      var cl = f >= 80 ? '' : f >= 50 ? 'mid' : 'low';
      return '<div class="row"><span class="name">' + cn.n + '</span><div class="meter"><i class="' + cl + '" style="width:' + f + '%"></i></div><span class="num">' + x.p + '/' + x.m + '</span>' +
        (f < 80 ? '<div class="revisit"><b>Revisit:</b> ' + cn.r + ' <a href="' + KIT + '#' + cn.tab + '" target="_blank" rel="noopener">Open in the Study Kit</a></div>' : '') + '</div>';
    }).join('');
    var verdict = pct >= 85 ? 'Solid. The pathway is in your head. Replay in two days to see what stuck.' : pct >= 60 ? 'Decent base with gaps. The red and amber bars below are your next study session.' : 'Not there yet, and that is useful to know. Work through the rows below, then replay.';
    return '<div class="card"><span class="mono">Shift debrief</span><p class="big" style="margin-top:6px">' + pct + '%</p><p class="muted" style="margin:4px 0 14px">' + tot + ' of ' + mx + ' points. ' + verdict + '</p>' + rows + '<div class="btns" style="margin-top:16px"><button class="btn primary" data-a="all">Replay the whole shift</button><button class="btn" data-a="home">Pick a case</button></div></div>';
  }

  $('#view').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    var a = b.getAttribute('data-a');
    if (b.hasAttribute('data-mode')) {
      var nm = b.getAttribute('data-mode'); if (b.disabled) return; setCaseMode(b.getAttribute('data-id'), nm);
      var cur = S.mode === 'intro' ? CASES[S.run[S.ci]] : null;
      if (nm === 'hard' && cur && hasHard(cur)) { goHard(cur.id); return; }
      render(); return;
    }
    if (b.classList.contains('opt')) { pick(Number(b.getAttribute('data-i'))); return; }
    if (a === 'all') start(CASES.map(function (c, i) { return i; }));
    else if (a === 'one') start([Number(b.getAttribute('data-i'))]);
    else if (a === 'go') beginDecision();
    else if (a === 'next') next();
    else if (a === 'after') afterCase();
    else if (a === 'home') { S.mode = 'home'; render(); }
else if (a === 'star') { toggleStar(b.getAttribute('data-id')); var on2 = !!starMap()[TOOL + ':' + b.getAttribute('data-id')]; b.setAttribute('aria-pressed', String(on2)); b.textContent = on2 ? '\u2605 Starred' : '\u2606 Star this case'; }
  });

  /* ---------- resume: keep the case across an app update, a tab change or the page being discarded ---------- */
  var RKEY = 'rmo-resume:' + location.pathname, RMAX = 12 * 3600 * 1000;
  function resClear() { try { localStorage.removeItem(RKEY); } catch (e) {} }
  function resLeave() { resClear(); S.mode = 'home';  render(); }
  var resT = 0;
  function resSoon() { clearTimeout(resT); resT = setTimeout(resSave, 0); }
  ['click', 'change', 'input', 'keyup'].forEach(function (ev) { document.addEventListener(ev, resSoon, true); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) resSave(); });
  window.addEventListener('pagehide', resSave);
  document.addEventListener('click', function (e) { var b = e.target.closest ? e.target.closest('[data-a="leave"]') : null; if (b) resLeave(); });
  function resBar() { var p = document.getElementById('progress'); if (p && S.mode === 'decide' || S.mode === 'caseend') p.insertAdjacentHTML('beforeend', ' <button type="button" class="link" data-a="leave">Leave case</button>'); }
  function resSave() {
    try {
      var c = CASES[S.run[S.ci]];
      if (!c || ['decide', 'caseend'].indexOf(S.mode) < 0) { if (S.mode === 'home' || S.mode === 'debrief') resClear(); return; }
      localStorage.setItem(RKEY, JSON.stringify({ t: Date.now(), id: c.id, S: JSON.parse(JSON.stringify(S)) }));
    } catch (e) { /* storage blocked: the case just will not resume */ }
  }
  function resRestore(want) {
    try {
      var o = JSON.parse(localStorage.getItem(RKEY) || 'null'); if (!o || Date.now() - o.t > RMAX || (want && want !== o.id)) return false;
      var c = CASES[(o.S.run || [])[o.S.ci]]; if (!c || c.id !== o.id || !c.decisions[o.S.di]) return false;
      for (var k in o.S) S[k] = o.S[k];
      render(); return true;
    } catch (e) { return false; }
  }
  (function () { // opened from Today's "New on-call cases": go straight into that case
    var want = null; try { want = new URLSearchParams(location.search).get('case'); } catch (e) {}
    var ix = -1; if (want) for (var k = 0; k < CASES.length; k++) if (CASES[k].id === want) ix = k;
    if (resRestore(want)) return;
    if (ix >= 0) start([ix]); else render();
  })();
})();
