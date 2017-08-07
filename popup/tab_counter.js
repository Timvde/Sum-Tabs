function handleResponse(msg) {
  document.getElementById("current-window").innerHTML = msg.currentWindow;
  document.getElementById("all-windows").innerHTML = msg.allWindows;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

sending = browser.runtime.sendMessage({getTabCounters: true});
sending.then(handleResponse, handleError)
