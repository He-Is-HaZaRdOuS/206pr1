import Table from "./components/Table.js";

const addRowBtn = document.getElementById("add-row");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const container = document.getElementById("cnt");
const modal = document.getElementById("modal");

const [table, tableController] = Table({
  headers: ["A", "B"],
  colCount: 2,
  body: [
    ["1.1", "1.2"],
    ["2.1", "2.2"],
  ],
});

function readFile(){
  let file = document.getElementById("csvFile").files[0];
  if (file) {
    tableController.loadCSV(file);
    modal.style.display = "none";
  }
}

container.insertBefore(table, container.childNodes[0]);
addRowBtn.addEventListener("click", tableController.addRow);
downloadBtn.addEventListener("click", tableController.download);

document.getElementById("load-btn").addEventListener("click", readFile);

uploadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "block";
});

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
