const formContainer = document.querySelector(".marker-form-container")
const form = document.querySelector("#marker-form")
const inputField = document.querySelector("#marker-name")

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


async function getAMap(address, markers) {
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

  renderMarkers(markers);

  // Listen for any clicks on the map so we can make a new marker
  currentMap.on("click", function (ev) {
    clickedAreaLat = ev.latlng.lat
    clickedAreaLon = ev.latlng.lng
    formContainer.style.display = "block"
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
  formContainer.style.display = "none"
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



// Sample of what we expect back from Express
const fakeData = {
  address: "8016 Caradoc Drive Baltimore MD 21237",
  markers: [
    { lat: "39.33038050574501", lon: "-76.50587081909181", marker_name: "Dad's house" }
  ]
}


// Make this an async function when you hook up to express
function getMapAndMarkers() {
  // const query = await fetch("/api/map")
  // const data = await query.json()
  getAMap(fakeData.address, fakeData.markers)
}


getMapAndMarkers()

