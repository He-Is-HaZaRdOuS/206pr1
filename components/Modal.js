import { generateElement } from "../util/elementGenerator.js";

const Modal = (modalContent) => {
  const modal = generateElement("div").className("modal invisible");

  const toggleVis = () => {
    if (modal.domObj.classList.contains("invisible"))
      modal.domObj.classList.remove("invisible");
    else modal.domObj.classList.add("invisible");
  };

  const closeBtn = generateElement("button")
    .innerText("x")
    .addEventListener("click", toggleVis)
    .build();

  modal.appendChild(closeBtn).appendChild(modalContent);

  return [modal.build(), toggleVis];
};

export { Modal };
