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

function attachModal(block, modal) {
  block.classList.add("has-modal");
  block.onclick = function () {
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
  const block = document.createElement("div");
  block.id = id;
  block.className = "book";
  block.style.width = `${width}px`;
  block.style.height = `${height}px`;
  block.style.backgroundColor = `rgb(${color.join(",")})`;
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

  block.appendChild(span);

  const faces = ["top", "right", "bottom", "left"];
  for (const face of faces) {
    const div = document.createElement("div");
    div.className = `book-face book-${face}-face`;
    if (face === "right" || face === "left") {
      div.style.backgroundColor = dimColorRgb;
    } else {
      div.style.backgroundColor = `rgb(169, 169, 169)`;
    }
    block.appendChild(div);
  }

  return { block: block };
}

function createEducation(
  id,
  book = { content: "", width: 40, height: 200, color: colors.red },
  edu // = { logoSrc, logoAlt, degree, university, gpa, graduationDate, projects: [] }
) {
  const degree = createBlock(`book${id}`, book);

  // const degree = {
  //   block: bookBlock,
  // };

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

    attachModal(degree.block, modal);
    degree.modal = modal;
  }

  return degree;
}

function createJobExperience(
  id,
  book = { content: "", width: 40, height: 200, color: colors.red },
  job // = { company: "", position: "", startDate: "", endDate: "", accomplishments: [] }
) {
  const jobExperience = createBlock(`book${id}`, book);

  // const jobExperience = {
  //   block: bookBlock,
  // };

  if (job) {
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

    attachModal(jobExperience.block, modal);
    jobExperience.modal = modal;
  }

  return jobExperience;
}

function createBusinessCard(
  id,
  cardBox = { content: "", width: 40, height: 200, color: colors.red },
  card // = { name: "", jobTitle1: "", jobTitle2: "", personalLogoSrc: "", emailSrc: "", linkedin: "", github: "" }
) {
  const businessCard = createBlock(`book${id}`, cardBox);

  // const businessCard = {
  //   block: cardBlock,
  // };

  if (card) {
    const template = document.getElementById("businessCardModalTemplate");
    const fragment = template.content.cloneNode(true);
    const modal = fragment.querySelector(".modal");
    modal.id = `modal${id}`;
    closeModalOnX(modal);

    modal.querySelector("#name").textContent = card.name;
    modal.querySelector("#jobTitle1").textContent = card.jobTitle1;
    modal.querySelector("#jobTitle2").textContent = card.jobTitle2;
    modal.querySelector("#personalLogo").src = card.personalLogoSrc;
    modal.querySelector("#email").src = card.emailSrc;
    modal.querySelector("#linkedin").textContent = card.linkedin;
    modal.querySelector("#linkedin").href = card.linkedin;
    modal.querySelector("#github").textContent = card.github;
    modal.querySelector("#github").href = card.github;

    attachModal(businessCard.block, modal);
    businessCard.modal = modal;
  }

  return businessCard;
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

const businessCards = createBusinessCard(
  "businessCards",
  {
    width: 100,
    height: 60,
    color: colors.white,
    content: "Contact Info",
  },
  {
    name: "Brandon Wilde",
    jobTitle1: "Machine Learning Engineer",
    jobTitle2: "Chemical Engineer",
    personalLogoSrc: "assets/images/btw_purple_grad.png",
    emailSrc: "assets/images/email.png",
    linkedin: "https://www.linkedin.com/in/brandon-wilde3/",
    github: "https://www.github.com/brandonwilde",
  }
);

function addItems(shelf, section, items) {
  const elemShelf = document.getElementById(`shelf${shelf}`);
  const elemSections = elemShelf.querySelectorAll(".shelf-section");
  const elemSection = elemSections[section].querySelector(".content-section");

  items.forEach((item) => {
    elemSection.appendChild(item.block);
    if (item.modal) {
      elemSection.appendChild(item.modal);
    }
  });
}

// Add items to shelves (Shelves A, B, C and Sections 0, 1, 2, 3)
addItems("A", 0, [bachelors, masters]);

addItems("B", 3, [
  createBlock("book1", { height: 240, color: colors.gray }),
  createBlock("book2", { color: colors.yellowGreen, content: "Δ" }),
]);

addItems("C", 1, [
  createBlock("book3", { width: 27, color: colors.blue, content: "ϕ" }),
]);
addItems("C", 2, [aei, msu1, msu2, inventives, syera]);
addItems("C", 3, [businessCards]);

// Close modals when clicking outside the modal content
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.classList.remove("modal-active");
  }
};
