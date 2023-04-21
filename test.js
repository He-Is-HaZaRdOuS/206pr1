import { generateElement } from "./util/elementGenerator.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getNewClassroom = async (message) => {
  let done = false;
  let newClassroom;
  const popup = generateElement("div")
    .innerText(message)
    .className("container")
    .style("z-index: 1");
  const inp = generateElement("input").build();
  const btn = generateElement("button")
    .innerText("add")
    .addEventListener("click", () => {
      newClassroom = inp.value;
      done = true;
      console.log("Added: " + newClassroom);
      domObj.remove();
    })
    .build();

  const domObj = popup.appendChild(inp).appendChild(btn).build();
  document.getElementById("root").appendChild(domObj);

  while (!done) {
    await sleep(50);
  }
  return newClassroom;
};

export { getNewClassroom };
