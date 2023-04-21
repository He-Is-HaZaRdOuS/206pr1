import { FileInputView } from "./views/FileInputView.js";
import { ErrorView } from "./views/ErrorView.js";
import { WeeklyPlan } from "./components/WeeklyPlan.js";

const root = document.getElementById("root");

let fileInputView;
let errorView;
let planView;

// initial state where no file is uploaded
const appState = {
  id: "file-input",
  parameters: {
    fileStatus: {
      courses: false,
      instructors: false,
      lectureHalls: false,
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

  // re-render according to the new state
  render();
};

const render = () => {
  // empty the root
  console.log(`rendering (${++renderCount}):`);
  console.log(appState);
  root.replaceChildren();
  switch (appState.id) {
    case "file-input":
      fileInputView = FileInputView(appState.parameters);
      root.appendChild(fileInputView);
      break;
    case "plan-generated":
      // TODO add view
      root.appendChild(WeeklyPlan("1.Grade", appState.parameters.plan[0]));
      root.appendChild(WeeklyPlan("2.Grade", appState.parameters.plan[1]));
      root.appendChild(WeeklyPlan("3.Grade", appState.parameters.plan[2]));
      root.appendChild(WeeklyPlan("4.Grade", appState.parameters.plan[3]));
      break;
    case "classroom-size-error":
      errorView = ErrorView(appState.parameters);
      root.appendChild(errorView);
      break;
  }
};

// render the initial state
let renderCount = 0;
render();

// when clicked outside of modal's content, hide the modal
window.onclick = (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.classList.add("invisible");
  }
};

export { setAppState, getStateCopy };
