import { getStateCopy, setAppState } from "../App.js";
import { AybuLogo } from "../components/AybuLogo.js";
import { SavedPlans } from "../components/SavedPlans.js";
import { generateElement } from "../util/elementGenerator.js";

const HomeView = (parameters) => {
  const page = generateElement("div").className("main");
  const middle = generateElement("div")
    .className("middle")
    .appendChild(
      generateElement("div")
        .className("title-area")
        .appendChild(
          generateElement("h2")
            .innerText("Welcome to Computer Engineering Course Planner")
            .build()
        )
        .build()
    )
    .build();

  const btnArea = generateElement("div")
    .className("buttonarea")
    .appendChild(
      generateElement("button")
        .innerText("Load a Plan")
        .addEventListener("click", () => {
          page.appendChild(SavedPlans());
        })
        .build()
    )
    .appendChild(
      generateElement("button")
        .innerText("New Plan")
        .addEventListener("click", () => {
          let newState = getStateCopy();
          newState.id = "file-input";
          setAppState(newState);
        })
        .build()
    )
    .appendChild(
      generateElement("button")
        .innerText("Click to Instantly pass CENG206")
        .addEventListener("click", () => {
          window.location.href = "https://www.youtube.com/watch?v=j5a0jTc9S10";
        })
        .build()
    )
    .build();

  const spacer = generateElement("div").className("v-spacer-150").build();

  page
    .appendChild(spacer)
    .appendChild(AybuLogo())
    .appendChild(middle)
    .appendChild(btnArea);

  return page.build();
};

export { HomeView };
