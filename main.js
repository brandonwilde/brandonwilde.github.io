const colors = {
  red: [98, 55, 55],
  // lightRed: [162, 80, 74],
  // brightRed: [89, 14, 23],
  tan: [140, 123, 109],
  brown: [72, 56, 50],
  yellow: [162, 128, 27],
  yellowGreen: [106, 99, 69],
  green: [77, 98, 89],
  // aqua: [68, 97, 111],
  blue: [74, 104, 162],
  purple: [80, 68, 111],
  white: [147, 147, 147],
  gray: [115, 115, 115],
  black: [64, 64, 64],
};

const bookHeights = [185, 191, 194, 200, 203, 205, 211, 219, 230, 250];
const bookWidths = [25, 31, 35, 38, 42, 48, 58, 66];

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
  {
    content = "",
    width = 40,
    height = 200,
    color = colors.red,
    verticalText = false,
  } = {}
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

  if (verticalText) {
    span.style.writingMode = "vertical-rl";
  }

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

  block.addEventListener("mouseover", () => {
    block.classList.add("hovered");
    if (block.classList.contains("has-modal")) {
      updatePosition(block);
    }
  });

  block.addEventListener("mouseout", () => {
    block.classList.remove("hovered");
    if (block.classList.contains("has-modal")) {
      updatePosition(block);
    }
  });

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
    const modal = fragment.querySelector(".modal-container");
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
    const modal = fragment.querySelector(".modal-container");
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
    const modal = fragment.querySelector(".modal-container");
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

async function fetchGoodreadsRSS() {
  const rss2jsonUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
  const targetUrl = encodeURIComponent(
    "https://www.goodreads.com/user/updates_rss/7208433"
  );

  try {
    const response = await fetch(rss2jsonUrl + targetUrl);
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching the RSS feed:", error);
    return [];
  }
}

function parseGrBookInfo(bookInfoStr) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(bookInfoStr, "text/html");

  const img = doc.querySelector("img");
  console.log(img.src);
  const titleAndAuthor = img.title;
  const bookTitle = doc.querySelector(".bookTitle").textContent;
  const authorName = doc.querySelector(".authorName").textContent;
  const rating = bookInfoStr.match(/gave (\d+) star/)[1];

  reversedContent = reverseString(bookInfoStr);
  const reviewMatch = reversedContent.match(/^([\s\S]*?)>a/);
  const review = strip(reverseString(reviewMatch[1]), "(<br>) \n");

  return {
    imgSrc: img ? img.src : "",
    titleAndAuthor,
    bookTitle,
    authorName,
    rating: parseInt(rating, 10),
    review: review,
  };
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function strip(str, chars) {
  const regex = new RegExp(`^[${chars}]+|[${chars}]+$`, "g");
  return str.replace(regex, "");
}

function addRecentReads(items, numUpdates) {
  let recentReads = [];
  console.log("Number of items:", items.length);
  const mostRecentItems = items.slice(0, numUpdates);
  mostRecentItems.forEach((item, index) => {
    const bookInfo = parseGrBookInfo(item.content);
    const bookProps = getBookProps(bookInfo.titleAndAuthor);

    recentReads.push(
      createBlock(`bookB3gr${index}`, {
        width: bookProps.width,
        height: bookProps.height,
        color: bookProps.color,
        content: bookInfo.titleAndAuthor,
        verticalText: true,
      })
    );
  });
  console.log("Recent Reads:", recentReads);

  addItems("B", 3, [bookReviews, ...recentReads]);
  setPerspective();
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

function getBookProps(title) {
  const hash = Math.abs(hashString(title));
  console.log("Hash:", hash);
  let width = bookWidths[hash % bookWidths.length];
  const height = bookHeights[hash % bookHeights.length];
  colorsList = Object.values(colors);
  const color = colorsList[hash % colorsList.length];

  const virtualBook = document.createElement("div");
  virtualBook.style.width = `${width}px`;
  virtualBook.style.height = `${height}px`;
  document.body.appendChild(virtualBook);
  const virtualText = document.createElement("span");
  virtualText.style.writingMode = "vertical-rl";
  virtualText.textContent = title;
  virtualBook.appendChild(virtualText);
  const textWidth = virtualText.offsetWidth;
  document.body.removeChild(virtualBook);

  if (textWidth > width - 4) {
    width = textWidth + 4;
  }
  console.log({ title, width, height, color });
  return { width, height, color };
}

function createBookReviewsBlock(
  id,
  book = { content: "", width: 40, height: 200, color: colors.red },
  widgetSettings = { width: 400, height: 400, numUpdates: 10 }
) {
  const bookReviewsBlock = createBlock(`book${id}`, book);

  const template = document.getElementById("bookReviewsModalTemplate");
  const fragment = template.content.cloneNode(true);
  const modal = fragment.querySelector(".modal-container");
  modal.id = `modal${id}`;
  closeModalOnX(modal);

  widgetSource = `https://www.goodreads.com/widgets/user_update_widget?user=7208433`;
  widgetSource += `&num_updates=${widgetSettings.numUpdates}`;
  widgetSource += `&width=${widgetSettings.width}`;
  // Note: The height parameter has no effect in the Goodreads widget

  modal.querySelector("#the_iframe").src = widgetSource;
  modal.querySelector(
    "#gr_updates_widget"
  ).style.width = `${widgetSettings.width}px`;
  modal.querySelector(
    "#gr_updates_widget"
  ).style.height = `${widgetSettings.height}px`;
  modal.querySelector("#the_iframe").width = widgetSettings.width - 2;
  modal.querySelector("#the_iframe").height = widgetSettings.height;

  attachModal(bookReviewsBlock.block, modal);
  bookReviewsBlock.modal = modal;

  return bookReviewsBlock;
}

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
