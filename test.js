const adBlockers = [
  {
    site: "https://greenhill.myschoolapp.com/app/student#studentmyday/progress",
    adText: "Conduct",
    addElementSelector:
      "#site-main > div > div > div > div.well.well-sm > label",
  },
];

adBlockers.forEach((adBlock) => {
  var adElementSelector = adBlock.adElementSelector;

  setInterval(function () {
    const t = document.querySelector(adElementSelector);

    t.innerText = "AHAHAH";

    alert("very good!");
  }, 1000);
});
