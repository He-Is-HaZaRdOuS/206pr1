import { resetVariables, startReadingFile } from "../Main.js";
import { generateElement } from "../util/elementGenerator.js";
import { AybuLogo } from "../components/AybuLogo.js";
import { getStateCopy, setAppState } from "../App.js";

const FileInputView = (parameters) => {
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

  const dropZone = generateElement("div")
    .id("drop-zone")
    .appendChild(fileStatus);

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.domObj.style = "outline-offset: -8px";
    //https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...e.dataTransfer.items].forEach(async (item, i) => {
        // If dropped items aren't files, reject them
        if (
          item.kind === "file" &&
          item.getAsFile().name.split(".").slice(-1)[0] == "csv"
        ) {
          let result = await startReadingFile(item.getAsFile());
          if (result != 0) {
            fileStatus.appendChild(fileError);
          }
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      [...e.dataTransfer.files].forEach(async (file, i) => {
        if ((file.name.split(".").slice(-1)[0] = "csv")) {
          let result = await startReadingFile(file);
          if (result != 0) {
            fileStatus.appendChild(fileError);
          }
        }
      });
    }
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.domObj.style = "outline-offset: 2px";
  });

  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.domObj.style = "outline-offset: -8px";
  });

  const cancelButton = generateElement("button")
    .id("gohome2")
    .innerText("Cancel")
    .addEventListener("click", () => {
      resetVariables();
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
    .build();


  const container = generateElement("div")
    .className("main")
    .id("cont")
    .appendChild(AybuLogo())
    .appendChild(
      generateElement("div")
        .className("select")
        .appendChild(dropZone.build())
        .build()
    )
    .appendChild(
      generateElement("div")
        .style("display: flex; justify-content: space-around")
        .appendChild(cancelButton)
        .build()
    )
    .build();

  return container;
};

const getStatusRow = (text, status) => {
  return generateElement("div")
    .appendChild(generateElement("i").innerText(text).build())
    .appendChild(
      status
        ? generateElement("i")
            .className("fa fa-check")
            .style("color: #023864;")
            .build()
        : generateElement("i")
            .className("fa fa-ellipsis-h")
            .style("color: #023864;")
            .build()
    )
    .build();
};

export { FileInputView };
