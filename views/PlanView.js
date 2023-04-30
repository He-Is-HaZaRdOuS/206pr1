import { WeeklyPlan } from "../components/WeeklyPlan.js";
import { generateElement } from "../util/elementGenerator.js";
import { storageManager } from "../util/webStorage.js";
import { getStateCopy, setAppState } from "../App.js";
import { Modal } from "../components/Modal.js";

const PlanView = (parameters) => {
  const page = generateElement("div");
  const showSaveModal = generateElement("button")
    .innerText("Save")
    .id("save")
    .addEventListener("click", () => {
      page.appendChild(SaveModal(parameters.plan));
    })
    .build();

  page
    .appendChild(
      generateElement("div")
        .className("plan-header")
        .appendChild(
          generateElement("button")
            .innerText("Go Home")
            .id("gohome")
            .addEventListener("click", () => {
              let newState = getStateCopy();
              newState.id = "home";
              newState.parameters.fileStatus = {
                lectureHalls: false,
                instructors: false,
                courses: false,
                serviceCourses: false,
              };
              setAppState(newState);
            })
            .build()
        )
        .appendChild(
          generateElement("div")
            .className("type-badge-div")
            .appendChild(
              generateElement("button")
                .id("green")
                .innerText("service courses")
                .build()
            )
            .appendChild(
              generateElement("button")
                .id("pink")
                .innerText("compulsory courses")
                .build()
            )
            .appendChild(
              generateElement("button")
                .id("darkBlue")
                .innerText("elective courses")
                .build()
            )
            .build()
        )
        .appendChild(showSaveModal)
        .build()
    )
    .appendChild(WeeklyPlan("1.Grade", parameters.plan[0]))
    .appendChild(WeeklyPlan("2.Grade", parameters.plan[1]))
    .appendChild(WeeklyPlan("3.Grade", parameters.plan[2]))
    .appendChild(WeeklyPlan("4.Grade", parameters.plan[3]));

  return page.build();
};

const SaveModal = (plan) => {
  const planNameInp = generateElement("input").build();
  const saveButton = generateElement("button")
    .innerText("save")
    .id("save2")
    .build();

  const [saveModal, modalVis, deleteModal] = Modal({
    content: generateElement("div")
      .appendChild(generateElement("br").build())
      .appendChild(planNameInp)
      .appendChild(saveButton)
      .build(),
    title: "Name this plan",
    visible: true,
    closeable: true,
  });

  saveButton.addEventListener("click", () => {
    storageManager.savePlan(planNameInp.value, plan);
    deleteModal();
  });

  return saveModal;
};

export { PlanView };
