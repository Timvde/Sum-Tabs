// Source: https://bugs.chromium.org/p/chromium/issues/detail?id=115800#c17
window.onload = function() {
  [].forEach.call(document.querySelectorAll('[data-i18n]'), function(el) {
    el.innerHTML = browser.i18n.getMessage(el.getAttribute('data-i18n'));
  });
}

