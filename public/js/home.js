var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.querySelector(".modal-header span")
var addAddressForm = document.querySelector(".formbox")
var locationName = document.querySelector(".newName")
var locationAddress = document.querySelector(".newAddress")

buttonHide()

function buttonHide() {
  if (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    }
  }

  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    }
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}

addAddressForm?.addEventListener("submit", async function(e){
  e.preventDefault()

  if( !locationAddress.value.length ){
    return alert("Please specify your location.")
  }

  try {
    const query = await fetch("/api/user/location", {
      method: "PUT",
      body: JSON.stringify({
        locationName: locationName.value, 
        location: locationAddress.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await query.json() 
    console.log(result)
    window.location.reload()
  } catch(err){
    console.log(err.message)
    alert("hmmm... something went wrong")
  }
})
