function attachModal(button, modal) {
  button.onclick = function () {
    modal.classList.add("modal-active");
  };
}

function createBook(id, { width = 40, height = 200, content = "" } = {}) {
  // Create the book div
  const book = document.createElement("div");
  book.id = id;
  book.className = "book";
  book.style.width = `${width}px`;
  book.style.height = `${height}px`;

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

  if (projects !== undefined) {
    projects.forEach((project) => {
      const li = document.createElement("li");
      li.textContent = project;
      ul.appendChild(li);
    });
  }
  return modal;
}

const bookBachelors = createBook("bookBachelors", {
  width: 125,
  height: 265,
  content: "B.S. Chemical Engineering & German",
});

const modalBachelors = createEducationModal(
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
attachModal(bookBachelors, modalBachelors);

const bookMasters = createBook("bookMasters", {
  width: 110,
  height: 265,
  content: "M.S. Computational Linguistics",
});

const modalMasters = createEducationModal(
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
attachModal(bookMasters, modalMasters);

const bookAei = createBook("bookAei", {
  width: 70,
  content: "AEI",
});

const bookMsu1 = createBook("bookMsu1", {
  width: 50,
  height: 200,
  content: "MSU",
});

const bookMsu2 = createBook("bookMsu2", {
  width: 40,
  height: 220,
  content: "MSU",
});

const bookInventives = createBook("bookInventives", {
  width: 80,
  height: 250,
  content: "Inventives",
});
// const modalInventives = createEducationModal();
// attachModal(bookInventives, modalInventives);

const bookSyera = createBook("bookSyera", {
  width: 60,
  height: 180,
  content: "Syera",
});
// const modalSyera = createEducationModal();
// attachModal(bookSyera, modalSyera);

// Shelf A
const shelfA = document.getElementById("shelfA");
const shelfASections = shelfA.querySelectorAll(".shelf-section");
const shelfASection0 = shelfASections[0].querySelector(".content-section");

shelfASection0.appendChild(bookBachelors);
shelfASection0.appendChild(bookMasters);
shelfASection0.appendChild(modalBachelors);
shelfASection0.appendChild(modalMasters);

// Shelf B
const shelfB = document.getElementById("shelfB");
const shelfBSections = shelfB.querySelectorAll(".shelf-section");
const shelfBSection3 = shelfBSections[3].querySelector(".content-section");

shelfBSection3.appendChild(createBook("book1", { height: 240 }));
shelfBSection3.appendChild(createBook("book2"));

// Shelf C
const shelfC = document.getElementById("shelfC");
const shelfCSections = shelfC.querySelectorAll(".shelf-section");
const shelfCSection1 = shelfCSections[1].querySelector(".content-section");
const shelfCSection2 = shelfCSections[2].querySelector(".content-section");

shelfCSection1.appendChild(createBook("book3", { width: 27, content: "ϕ" }));

shelfCSection2.appendChild(bookAei);
shelfCSection2.appendChild(bookMsu1);
shelfCSection2.appendChild(bookMsu2);
shelfCSection2.appendChild(bookInventives);
// shelfCSection2.appendChild(modalInventives);
shelfCSection2.appendChild(bookSyera);
// shelfCSection2.appendChild(modalSyera);

// Close modals
var modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  var spanClose = modal.getElementsByClassName("close")[0];
  spanClose.onclick = function () {
    modal.classList.remove("modal-active");
  };
});

window.onclick = function (event) {
  // Close modals when clicking outside the modal content
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("modal-active");
  }
};
