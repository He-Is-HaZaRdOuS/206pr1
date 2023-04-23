import { HomeView } from "./views/HomeView.js";
import { FileInputView } from "./views/FileInputView.js";
import { storageManager } from "./util/webStorage.js";
import { PlanView } from "./views/PlanView.js";

const root = document.getElementById("root");

// load last state
const appState = storageManager.getState();

const getStateCopy = () => {
  return { ...appState };
};

const setAppState = (newState) => {
  appState.id = newState.id;
  appState.parameters = newState.parameters;
  storageManager.saveState(newState);

  // re-render according to the new state
  render();
};

let renderCount = 0;
const render = () => {
  console.log(`rendering (${++renderCount}):`);
  console.log(appState);
  // empty the root
  root.replaceChildren();
  switch (appState.id) {
    case "file-input":
      root.appendChild(FileInputView(appState.parameters));
      break;
    case "plan-generated":
      root.appendChild(PlanView(appState.parameters));
      break;
    case "home":
      root.appendChild(HomeView(appState.parameters));
      break;
  }
};

render();

export { setAppState, getStateCopy };
