const colors = {
  red: [98, 55, 55],
  lightRed: [162, 80, 74],
  green: [77, 98, 89],
  blue: [74, 104, 162],
  yellow: [162, 128, 27],
  yellowGreen: [106, 99, 69],
  purple: [92, 77, 132],
  gray: [115, 115, 115],
  white: [147, 147, 147],
};

function attachModal(button, modal) {
  button.onclick = function () {
    modal.classList.add("modal-active");
  };
}

function closeModalOnX(modal) {
  var spanClose = modal.getElementsByClassName("close")[0];
  spanClose.onclick = function () {
    modal.classList.remove("modal-active");
  };
}

function createBlock(
  id,
  { content = "", width = 40, height = 200, color = colors.red } = {}
) {
  const book = document.createElement("div");
  book.id = id;
  book.className = "book";
  book.style.width = `${width}px`;
  book.style.height = `${height}px`;
  book.style.backgroundColor = `rgb(${color.join(",")})`;
  const dimColor = color.map((val) => val * 0.86);
  const dimColorRgb = `rgb(${dimColor.join(",")})`;

  const span = document.createElement("span");

  const parts = content.split("<br />");
  for (let i = 0; i < parts.length; i++) {
    span.appendChild(document.createTextNode(parts[i]));
    if (i < parts.length - 1) {
      span.appendChild(document.createElement("br"));
    }
  }

  book.appendChild(span);

  const faces = ["top", "right", "bottom", "left"];
  for (const face of faces) {
    const div = document.createElement("div");
    div.className = `book-face book-${face}-face`;
    if (face === "right" || face === "left") {
      div.style.backgroundColor = dimColorRgb;
    } else {
      div.style.backgroundColor = `rgb(169, 169, 169)`;
    }
    book.appendChild(div);
  }

  return book;
}

function createEducationModal(
  id,
  { logoSrc, logoAlt, degree, university, gpa, graduationDate, projects }
) {
  const template = document.getElementById("educationModalTemplate");
  const fragment = template.content.cloneNode(true);
  const modal = fragment.querySelector(".modal");
  modal.id = id;
  closeModalOnX(modal);

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

function createBusinessCardModal() {
  const template = document.getElementById("businessCardModalTemplate");
  const fragment = template.content.cloneNode(true);
  const modal = fragment.querySelector(".modal");
  modal.id = "modalBusinessCards";
  closeModalOnX(modal);

  modal.querySelector("#name").textContent = "Brandon Wilde";
  modal.querySelector("#jobTitle1").textContent = "Machine Learning Engineer";
  modal.querySelector("#jobTitle2").textContent = "Chemical Engineer";
  modal.querySelector("#personalLogo").src = "assets/images/personal-logo.png";
  modal.querySelector("#email").src = "assets/images/email.png";
  modal.querySelector("#linkedin").textContent =
    "https://www.linkedin.com/in/brandon-wilde3/";
  modal.querySelector("#linkedin").href =
    "https://www.linkedin.com/in/brandon-wilde3/";
  modal.querySelector("#github").textContent =
    "https://www.github.com/brandonwilde";
  modal.querySelector("#github").href = "https://www.github.com/brandonwilde";

  return modal;
}

const bookBachelors = createBlock("bookBachelors", {
  width: 125,
  height: 265,
  color: colors.gray,
  content: "B.S.<br />Chemical Engineering<br />& German",
});

const modalBachelors = createEducationModal("modalBachelors", {
  logoSrc: "assets/images/Wyoming_Athletics_logo.svg",
  logoAlt: "Wyoming Logo",
  degree:
    "Bachelor of Science in German, Chemical Engineering, Engineering Honors",
  university: "University of Wyoming: Laramie, WY",
  gpa: "3.68",
  graduationDate: "Graduated May 2018",
  projects: [
    "Carbon capture and storage (CCS) innovative cost recovery",
    "Anti-cancer drug delivery methods",
  ],
});
attachModal(bookBachelors, modalBachelors);

const bookMasters = createBlock("bookMasters", {
  width: 110,
  height: 265,
  color: colors.yellowGreen,
  content: "M.S. Computational Linguistics",
});

const modalMasters = createEducationModal("modalMasters", {
  logoSrc: "assets/images/hawk-logo-color-2.svg", // TODO: Add Montclair logo
  logoAlt: "Montclair Logo",
  degree: "Master of Science in Computational Linguistics",
  university: "Montclair State University: Montclair, NJ",
  gpa: "3.96",
  graduationDate: "Graduated May 2022",
  projects: [
    "Cross-lingual definition modeling without bilingual corpora",
    "Farsi NLP Tools",
  ],
});
attachModal(bookMasters, modalMasters);

const bookAei = createBlock("bookAei", {
  width: 85,
  color: colors.gray,
  content: "AEI Consultants",
});

const bookMsu1 = createBlock("bookMsu1", {
  width: 50,
  height: 200,
  color: colors.yellowGreen,
  content: "MSU",
});

const bookMsu2 = createBlock("bookMsu2", {
  width: 40,
  height: 220,
  color: colors.red,
  content: "MSU",
});

const bookInventives = createBlock("bookInventives", {
  width: 80,
  height: 250,
  color: colors.yellowGreen,
  content: "Inventives",
});

const bookSyera = createBlock("bookSyera", {
  width: 60,
  height: 180,
  color: colors.red,
  content: "Syera",
});

const businessCards = createBlock("businessCards", {
  width: 100,
  height: 60,
  color: colors.white,
  content: "Contact Info",
});

const modalBusinessCards = createBusinessCardModal();
attachModal(businessCards, modalBusinessCards);

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

shelfBSection3.appendChild(
  createBlock("book1", { height: 240, color: colors.gray })
);
shelfBSection3.appendChild(
  createBlock("book2", { color: colors.yellowGreen, content: "Δ" })
);

// Shelf C
const shelfC = document.getElementById("shelfC");
const shelfCSections = shelfC.querySelectorAll(".shelf-section");
const shelfCSection1 = shelfCSections[1].querySelector(".content-section");
const shelfCSection2 = shelfCSections[2].querySelector(".content-section");
const shelfCSection3 = shelfCSections[3].querySelector(".content-section");

shelfCSection1.appendChild(
  createBlock("book3", { width: 27, color: colors.blue, content: "ϕ" })
);

shelfCSection2.appendChild(bookAei);
shelfCSection2.appendChild(bookMsu1);
shelfCSection2.appendChild(bookMsu2);
shelfCSection2.appendChild(bookInventives);
shelfCSection2.appendChild(bookSyera);

shelfCSection3.appendChild(businessCards);
shelfCSection3.appendChild(modalBusinessCards);

// Close modals when clicking outside the modal content
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("modal-active");
  }
};
