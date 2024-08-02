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
