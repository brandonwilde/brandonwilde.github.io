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
