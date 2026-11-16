/* On-call cases: presentation only. Watches the case view and (1) tells the stylesheet which screen is showing,
   (2) draws decision pips, (3) folds older chart notes on a phone, (4) brings the feedback into view after a choice. */
(function () {
  var d = document.documentElement, view = document.getElementById('view'), prog = document.getElementById('progress');
  if (!view) return;
  d.setAttribute('data-shift', '');
  var showAll = false, lastKey = '', busy = false;
  function phone() { return window.matchMedia && window.matchMedia('(max-width: 760px)').matches; }
  function mode() {
    if (view.querySelector('.case-card')) return 'home';
    if (view.querySelector('.pager')) return 'intro';
    if (view.querySelector('.opts')) return 'decide';
    if (view.querySelector('[data-a="after"]')) return 'caseend';
    return 'debrief';
  }
  function pips() {
    if (!prog || prog.querySelector('.pips')) return;
    var m = /Decision (\d+) of (\d+)/.exec(prog.textContent || ''); if (!m) return;
    var now = +m[1], n = +m[2], h = '';
    for (var i = 1; i <= n; i++) h += '<i class="' + (i < now ? 'done' : i === now ? 'now' : '') + '"></i>';
    var s = document.createElement('span'); s.className = 'pips'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = h; prog.appendChild(s);
  }
  function pager() {
    var b = view.querySelector('.pager b'), hs = view.querySelectorAll('.monitor .head span');
    if (b && hs.length === 2 && !b.getAttribute('data-ok')) { b.textContent = hs[1].textContent + ', ' + hs[0].textContent; b.setAttribute('data-ok', '1'); }
  }
  function fold() {
    var ul = view.querySelector('.chart ul'); if (!ul || ul.getAttribute('data-fold')) return;
    ul.setAttribute('data-fold', '1');
    var old = [].slice.call(ul.querySelectorAll('li:not(.new)'));
    if (!phone() || showAll || old.length <= 4) return;
    var hide = old.slice(0, old.length - 3);
    hide.forEach(function (li) { li.hidden = true; });
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'more'; btn.textContent = 'Show ' + hide.length + ' earlier notes';
    btn.addEventListener('click', function () { showAll = true; hide.forEach(function (li) { li.hidden = false; }); btn.remove(); });
    ul.parentNode.appendChild(btn);
  }
  function sync() {
    if (busy) return; busy = true;
    var m = mode(); d.setAttribute('data-mode', m);
    if (m === 'home' || m === 'intro') showAll = false;
    pips(); pager(); fold();
    var fb = view.querySelector('.fb'), key = m + '|' + (prog ? prog.textContent : '') + '|' + (fb ? 'fb' : '');
    if (key !== lastKey) {
      lastKey = key;
      if (fb && m === 'decide') {
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setTimeout(function () { try { fb.scrollIntoView({ block: phone() ? 'start' : 'nearest', behavior: reduce ? 'auto' : 'smooth' }); } catch (e) {} }, 60);
      }
    }
    busy = false;
  }
  new MutationObserver(sync).observe(view, { childList: true, subtree: true });
  if (prog) new MutationObserver(sync).observe(prog, { childList: true, characterData: true, subtree: true });
  sync();
})();
