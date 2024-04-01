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
