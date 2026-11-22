/* For a study kit page that shows pictures in iframes (class "embf"): makes each frame as tall as the picture inside it.
   The picture page loads embed.js, which sends its height. */
window.addEventListener('message', function (e) {
  var d = e.data; if (!d || typeof d.rmoEmbedH !== 'number') return;
  Array.prototype.forEach.call(document.querySelectorAll('iframe.embf'), function (f) { if (f.contentWindow === e.source) f.style.height = Math.ceil(d.rmoEmbedH) + 'px'; });
});
