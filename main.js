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

function createEducation(
  id,
  book = { content: "", width: 40, height: 200, color: colors.red },
  edu // = { logoSrc, logoAlt, degree, university, gpa, graduationDate, projects: [] }
) {
  const bookBlock = createBlock(`book${id}`, {
    width: book.width,
    height: book.height,
    color: book.color,
    content: book.content,
  });

  const degree = {
    block: bookBlock,
  };

  if (edu) {
    const template = document.getElementById("educationModalTemplate");
    const fragment = template.content.cloneNode(true);
    const modal = fragment.querySelector(".modal");
    modal.id = `modal${id}`;
    closeModalOnX(modal);

    modal.querySelector(".university-logo").src = edu.logoSrc;
    modal.querySelector(".university-logo").alt = edu.logoAlt;

    const degreeTextNode = document.createTextNode(" " + edu.degree);
    modal.querySelector(".modal-info h2").appendChild(degreeTextNode);

    const universityTextNode = document.createTextNode(" " + edu.university);
    modal.querySelector(".modal-info strong").appendChild(universityTextNode);

    modal.querySelector(".gpa-value").textContent = edu.gpa;

    const graduationTextNode = document.createTextNode(
      " " + edu.graduationDate
    );
    modal.querySelector(".graduation-date").appendChild(graduationTextNode);

    const ul = modal.querySelector(".research-projects");

    if (edu.projects !== undefined) {
      edu.projects.forEach((project) => {
        const li = document.createElement("li");
        li.textContent = project;
        ul.appendChild(li);
      });
    }

    attachModal(bookBlock, modal);
    degree.modal = modal;
  }

  return degree;
}

function createJobExperience(
  id,
  book = { content: "", width: 40, height: 200, color: colors.red },
  job // = { company: "", position: "", startDate: "", endDate: "", accomplishments: [] }
) {
  const bookBlock = createBlock(`book${id}`, {
    width: book.width,
    height: book.height,
    color: book.color,
    content: book.content,
  });

  const jobExperience = {
    block: bookBlock,
  };

  if (job) {
    console.log("Adding job modal");
    const template = document.getElementById("jobModalTemplate");
    const fragment = template.content.cloneNode(true);
    const modal = fragment.querySelector(".modal");
    modal.id = `modal${id}`;
    closeModalOnX(modal);

    modal.querySelector(".job-position").textContent = job.position;

    const companyTextNode = document.createTextNode(" " + job.company);
    modal.querySelector(".modal-info strong").appendChild(companyTextNode);

    const DateTextNode = document.createTextNode(
      ` ${job.startDate} – ${job.endDate}`
    );
    modal.querySelector(".job-dates").appendChild(DateTextNode);

    const ul = modal.querySelector(".job-accomplishments");

    if (job.accomplishments !== undefined) {
      job.accomplishments.forEach((accomplishment) => {
        const li = document.createElement("li");
        li.textContent = accomplishment;
        ul.appendChild(li);
      });
    }

    attachModal(bookBlock, modal);
    jobExperience.modal = modal;
  } else {
    console.log("No job modal");
  }

  console.log("jobExperience", jobExperience);
  return jobExperience;
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

function addItems(shelf, items) {
  items.forEach((item) => {
    shelf.appendChild(item.block);
    if (item.modal) {
      shelf.appendChild(item.modal);
    }
  });
}

const bachelors = createEducation(
  "Bachelors",
  {
    width: 125,
    height: 265,
    color: colors.gray,
    content: "B.S.<br />Chemical Engineering<br />& German",
  },
  {
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
  }
);

const masters = createEducation(
  "Masters",
  {
    width: 110,
    height: 265,
    color: colors.red,
    content: "M.S.<br />Computational Linguistics",
  },
  {
    logoSrc: "assets/images/hawk-logo-color-2.svg",
    logoAlt: "Montclair Logo",
    degree: "Master of Science in Computational Linguistics",
    university: "Montclair State University: Montclair, NJ",
    gpa: "3.96",
    graduationDate: "Graduated May 2022",
    projects: [
      "Cross-lingual definition modeling without bilingual corpora",
      "Farsi NLP Tools",
    ],
  }
);

const aei = createJobExperience(
  "Aei",
  {
    width: 85,
    color: colors.gray,
    content: "AEI",
  },
  {
    company: "AEI Consultants",
    position: "Staff Engineer",
    startDate: "September 2018",
    endDate: "May 2022",
    accomplishments: [
      "Directed hundreds of environmental investigations and remediation projects across residential, commercial, and industrial properties, concluding each with a technical report for clientele.",
      "Expertly crafted precise, scaled CAD figures encompassing site layouts, isoconcentration maps, as well as detailed cross-sectional illustrations of geology and contaminant distributions.",
      "Automated the creation of conditional, format-specific contaminant reporting tables using Excel VBA.",
    ],
  }
);

const bookMsu1 = createBlock("bookMsu1", {
  width: 50,
  height: 200,
  color: colors.red,
  content: "MSU",
});

const msu1 = createJobExperience(
  "Msu1",
  {
    width: 50,
    height: 200,
    color: colors.red,
    content: "MSU",
  },
  {
    company: "Montclair State University",
    position: "Graduate Research Assistant",
    startDate: "September 2021",
    endDate: "June 2022",
    accomplishments: [
      "Independently pioneered a research initiative in zero-shot cross-lingual definition generation utilizing deep learning techniques.",
      "Appointed as a Teaching Assistant for APLN 550 (Computational Linguistics), providing support through tutoring and assignment grading.",
      "Entrusted with full instructional duties  for half of the semester, led the graduate course during the professor's leave of absence with success.",
    ],
  }
);

const msu2 = createJobExperience(
  "Msu2",
  {
    width: 40,
    height: 220,
    color: colors.red,
    content: "MSU",
  },
  {
    company: "Montclair State University",
    position: "Adjunct Lecturer",
    startDate: "August 2022",
    endDate: "December 2022",
    accomplishments: [
      "Developed and taught LNGN 445, a beginner-friendly course in Natural Language Processing, with a significant emphasis on Python programming to reinforce theoretical knowledge with practical skills.",
      "Crafted a syllabus that integrates Python coding from the ground up, enabling students with little or no programming experience to master foundational NLP techniques.",
    ],
  }
);

const inventives = createJobExperience(
  "Inventives",
  {
    width: 80,
    height: 250,
    color: colors.yellowGreen,
    content: "Inventives",
  },
  {
    company: "Inventives",
    position: "Artificial Intelligence Developer",
    startDate: "June 2022",
    endDate: "January 2024",
    accomplishments: [
      "Engineering lead for medical record analysis product, designing the system, backend API, and innovative document analysis methods.",
      "Developed a performant spore counting software for an international biological firm, employing computer vision to identify and enumerate spores in large images, drastically boosting research efficiency.",
      "Optimized a Retrieval-Augmented Generation (RAG) system enabling LLM responses to incorporate information from client databases.",
      "Advanced voice synthesis technology for a digital alter ego platform, enabling user-customizable pronunciations and enriching voice realism.",
      "Architected and built a robust file storage and retrieval system, engineered for use in diverse applications.",
      "Designed bespoke machine learning classifiers with high precision, fostering intelligent document organization.",
      "Instituted comprehensive AI model performance evaluation frameworks as well as tools for gauging live performance and reliability of outputs.",
      "Revolutionized client workflows by automating complex browser tasks using Selenium, effectively eliminating hours of tedium.",
      "Engineered a sophisticated, clean frontend application to serve as a file explorer and search tool for a client’s private database.",
      "Diligently maintained production-level codebases for both backend and frontend infrastructures, ensuring excellent user experience.",
    ],
  }
);

const syera = createJobExperience(
  "Syera",
  {
    width: 60,
    height: 180,
    color: colors.blue,
    content: "Syera",
  },
  {
    company: "Syera",
    position: "Software Engineer",
    startDate: "January 2024",
    endDate: "Present",
    accomplishments: [
      "Architecting and developing core software, designing and building intelligent document processing and data extraction systems using ML and NLP techniques.",
      "Engineering scalable, cloud-based infrastructure to transform legal case documents into intuitive visual timelines, enabling rapid evidence discovery.",
    ],
  }
);

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

addItems(shelfASection0, [bachelors, masters]);

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

addItems(shelfCSection2, [aei, msu1, msu2, inventives, syera]);

shelfCSection3.appendChild(businessCards);
shelfCSection3.appendChild(modalBusinessCards);

// Close modals when clicking outside the modal content
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("modal-active");
  }
};
