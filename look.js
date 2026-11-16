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
  window.RMOLook = { get: pref, set: function (v) { try { if (v === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {} apply(); }, apply: apply };
})();
