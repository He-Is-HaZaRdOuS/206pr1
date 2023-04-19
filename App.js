import { FileInput } from "./components/FileInput.js";
import { generateElement } from "./util/elementGenerator.js";

const root = document.getElementById("root");

let fileInput;

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
      fileInput = FileInput(appState.parameters);
      root.appendChild(fileInput);
      break;
    case "plan-generated":
      break;
    case "error":
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
