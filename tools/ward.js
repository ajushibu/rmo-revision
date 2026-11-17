/* Order-sheet cases (CCS style). Needs window.RMO_ORDERS (orders.js) and window.WARD (a case file).
   Each step: you type orders into a search box, set doses, star the one you would do first, then sign.
   The case file grades each order for that step; anything it does not list counts as "not needed now".
   Missing a critical order or placing a harmful one sends the patient down the worse path. */
(function () {
  /* A topic case file (window.RMO_CASES) holds both modes: decisions = Easy, hard = this player. Build WARD from it. */
  if (!window.WARD && window.RMO_CASES) {
    window.WARD = { duo: true, concepts: {}, cases: window.RMO_CASES.filter(function (c) { return c.hard && c.hard.steps; }).map(function (c) {
      return { id: c.id, title: c.title, time: c.time, where: c.where, blurb: c.blurb, intro: c.intro, vit: c.vit, facts: c.facts, steps: c.hard.steps, debrief: c.hard.debrief || c.debrief, retired: c.retired };
    }) };
  }
  var W = window.WARD || { cases: [] }, CAT = window.RMO_ORDERS || [], BY = {};
  CAT.forEach(function (o) { BY[o.id] = o; });
  var CASES = W.cases.filter(function (c) { return !c.retired; });
  var TOOL = (location.pathname.split('/').pop() || '').replace('.html', '');
  var DUO = !!W.duo, BASE = TOOL.replace(/_ward$/, ''), SHIFTPAGE = BASE + '_shift.html';
  function getMode() { try { return localStorage.getItem('rmo-casemode') === 'hard' ? 'hard' : 'easy'; } catch (e) { return 'easy'; } }
  function setMode(m) { try { localStorage.setItem('rmo-casemode', m); } catch (e) {} }
  function modes() { try { return JSON.parse(localStorage.getItem('rmo-casemodes') || '{}') || {}; } catch (e) { return {}; } }
  function setCaseMode(id, m) { try { var o = modes(); o[id] = m; localStorage.setItem('rmo-casemodes', JSON.stringify(o)); } catch (e) {} setMode(m); }
  function modeSeg(c) { return DUO && c ? '<div class="modeseg" data-m="hard" role="radiogroup" aria-label="Case mode"><button type="button" role="radio" data-mode="easy" data-id="' + c.id + '" aria-checked="false">Easy</button><button type="button" role="radio" data-mode="hard" data-id="' + c.id + '" aria-checked="true">Hard</button></div>' : ''; }
  var $ = function (s) { return document.querySelector(s); };
  var view = $('#view'), prog = $('#progress');
  var PTS = { need: 2, good: 1, skip: -1, harm: -3 };
  /* The plan: the same three questions every step. Each is 1 point; wrong is -1 (the step total never goes below 0). */
  var PQ = [
    { k: 'call', q: 'Who do you call?', o: [['none', 'No one yet'], ['reg', 'Registrar'], ['icu', 'ICU outreach'], ['met', 'MET call']] },
    { k: 'monitor', q: 'How do you monitor?', o: [['routine', 'Routine obs'], ['q15', 'Obs every 15 min'], ['spo2', 'Continuous SpO2'], ['spo2ecg', 'SpO2 and ECG']] },
    { k: 'review', q: 'When do you review next?', o: [['m5', 'Within 5 min'], ['m20', 'In 20 min'], ['h1', 'In 1 hour'], ['h4', 'In 4 hours'], ['am', 'Next morning']] }
  ];
  /* Discharge steps: orders file themselves under the same five headings every time, so an empty heading is the cue. */
  var DH = [['meds', 'Medicines to go home on'], ['prevent', 'Prevent the next one'], ['follow', 'Follow-up'], ['teach', 'Teach and safety-net'], ['write', 'Write down for the next team']];
  function headName(id) { var h = BY[id] && BY[id].h, r = DH.filter(function (x) { return x[0] === h; })[0]; return r ? r[1] : ''; }
  function optName(k, v) { var q = PQ.filter(function (x) { return x.k === k; })[0], r = q.o.filter(function (x) { return x[0] === v; })[0]; return r ? r[1] : ''; }
  function nm(id) { return id === 'call' ? 'Make the call' : BY[id].n; }

  var S = { mode: 'home', ci: 0, si: 0, step: null, vit: {}, facts: [], newFacts: [], placed: [], plan: { call: null, monitor: null, review: null, callFirst: false }, hint: false, results: [], last: null, sel: 0 };

  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function merge(a, b) { var o = {}, k; for (k in a) o[k] = a[k]; for (k in b || {}) o[k] = b[k]; return o; }
  function best(id, v) {
    var key = 'ward-best-' + TOOL;
    try { var m = JSON.parse(localStorage.getItem(key) || '{}'); if (v !== undefined && (m[id] === undefined || v > m[id])) { m[id] = v; localStorage.setItem(key, JSON.stringify(m)); } return m[id]; } catch (e) { return undefined; }
  }

  /* ---------- monitor and chart (same look as the other cases) ---------- */
  function cls(k, v) {
    if (v === 0) return 'bad';
    if (k === 'spo2') return v < 88 ? 'bad' : v < 92 ? 'warn' : 'ok';
    if (k === 'hr') return v > 130 || v < 40 ? 'bad' : v > 100 ? 'warn' : 'ok';
    if (k === 'sbp') return v < 90 || v > 180 ? 'bad' : v < 100 || v > 160 ? 'warn' : 'ok';
    if (k === 'rr') return v > 30 || v < 10 ? 'bad' : v > 24 || v < 12 ? 'warn' : 'ok';
    return 'ok';
  }
  function monitor(c) {
    var v = S.vit, dur = Math.max(0.35, 60 / (v.hr || 60));
    return '<div class="monitor" aria-label="Bedside monitor"><div class="head"><span>' + esc(c.where) + '</span><span>' + esc(S.step ? S.step.time : c.time) + '</span></div>' + (window.ecgTag ? ecgTag(v) : '') + '<div class="vit">' +
      '<div><span class="l"><i class="dot" style="animation-duration:' + dur.toFixed(2) + 's"></i>HR</span><span class="v ' + cls('hr', v.hr) + '">' + v.hr + '<span class="u">bpm</span></span></div>' +
      '<div><span class="l">BP</span><span class="v ' + cls('sbp', v.sbp) + '">' + v.sbp + '/' + v.dbp + '<span class="u">mmHg</span></span></div>' +
      '<div><span class="l">SpO2</span><span class="v ' + cls('spo2', v.spo2) + '">' + v.spo2 + '<span class="u">%</span></span></div>' +
      '<div><span class="l">RR</span><span class="v ' + cls('rr', v.rr) + '">' + v.rr + '<span class="u">/min</span></span></div></div></div>';
  }
  function chart() {
    return '<div class="card chart"><span class="mono">Chart</span><ul>' + S.facts.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') +
      S.newFacts.map(function (f) { return '<li class="new">New: ' + esc(f) + '</li>'; }).join('') + '</ul></div>';
  }

  /* ---------- flow ---------- */
  function startCase(i) {
    var c = CASES[i]; S.ci = i; S.si = 0; S.results = []; S.vit = merge({}, c.vit); S.facts = c.facts.slice(); S.newFacts = []; S.last = null; S.active = []; S.carry = []; S.lastPlan = null; S.lastPlanDef = null;
    S.mode = 'intro'; S.step = null; render();
  }
  function stepAt(c, si, failed) { var st = c.steps[si]; return failed && st.alt ? st.alt : st; }
  function beginStep() {
    var c = CASES[S.ci], failed = S.last && !S.last.pass;
    S.step = stepAt(c, S.si, failed);
    S.facts = S.facts.concat(S.newFacts); S.newFacts = (S.step.reveal || []).slice();
    if (S.step.vit) S.vit = merge(S.vit, S.step.vit);
    S.carry = S.step.heads ? [] : (S.active || []).map(function (a) { return { id: a.id, dose: a.dose, time: a.time, dec: null, reord: false }; });
    S.placed = []; S.plan = { call: null, monitor: null, review: null, callFirst: false }; S.planKept = {}; S.hint = false; S.scope = null;
    // plan answers carry over when the right answer has not changed since the last step
    if (S.step.plan && S.lastPlan && S.lastPlanDef) PQ.forEach(function (q) {
      var a = S.step.plan[q.k], b = S.lastPlanDef[q.k], pick = S.lastPlan[q.k];
      var set = function (d) { return d ? d.best.concat(d.ok || []).slice().sort().join(',') : ''; };
      if (a && b && pick && set(a) === set(b)) { S.plan[q.k] = pick; S.planKept[q.k] = true; }
    });
    S.mode = 'order'; render();
    var q = $('#q'); if (q && !matchMedia('(hover: none)').matches) q.focus();
  }
  function placedIds() { return S.placed.map(function (p) { return p.id; }); }
  /* running orders from earlier steps: the doctor decides Keep or Stop on each */
  function carryOpen() { var ids = placedIds(); return (S.carry || []).filter(function (p) { return !p.reord && ids.indexOf(p.id) < 0; }); }
  function liveCarry() { return carryOpen().filter(function (p) { return p.dec === 'keep'; }); }
  /* cue rails: every order files under one of five prompts, so an empty prompt is the cue */
  var BK = [['treat', 'Treat now?', 'a drug, fluid or oxygen'], ['test', 'Tests?', 'a blood test, ECG or scan'], ['mon', 'Monitor and bedside?', 'an observation or bedside task'], ['stop', 'Stop or withhold?', 'a drug or fluid to stop'], ['call', 'Calls and referrals?', 'a team to call or a plan']];
  function bucket(id) {
    var o = BY[id]; if (!o) return 'treat';
    if (/^(stop|withhold|hold|cease)/i.test(o.n) || /(^stop_|_stop$|off$|^hold_)/.test(id)) return 'stop';
    return { 'Drugs': 'treat', 'Fluids': 'treat', 'Oxygen and breathing': 'treat', 'Bloods': 'test', 'Imaging and ECG': 'test', 'Bedside': 'mon', 'Calls and plans': 'call' }[o.c] || 'treat';
  }
  function grade() {
    var st = S.step, g = st.orders || {}, lines = [], pts = 0, max = 0, miss = [], pass = true, act = liveCarry(), ids = placedIds().concat(act.map(function (p) { return p.id; })), covered = {}, stoppedIds = {};
    Object.keys(g).forEach(function (id) {
      if (g[id].q !== 'need' && g[id].q !== 'good') return;
      // an order that is only an alternative to a need (e.g. ICU for a MET call) does not add to the maximum
      var isAltOnly = Object.keys(g).some(function (k) { return g[k].q === 'need' && (g[k].alt || []).indexOf(id) >= 0; });
      if (!isAltOnly) max += PTS[g[id].q];
    });
    if ((st.first || []).length) max += 2;
    if (st.plan) max += PQ.length;
    // which needs are satisfied by an alternative the doctor placed instead
    Object.keys(g).forEach(function (k) {
      if (g[k].q !== 'need' || ids.indexOf(k) >= 0) return;
      var a = (g[k].alt || []).filter(function (x) { return ids.indexOf(x) >= 0; })[0];
      if (a) covered[a] = k;
    });
    S.placed.concat(act.map(function (p) { return merge(p, { carried: true }); })).forEach(function (p) {
      var r = g[p.id], o = BY[p.id], q = r ? r.q : 'none', why = r ? r.why : 'Not needed at this point.', doseOk = true, got = 0;
      if (covered[p.id]) { q = 'need'; why = g[covered[p.id]].why; r = merge(r || {}, { d: r && r.d ? r.d : g[covered[p.id]].d }); }
      if (r && o.doses && r.d) doseOk = p.dose !== null && r.d.indexOf(p.dose) >= 0;
      if (p.carried && q !== 'need' && q !== 'good' && !covered[p.id]) {
        // kept an order this step does not want
        if (q === 'skip' || q === 'harm') { max += 1; pts -= 1; lines.push({ id: p.id, q: 'skip', why: 'Kept running, but it should stop now. ' + (r ? r.why : ''), dose: p.dose, doseOk: true, rightDose: null, carried: p.time, kept: true }); }
        else lines.push({ id: p.id, q: 'cont', why: 'Either is fine here.', dose: p.dose, doseOk: true, rightDose: null, carried: p.time, kept: true });
        return;
      }
      if (!p.carried && r && r.harmDose && p.dose !== null && r.harmDose.indexOf(p.dose) >= 0) { q = 'harm'; why = 'That dose or device is harmful here. ' + (r.why || ''); }
      if (q === 'need' || q === 'good') got = doseOk ? PTS[q] : Math.max(0, PTS[q] - 1);
      else if (q === 'skip') got = PTS.skip;
      else if (q === 'harm') { got = PTS.harm; pass = false; }
      if (q === 'good' && Object.keys(g).some(function (k) { return g[k].q === 'need' && (g[k].alt || []).indexOf(p.id) >= 0 && ids.indexOf(k) >= 0; })) got = 0; // both ordered: no double credit
      pts += got;
      lines.push({ id: p.id, q: q, why: why, dose: p.dose, doseOk: doseOk, rightDose: r && r.d && o.doses ? r.d.map(function (k) { return o.doses[k]; }) : null, first: p.first, carried: p.carried ? p.time : null });
    });
    carryOpen().filter(function (p) { return p.dec === 'stop'; }).forEach(function (p) {
      var r = g[p.id], q = r ? r.q : 'none'; stoppedIds[p.id] = 1;
      if (q === 'skip' || q === 'harm') { max += 1; pts += 1; lines.push({ id: p.id, q: 'stopok', why: r.why, dose: null, doseOk: true, rightDose: null, carried: p.time }); }
      else if (q === 'none') lines.push({ id: p.id, q: 'cont', why: 'Stopped. Either is fine here.', dose: null, doseOk: true, rightDose: null, carried: p.time });
    });
    Object.keys(g).forEach(function (id) {
      if (g[id].q !== 'need' && g[id].q !== 'good') return;
      if (ids.indexOf(id) >= 0) return;
      var viaAlt = (g[id].alt || []).some(function (x) { return ids.indexOf(x) >= 0; });
      var isAltOf = Object.keys(g).some(function (k) { return g[k].q === 'need' && (g[k].alt || []).indexOf(id) >= 0 && (ids.indexOf(k) >= 0 || (g[k].alt || []).some(function (x) { return ids.indexOf(x) >= 0; })); });
      if (viaAlt || isAltOf) return;
      miss.push({ id: id, q: g[id].q, why: g[id].why, crit: !!g[id].crit, stopped: !!stoppedIds[id] });
      if (g[id].crit) pass = false;
    });
    var planLines = [];
    if (st.plan) PQ.forEach(function (q) {
      var d = st.plan[q.k] || { best: [], ok: [] }, pick = S.plan[q.k], right = d.best.indexOf(pick) >= 0 || (d.ok || []).indexOf(pick) >= 0;
      pts += right ? 1 : -1;
      if (!right && d.crit) pass = false;
      planLines.push({ k: q.k, q: q.q, pick: pick, right: right, crit: !!(d.crit && !right), best: d.best.map(function (v) { return optName(q.k, v); }), also: (d.ok || []).map(function (v) { return optName(q.k, v); }), why: d.why || '' });
    });
    var fp = S.plan.callFirst ? { id: 'call' } : S.placed.filter(function (p) { return p.first; })[0], firstOk = null;
    if ((st.first || []).length) { firstOk = !!(fp && st.first.indexOf(fp.id) >= 0); if (firstOk) pts += 2; }
    if (S.hint) pts -= 2;
    var score = Math.max(0, Math.min(max, pts));
    return { lines: lines, plan: planLines, miss: miss, pass: pass, firstOk: firstOk, firstPick: fp ? fp.id : null, score: score, max: max, hint: S.hint, tag: st.tag, label: st.label };
  }
  function sign() {
    var und = carryOpen().filter(function (p) { return !p.dec; });
    if (und.length) { var ue = document.querySelector('[data-cid="' + und[0].id + '"]'); if (ue) { ue.classList.add('need'); ue.scrollIntoView({ block: 'center' }); } announce('Keep or stop: ' + BY[und[0].id].n); return; }
    if (!S.placed.length && !liveCarry().length) return;
    if (S.step.plan) {
      var gap = PQ.filter(function (q) { return !S.plan[q.k]; })[0];
      if (gap) { PQ.forEach(function (q) { var e = !S.plan[q.k] && document.querySelector('[data-pg="' + q.k + '"]'); if (e) e.classList.add('need'); }); var g = document.querySelector('[data-pg="' + gap.k + '"]'); if (g) { g.classList.add('need'); g.scrollIntoView({ block: 'center' }); var f0 = g.querySelector('input'); if (f0) f0.focus(); } announce('Answer: ' + gap.q); return; }
    }
    var unset = S.placed.filter(function (p) { return BY[p.id].doses && p.dose === null; });
    if (unset.length) { var el = document.querySelector('[data-dose="' + unset[0].id + '"]'); if (el) { el.focus(); el.classList.add('need'); } announce('Choose a dose for ' + BY[unset[0].id].n + ' first.'); return; }
    var r = grade(); S.last = r; S.results.push(r);
    if (S.step.plan) { S.lastPlan = merge({}, S.plan); S.lastPlanDef = S.step.plan; }
    if (!S.step.heads) {
      var keep = liveCarry().map(function (p) { return { id: p.id, dose: p.dose, time: p.time }; }), tm = S.step.time;
      S.placed.forEach(function (p) { keep.push({ id: p.id, dose: p.dose, time: tm }); });
      S.active = keep;
    }
    var out = r.pass ? S.step.ok : (S.step.miss || S.step.ok);
    if (out && out.vit) S.vit = merge(S.vit, out.vit);
    S.facts = S.facts.concat(S.newFacts); S.newFacts = (out && out.facts) || [];
    S.mode = 'result'; render();
  }
  function cont() {
    var c = CASES[S.ci];
    if (S.si + 1 < c.steps.length) { S.si++; beginStep(); } else { S.mode = 'end'; report(c); render(); }
  }
  function report(c) {
    try {
      var pts = 0, max = 0; S.results.forEach(function (r) { pts += r.score; max += r.max; });
      var rec = { id: 'a' + Date.now() + Math.random().toString(36).slice(2, 6), tool: TOOL, cs: c.id, title: c.title, at: Date.now(), pts: pts, max: max, mode: 'hard',
        d: S.results.map(function (r) { var f = r.max ? r.score / r.max : 0; return { tag: r.tag, q: f >= 0.8 ? 'best' : f >= 0.5 ? 'ok' : r.lines.some(function (l) { return l.q === 'harm'; }) ? 'harm' : 'poor', c: r.label || '', m: r.miss.map(function (x) { return x.id; }), x: r.lines.filter(function (l) { return l.q === 'harm' || l.q === 'skip'; }).map(function (l) { return l.id; }), pw: (r.plan || []).filter(function (l) { return !l.right; }).map(function (l) { return l.k + ':' + l.pick; }) }; }) };
      var q = JSON.parse(localStorage.getItem('rmo-attempt-queue') || '[]'); q.push(rec); localStorage.setItem('rmo-attempt-queue', JSON.stringify(q));
      if (window.parent !== window) window.parent.postMessage({ rmoAttempt: true }, location.origin);
    } catch (e) { /* storage blocked: not recorded */ }
  }

  /* ---------- search ---------- */
  function norm(t) { return String(t).toLowerCase().replace(/[^a-z0-9%.&/ ]+/g, ' '); }
  CAT.forEach(function (o) { o._h = ' ' + norm(o.n + ' ' + (o.s || '')) + ' '; o._n = norm(o.n); });
  function search(q) {
    q = norm(q).trim(); if (q.length < 2) return [];
    var toks = q.split(/\s+/);
    return CAT.filter(function (o) {
      if (S.placed.some(function (p) { return p.id === o.id; })) return false;
      if (S.scope && bucket(o.id) !== S.scope) return false;
      return toks.every(function (t) { return o._h.indexOf(' ' + t) >= 0; });
    }).sort(function (a, b) { return (b._n.indexOf(q) === 0) - (a._n.indexOf(q) === 0) || a.n.length - b.n.length; }).slice(0, 6);
  }
  function drawResults() {
    var q = $('#q'), ul = $('#ores'); if (!q || !ul) return;
    var res = search(q.value);
    if (S.sel >= res.length) S.sel = 0;
    ul.innerHTML = res.map(function (o, i) { var live = liveCarry().some(function (p) { return p.id === o.id; }); return '<li role="option" id="opt-' + o.id + '" data-add="' + o.id + '" aria-selected="' + (i === S.sel) + '" class="' + (i === S.sel ? 'on' : '') + '"><b>' + esc(o.n) + '</b><span>' + (live ? 'Already active: order again' : esc(o.c)) + '</span></li>'; }).join('') +
      (q.value.trim().length >= 2 && !res.length ? '<li class="none">No order by that name. Try another word, or browse.</li>' : '');
    ul.hidden = !q.value.trim();
    q.setAttribute('aria-expanded', String(!!res.length));
    q.setAttribute('aria-activedescendant', res[S.sel] ? 'opt-' + res[S.sel].id : '');
    ul._res = res;
  }
  function add(id) {
    if (!BY[id] || S.placed.some(function (p) { return p.id === id; })) return;
    (S.carry || []).forEach(function (p) { if (p.id === id) p.reord = true; });
    S.placed.push({ id: id, dose: BY[id].doses && BY[id].doses.length === 1 ? 0 : null, first: false });
    var q = $('#q'); if (q) q.value = ''; S.sel = 0; setScope(null);
    drawCarry(); drawPlaced(); drawResults(); if (q) q.focus();
    announce(BY[id].n + ' added.');
  }
  function announce(t) { var a = $('#announce'); if (a) { a.textContent = ''; setTimeout(function () { a.textContent = t; }, 30); } }
  function drawPlaced() {
    var ul = $('#placed'); if (!ul) return;
    $('#ocount').textContent = S.placed.length ? S.placed.length + (S.placed.length === 1 ? ' new order' : ' new orders') : (S.carry && S.carry.length ? 'No new orders yet' : 'No orders yet');
    var heads = !!(S.step && S.step.heads), rows = [];
    var rowHtml = function (p) {
      var o = BY[p.id];
      return '<li class="po' + (p.first ? ' isfirst' : '') + '"><b class="pon">' + esc(o.n) + '</b>' +
        '<button type="button" class="pfirst" data-first="' + p.id + '" aria-pressed="' + p.first + '" title="Do this first">' + (p.first ? 'First' : 'Do first?') + '</button>' +
        '<button type="button" class="prm" data-rm="' + p.id + '" aria-label="Remove ' + esc(o.n) + '">×</button>' +
        (o.doses ? '<select data-dose="' + p.id + '" aria-label="Dose for ' + esc(o.n) + '"><option value="">Choose dose and route</option>' + o.doses.map(function (d, i) { return '<option value="' + i + '"' + (p.dose === i ? ' selected' : '') + '>' + esc(d) + '</option>'; }).join('') + '</select>' : '') + '</li>';
    };
    if (!heads) ul.innerHTML = BK.map(function (bk) {
      var mine = S.placed.filter(function (p) { return bucket(p.id) === bk[0]; });
      return '<li class="hgrp cue' + (mine.length ? '' : ' empty') + '"><b>' + esc(bk[1]) + '</b><button type="button" class="cueadd" data-scope="' + bk[0] + '" aria-pressed="' + (S.scope === bk[0]) + '">' + (mine.length ? '+ More' : '+ Add') + '</button></li>' + mine.map(rowHtml).join('');
    }).join('');
    else {
      var groups = DH.concat([['', 'Other']]);
      ul.innerHTML = groups.map(function (g) {
        var mine = S.placed.filter(function (p) { return (BY[p.id].h || '') === g[0]; });
        if (!g[0] && !mine.length) return '';
        return '<li class="hgrp' + (mine.length ? '' : ' empty') + '"><b>' + esc(g[1]) + '</b><span>' + (mine.length ? mine.length : 'Nothing yet') + '</span></li>' + mine.map(rowHtml).join('');
      }).join('');
    }
    var sb = $('#sign'); if (sb) sb.disabled = !S.placed.length && !carryOpen().length;
  }
  function setScope(k) {
    S.scope = k; var q = $('#q'), chip = $('#scopechip');
    var bk = BK.filter(function (x) { return x[0] === k; })[0];
    if (q) q.placeholder = bk ? 'Type ' + bk[2] : 'Type a test, drug or action';
    if (chip) { chip.hidden = !bk; chip.innerHTML = bk ? esc(bk[1].replace('?', '')) + ' <button type="button" data-scope="" aria-label="Search all orders">×</button>' : ''; }
    document.querySelectorAll('[data-scope]').forEach(function (b) { if (b.getAttribute('data-scope')) b.setAttribute('aria-pressed', String(b.getAttribute('data-scope') === k)); });
  }
  function drawCarry() {
    var ul = $('#carry'); if (!ul) return;
    ul.innerHTML = (S.carry || []).map(function (p) {
      var o = BY[p.id], meta = 'Since ' + p.time + (o.doses && p.dose !== null && p.dose !== undefined ? ' · ' + o.doses[p.dose] : '');
      if (p.reord) return '<li class="po carried off"><b class="pon">' + esc(o.n) + '</b><span class="pmeta">Ordered again below</span></li>';
      return '<li class="po carried' + (p.dec === 'stop' ? ' off' : '') + '" data-cid="' + p.id + '"><b class="pon">' + esc(o.n) + '</b>' +
        '<span class="kseg" role="group" aria-label="Keep or stop ' + esc(o.n) + '"><button type="button" data-dec="keep" data-did="' + p.id + '" aria-pressed="' + (p.dec === 'keep') + '">Keep</button><button type="button" data-dec="stop" data-did="' + p.id + '" aria-pressed="' + (p.dec === 'stop') + '">Stop</button></span>' +
        '<span class="pmeta">' + esc(meta) + '</span></li>';
    }).join('');
    var left = carryOpen().filter(function (p) { return !p.dec; }).length, hc = $('#carryleft');
    if (hc) hc.textContent = left ? left + ' to decide' : 'All decided';
    var sb = $('#sign'); if (sb) sb.disabled = !S.placed.length && !carryOpen().length;
  }

  function drawPlan() {
    var box = $('#plan'); if (!box) return;
    box.innerHTML = PQ.map(function (q) {
      var cur = S.plan[q.k];
      if (S.planKept && S.planKept[q.k]) return '<div class="pkept"><span>' + esc(q.q) + '</span><b>' + esc(optName(q.k, cur)) + '</b><button type="button" class="link" data-pchange="' + q.k + '">Change</button></div>';
      return '<fieldset class="pq" data-pg="' + q.k + '"><legend>' + esc(q.q) + '</legend><div class="pchips">' + q.o.map(function (o) {
        return '<label class="pc"><input type="radio" name="pl-' + q.k + '" data-pk="' + q.k + '" value="' + o[0] + '"' + (cur === o[0] ? ' checked' : '') + '><span>' + esc(o[1]) + '</span></label>';
      }).join('') + (q.k === 'call' && cur && cur !== 'none' ? '<button type="button" class="pfirst" data-cfirst="1" aria-pressed="' + S.plan.callFirst + '" title="Do this first">' + (S.plan.callFirst ? 'First' : 'Do first?') + '</button>' : '') + '</div></fieldset>';
    }).join('');
  }

  /* ---------- views ---------- */
  function pips() {
    var c = CASES[S.ci], h = '';
    for (var i = 0; i < c.steps.length; i++) h += '<i class="' + (i < S.si ? 'done' : i === S.si ? 'now' : '') + '"></i>';
    return '<span class="pips" aria-hidden="true">' + h + '</span>';
  }
  function render() {
    window.scrollTo(0, 0);
    document.documentElement.setAttribute('data-mode', S.mode === 'home' ? 'home' : S.mode === 'order' ? 'decide' : S.mode);
    if (S.mode === 'home') { prog.textContent = ''; view.innerHTML = home(); return; }
    var c = CASES[S.ci];
    prog.innerHTML = 'Step ' + (S.si + 1) + ' of ' + c.steps.length + ' ' + pips();
    if (S.mode === 'intro') {
      prog.textContent = '';
      view.innerHTML = '<div class="grid"><div class="col">' + monitor(c) + chart() + '</div><div class="col"><div class="card"><div class="casehead"><h2>' + esc(c.title) + '</h2>' + modeSeg(c) + '</div><div class="pager"><b>' + esc(c.time + ', ' + c.where) + '</b><p>' + esc(c.intro) + '</p></div>' +
        '<p class="howto">Type to place orders, as in the eMR. Pick doses and star the one you would do first. Then answer the plan: who you call, how you monitor, when you review. The patient responds to what you order.</p><div class="btns"><button class="btn primary" data-a="go">Go to the bedside</button></div></div></div></div>';
      return;
    }
    if (S.mode === 'order') {
      var st = S.step;
      view.innerHTML = '<div class="grid"><div class="col">' + monitor(c) + chart() + '</div><div class="col"><div class="card order">' +
        (S.last && S.si > 0 ? '<p class="happened">' + esc((S.last.pass ? CASES[S.ci].steps[S.si - 1].ok : (CASES[S.ci].steps[S.si - 1].miss || CASES[S.ci].steps[S.si - 1].ok)).text) + '</p>' : '') +
        '<p class="when">' + esc(st.time + ' · ' + st.window) + '</p><p class="scene">' + esc(st.scene) + '</p>' +
        (S.carry && S.carry.length ? '<h3 class="acth">Running orders <em id="carryleft"></em><span>Keep what should carry on, stop what no longer fits. You score for each call.</span></h3><ul id="carry" class="placed"></ul>' : '') +
        '<div class="osearch"><label for="q">' + (S.carry && S.carry.length ? 'Anything new?' : 'Place an order') + ' <span id="scopechip" class="scopechip" hidden></span></label><input id="q" type="text" placeholder="Type a test, drug or action" autocomplete="off" autocapitalize="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-controls="ores" aria-expanded="false"><ul id="ores" role="listbox" hidden></ul></div>' +
        '<p class="browse"><button type="button" class="link" data-a="browse">' + (S.hint ? 'Browse orders (hint used)' : 'Stuck on a name? Browse orders (counts as a hint)') + '</button></p>' +
        '<h3 id="ocount"></h3>' + (st.heads ? '<p class="hnote">Discharge planning. Your orders file under these headings: fill every heading.</p>' : '') + '<ul id="placed" class="placed"></ul>' +
        (st.plan ? '<h3 class="plh">Your plan <span>' + (S.planKept && Object.keys(S.planKept).length ? 'Kept from the last step unless the situation changed' : 'Answer all three') + '</span></h3><div id="plan" class="plan"></div>' : '') +
        '<div class="btns signrow"><button class="btn primary" id="sign" data-a="sign" disabled>Sign orders</button></div><p class="sr" id="announce" aria-live="polite"></p></div></div></div>';
      drawCarry(); drawPlaced(); drawResults(); drawPlan();
      return;
    }
    if (S.mode === 'result') {
      var r = S.last, st2 = S.step, out = r.pass ? st2.ok : (st2.miss || st2.ok);
      var mark = { need: ['ok', 'Needed'], good: ['ok', 'Good'], skip: ['skip', 'Not needed'], none: ['none', 'Not needed now'], harm: ['harm', 'Harmful'], cont: ['none', 'Running order'], stopok: ['ok', 'Right to stop'] };
      var rows = r.lines.map(function (l) {
        var o = BY[l.id], m = mark[l.q], doseBit = '';
        if (o.doses && l.dose !== null) doseBit = '<span class="rdose' + (l.doseOk ? '' : ' bad') + '">' + esc(o.doses[l.dose]) + (l.doseOk ? '' : ': wrong dose. Right: ' + esc(l.rightDose.join(' or '))) + '</span>';
        return '<li class="rl ' + m[0] + (l.first ? ' wasfirst' : '') + '"><span class="rk">' + m[1] + (l.first ? ', your first' : '') + (l.carried && l.q !== 'cont' && l.q !== 'stopok' ? ' · kept from ' + esc(l.carried) : '') + '</span><b>' + esc(o.n) + '</b>' + doseBit + '<span class="rw">' + esc(l.why) + '</span></li>';
      }).join('');
      var missed = r.miss.map(function (m) { var o = BY[m.id]; return '<li class="rl ' + (m.q === 'need' ? 'miss' : 'also') + '"><span class="rk">' + (m.stopped ? 'You stopped it, but ' + (m.q === 'need' ? 'it is still needed' : 'it was worth keeping') : m.crit ? 'Missed, critical' : m.q === 'need' ? 'Missed' : 'Also worth doing') + (st2.heads && headName(m.id) ? ' · ' + esc(headName(m.id)) : '') + '</span><b>' + esc(o.n) + '</b>' + (st2.orders[m.id].d && o.doses ? '<span class="rdose">' + esc(st2.orders[m.id].d.map(function (k) { return o.doses[k]; }).join(' or ')) + '</span>' : '') + '<span class="rw">' + esc(m.why) + '</span></li>'; }).join('');
      var planRows = (r.plan || []).map(function (l) {
        var cl = l.right ? 'ok' : l.crit ? 'miss' : 'skip', tag = l.right ? 'Right' : l.crit ? 'Missed, critical' : 'Not best';
        return '<li class="rl ' + cl + '"><span class="rk">' + tag + ' · ' + esc(l.q) + '</span><b>' + esc(optName(l.k, l.pick)) + '</b><span class="rw">' + esc(l.why) + (l.right ? '' : ' Best: ' + esc(l.best.join(' or ')) + (l.also.length ? ' (also fine: ' + esc(l.also.join(', ')) + ')' : '') + '.') + '</span></li>';
      }).join('');
      var firstLine = r.firstOk === null ? '' : '<p class="fline ' + (r.firstOk ? 'ok' : 'bad') + '"><b>' + (r.firstOk ? 'Right first move.' : r.firstPick ? 'Not the first move.' : 'You did not star a first move.') + '</b> First: ' + esc(st2.first.map(nm).join(' or ')) + '. ' + esc(st2.firstWhy || '') + '</p>';
      var keyItems = [];
      r.miss.filter(function (m) { return m.crit; }).forEach(function (m) { keyItems.push({ c: 'miss', k: m.stopped ? 'You stopped it, but it is still needed (critical)' : 'Missed, critical', n: BY[m.id].n, w: m.why }); });
      r.lines.filter(function (l) { return l.q === 'harm'; }).forEach(function (l) { keyItems.push({ c: 'harm', k: 'Harmful', n: BY[l.id].n, w: l.why }); });
      r.miss.filter(function (m) { return !m.crit && m.q === 'need'; }).forEach(function (m) { keyItems.push({ c: 'miss', k: m.stopped ? 'You stopped it, but it is still needed' : 'Missed', n: BY[m.id].n, w: m.why }); });
      r.lines.filter(function (l) { return !l.doseOk; }).forEach(function (l) { keyItems.push({ c: 'skip', k: 'Wrong dose', n: BY[l.id].n, w: 'Right: ' + (l.rightDose || []).join(' or ') }); });
      r.lines.filter(function (l) { return l.kept && l.q === 'skip'; }).forEach(function (l) { keyItems.push({ c: 'skip', k: 'Should have stopped', n: BY[l.id].n, w: l.why }); });
      var more = keyItems.length > 3 ? keyItems.length - 3 : 0;
      var keyHtml = keyItems.length ? '<h3>Remember</h3><ul class="rlist">' + keyItems.slice(0, 3).map(function (x) { return '<li class="rl ' + x.c + '"><span class="rk">' + esc(x.k) + '</span><b>' + esc(x.n) + '</b><span class="rw">' + esc(x.w) + '</span></li>'; }).join('') + '</ul>' + (more ? '<p class="muted kmore">' + more + ' more in the full list below.</p>' : '') : '<p class="fline ok"><b>Nothing important missed.</b>' + (r.score < r.max ? ' The points you dropped are optional extras or plan answers: open Show everything to see them.' : '') + '</p>';
      var nAll = r.lines.length + r.miss.length + (r.plan || []).length;
      view.innerHTML = '<div class="grid"><div class="col">' + monitor(c) + chart() + '</div><div class="col"><div class="card result"><div class="rhead"><span class="rscore">' + r.score + '<i>/' + r.max + '</i></span><span>' + esc(st2.label || 'This step') + (r.hint ? ' · hint used' : '') + '</span></div>' +
        firstLine + keyHtml +
        '<div class="out ' + (r.pass ? 'good' : 'bad') + '"><b>' + (r.pass ? 'What happens next' : 'The patient gets worse') + '</b><p>' + esc(out.text) + '</p></div>' +
        '<details class="rall"><summary>Show everything (' + nAll + ')</summary>' +
        (rows ? '<h3>Your orders</h3><ul class="rlist">' + rows + '</ul>' : '') + (missed ? '<h3>Not ordered</h3><ul class="rlist">' + missed + '</ul>' : '') +
        (planRows ? '<h3>Your plan</h3><ul class="rlist">' + planRows + '</ul>' : '') +
        (st2.teach ? '<p class="teach">' + esc(st2.teach) + '</p>' : '') + '</details>' +
        '<div class="btns"><button class="btn primary" data-a="cont">' + (S.si + 1 < c.steps.length ? 'Next step' : 'Hand over') + '</button></div></div></div></div>';
      return;
    }
    if (S.mode === 'end') {
      var pts = 0, mx = 0; S.results.forEach(function (x) { pts += x.score; mx += x.max; });
      var pct = mx ? Math.round(pts / mx * 100) : 0, prev = best(c.id, pct);
      prog.textContent = 'Handover';
      view.innerHTML = '<div class="card endc"><span class="mono">Handover</span><h2>' + esc(c.title) + '</h2><p class="big">' + pct + '%</p><p class="muted">' + pts + ' of ' + mx + ' points' + (prev !== undefined ? ' · best on this device ' + prev + '%' : '') + '</p>' +
        '<ul class="steps">' + S.results.map(function (x, i) { var f = x.max ? Math.round(x.score / x.max * 100) : 0; return '<li><span>' + esc(x.label || 'Step ' + (i + 1)) + '</span><div class="meter"><i class="' + (f >= 80 ? '' : f >= 50 ? 'mid' : 'low') + '" style="width:' + f + '%"></i></div><span class="num">' + x.score + '/' + x.max + '</span></li>'; }).join('') + '</ul>' +
        revisit() + (c.debrief ? '<p>' + esc(c.debrief) + '</p>' : '') + (RUN && parentCases() ? (function () { var left = parentCases().left(BASE0 + ':' + c.id); return '<div class="btns"><button class="btn primary" data-a="nextcase">' + (left ? 'Next case (' + left + ' left)' : 'Done: back to Today') + '</button><button class="btn" data-a="replay">Replay this case</button></div></div>'; })() : '<div class="btns"><button class="btn primary" data-a="home">Pick a case</button><button class="btn" data-a="replay">Replay this case</button></div></div>');
    }
  }
  function revisit() {
    var CN = window.RMO_CONCEPTS; if (!CN) return '';
    var seen = {}, rows = S.results.filter(function (x) { return x.max && x.score / x.max < 0.8 && CN[x.tag] && !seen[x.tag] && (seen[x.tag] = 1); });
    if (!rows.length) return '';
    return '<h3>Revisit</h3><ul class="rlist">' + rows.map(function (x) { var cn = CN[x.tag]; return '<li class="rl miss"><span class="rk">' + esc(cn.n) + '</span><span class="rw">' + esc(cn.r) + (window.KITFILE ? ' <a href="' + esc(window.KITFILE) + '#' + esc(cn.tab) + '" target="_blank" rel="noopener">Open in the Study Kit</a>' : '') + '</span></li>'; }).join('') + '</ul>';
  }
  function home() {
    return '<div class="card"><h2>Order-sheet cases</h2>' + '<p class="lead">No options to pick from. Type what you would order, as you would on the ward: tests, drugs with doses, oxygen, calls. Star what you would do first, then sign. Miss something critical and the patient gets worse.</p><div class="cases">' +
      CASES.map(function (c, i) { var b = best(c.id); return '<div class="case-card"><span class="mono">' + esc(c.time + ' · ' + c.where) + '</span><h3>' + esc(c.title) + '</h3><p>' + esc(c.blurb) + '</p><p class="' + (b === undefined ? 'cs-unplayed' : 'cs-played') + '">' + (b === undefined ? 'Not played yet' : 'Best on this device: ' + b + '%') + '</p><div class="btns">' + modeSeg(c) + '<button class="btn" data-a="one" data-i="' + i + '">Play</button></div></div>'; }).join('') + '</div></div>';
  }
  function browse() {
    S.hint = true;
    var cats = []; CAT.forEach(function (o) { if (cats.indexOf(o.c) < 0) cats.push(o.c); });
    var d = document.createElement('div'); d.className = 'bwrap';
    d.innerHTML = '<div class="bback" data-a="bclose"></div><div class="bsheet" role="dialog" aria-modal="true" aria-label="Browse orders" tabindex="-1"><div class="bh"><b>Browse orders</b><button class="btn" data-a="bclose">Done</button></div>' +
      cats.map(function (k) { return '<h4>' + esc(k) + '</h4><div class="bl">' + CAT.filter(function (o) { return o.c === k; }).map(function (o) { var on = S.placed.some(function (p) { return p.id === o.id; }); return '<button type="button" class="bo' + (on ? ' on' : '') + '" data-add="' + o.id + '"' + (on ? ' disabled' : '') + '>' + esc(o.n) + '</button>'; }).join('') + '</div>'; }).join('') + '</div>';
    document.body.appendChild(d); d.querySelector('.bsheet').focus();
    var bl = document.querySelector('.browse .link'); if (bl) bl.textContent = 'Browse orders (hint used)';
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target, el;
    if ((el = t.closest('[data-add]'))) { add(el.getAttribute('data-add')); if (el.classList.contains('bo')) { el.disabled = true; el.classList.add('on'); } return; }
    if ((el = t.closest('[data-dec]'))) { var did = el.getAttribute('data-did'), dv = el.getAttribute('data-dec'); (S.carry || []).forEach(function (p) { if (p.id === did) p.dec = p.dec === dv ? null : dv; }); drawCarry(); drawPlaced(); return; }
    if ((el = t.closest('[data-scope]'))) { var sk = el.getAttribute('data-scope') || null; setScope(S.scope === sk ? null : sk); var qq = $('#q'); if (qq) { qq.focus(); if (sk) qq.scrollIntoView({ block: 'center' }); } drawResults(); return; }
    if ((el = t.closest('[data-pchange]'))) { delete S.planKept[el.getAttribute('data-pchange')]; drawPlan(); return; }
    if ((el = t.closest('[data-rm]'))) { var id = el.getAttribute('data-rm'); S.placed = S.placed.filter(function (p) { return p.id !== id; }); (S.carry || []).forEach(function (p) { if (p.id === id) p.reord = false; }); drawCarry(); drawPlaced(); drawResults(); return; }
    if ((el = t.closest('[data-first]'))) { var f = el.getAttribute('data-first'); S.placed.forEach(function (p) { p.first = p.id === f ? !p.first : false; }); if (f) S.plan.callFirst = false; drawPlaced(); drawPlan(); return; }
    if ((el = t.closest('[data-cfirst]'))) { S.plan.callFirst = !S.plan.callFirst; if (S.plan.callFirst) S.placed.forEach(function (p) { p.first = false; }); drawPlaced(); drawPlan(); return; }
    if ((el = t.closest('button[data-mode]'))) { if (el.getAttribute('data-mode') === 'easy') { var cid = el.getAttribute('data-id'); if (cid) setCaseMode(cid, 'easy'); else setMode('easy'); var cc = cid ? { id: cid } : S.mode !== 'home' && CASES[S.ci]; location.href = SHIFTPAGE + (cc ? '?case=' + encodeURIComponent(cc.id) + (RUN ? '&run=today' : '') : ''); } return; }
    if (!(el = t.closest('[data-a]'))) return;
    var a = el.getAttribute('data-a');
    if (a === 'one') startCase(+el.getAttribute('data-i'));
    else if (a === 'go') beginStep();
    else if (a === 'sign') sign();
    else if (a === 'cont') cont();
    else if (a === 'home') { S.mode = 'home'; render(); }
    else if (a === 'replay') startCase(S.ci);
    else if (a === 'nextcase') { var P = parentCases(); if (P) P.next(BASE0 + ':' + CASES[S.ci].id); }
    else if (a === 'browse') browse();
    else if (a === 'bclose') { var w = document.querySelector('.bwrap'); if (w) w.remove(); var q = $('#q'); if (q) q.focus(); }
  });
  document.addEventListener('change', function (e) {
    var pk = e.target.getAttribute && e.target.getAttribute('data-pk');
    if (pk) { S.plan[pk] = e.target.value; if (pk === 'call' && e.target.value === 'none') S.plan.callFirst = false; var gp = document.querySelector('[data-pg="' + pk + '"]'); if (gp) gp.classList.remove('need'); drawPlan(); return; }
    var id = e.target.getAttribute && e.target.getAttribute('data-dose'); if (!id) return;
    S.placed.forEach(function (p) { if (p.id === id) p.dose = e.target.value === '' ? null : +e.target.value; });
    e.target.classList.remove('need');
  });
  document.addEventListener('input', function (e) { if (e.target.id === 'q') { S.sel = 0; drawResults(); } });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { var w = document.querySelector('.bwrap'); if (w) { w.remove(); return; } }
    if (e.target.id !== 'q') return;
    var ul = $('#ores'), res = (ul && ul._res) || [];
    if (e.key === 'ArrowDown') { e.preventDefault(); S.sel = Math.min(res.length - 1, S.sel + 1); drawResults(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); S.sel = Math.max(0, S.sel - 1); drawResults(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (res[S.sel]) add(res[S.sel].id); }
  });

  function parentCases() { try { return window.parent !== window && window.parent.RMOCases ? window.parent.RMOCases : null; } catch (e) { return null; } }
  var BASE0 = DUO ? BASE : TOOL;
  var RUN = false; try { RUN = new URLSearchParams(location.search).get('run') === 'today'; } catch (e) {}
  var want = null; try { want = new URLSearchParams(location.search).get('case'); } catch (e) {}
  var ix = -1; if (want) CASES.forEach(function (c, i) { if (c.id === want) ix = i; });
  if (ix >= 0) startCase(ix); else render();
})();
