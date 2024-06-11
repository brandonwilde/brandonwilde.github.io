var modalMasters = document.getElementById("modalMasters");
var modalBachelors = document.getElementById("modalBachelors");

var btnMasters = document.getElementById("bookMasters");
var btnBachelors = document.getElementById("bookBachelors");

var spanCloseMasters = modalMasters.getElementsByClassName("close")[0];
var spanCloseBachelors = modalBachelors.getElementsByClassName("close")[0];

btnMasters.onclick = function () {
  modalMasters.classList.add("modal-active");
};
btnBachelors.onclick = function () {
  modalBachelors.classList.add("modal-active");
};

// When the user clicks on <span> (x), close the modal
spanCloseMasters.onclick = function () {
  modalMasters.classList.remove("modal-active");
};
spanCloseBachelors.onclick = function () {
  modalBachelors.classList.remove("modal-active");
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modalMasters) {
    modalMasters.classList.remove("modal-active");
  } else if (event.target == modalBachelors) {
    modalBachelors.classList.remove("modal-active");
  }
};
