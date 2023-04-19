import { generateElement } from "../util/elementGenerator.js";

const Modal = (modalContent) => {
  const modal = generateElement("div")
    .className("modal invisible")
    .appendChild(modalContent)
    .build();

  const toggleVis = () => {
    if (modal.classList.contains("invisible"))
      modal.classList.remove("invisible");
    else modal.classList.add("invisible");
  };

  return [modal, toggleVis];
};

export { Modal };
