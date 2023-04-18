import {Table} from "./components/Table.js";
import { LectureHalls } from "./LectureHalls.js";

const addRowBtn = document.getElementById("add-row");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const container = document.getElementById("cnt");
const modal = document.getElementById("modal");

// mutable object array
let myArray = {
    data: [],
};

// mutable variable
let B502 = new LectureHalls("B502", 100);
console.log(B502.toString());

// create table and tableController variables with arguments
const [table, tableController] = Table({
  headers: ["A", "B"],
  colCount: 2,
  body: [
    ["1.1", "1.2"],
    ["2.1", "2.2"],
  ],
});

// change B502 variable from within the Table class, mutable
tableController.editClassRoom(B502, "c43", 21);
console.log(B502.toString());

function readFile(){
  let file = document.getElementById("csvFile").files[0];
  if (file) {
    tableController.loadCSV(file);
    console.log(myArray.data);
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

// make array public
export {myArray};
