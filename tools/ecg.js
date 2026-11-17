/* Simulated single-lead (lead II) monitor strip for the case players.
   Synthetic: built from textbook waveform rules (P, QRS, ST, T, U, PR, QT, rate, regularity),
   not recorded from a patient and not checked by a cardiologist. It teaches pattern recognition,
   not exact millivolts. A case sets  vit.rhythm  (a key, optionally with +mods); the monitor draws
   the strip from  vit.rhythm  and  vit.hr, so it changes when an option changes either.
   Keys: sinus avb1 mob1 mob2 chb af afpre flutter svt vt tors vf asys pea sine hyperk1 hyperk2 stemi
   Mods: +st (ST elevation) +stdep +u (U wave) +pvc +lqt (long QT) +sqt (short QT) +wide */
(function () {
  'use strict';
  var TAU = Math.PI * 2;
  function g(t, c, a, s) { var d = (t - c) / s; return a * Math.exp(-0.5 * d * d); }
  function sig(x) { return 1 / (1 + Math.exp(-x)); }
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function rr() { return Math.random(); }

  /* base parameters: p = P amp (mV), pr = PR (s), qrs = QRS width (s), r = R amp, t = T amp, tw = T width as a fraction of QT,
     qtc = corrected QT (s), ra = beat-to-beat variation, st = ST shift (mV), u = U wave amp, pvc = chance of a ventricular ectopic */
  var BASE = {
    sinus:  { m: 'reg', p: 0.16, pr: 0.16, qrs: 0.09, r: 1.0, t: 0.32, tw: 0.095, qtc: 0.40, ra: 0.03 },
    avb1:   { m: 'reg', p: 0.16, pr: 0.30, qrs: 0.09, r: 1.0, t: 0.32, tw: 0.095, qtc: 0.40, ra: 0.03 },
    mob1:   { m: 'wen', p: 0.16, qrs: 0.09, r: 1.0, t: 0.30, tw: 0.095, qtc: 0.40 },
    mob2:   { m: 'm2',  p: 0.16, pr: 0.18, qrs: 0.12, r: 0.9, t: 0.22, tw: 0.1, qtc: 0.42 },
    chb:    { m: 'chb', p: 0.16, qrs: 0.11, r: 0.9, t: 0.2, tw: 0.1, qtc: 0.44 },
    af:     { m: 'irr', p: 0, qrs: 0.09, r: 1.0, t: 0.26, tw: 0.1, qtc: 0.40, fib: 0.045 },
    afpre:  { m: 'irr', p: 0, qrs: 0.13, r: 1.1, t: -0.3, tw: 0.1, qtc: 0.40, fib: 0.02, qv: 1, minrr: 0.2 },
    flutter:{ m: 'flut', p: 0, qrs: 0.09, r: 1.0, t: 0.15, tw: 0.1, qtc: 0.40 },
    svt:    { m: 'reg', p: 0, pr: 0.1, qrs: 0.08, r: 0.9, t: 0.1, tw: 0.1, qtc: 0.34, ra: 0.004, st: -0.1 },
    vt:     { m: 'vt' },
    tors:   { m: 'tors' },
    vf:     { m: 'vf' },
    asys:   { m: 'asys' },
    pea:    { m: 'reg', p: 0, pr: 0.16, qrs: 0.15, r: 0.5, t: -0.15, tw: 0.1, qtc: 0.44, ra: 0.08 },
    sine:   { m: 'sine' },
    hyperk1:{ m: 'reg', p: 0.12, pr: 0.18, qrs: 0.10, r: 0.95, t: 1.05, tw: 0.075, qtc: 0.38, ra: 0.03 },
    hyperk2:{ m: 'reg', p: 0.04, pr: 0.26, qrs: 0.15, r: 0.8, t: 0.85, tw: 0.075, qtc: 0.40, ra: 0.03 },
    stemi:  { m: 'reg', p: 0.16, pr: 0.16, qrs: 0.10, r: 1.0, t: 0.55, tw: 0.11, qtc: 0.42, ra: 0.03, st: 0.42 }
  };
  var ALIAS = { brady: 'sinus', tach: 'sinus', junc: 'sinus' };
  var MODS = {
    st: { st: 0.4 }, stdep: { st: -0.14 }, u: { u: 0.2 }, pvc: { pvc: 0.14 },
    lqt: { qtc: 0.55 }, sqt: { qtc: 0.31 }, wide: { qrs: 0.13 }, flat: { t: 0.04 }
  };

  function resolve(str) {
    var parts = String(str || '').split('+'), k = parts[0];
    if (ALIAS[k]) k = ALIAS[k];
    var b = BASE[k]; if (!b) return null;
    var o = { k: k }, i, j;
    for (j in b) o[j] = b[j];
    for (i = 1; i < parts.length; i++) if (MODS[parts[i]]) for (j in MODS[parts[i]]) o[j] = MODS[parts[i]][j];
    return o;
  }

  /* ---------- waveform generator ---------- */
  function Gen() { this.key = ''; this.hr = -1; this.W = []; this.bg = null; this.nv = 0; this.na = 0; this.ci = 0; this.def = null; this.f0 = 0; }

  Gen.prototype.set = function (key, hr, now) {
    if (key === this.key && hr === this.hr) return;
    var def = resolve(key);
    if (hr === 0 && def && /^(reg|irr|flut|wen|m2|chb)$/.test(def.m)) def = resolve('asys');
    this.key = key; this.hr = hr; this.def = def || resolve('asys');
    this.W = this.W.filter(function (w) { return (w.c !== undefined ? w.c : w.a0) < now - 0.05; });
    this.nv = now + 0.28; this.na = now + 0.12; this.ci = 0; this.f0 = now;
    this.rate = clamp(hr || 60, 20, 260);
  };

  Gen.prototype.beat = function (q0, o, rrv) {
    var W = this.W, qrs = o.qrs, r = o.r * (o.rv || 1), narrow = qrs < 0.11;
    var qt = clamp(o.qtc * Math.sqrt(clamp(rrv, 0.3, 1.6)), 0.16, 0.5);
    if (rrv < 0.5) qt = Math.min(qt, rrv * 0.72);
    if (o.p > 0 && o.pr) W.push({ c: q0 - o.pr + 0.045, a: o.p, s: 0.024 });
    W.push({ c: q0 + 0.006, a: -0.12 * r * (narrow ? 1 : 0.35), s: Math.max(0.006, qrs * 0.09) });
    W.push({ c: q0 + qrs * 0.42, a: r, s: qrs * (narrow ? 0.11 : 0.17) });
    W.push({ c: q0 + qrs * 0.8, a: -0.2 * r * (narrow ? 1 : 0.3), s: qrs * 0.1 });
    if (o.st) W.push({ box: 1, a0: q0 + qrs * 0.9, b0: q0 + qt * 0.8, a: o.st });
    W.push({ c: q0 + qt * 0.62 + (qrs - 0.09) * 0.35, a: o.t, s: o.tw * qt * (Math.abs(o.t) > 0.8 ? 0.95 : 1) });
    if (o.u) W.push({ c: q0 + qt + 0.11, a: o.u, s: 0.042 });
  };

  Gen.prototype.fill = function (upto) {
    var d = this.def, o, W = this.W, rrv, q0, n, i;
    if (!d) return;
    var base = 60 / this.rate;
    var guard = 0;
    switch (d.m) {
      case 'reg':
        while (this.nv < upto && guard++ < 50) {
          rrv = base * (1 + d.ra * (rr() * 2 - 1)); q0 = this.nv;
          o = Object.create(d); this.beat(q0, o, rrv);
          if (d.pvc && rr() < d.pvc && rrv > 0.45) {
            var pv = Object.create(d); pv.p = 0; pv.qrs = 0.15; pv.r = 1.1; pv.t = -0.45; pv.st = 0; pv.u = 0;
            this.beat(q0 + rrv * 0.62, pv, rrv * 0.62);
            this.nv = q0 + rrv * 2;
          } else this.nv = q0 + rrv;
        }
        break;
      case 'irr':
        while (this.nv < upto && guard++ < 50) {
          rrv = Math.max(d.minrr || 0.26, base * (0.5 + 1.0 * rr())); q0 = this.nv;
          o = Object.create(d); o.rv = 0.9 + 0.2 * rr();
          if (d.qv) o.qrs = 0.1 + 0.07 * rr();
          this.beat(q0, o, rrv); this.nv = q0 + rrv;
        }
        break;
      case 'flut':
        n = clamp(Math.round(300 / this.rate), 2, 6);
        while (this.nv < upto && guard++ < 50) {
          q0 = this.f0 + Math.ceil((this.nv - this.f0) / 0.2) * 0.2 + 0.085;
          o = Object.create(d); this.beat(q0, o, n * 0.2); this.nv = q0 + n * 0.2 - 0.02;
        }
        break;
      case 'wen': /* 4 P waves, 3 conducted, PR lengthening 0.16, 0.24, 0.32 then a dropped QRS */
        var a = 60 / (this.rate * 4 / 3), pr = [0.16, 0.25, 0.34];
        while (this.na < upto && guard++ < 50) {
          i = this.ci % 4; o = Object.create(d); o.pr = i < 3 ? pr[i] : 0.16;
          if (i < 3) this.beat(this.na + o.pr, o, a * 1.3);
          else W.push({ c: this.na + 0.045, a: d.p, s: 0.024 });
          this.na += a; this.ci++;
        }
        break;
      case 'm2': /* 3:2, fixed PR, the second P is not followed by a QRS (every third P) */
        var a2 = 60 / (this.rate * 3 / 2);
        while (this.na < upto && guard++ < 50) {
          i = this.ci % 3; o = Object.create(d);
          if (i < 2) this.beat(this.na + d.pr, o, a2 * 1.5);
          else W.push({ c: this.na + 0.045, a: d.p, s: 0.024 });
          this.na += a2; this.ci++;
        }
        break;
      case 'chb': /* atria at about 80 a minute, ventricles at their own slow escape rate, no relation */
        while (this.na < upto && guard++ < 50) { W.push({ c: this.na + 0.045, a: d.p, s: 0.024 }); this.na += 0.74 * (1 + 0.02 * (rr() * 2 - 1)); }
        guard = 0;
        while (this.nv < upto && guard++ < 50) {
          rrv = 60 / clamp(this.rate, 20, 55); o = Object.create(d); o.p = 0; this.beat(this.nv, o, rrv); this.nv += rrv * (1 + 0.02 * (rr() * 2 - 1));
        }
        break;
      case 'vt':
        rrv = 60 / clamp(this.rate, 120, 260);
        while (this.nv < upto && guard++ < 80) {
          q0 = this.nv; W.push({ c: q0 + 0.2 * rrv, a: 1.15, s: 0.13 * rrv }); W.push({ c: q0 + 0.62 * rrv, a: -0.8, s: 0.17 * rrv });
          this.nv += rrv * (1 + 0.01 * (rr() * 2 - 1));
        }
        break;
      case 'tors':
        rrv = 60 / clamp(this.rate, 190, 260);
        while (this.nv < upto && guard++ < 120) {
          q0 = this.nv; var e = Math.sin(TAU * q0 / 3.4); e = (e < 0 ? -1 : 1) * Math.max(0.18, Math.abs(e));
          W.push({ c: q0 + 0.2 * rrv, a: 1.15 * e, s: 0.13 * rrv }); W.push({ c: q0 + 0.62 * rrv, a: -0.8 * e, s: 0.17 * rrv });
          this.nv += rrv;
        }
        break;
      default: /* vf, asys, sine are drawn as a continuous signal */
        this.nv = upto + 1; this.na = upto + 1;
    }
  };

  Gen.prototype.value = function (t) {
    var d = this.def, v = 0, W = this.W, i, w;
    for (i = 0; i < W.length; i++) {
      w = W[i];
      if (w.box) { v += w.a * (sig((t - w.a0) / 0.012) - sig((t - w.b0) / 0.03)); }
      else if (Math.abs(t - w.c) < 6 * w.s) v += g(t, w.c, w.a, w.s);
    }
    switch (d && d.m) {
      case 'irr': v += (d.fib || 0) * (Math.sin(TAU * 5.3 * t + 1.1 * Math.sin(1.3 * t)) * 0.6 + Math.sin(TAU * 7.1 * t + 2 * Math.sin(0.7 * t)) * 0.4); break;
      case 'flut': { var ph = (((t - this.f0) / 0.2) % 1 + 1) % 1; v += 0.11 * (ph < 0.82 ? 1 - ph / 0.82 * 2 : -1 + (ph - 0.82) / 0.18 * 2); break; }
      case 'vf': {
        var s = 0; for (i = 1; i <= 5; i++) s += (0.5 + 0.5 * Math.sin(0.9 * t * i + i * 2.1)) * Math.sin(TAU * (2.6 + 1.1 * i + 0.9 * Math.sin(0.5 * t + i)) * t + i * 1.7);
        v += 0.3 * s; break;
      }
      case 'sine': { var x = TAU * clamp(this.rate, 30, 110) / 60 * t; v += 0.85 * (Math.sin(x) + 0.14 * Math.sin(2 * x)); break; }
      case 'asys': v += 0.012 * Math.sin(TAU * 0.25 * t) + 0.006 * Math.sin(TAU * 11 * t); break;
    }
    return v + 0.012 * Math.sin(TAU * 0.3 * t) + (d && d.m !== 'asys' ? 0.006 * Math.sin(TAU * 47 * t) : 0);
  };

  Gen.prototype.prune = function (t) {
    this.W = this.W.filter(function (w) { return (w.box ? w.b0 : w.c) > t - 1.5; });
  };

  /* ---------- drawing ---------- */
  var lastGen = null, prevCanvas = null, prevX = 0;
  var PX = 100, MV = 38, REDUCE = false;
  try { REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  function css() {
    if (document.getElementById('ecg-css')) return;
    var s = document.createElement('style'); s.id = 'ecg-css';
    s.textContent = '.ecg-wrap{position:relative;margin:2px 0 12px;border-top:1px solid var(--mon-line,#22323f);border-bottom:1px solid var(--mon-line,#22323f);' +
      'background-image:linear-gradient(var(--mon-line,#22323f) 1px,transparent 1px),linear-gradient(90deg,var(--mon-line,#22323f) 1px,transparent 1px);' +
      'background-size:20px 20px;background-position:0 0;opacity:1}' +
      '.ecg-wrap canvas{display:block;width:100%;height:96px}' +
      '.ecg-cap{position:absolute;left:6px;top:3px;font:10px/1 var(--mono,monospace);letter-spacing:.08em;color:var(--mon-dim,#6f8798)}';
    document.head.appendChild(s);
  }

  function mount(cv) {
    if (cv.getAttribute('data-on')) return; cv.setAttribute('data-on', '1');
    var key = cv.getAttribute('data-rhythm'), hr = parseInt(cv.getAttribute('data-hr'), 10);
    if (isNaN(hr)) hr = 60;
    var dpr = Math.min(2, window.devicePixelRatio || 1), W = Math.max(200, cv.clientWidth || 320), H = 96;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
    var col = '#5de08a';
    try { col = getComputedStyle(cv).getPropertyValue('--mon-ok').trim() || col; } catch (e) {}
    ctx.strokeStyle = col; ctx.lineWidth = 1.7; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    var gen = (prevCanvas && !prevCanvas.isConnected && lastGen) ? lastGen : new Gen(); lastGen = gen;
    var clock = performance.now() / 1000;
    var base = 62, x = 0, py = null, t0 = clock;
    gen.set(key, hr, clock);
    function yOf(t) { return base - clamp(gen.value(t), -1.0, 1.5) * MV; }
    if (prevCanvas && !prevCanvas.isConnected && prevCanvas.width === cv.width && prevX > 0) {
      try { ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(prevCanvas, 0, 0); ctx.restore(); x = prevX; t0 = clock - x / PX; } catch (e) {}
    }
    function advance(nx) {
      gen.fill(clock + W / PX + 1);
      if (nx > W) nx = W;
      ctx.clearRect(Math.floor(x), 0, Math.min(W, nx + 16) - Math.floor(x) + 1, H);
      ctx.beginPath();
      var i, y, i0 = Math.floor(x);
      for (i = i0; i <= Math.floor(nx); i++) {
        y = yOf(t0 + i / PX);
        if (i === i0) { if (py !== null) ctx.moveTo(i, py); else ctx.moveTo(i, y); } else ctx.lineTo(i, y);
        py = y;
      }
      ctx.stroke();
      x = nx;
    }
    if (REDUCE) {
      gen.fill(clock + W / PX + 1);
      ctx.beginPath(); var j, yy; for (j = 0; j <= W; j++) { yy = yOf(clock + j / PX); if (j) ctx.lineTo(j, yy); else ctx.moveTo(j, yy); }
      ctx.stroke(); prevCanvas = cv; prevX = W; return;
    }
    function frame(now) {
      if (!cv.isConnected) return;
      var c2 = now / 1000;
      if (c2 > clock) {
        clock = c2;
        var nx = (clock - t0) * PX;
        if (nx >= W) { advance(W); x = 0; py = null; t0 = clock; ctx.clearRect(0, 0, 16, H); }
        else advance(nx);
        prevCanvas = cv; prevX = x;
        gen.prune(clock - 1);
      }
      requestAnimationFrame(frame);
    }
    prevCanvas = cv; prevX = x;
    requestAnimationFrame(frame);
  }

  function scan() { var l = document.querySelectorAll('canvas.ecg:not([data-on])'), i; for (i = 0; i < l.length; i++) mount(l[i]); }

  function start() {
    css(); scan();
    try { new MutationObserver(scan).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  /* the case players call this when they build the monitor; nothing is drawn when a case sets no rhythm */
  window.ecgTag = function (v) {
    if (!v || !v.rhythm) return '';
    return '<div class="ecg-wrap"><span class="ecg-cap">II  25 mm/s  simulated</span><canvas class="ecg" data-rhythm="' + String(v.rhythm).replace(/[^a-z0-9+]/gi, '') + '" data-hr="' + (v.hr | 0) + '" role="img" aria-label="Simulated monitor strip, lead II"></canvas></div>';
  };
  window.ECG = { resolve: resolve, Gen: Gen, rhythms: Object.keys(BASE) };
})();
