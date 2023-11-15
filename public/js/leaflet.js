const formContainer = document.querySelector(".marker-form-container")
const form = document.querySelector("#marker-form")
const inputField = document.querySelector("#name-of-marker")

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
  const markerName = inputField.value.trim()
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


/*
  routes:

  when a new marker is being submitted   POST   /api/marker
    write a new marker record:
       lat
       lon
       marker_name
       user_id         (get from the session logged in user)

  when a map needs to be generated for the user:
     GET   /api/map
           the query should get back the user's map address plus all
           associated markers for that user

      User.find(req.session.user_id).include({ model: Marker })

*/






// // const key = 'j83Q2phuTZnW4K84vFTy';
// const map = L.map('map').setView([44.9778, -93.2650], 14); //starting position
// L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=j83Q2phuTZnW4K84vFTy', {
//   attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler </a>'
// }).addTo(map);
// // style: `https://apimaptiler.com/maps/streets-v2/style.json?key=${key}`

// L.Control.geocoder().addTo(map);

// const formContainer = document.querySelector(".marker-form-container")

// const form = document.querySelector("#marker-form")

// let clickedAreaLat
// let clickedAreaLon
// let currentMap

// const inputField = document.querySelector("#name-of-marker")


// async function getAMap(address, markers) {
//   const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
//   const query = await fetch(apiUrl)
//   const result = await query.json()

//   console.log(result)

//   const lat = result[0].lat
//   const long = result[0].lon
//   const center = [lat, lon]
//   const zoom = 15

//   currentMap = L.map('map').setView(center, zoom);

//   //osm layer
//   L.tileLayer('https://{s}')

//   // Listen for any clicks on map so we can make a new marker
//   currentMap.on("click", function (ev) {
//     console.log(ev)
//     clickedAreaLat = ev.latlng.lat
//     clickedAreaLon = ev.latlng.lng
//     formContainer.style.display = "block"
//   })
// }

// // Listen for when the user submits the name of the marker being created
// form.addEventListener("submit", (event) => {
//   event.preventDefault()
//   const markerName = inputField.value.trim()
//   console.log(markerName)

//   // L.marker([clickedAreaLat, clickedAreaLon], {
//   //   title: marker_name
//   // }).addTo(currentMap);
//   const newMarkerArr = [
//     { lat: clickedAreaLat, lon: clickedAreaLon, marker_name: markerName }
//   ]
//   renderMarkers(newMarkerArr)

//   sendMarkerToDB(clickedAreaLat, clickedAreaLon, markerName)
//   formContainer.style.display = "none"
//   inputField.value
// })

// // This function will render out an array of markers provided to it
// function renderMarkers(arrOfMarkers) {
//   arrOfMarkers.forEach(markerData => {
//     L.marker([markerData.lat, markerData.lon], {
//       title: markerData.marker_name
//     }).addTo(currentMap)
//   })
// }

// // Submits new marker info to Express
// async function sendMarkerToDB(lat, lon, marker_name) {
//   const query = await fetch("/api/marker", {
//     method: "POST",
//     body: JSON.stringify({
//       lat,
//       lon,
//       marker_name
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
// }

// // Sample of what we expect back from Express
// const fakeData = {
//   address: "8016 Caradoc Drive Baltimore MD 21237",
//   markers: [
//     { lat: "39.33038050574501", lon: "-76.", marker_name: "" }
//   ]
// }

// // Make this an async function when you hookup to express 
// function getMapAndMarkers() {
//   // const query = await fetch("/api/map") // look up map for user and markers
//   // const data = await query.json()
//   getAMap(data.address)
// }



// getMapAndMarkers()
// // getAMap("1234 Apple St. Baltimore MD")

// /* 
//   routes: 

//   when a new marker is being submitted        POST      /api/marker
//     write a new marker record :
//       lat
//       lon
//       marker_name
//       user_id       (get from session logged in user)

//   when a map needs to be generated for the user:
//     GET   /api/map
//           the query should get back the user's map address plus all associated markers for that user

//     User.find(req.session.user_id).include({ model: Marker}) user_id and foreign key