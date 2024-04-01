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
  return site.includes("green");
});

adBlocks.forEach((adBlock) => {
  var adText = adBlock.adText.split(",");
  var adTextContainer = adBlock.adTextContainer || "span";
  var adElementSelector = adBlock.adElementSelector;

  setInterval(function () {
    const t = document.querySelector(adElementSelector);

    alert("very good!");
  }, 1000);
});
