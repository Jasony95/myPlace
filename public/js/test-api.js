// Global Variables

console.log("Testing Maptiler API");
var testApiSectionEl = $(".test-api-section");
var mapData = [];
var locations = "";
// in an async function, or as a 'thenable':
const result = await maptilerClient.geocoding.forward(`${locations}`);


import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import "@maptiler/geocoding-control/dist/style.css";


const apiKey = "j83Q2phuTZnW4K84vFTy";

const map = L.map('map').setView([44.9778, -93.2650], 14); //starting position
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=j83Q2phuTZnW4K84vFTy', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler </a>'
}).addTo(map);
L.Control.geocoder().addTo(map);
// const gc = new GeocodingControl({ apiKey });

// map.addControl(gc);
// L.control.maptilerGeocoding({ apiKey: j83Q2phuTZnW4K84vFTy }).addTo(map);

// Search parameters for address

const getMap = (address) => {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`, {
    body: JSON.stringify({

    }),
    method: "POST",
    header: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
}
getMap();
// API fetch
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

document.querySelector('.search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log(event.target)
  var cityInput = document.getElementById('search-input').value;
  getLatLon(cityInput)
  localStorage.setItem('weather', cityInput);
});
