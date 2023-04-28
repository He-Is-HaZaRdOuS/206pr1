import { setAppState, getStateCopy } from "../App.js";
import { generateElement } from "../util/elementGenerator.js";
import { storageManager } from "../util/webStorage.js";
import { Modal } from "./Modal.js";

const SavedPlans = () => {
  const plans = storageManager.getPlans();
  const list = generateElement("div").className("list");
  if (plans.length == 0) {
    list.appendChild(
      generateElement("i").innerText("You haven't saved any plans yet").build()
    );
  } else {
    plans.forEach((plan) => {
      list.appendChild(
        listItem(plan.name, () => {
          let planState = getStateCopy();
          planState.id = "plan-generated";
          planState.parameters.plan = plan.plan;
          planState.parameters.grade = 0;
          setAppState(planState);
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
  const listItem = generateElement("div")
    .className("list-item")
    .appendChild(generateElement("i").innerText(name).build())
    .addEventListener("click", () => callback());

  const deleteButton = generateElement("button")
    .className("delIconButton fa fa-trash-o")
    .addEventListener("click", (e) => {
      e.stopPropagation();
      storageManager.deletePlan(name);
      listItem.style("display: none");
    })
    .build();

  listItem.appendChild(deleteButton);
  return listItem.build();
};

export { SavedPlans };
