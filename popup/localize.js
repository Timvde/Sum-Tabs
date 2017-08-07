function apply_translation(tag_id, message_id) {
  document.getElementById(tag_id).innerText = browser.i18n.getMessage(message_id);
}

window.onload = function() {
  apply_translation("current-window-label", "currentWindow")
  apply_translation("all-windows-label", "allWindows")
}
