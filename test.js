const adBlockers = [
  {
    site: "https://greenhill.myschoolapp.com/app/student#studentmyday/progress",
    adText: "Conduct",
    addElementSelector:
      "#site-main > div > div > div > div.well.well-sm > label",
  },
];

// const host = document.location.host.replace("www.", "");

// const adBlocks = adBlockers.filter((adBlock) => {
//   var site = adBlock.site.split(",");
//   return site.includes("green");
// });

adBlocks.forEach((adBlock) => {
  var adElementSelector = adBlock.adElementSelector;

  setInterval(function () {
    const t = document.querySelector(adElementSelector);

    t.innerText = "AHAHAH";

    alert("very good!");
  }, 1000);
});
