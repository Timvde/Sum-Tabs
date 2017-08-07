function handleResponse(msg) {
  document.getElementById("current-window").innerText = msg.currentWindow;
  document.getElementById("all-windows").innerText = msg.allWindows;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

sending = browser.runtime.sendMessage({getTabCounters: true});
sending.then(handleResponse, handleError)
