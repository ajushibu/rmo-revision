/* Shown inside a study kit step: add ?embed=<tab> (or ?embed=1 for a page with no tabs) to the page address.
   Hides the page title and tab bar, opens the named tab, follows dark mode, and tells the kit how tall the picture is.
   Load this last on a page, after its own scripts. Add ?intro=0 to hide the first card when the kit has already said it. */
(function () {
  var m = /[?&]embed=([\w-]+)/.exec(location.search); if (!m) return;
  var tab = m[1], de = document.documentElement, keepTabs = /[?&]tabs=1/.test(location.search); de.classList.add('emb');
  if (/[?&]intro=0/.test(location.search)) de.classList.add('noin');
  var st = document.createElement('style');
  st.textContent = 'html[data-theme="dark"]{color-scheme:dark}html.emb,html.emb body{background:transparent!important}' +
    'html.emb body{padding:4px 2px 8px!important;min-height:0!important}html.emb body>header,html.emb header:first-of-type,html.emb .back,html.emb .pagehead,html.emb body>h1,html.emb main>h1{display:none!important}' +
    'html.emb .foot summary{cursor:pointer;font-weight:600;margin-bottom:6px}html.noin .panel>.card:first-child{display:none}';
  document.head.appendChild(st);
  if (!keepTabs) { var st2 = document.createElement('style'); st2.textContent = 'html.emb .tabs,html.emb [role=tablist]{display:none!important}'; document.head.appendChild(st2); }
  function ready(f) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', f); else f(); }
  ready(function () {
    if (tab !== '1') {
      if (!document.querySelector('[role=tab][data-t="' + tab + '"]') && !document.getElementById('t-' + tab) && document.getElementById('t' + tab)) document.getElementById('t' + tab).click();
      var b = document.querySelector('[role=tab][data-t="' + tab + '"]') || document.getElementById('t-' + tab) || document.querySelector('[role=tab][aria-controls="p-' + tab + '"]');
      if (b) b.click();
    }
    var ft = document.querySelector('.foot, #foot');
    if (ft && !ft.querySelector('details')) ft.innerHTML = '<details><summary>How far to trust this picture</summary>' + ft.innerHTML + '</details>';
    var send = function () { try { parent.postMessage({ rmoEmbedH: document.body.offsetHeight, src: location.search }, '*'); } catch (e) {} };
    if (window.ResizeObserver) new ResizeObserver(send).observe(document.body);
    window.addEventListener('resize', send); send();
  });
})();
