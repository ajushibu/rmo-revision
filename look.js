/* Look (theme) for the app and every study tool. Loaded in <head> so the first paint is already themed.
   Choice is per device: localStorage 'rmo-look' = auto | night | paper | classic.
   auto = Chart paper when the device is in light mode, Night ward when it is in dark mode. */
(function () {
  var KEY = 'rmo-look', d = document.documentElement, mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  var BAR = { night: '#0D1518', paper: '#F2F4F1', classicl: '#F5F7FA', classicd: '#12181F' };
  function pref() { try { var v = localStorage.getItem(KEY); return v === 'night' || v === 'paper' || v === 'classic' ? v : 'auto'; } catch (e) { return 'auto'; } }
  function sysDark() { return !!(mq && mq.matches); }
  function apply() {
    var p = pref(), look = p === 'auto' ? (sysDark() ? 'night' : 'paper') : p;
    var dark = look === 'night' || (look === 'classic' && sysDark());
    d.setAttribute('data-look', look);
    d.setAttribute('data-theme', dark ? 'dark' : 'light'); // study tools switch their own light and dark colours on this
    var bar = look === 'classic' ? (dark ? BAR.classicd : BAR.classicl) : BAR[look];
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < metas.length; i++) { metas[i].removeAttribute('media'); metas[i].setAttribute('content', bar); }
  }
  apply();
  if (mq) { if (mq.addEventListener) mq.addEventListener('change', apply); else if (mq.addListener) mq.addListener(apply); }
  window.addEventListener('storage', function (e) { if (e.key === KEY) apply(); });
  document.addEventListener('DOMContentLoaded', apply);
  /* Text size: localStorage 'rmo-fs' = 0.9 | 1 | 1.15 | 1.3, per device. Only the words scale: every font size in the app and the tools is
     calc(Npx * var(--fs,1)), and this file sets --fs on the page (app and each tool frame alike). Boxes and spacing stay the same. */
  var FS = 'rmo-fs';
  function fsPref() { var v = 1; try { v = parseFloat(localStorage.getItem(FS)) || 1; } catch (e) {} return v >= 0.8 && v <= 1.6 ? v : 1; }
  function applyFs() { var z = fsPref(); d.style.setProperty('--fs', z); d.setAttribute('data-fs', z === 1 ? '' : 'on'); }
  applyFs();
  window.addEventListener('storage', function (e) { if (e.key === FS) applyFs(); });
  window.RMOFont = { get: fsPref, set: function (v) { try { if (v === 1) localStorage.removeItem(FS); else localStorage.setItem(FS, String(v)); } catch (e) {} applyFs();
    try { Array.prototype.forEach.call(document.querySelectorAll('iframe'), function (f) { var w = f.contentWindow; if (w && w.RMOFont) w.RMOFont.apply(); }); } catch (e) {} }, apply: applyFs };
  window.RMOLook = { get: pref, set: function (v) { try { if (v === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {} apply(); }, apply: apply };
})();
