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

    if (book.classList.contains("hovered")) {
      book.style.transform = `perspective(100px) rotateY(${rotationValue}deg) translateX(${
        rotationValue * 2
      }px) translateY(-2px) scale(${scale})`;
    } else {
      book.style.transform = `perspective(100px) rotateY(${rotationValue}deg)`;
    }
  }
});
