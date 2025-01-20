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
