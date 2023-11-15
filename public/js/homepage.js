var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.querySelector(".modal-header span")


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




