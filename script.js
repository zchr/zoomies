const SITES_KEY = "sites";

async function getSites() {
  const { sites } = await chrome.storage.local.get(SITES_KEY);

  if (sites == null) {
    chrome.storage.local.set({ [SITES_KEY]: {} });
    return {};
  }

  return sites;
}

async function init() {
  const sites = await getSites();

  // Mount tally
  const { tally } = await chrome.storage.local.get("tally");
  document.getElementById("tally").innerHTML = tally || 0;

  // Mount all checkboxes
  document.querySelectorAll("input[type=checkbox]").forEach((e) => {
    e.checked = sites[e.name];

    e.onchange = async function () {
      chrome.storage.local.set({
        [SITES_KEY]: {
          ...(await getSites()),
          [e.name]: this.checked,
        },
      });
    };
  });
}

init();
