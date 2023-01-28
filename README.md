# What / why

An extension to auto-close tabs after they open native apps. Useful for sites like Zoom & Notion that leave stale tabs open after their desktop app has launched.

- [Available as Chrome extension](https://chrome.google.com/webstore/detail/goodnight-tabs/paichadkkbhdmkngdmkgmefiabjjcaai)
- Firefox extension TBD ([GH issue](https://github.com/zchr/zoomies/issues/1))

![Screenshot of extension](https://lh3.googleusercontent.com/crv9VN20_Qj1s2o86GUwE5n-cgnupK3KLhWk6WiRoznxFhT1mb4sLAUZ9z5MXBJk9NEaR6x-Zg62oBrGUeVEyfNAvko=w640-h400-e365-rj-sc0x00ffffff)

# Currently works on

- Around ([around.co](https://around.co))
- Asana ([asana.com](https://asana.com))
- AWS ([awsapps.com](https://awsapps.com))
- Figma ([figma.com](https://figma.com))
- Miro ([miro.com](https://miro.com))
- Notion ([notion.so](https://notion.so))
- Slack ([slack.com](https://slack.com))
- Teams ([teams.live.com](https://teams.live.com))
- Zoom ([zoom.us](https://zoom.us))

# Changes / suggestions?

Feel free to [create an issue](https://github.com/zchr/zoomies/issues/new) with any suggestions. If there are other sites you'd want the extension to support, Please include:

- Url of the service
- A screenshot of the tab that you'd want closed (this way, we know what text / patterns on the page to match on)

## Adding a new services

Requires updates the following places:

1. Add new checkbox in `index.html`
2. Add new match function in `background.js`, and include function in the `checks` array
3. Add the domain to `manifest.json`
4. Add the domain to `README.md` (^^)
