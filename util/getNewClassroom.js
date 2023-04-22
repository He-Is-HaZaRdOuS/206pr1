import { Modal } from "../components/Modal.js";
import { generateElement } from "./elementGenerator.js";

const getNewClassroom = async (message) => {
  let done = false;
  let newClassroom;
  const popup = generateElement("div").appendChild(
    generateElement("p").innerText(message).build()
  );
  const inp = generateElement("input").className("gncInput").build();
  const btn = generateElement("button")
    .className("gncButton")
    .innerText("add").id("add")
    .build();

  const domObj = popup.appendChild(inp).appendChild(btn).build();
  const [modal, modalVis] = Modal({
    content: domObj,
    title: "Warning",
    visible: true,
    closeable: false,
  });
  document.getElementById("root").appendChild(modal);

  btn.addEventListener("click", () => {
    newClassroom = inp.value;
    done = true;
    console.log("Added: " + newClassroom);
    modal.remove();
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  while (!done) {
    await sleep(50);
  }
  return newClassroom;
};

export { getNewClassroom };
