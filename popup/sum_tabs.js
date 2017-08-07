function handleResponse(msg) {
  document.getElementById("current-window").textContent = msg.currentWindow;
  document.getElementById("all-windows").textContent = msg.allWindows;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

sending = browser.runtime.sendMessage({getTabCounters: true});
sending.then(handleResponse, handleError)
