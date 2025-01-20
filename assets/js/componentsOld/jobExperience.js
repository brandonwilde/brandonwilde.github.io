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
