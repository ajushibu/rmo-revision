/* Shared Study Kit engine. A kit page sets window.KIT and loads this file.
   KIT = { title, lede, flag, steps: [{ h, say, blocks: [...] }], opts: [[key, label]], items: [{ t, a, why }] }
   blocks: { say: html } | { p: html } | { table: { head: [..], rows: [[..]], aus: columnIndex } } | { rx: { h, items: [html], cls: 'stop' | 'warn', p: html } } */
(function () {
  var K = window.KIT, $ = function (s) { return document.querySelector(s); };
  document.title = K.title + ', step by step';
  $('#kt').textContent = K.title + ', one decision at a time'; $('#kl').textContent = K.lede; $('#kf').innerHTML = K.flag || '';
  var STEPS = K.steps.concat([{ h: 'Check yourself', drill: true }]);
  function block(b) {
    if (b.say) return '<p class="say">' + b.say + '</p>';
    if (b.p) return '<p>' + b.p + '</p>';
    if (b.table) {
      var t = b.table;
      return '<div class="scroll"><table><thead><tr>' + t.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
        t.rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return '<td' + (t.aus === i ? ' class="aus"' : '') + '>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    }
    if (b.rx) return '<div class="rx ' + (b.rx.cls || '') + '"><h3>' + b.rx.h + '</h3>' + (b.rx.p ? '<p>' + b.rx.p + '</p>' : '') + (b.rx.items ? '<ul class="tight">' + b.rx.items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '') + '</div>';
    if (b.embed) return (b.embed.title ? '<p class="hint"><b>' + b.embed.title + '</b></p>' : '') + '<iframe class="embf" src="' + b.embed.src + '" title="' + (b.embed.title || 'Interactive picture') + '" style="height:' + (b.embed.h || 480) + 'px"></iframe>';
    return '';
  }
  window.addEventListener('message', function (e) {
    var d = e.data; if (!d || typeof d.rmoEmbedH !== 'number') return;
    Array.prototype.forEach.call(document.querySelectorAll('iframe.embf'), function (f) { if (f.contentWindow === e.source) f.style.height = Math.ceil(d.rmoEmbedH) + 'px'; });
  });
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  var order = [], pos = 0, fc = 0, missed = [], ans = null, total = 0, n = 0;
  function startD(l) { order = shuffle(l.slice()); pos = 0; fc = 0; missed = []; ans = null; total = order.length; drawD(); }
  function drillHTML() {
    if (pos >= order.length) {
      var h = '<div class="say"><b>' + fc + ' of ' + total + '</b> right first time</div>';
      h += missed.length ? '<p class="hint">Missed: ' + missed.map(function (i) { return i.t; }).join(' / ') + '</p>' : '';
      return h + '<div class="btns">' + (missed.length ? '<button class="btn primary" data-act="missed">Practise the missed ones</button>' : '') + '<button class="btn" data-act="all">Again, all of them</button></div>';
    }
    var it = order[pos];
    return '<span class="mono">Scenario ' + (pos + 1) + ' of ' + order.length + '</span><div class="drill"><div class="item">' + it.t + '</div><div class="btns">' + K.opts.map(function (o) {
      var c = ''; if (ans) c = o[0] === it.a ? ' right' : o[0] === ans ? ' wrong' : '';
      return '<button class="btn' + c + '" data-ans="' + o[0] + '"' + (ans ? ' disabled' : '') + '>' + o[1] + '</button>';
    }).join('') + '</div><p class="fb ' + (ans ? (ans === it.a ? 'good' : 'bad') : '') + '" role="status">' + (ans ? (ans === it.a ? 'Right. ' : 'Not quite. ') + it.why : '') + '</p>' + (ans ? '<div class="btns"><button class="btn primary" data-act="next">' + (pos + 1 < order.length ? 'Next' : 'Finish') + '</button></div>' : '') + '</div>';
  }
  function drawD() { $('#dr').innerHTML = drillHTML(); }
  function draw() {
    var s = STEPS[n], h = '<span class="mono">Step ' + (n + 1) + ' of ' + STEPS.length + '</span><h2>' + s.h + '</h2>';
    if (s.drill) h += '<p class="hint">' + K.items.length + ' scenarios. Wrong ones come back.</p><div id="dr"></div>';
    else h += (s.say ? '<p class="say">' + s.say + '</p>' : '') + (s.blocks || []).map(block).join('<div style="height:12px"></div>');
    $('#stage').innerHTML = h;
    if (s.drill) startD(K.items);
    $('#dots').innerHTML = STEPS.map(function (x, i) { return '<i class="' + (i === n ? 'on' : '') + '"></i>'; }).join('');
    $('#back').disabled = n === 0; $('#next').disabled = n === STEPS.length - 1;
    if (n === STEPS.length - 1) { try { parent.postMessage({ rmoKitEnd: location.pathname }, '*'); } catch (e) {} } // last slide reached: the app ticks the kit
  }
  $('#stage').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || !$('#dr')) return;
    if (b.hasAttribute('data-ans') && !ans) { var it = order[pos], pick = b.getAttribute('data-ans'); if (pick === it.a) { if (missed.indexOf(it) < 0) fc++; } else if (missed.indexOf(it) < 0) missed.push(it); ans = pick; drawD(); }
    else if (b.getAttribute('data-act') === 'next') { pos++; ans = null; drawD(); }
    else if (b.getAttribute('data-act') === 'missed') startD(missed);
    else if (b.getAttribute('data-act') === 'all') startD(K.items);
  });
  function go(i) { n = Math.max(0, Math.min(STEPS.length - 1, i)); try { history.replaceState(null, '', '#' + (n + 1)); } catch (e) {} draw(); }
  $('#back').addEventListener('click', function () { go(n - 1); });
  $('#next').addEventListener('click', function () { go(n + 1); });
  var h0 = parseInt(location.hash.slice(1), 10); go(isNaN(h0) ? 0 : h0 - 1);
})();
