// Global Variables

console.log("Testing Maptiler API");
var testApiSectionEl = $(".test-api-section");
var mapData = [];
var locations = "";

import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import "@maptiler/geocoding-control/dist/style.css";
import "maplibre-gl/dist/maplibre-gl.css";

const apiKey = "j83Q2phuTZnW4K84vFTy";

const map = new maplibregl.Map({
  container: "map", // id of HTML container element
  style: "https://api.maptiler.com/maps/streets/style.json?key=" + apiKey,
  center: [16.3, 49.2],
  zoom: 7,
});

const gc = new GeocodingControl({ apiKey, maplibregl });

map.addControl(gc);
L.control.maptilerGeocoding({ apiKey: j83Q2phuTZnW4K84vFTy }).addTo(map);
// Search parameters


fetch("https://api.maptiler.com/maps/streets-v2/style.json?key=j83Q2phuTZnW4K84vFTy", {
  body: JSON.stringify({
    //   grant_type: "client_credentials",
    //   client_id: "kc4h16jXNYvrs7zpk5mCcsXSpoFhyi9MzWT4vBKEKAJBH7AvCo",
    //   client_secret: "RakCkcJcS940lvljgmdeU4wkvkJpveHmSWg0cCvo"
  }),
  method: "POST",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    queryLocation();
  })

  .catch(error => console.error(error));

function queryLocation() {
  fetch(`https://api.maptiler.com/geocoding/${locations}.json?key=j83Q2phuTZnW4K84vFTy`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      locationData = data;

      renderLocationData();
    })
    .catch(error => console.error(error));
}

function renderLocationData() {
  var testApiSectionEl = $(".test-api-section");

  for (var i = (testApiSectionEl.children().length - 1); i > 0; i--) {
    testApiSectionEl.children().eq(i).remove();
  }

  for (var l = 0; l < locationData.locations.length; l++) {
    var nameEl = $('<h3>');
    nameEl.text(locationData.locations[l].name);
    testApiSectionEl.append(nameEl);
  }
}
http://localhost:3650/api/