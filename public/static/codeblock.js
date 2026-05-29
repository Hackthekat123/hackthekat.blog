window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('pre').forEach(function(pre) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;margin:1em 0';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
    var btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.style.cssText = 'position:absolute;top:6px;right:8px;background:#444;color:#fff;border:none;padding:3px 10px;border-radius:4px;font-size:.75em;cursor:pointer;opacity:.7';
    btn.onmouseenter = function(){ btn.style.opacity='1'; };
    btn.onmouseleave = function(){ btn.style.opacity='.7'; };
    btn.onclick = function() {
      var code = pre.querySelector('code');
      navigator.clipboard.writeText(code ? code.innerText : pre.innerText).then(function() {
        btn.textContent = 'Copied!';
        setTimeout(function(){ btn.textContent = 'Copy'; }, 2000);
      });
    };
    wrap.appendChild(btn);
  });
});
