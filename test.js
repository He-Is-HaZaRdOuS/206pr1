import { generateElement } from "./util/elementGenerator.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getNewClassroom = async (wantedCapacity) => {
  let done = false;
  let newClassroom;
  const popup = generateElement("div")
    .innerText(
      "Unsufficient classrooms, please enter id and capacity of atleast " +
        wantedCapacity +
        " seperated by whitespace"
    )
    .className("container")
    .style("z-index: 1");
  const inp = generateElement("input").build();
  const btn = generateElement("button")
    .innerText("add")
    .addEventListener("click", () => {
      newClassroom = inp.value;
      done = true;
      console.log("Added: " + newClassroom);
    })
    .build();

  popup.appendChild(inp).appendChild(btn);
  document.getElementById("root").appendChild(popup.build());

  while (!done) {
    await sleep(50);
  }
  return newClassroom;
};

export { getNewClassroom };
