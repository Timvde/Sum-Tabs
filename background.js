var tabsInWindow = {};
var tabsInAllWindows = 0;

function updateTabsInWindow(winId, n) {
  tabsInWindow[winId] = n;
}

function updateTabsInAllWindows(tabs) {
  tabsInAllWindows = tabs.length;
}

function updateBadge(winId) {
  // winId is -1 if no Firefox window has focus at all
  if (winId >= 0) {
    browser.browserAction.setBadgeText({text: String(tabsInWindow[winId])});
  }
}

function messageHandler(request, sender, sendResponse) {
  curr = browser.windows.getCurrent();
  curr.then(function(win) {
    sendResponse({currentWindow: tabsInWindow[win.id], allWindows: tabsInAllWindows})
  });
  // This is necessary to be able to send the response back asynchronously
  return true;
}

function initCounters() {
  current = browser.windows.getCurrent();
  current.then(function(curr) {
    all = browser.windows.getAll()
    all.then(function(wins) {
      wins.forEach(function(win) {
        tabs = browser.tabs.query({windowId: win.id});
        tabs.then(function(tabs) {
          updateTabsInWindow(win.id, tabs.length);
          if (win.id == curr.id) {
            updateBadge(win.id)
          }
        });
      });
    });
  });
  browser.tabs.query({}, updateTabsInAllWindows);
}

function increaseCounters(tab) {
  tabsInWindow[tab.windowId] += 1;
  updateBadge(tab.windowId);
  tabsInAllWindows += 1;
}

function decreaseCounters(tabId, removeInfo) {
  if (!removeInfo.isWindowClosing) {
    tabsInWindow[removeInfo.windowId] -= 1;
    updateBadge(removeInfo.windowId);
  }
  tabsInAllWindows -= 1;
}

function createWindow(win) {
  updateTabsInWindow(win.id, 1);
  updateBadge(win.id);
}

initCounters();

browser.runtime.onMessage.addListener(messageHandler);

browser.tabs.onCreated.addListener(increaseCounters);
browser.tabs.onRemoved.addListener(decreaseCounters);

browser.windows.onFocusChanged.addListener(updateBadge);
browser.windows.onCreated.addListener(createWindow);
