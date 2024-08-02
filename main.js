const bachelors = createEducation(
  "Bachelors",
  {
    width: 125,
    height: 265,
    color: colors.brown,
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
  "BusinessCards",
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

const bookReviews = createBookReviewsBlock("BookReviews", {
  width: 70,
  height: 240,
  color: colors.tan,
  content: "Book Reviews",
});

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
addItems("A", 2, [
  createBlock("bookA2a", { height: 150, color: colors.gray }),
  createBlock("bookA2b", { width: 20, color: colors.purple }),
  createBlock("bookA2c", { width: 30, color: colors.purple }),
  createBlock("bookA2d", { height: 210, color: colors.yellowGreen }),
]);

addItems("B", 0, [
  createBlock("bookB0a", { height: 180, color: colors.gray }),
  createBlock("bookB0b", { width: 30, color: colors.yellowGreen }),
  createBlock("bookB0c", { width: 50, color: colors.brown }),
  createBlock("bookB0d", { width: 35, color: colors.gray }),
  createBlock("bookB0e", { width: 20, height: 240, color: colors.white }),
  createBlock("bookB0f", { color: colors.black }),
  createBlock("bookB0g", { width: 50, height: 180, color: colors.brown }),
]);
// addItems("B", 1, [
//   createBlock("bookB1a", { width: 50, color: colors.brown }),
//   createBlock("bookB1b", { width: 35, color: colors.gray }),
//   createBlock("bookB1c", { width: 26, height: 300, color: colors.white }),
// ]);
addItems("B", 2, [
  createBlock("bookB2a", { height: 180, color: colors.yellow }),
  createBlock("bookB2b", { width: 30, color: colors.gray }),
]);
// addItems("B", 3, [
//   bookReviews,
//   createBlock("bookB3b", { height: 230, color: colors.gray, content: "ϕ" }),
//   createBlock("bookB3c", { color: colors.yellowGreen, content: "Δ" }),
// ]);
fetchGoodreadsRSS().then((items) => {
  addRecentReads(items, (numUpdates = 7));
});

addItems("C", 1, [createBlock("bookC1a", { width: 27, color: colors.blue })]);
addItems("C", 2, [aei, msu1, msu2, inventives, syera]);
addItems("C", 3, [businessCards]);

// Close modals when clicking outside the modal content
window.onclick = function (event) {
  if (event.target.classList.contains("modal-container")) {
    event.target.classList.remove("modal-active");
  }
};
