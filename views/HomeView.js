import { getStateCopy, setAppState } from "../App.js";
import { AybuLogo } from "../components/AybuLogo.js";
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
        .addEventListener("click", () => {})
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
    .build();

  page.appendChild(AybuLogo()).appendChild(middle).appendChild(btnArea);

  return page.build();
};

export { HomeView };
