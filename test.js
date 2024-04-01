const adBlockers = [
  {
    site: "https://greenhill.myschoolapp.com/app/student#studentmyday/progress",
    adText: "Conduct",
    addElementSelector:
      "#conduct > div.bb-tile-title > div.bb-tile-header-with-content > h2",
  },
];

const host = document.location.host.replace("www.", "");

const adBlocks = adBlockers.filter((adBlock) => {
  var site = adBlock.site.split(",");
  return site.includes(host);
});

adBlocks.forEach((adBlock) => {
  var adText = adBlock.adText.split(",");
  var adTextContainer = adBlock.adTextContainer || "span";
  var adElementSelector = adBlock.adElementSelector;

  setInterval(function () {
    var search = adText
      .map((adText) => "normalize-space()='" + adText + "'")
      .join(" or ");
    var xpath = "//" + adTextContainer + "[" + search + "]";
    var matchingElements = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    var nodes = [];
    var node;
    while ((node = matchingElements.iterateNext())) {
      nodes.push(node);
    }
    adBlockNodes(nodes, adElementSelector);
  }, 1000);
});

const adBlockNodes = (nodes, adElementSelector) => {
  for (let node of nodes) {
    let adstory = node.closest(adElementSelector);

    // Preventing same adstory to be handled more than once
    if (!adstory || adstory.getAttribute("adblocked") === "true") {
      continue;
    }

    // Preventing ad block inside ad block
    if (adstory.parentNode && parentIsAdBlocked(adstory.parentNode)) {
      continue;
    }

    adstory.setAttribute("adblocked", "true");

    let overlay = document.createElement("div");
    overlay.setAttribute(
      "style",
      `
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          position: absolute; left: 0; top: 0; right: 0; bottom: 0;
          background: linear-gradient(hsla(0,0%,100%,.9) 0%,#fff);
          z-index: 2147483647`
    );
    overlay.setAttribute("class", "adblock");
    let overlaytext = document.createElement("div");
    overlaytext.setAttribute(
      "style",
      `
          position: absolute; left: 20px; top: 30px;
          font-weight: bold;
          font-size: 24px;
          color:#444;`
    );
    overlaytext.innerText = "Ad";
    let overlaytextinner = document.createElement("div");
    overlaytextinner.setAttribute(
      "style",
      `
          font-weight: normal;
          margin-top: 10px;
          font-size: 16px;`
    );
    overlaytextinner.innerText = "Blocked by Hyperweb. Tap to show likely ad.";
    overlay.appendChild(overlaytext);
    overlaytext.appendChild(overlaytextinner);
    overlay.addEventListener("click", (e) => {
      if (adstory.getAttribute("adblock-protected") !== "true") {
        e.preventDefault();
        let ol = e.target.closest(".adblock");
        ol.parentElement.style.maxHeight = "none";
        ol.parentElement.style.overflow = "auto";
        ol.parentNode.removeChild(ol);
        adstory.setAttribute("adblock-protected", "true");
      }
    });
    if (
      adstory.querySelectorAll(".adblock").length === 0 &&
      adstory.getAttribute("adblock-protected") !== "true"
    ) {
      adstory.style.position = "relative";
      adstory.style.maxHeight = "120px";
      adstory.style.overflow = "hidden";
      adstory.insertBefore(overlay, adstory.firstChild);
    }
  }
};
