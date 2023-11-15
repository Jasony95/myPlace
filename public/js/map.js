const form = document.querySelector("#marker-form")
const inputField = document.querySelector("#marker-name")

const addressForm = document.querySelector("#address-form")
const userCity = document.querySelector("#user-city")
const userState = document.querySelector("#user-state")


let clickedAreaLat
let clickedAreaLon
let currentMap


// https://nominatim.openstreetmap.org/search?addressdetails=1&q=city+state&format=jsonv2&limit=1
async function getCoords(city, state) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${city}+${state}&format=jsonv2&limit=1`
  const query = await fetch(apiUrl)
  const result = await query.json()
  console.log(result)
}


async function getAMap(address, markers = []) {
  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
  const query = await fetch(apiUrl)
  const result = await query.json()

  console.log(result)
  const lat = result[0].lat
  const lon = result[0].lon

  const center = [lat, lon]
  const zoom = 15

  // Initialize the map
  currentMap = L.map('map').setView(center, zoom);

  // Add the OpenStreetMap layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(currentMap);
  L.Control.geocoder().addTo(currentMap);

  if (markers && markers.length) {
    renderMarkers(markers);
  }

  // Listen for any clicks on the map so we can make a new marker
  currentMap.on("click", function (ev) {
    clickedAreaLat = ev.latlng.lat
    clickedAreaLon = ev.latlng.lng
    document.querySelector(".marker-form-container").style.display = "block"
  })
}

// Listen for when the user submits the name of the marker being created
form.addEventListener("submit", (event) => {
  event.preventDefault()

  console.log(inputField)

  const markerName = inputField.value
  console.log(markerName)

  console.log(clickedAreaLat)
  console.log(clickedAreaLon)

  // The render markers function expects an array, so we will take the new marker being made
  // and put it inside an array
  const newMarkerArr = [
    { lat: clickedAreaLat, lon: clickedAreaLon, marker_name: markerName }
  ]

  renderMarkers(newMarkerArr)
  sendMarkerToDB(clickedAreaLat, clickedAreaLon, markerName)
  document.querySelector(".marker-form-container").style.display = "none"
  inputField.value = ""
})


// This function will render out an array of markers provided to it
function renderMarkers(arrOfMarkers) {
  arrOfMarkers.forEach(markerData => {
    L.marker([markerData.lat, markerData.lon], {
      title: markerData.marker_name
    }).addTo(currentMap);
  })
}

// Submits new marker info to express
async function sendMarkerToDB(lat, lon, marker_name) {
  const query = await fetch("/api/marker", {
    method: "POST",
    body: JSON.stringify({
      lat,
      lon,
      marker_name
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
}



// // Sample of what we expect back from Express
// const fakeData = {
//   address: "8016 Caradoc Drive Baltimore MD 21237",
//   markers: [
//     { lat: "39.33038050574501", lon: "-76.50587081909181", marker_name: "Dad's house" }
//   ]
// }


// Make this an async function when you hook up to express
async function getMapAndMarkers() {
  const query = await fetch("/api/user/map")
  const data = await query.json()
  // data.payload will have the user info (incl. location, and the markers)
  console.log(data.payload)
  // if (data.payload.location) {
  //   getAMap("8016 Caradoc Drive Baltimore MD 21237", data.payload.Markers)
  // }
  getAMap("8016 Caradoc Drive Baltimore MD 21237", data.payload.Markers)
}


async function getUserLocation() {

}

addressForm.addEventListener("submit", async function (event) {
  const city = userCity.value;
  const state = userState.value;
  const location = city + ", " + state
  const query = fetch("/api/user/location", {
    method: "PUT",
    body: JSON.stringify({ location }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  getAMap(location)
})


getMapAndMarkers()

