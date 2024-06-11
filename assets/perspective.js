document.addEventListener("DOMContentLoaded", function () {
  const books = document.querySelectorAll(".book");

  books.forEach((book, index) => {
    book.addEventListener("mouseover", () => {
      book.classList.add("hovered");
      updateRotation(book);
    });

    book.addEventListener("mouseout", () => {
      book.classList.remove("hovered");
      updateRotation(book);
    });

    updateRotation(book);
  });

  function updateRotation(book) {
    const viewportWidth = window.innerWidth;
    const bookRect = book.getBoundingClientRect();
    const bookCenterX = bookRect.left + bookRect.width / 2;
    const distanceFromCenter = bookCenterX - viewportWidth / 2;
    const rotationValue = (distanceFromCenter / viewportWidth) * 7;
    const scale = 1 + 0.5 * (0.4 - Math.abs(rotationValue) / 12);

    const spinePerspective = setSpinePerspective(book);
    if (book.classList.contains("hovered")) {
      book.style.transform =
        spinePerspective.transform +
        `translateX(${0}px) translateY(0px) translateZ(100px)`;
      book.style.zIndex = spinePerspective.zIndex;
      // console.log("height:", book.offsetHeight);
      // console.log("width:", book.offsetWidth);
    } else {
      book.style.transform = spinePerspective.transform;
      book.style.zIndex = spinePerspective.zIndex;
    }
  }
});

// Function to calculate the 3D transformation for a book based on its position
function setSpinePerspective(book) {
  const bookRect = book.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // book center position relative to the viewport center
  const deltaX = bookRect.left + bookRect.width / 2 - centerX;
  const deltaY = bookRect.top + bookRect.height / 2 - centerY;
  const distFromCenter = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  // perspective factor (related to viewing distance)
  const factor = 0.02;
  const rotateY = deltaX * factor;
  const rotateX = -deltaY * factor;

  return {
    transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
    zIndex: Math.round(1000 - distFromCenter),
  };
}

function setFaceDimensions(book, depth) {
  const bookHeight = book.offsetHeight;
  const bookWidth = book.offsetWidth;
  // console.log("height:", bookHeight);
  // console.log("width:", bookWidth);

  const rightFace = book.querySelector(".book-right-face");
  rightFace.style.height = `${bookHeight}px`;
  rightFace.style.width = `${depth}px`;
  rightFace.style.transform = `rotateY(90deg) translateZ(${
    bookWidth + depth
  }px)`;

  const leftFace = book.querySelector(".book-left-face");
  leftFace.style.height = `${bookHeight}px`;
  leftFace.style.width = `${depth}px`;
  leftFace.style.transform = `rotateY(90deg) translateZ(-${
    bookWidth + depth
  }px) translateX(${depth}px)`;

  const topFace = book.querySelector(".book-top-face");
  topFace.style.width = `${bookWidth}px`;
  topFace.style.height = `${depth}px`;
  topFace.style.transform = `rotateX(90deg)`;

  const bottomFace = book.querySelector(".book-bottom-face");
  bottomFace.style.width = `${bookWidth}px`;
  bottomFace.style.height = `${depth}px`;
  bottomFace.style.transform = `rotateX(90deg) translateY(-${depth}px)`;
}

function togglebookFaces(book, centerX, centerY) {
  const bookRect = book.getBoundingClientRect();
  // console.log("bookRect:", bookRect);
  const bookCenterX = bookRect.left + bookRect.width / 2;
  const bookCenterY = bookRect.top + bookRect.height / 2;

  // Set the class for the side faces based on the book position
  const rightFace = book.querySelector(".book-right-face");
  const leftFace = book.querySelector(".book-left-face");
  const topFace = book.querySelector(".book-top-face");
  const bottomFace = book.querySelector(".book-bottom-face");

  rightFace.style.display = bookCenterX < centerX ? "block" : "none";
  leftFace.style.display = bookCenterX >= centerX ? "block" : "none";
  bottomFace.style.display = bookCenterY < centerY ? "block" : "none";
  topFace.style.display = bookCenterY >= centerY ? "block" : "none";
}

function setPerspective() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  document.querySelectorAll(".book").forEach((book) => {
    const spinePerspective = setSpinePerspective(book);
    book.style.transform = spinePerspective.transform;
    book.style.zIndex = spinePerspective.zIndex;
    setFaceDimensions(book, 200); // Give the book a depth of 200px
    togglebookFaces(book, centerX, centerY);
  });
}

// Apply transforms on page load and window resize
window.addEventListener("DOMContentLoaded", setPerspective);
window.addEventListener("resize", setPerspective);
