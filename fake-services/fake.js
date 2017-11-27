const express = require("express");
const fetch = require("node-fetch");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const app = express();

const path = "/fake-services";

app.get("/", async (req, res) => {
  res.json({ ok: "ok" });
});



function getPrices($, el) {
  let prices = [];
  $(el)
    .find("tr")
    .each(function(index) {
      if (index === 0) return;

      prices.push({
        price: String($($(this).children("td")[0]).text()).trim(),
        type: String($($(this).children("td")[1]).text()).trim()
      });
    });

  return prices;
}


const koskiPromise = ($, kosket) => new Promise((resolveMain) => {

  let kProm = [];

  $(kosket)
  .children("div")
  .each( async function() {

    kProm.push(
      new Promise(async (resolve) => {
        const name = String($($(this).find("h2")[0]).text()).trim();

        const prices = getPrices($, this);
        const address = name.split("kalastusl")[0];

        const gmaps = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?&address=${
            address
          }&key=AIzaSyCzVc8ifWAbcp1wUvn26IpmZWNn1-HA7IQ`
        );
        const gdata = await gmaps.json();

        const data = {
          name,
          prices,
          address,
          gdata
        };

        resolve(data);
      })
    )
  });

  Promise.all(kProm).then((kk) => {
    resolveMain(kk)
  })

});

app.get(`${path}/fishing/all-locations`, async (req, res) => {
  const d = await fetch(
    "http://kalastusluvat.kalapaikka.net/osta-kalastuslupa/#koskiluvat"
  );
  const t = await d.text();
  const { window } = new JSDOM(t);
  const $ = require("jQuery")(window);

  const kosket = $(".features_items")[1];
  const koskiArray = await koskiPromise($, kosket);



  res.json(koskiArray);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
