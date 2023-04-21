import { generateElement } from "../util/elementGenerator.js";

const ErrorView = (parameters) => {
  const container = generateElement("div").className("modal-content");
  const errorMessage = generateElement("p")
    .innerText(parameters.errMsg)
    .build();
  const input1 = generateElement("input").build();
  const input2 = generateElement("input").build();
  const btn = generateElement("button")
    .innerText("Add Classroom")
    .addEventListener("click", () => {
      console.log(input1.value + ";" + input2.value);
    })
    .build();

  return container
    .appendChild(errorMessage)
    .appendChild(input1)
    .appendChild(input2)
    .appendChild(btn)
    .build();
};

export { ErrorView };
