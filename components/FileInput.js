import { startReadingFile } from "../Main.js";
import { generateElement } from "../util/elementGenerator.js";
import { Modal } from "./Modal.js";

const FileInput = (parameters) => {
  const fileInput = generateElement("input")
    .type("file")
    .accept(".csv")
    .id("csvFile")
    .name("filename")
    .style("display: none")
    .multiple(true)
    .build();

  const fileStatus = generateElement("div")
    .appendChild(generateElement("p").innerText("Upload these files:").build())
    .appendChild(
      getStatusRow("Lecture Halls: ", parameters.fileStatus.lectureHalls)
    )
    .appendChild(
      getStatusRow("Instructors: ", parameters.fileStatus.instructors)
    )
    .appendChild(getStatusRow("Courses: ", parameters.fileStatus.courses))
    .appendChild(
      getStatusRow("Service Courses: ", parameters.fileStatus.serviceCourses)
    )
    .build();

  const fileError = generateElement("div")
    .appendChild(
      generateElement("p")
        .innerText("File content does not match!")
        .style("margin-block-end: 0px;")
        .build()
    )
    .build();

  const [modal, toggleModalVis] = Modal(
    generateElement("div")
      .className("modal-content")
      .appendChild(
        generateElement("h2")
          .innerText("Select csv files then click upload")
          .build()
      )
      .appendChild(
        generateElement("p")
          .innerText(
            "You should upload 4 csv files: Service Courses, Instructors, Lecture Halls, Courses"
          )
          .build()
      )
      .appendChild(
        generateElement("div")
          .className("modal-btn-container")
          .appendChild(
            generateElement("label")
              .className("modal-btn")
              .innerText("Select Files")
              .appendChild(fileInput)
              .build()
          )
          .appendChild(
            generateElement("button")
              .className("modal-btn")
              .id("load-btn")
              .innerText("Upload")
              .addEventListener("click", async () => {
                let result = await startReadingFile(fileInput.files);
                if (!result) {
                  toggleModalVis();
                } else {
                  fileStatus.appendChild(fileError);
                }
              })
              .build()
          )
          .build()
      )
      .build()
  );

  const container = generateElement("div")
    .className("container")
    .id("cnt")
    .style("display: flex")
    .appendChild(modal)
    .appendChild(fileStatus)
    .appendChild(
      generateElement("div")
        .className("row")
        .appendChild(
          generateElement("button")
            .className("icon-btn")
            .id("add-row")
            .title("Upload")
            .addEventListener("click", (e) => {
              e.preventDefault();
              toggleModalVis();
            })
            .appendChild(generateElement("i").className("fa fa-upload").build())
            .build()
        )
        .build()
    )
    .build();

  return container;
};

const getStatusRow = (text, status) => {
  return generateElement("div")
    .appendChild(generateElement("a").innerText(text).build())
    .appendChild(
      status
        ? generateElement("i")
            .className("fa fa-check")
            .style("color: green;")
            .build()
        : generateElement("i")
            .className("fa fa-ellipsis-h")
            .style("color: #ea9215;")
            .build()
    )
    .build();
};

export { FileInput };
