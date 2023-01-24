chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status != "complete" || !tab.active) {
    return;
  }

  async function execute() {
    function isAsanaPage() {
      return isMatch("asana", "asana.com", "Opening link in Asana");
    }

    function isNotionPage() {
      return isMatch("notion", "notion.so", "Redirecting to your Notion app");
    }

    function isZoomPage() {
      return isMatch("zoom", "zoom.us", "Your meeting has been launched");
    }

    async function isMatch(name, origin, search) {
      const regex = new RegExp(`https://[a-z]*\\.${origin}`);
      const isSiteActive = (await chrome.storage.local.get("sites")).sites[
        name
      ];

      return (
        isSiteActive &&
        window.location.origin.match(regex) &&
        window.find(
          search,
          /* aCaseSensitive */ false,
          /* aBackwards */ false,
          /* aWrapAround */ true
        )
      );
    }

    const checks = [isAsanaPage, isNotionPage, isZoomPage];

    for (let i = 0; i < checks.length; i++) {
      if (await checks[i]()) {
        return true;
      }
    }

    return false;
  }

  chrome.scripting
    .executeScript({
      target: { tabId, allFrames: true },
      func: execute,
    })
    .then((response) => {
      const { result } = response[0];
      if (result) {
        setTimeout(() => {
          chrome.tabs.remove(tabId);
          chrome.storage.local
            .get("tally")
            .then(({ tally }) =>
              chrome.storage.local.set({ tally: (tally || 0) + 1 })
            );
        }, 2000);
      }
    });
});
