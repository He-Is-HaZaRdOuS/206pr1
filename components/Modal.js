import { generateElement } from "../util/elementGenerator.js";

const Modal = (props) => {
  const modal = generateElement("div");
  if (props.visible != null && props.visible == true) {
    modal.className("modal");
  } else {
    modal.className("modal invisible");
  }
  const toggleVis = () => {
    if (modal.domObj.classList.contains("invisible")) {
      modal.domObj.classList.remove("invisible");
    } else {
      if (props.closeable != null && props.closeable == true) {
        modal.domObj.remove();
      } else {
        modal.domObj.classList.add("invisible");
      }
    }
  };

  const closeBtn = generateElement("button")
    .className("modal-close")
    .appendChild(generateElement("i").className("fa fa-close").build())
    .addEventListener("click", toggleVis)
    .build();

  const header = generateElement("div")
    .className("modal-title")
    .appendChild(generateElement("x").innerText(props.title).build())
    .appendChild(closeBtn)
    .build();

  modal.appendChild(
    generateElement("div")
      .className("modal-content")
      .appendChild(header)
      .appendChild(props.content)
      .build()
  );

  return [modal.build(), toggleVis];
};

export { Modal };
