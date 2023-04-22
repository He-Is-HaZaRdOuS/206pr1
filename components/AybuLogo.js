import { generateElement } from "../util/elementGenerator.js";

const AybuLogo = () => {
  return generateElement("div")
    .className("logo")
    .appendChild(
      generateElement("img")
        .src("img/aybu_logo.png")
        .style("display: block; margin: auto")
        .build()
    )
    .build();
};

export { AybuLogo };
