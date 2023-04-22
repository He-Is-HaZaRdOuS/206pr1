import { generateElement } from "../util/elementGenerator.js";
import { storageManager } from "../util/webStorage.js";
import { Modal } from "./Modal.js";

const SavedPlans = () => {
  const plans = storageManager.getPlans();
  const list = generateElement("div").className("list");
  if (plans.length == 0) {
    list.appendChild(
      generateElement("i").innerText("You haven't saved any plans yet")
    );
  } else {
    plans.forEach((plan) => {
      list.appendChild(
        listItem(plan.name, () => {
          console.log(plan.plan);
        })
      );
    });
  }

  const [modal, toggleModalVis] = Modal({
    content: list.build(),
    visible: true,
    closeable: true,
    title: "Saved Plans",
  });

  return modal;
};

const listItem = (name, callback) => {
  console.log(callback);
  return generateElement("div")
    .className("list-item")
    .appendChild(generateElement("i").innerText(name).build())
    .appendChild(generateElement("i").className("fa fa-chevron-right").build())
    .addEventListener("click", () => callback())
    .build();
};

export { SavedPlans };
