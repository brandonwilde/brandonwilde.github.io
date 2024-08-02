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
