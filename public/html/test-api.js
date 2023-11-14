// Global Variables

console.log("Testing Maptiler API");
var testApiSectionEl = $(".test-api-section");
var mapData = [];

// Search parameters


fetch("https://api.maptiler.com/maps/streets-v2/style.json?key=j83Q2phuTZnW4K84vFTy", {
  // body: JSON.stringify({
  //   grant_type: "client_credentials",
  //   client_id: "kc4h16jXNYvrs7zpk5mCcsXSpoFhyi9MzWT4vBKEKAJBH7AvCo",
  //   client_secret: "RakCkcJcS940lvljgmdeU4wkvkJpveHmSWg0cCvo"
  // }),
  // method: "POST",
  // headers: {
  //   "Content-type": "application/json; charset=UTF-8"
  // }
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
// .catch(error => console.error(error));