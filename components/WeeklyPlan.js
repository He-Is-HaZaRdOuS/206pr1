import { generateElement } from "../util/elementGenerator.js";

const WeeklyPlan = (title, plan) => {
  const container = generateElement("div");

  const table = generateElement("table").appendChild(
    generateElement("thead")
      .appendChild(
        generateElement("tr")
          .appendChild(
            generateElement("th").innerText(title).id("first").build()
          )
          .appendChild(generateElement("th").innerText("Monday").build())
          .appendChild(generateElement("th").innerText("Tuesday").build())
          .appendChild(generateElement("th").innerText("Wednesday").build())
          .appendChild(generateElement("th").innerText("Thursday").build())
          .appendChild(generateElement("th").innerText("Friday").build())
          .build()
      )
      .build()
  );

  const body = generateElement("tbody");
  console.log(plan);
  let index = 0;
  for (let i = 0; i < 2; i++) {
    let row = generateElement("tr");
    if (i == 0) {
      row.appendChild(
        generateElement("td").innerText("Morning").id("m").build()
      );
    } else {
      row.appendChild(
        generateElement("td").innerText("Afternoon").id("a").build()
      );
    }
    for (let j = 0; j < 5; j++) {
      let text;
      if (plan[index]) {
        text = plan[index].code + "\n[" + plan[index].currentHall.id + "]";
        row.appendChild(
          generateElement("td")
            .appendChild(
              generateElement("div")
                .appendChild(generateElement("p").innerText(text).build())
                .build()
            )
            .build()
        );
      } else {
        text = "       ";
        row.appendChild(generateElement("td").innerText(text).build());
      }
      index += 2;
    }
    index = 1;
    body.appendChild(row.build());
  }

  table.appendChild(body.build());
  container.appendChild(generateElement("p").innerText(" ").build());
  container.appendChild(table.build());

  return container.build();
};

export { WeeklyPlan };
