chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status != "complete" || !tab.active) {
    return;
  }

  async function execute() {
    function isAroundPage() {
      return isMatch("around", "around.co", ["Continue in Browser"]);
    }

    function isAsanaPage() {
      return isMatch("asana", "asana.com", ["Opening link in Asana"]);
    }

    function isAWSPage() {
      return isMatch("aws", "awsapps.com", ["You may now close this browser"]);
    }

    function isFigmaPage() {
      return isMatch("figma", "figma.com", ["Open here instead"]);
    }

    function isLinearPage() {
      return isMatch("linear", "linear.app", [
        "The link was opened in the Linear app",
      ]);
    }

    function isMiroPage() {
      return isMatch("miro", "miro.com/app/board/", null);
    }

    function isNotionPage() {
      return isMatch("notion", "notion.so", ["Redirecting to your Notion app"]);
    }

    function isTeamsPage() {
      return isMatch("teams", "teams.live.com", ["Open your Teams app"]);
    }

    function isZoomPage() {
      return isMatch("zoom", "zoom.us", [
        "Your meeting has been launched",
        "on the dialog shown by your browser",
      ]);
    }

    async function isMatch(name, origin, searches) {
      const regex = new RegExp(`https://([a-z]*\\.)?${origin}`, "g");
      const isSiteActive = (await chrome.storage.local.get("sites")).sites[
        name
      ];

      return (
        isSiteActive &&
        window.location.href.match(regex) &&
        (searches == null ||
          searches.find((search) =>
            window.find(
              search,
              /* aCaseSensitive */ false,
              /* aBackwards */ false,
              /* aWrapAround */ true
            )
          ))
      );
    }

    const checks = [
      isAroundPage,
      isAsanaPage,
      isAWSPage,
      isFigmaPage,
      isLinearPage,
      isMiroPage,
      isNotionPage,
      isTeamsPage,
      isZoomPage,
    ];

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
        }, 1000);
      }
    });
});
