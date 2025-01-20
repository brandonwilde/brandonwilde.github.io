function createBlog(
  id,
  paperStack = { content: "", width: 40, height: 200, color: colors.red }
) {
  const blog = createBlock(`book${id}`, paperStack);
  blog.block.classList.add("has-modal"); // to make it animated and clickable

  const anchor = document.createElement("a");
  anchor.href = "https://the.btw.so";
  anchor.style.textDecoration = "none"; // Remove underline
  anchor.style.color = "inherit"; // Inherit text color
  anchor.appendChild(blog.block);

  return { block: anchor };
}
