function createBook(id, width, content) {
  // Create the book div
  const book = document.createElement("div");
  book.id = id;
  book.className = "book";
  book.style.width = `${width}px`;

  // Create the content span
  const span = document.createElement("span");

  // Split the content by <br /> and create a text node and a br element for each part
  const parts = content.split("<br />");
  for (let i = 0; i < parts.length; i++) {
    span.appendChild(document.createTextNode(parts[i]));
    if (i < parts.length - 1) {
      span.appendChild(document.createElement("br"));
    }
  }

  book.appendChild(span);

  // Create the book faces
  const faces = ["top", "right", "bottom", "left"];
  for (const face of faces) {
    const div = document.createElement("div");
    div.className = `book-face book-${face}-face`;
    book.appendChild(div);
  }

  return book;
}

function createEducationModal(
  id,
  logoSrc,
  logoAlt,
  degree,
  university,
  gpa,
  graduationDate,
  projects
) {
  const template = document.getElementById("educationModalTemplate");
  const fragment = template.content.cloneNode(true);
  const modal = fragment.querySelector(".modal");
  modal.id = id;
  modal.querySelector(".university-logo").src = logoSrc;
  modal.querySelector(".university-logo").alt = logoAlt;
  modal.querySelector(".modal-info h2").textContent = degree;
  modal.querySelector(".modal-info strong").textContent = university;
  modal.querySelector(".gpa-value").textContent = gpa;
  modal.querySelector(".graduation-date").textContent = graduationDate;

  const ul = modal.querySelector(".research-projects");
  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project;
    ul.appendChild(li);
  });
  return modal;
}

const bookBachelors = createBook(
  "bookBachelors",
  125,
  "B.S. Chemical Engineering & German"
);
const modalBachelorsHtml = createEducationModal(
  "modalBachelors",
  "assets/images/Wyoming_Athletics_logo.svg",
  "Wyoming Logo",
  "Bachelor of Science in German, Chemical Engineering, Engineering Honors",
  "University of Wyoming: Laramie, WY",
  "3.68",
  "Graduated May 2018",
  [
    "Carbon capture and storage (CCS) innovative cost recovery",
    "Anti-cancer drug delivery methods",
  ]
);

const bookMasters = createBook(
  "bookMasters",
  110,
  "M.S. Computational Linguistics"
);
const modalMastersHtml = createEducationModal(
  "modalMasters",
  "assets/images/hawk-logo-color-2.svg",
  "Montclair Logo",
  "Master of Science in Computational Linguistics",
  "Montclair State University: Montclair, NJ",
  "3.96",
  "Graduated May 2022",
  [
    "Cross-lingual definition modeling without bilingual corpora",
    "Farsi NLP Tools",
  ]
);

const shelfA = document.getElementById("shelfA");
const shelfASections = shelfA.querySelectorAll(".shelf-section");
const shelfASection0 = shelfASections[0];
const shelfASection0Content = shelfASection0.querySelector(".content-section");

shelfASection0Content.appendChild(bookBachelors);
shelfASection0Content.appendChild(bookMasters);
shelfASection0Content.appendChild(modalBachelorsHtml);
shelfASection0Content.appendChild(modalMastersHtml);

const shelfB = document.getElementById("shelfB");

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
