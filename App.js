import { HomeView } from "./views/HomeView.js";
import { FileInputView } from "./views/FileInputView.js";
import { ErrorView } from "./views/ErrorView.js";
import { WeeklyPlan } from "./components/WeeklyPlan.js";
import { generateElement } from "./util/elementGenerator.js";
import { storageManager } from "./util/webStorage.js";

const root = document.getElementById("root");

// initial state where no file is uploaded
const appState = {
  id: "home",
  parameters: {
    fileStatus: {
      lectureHalls: false,
      instructors: false,
      courses: false,
      serviceCourses: false,
    },
  },
};

const getStateCopy = () => {
  return { ...appState };
};

const setAppState = (newState) => {
  appState.id = newState.id;
  appState.parameters = newState.parameters;
  window.localStorage.setItem("lastState", JSON.stringify(newState));

  // re-render according to the new state
  render();
};

const render = () => {
  console.log(`rendering (${++renderCount}):`);
  console.log(appState);
  console.log(storageManager.getPlans());
  // empty the root
  root.replaceChildren();
  switch (appState.id) {
    case "file-input":
      root.appendChild(FileInputView(appState.parameters));
      break;
    case "plan-generated":
      // TODO add view
      const planName = generateElement("input").build();
      root.appendChild(
        generateElement("div")
          .appendChild(planName)
          .appendChild(
            generateElement("button")
              .innerText("save").id("save")
              .addEventListener("click", () => {
                storageManager.savePlan(
                  planName.value,
                  appState.parameters.plan
                );
              })
              .build()
          )
          .appendChild(
            generateElement("button")
              .innerText("Go Home").id("gohome")
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
          .build()
      );
      root.appendChild(WeeklyPlan("1.Grade", appState.parameters.plan[0]));
      root.appendChild(WeeklyPlan("2.Grade", appState.parameters.plan[1]));
      root.appendChild(WeeklyPlan("3.Grade", appState.parameters.plan[2]));
      root.appendChild(WeeklyPlan("4.Grade", appState.parameters.plan[3]));
      break;
    case "classroom-size-error":
      root.appendChild(ErrorView(appState.parameters));
      break;
    case "home":
      root.appendChild(HomeView(appState.parameters));
      break;
  }
};

let renderCount = 0;
let lastState = JSON.parse(window.localStorage.getItem("lastState"));
console.log("loaded history: ");
console.log(lastState);
if (lastState != null && lastState.id != null && lastState.id != "file-input") {
  setAppState(lastState);
} else {
  setAppState(appState);
}

export { setAppState, getStateCopy };
