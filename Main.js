import {Table} from "./components/Table.js";
import { LectureHalls } from "./LectureHalls.js"; 
import { Instructor } from "./Instructor.js";
import { ServiceCourse } from "./ServiceCourse.js";
import { Course } from "./Course.js";
import { Instructor } from "./Instructor.js";
import { ServiceCourse } from "./ServiceCourse.js";
import { Course } from "./Course.js";

const addRowBtn = document.getElementById("add-row");
const downloadBtn = document.getElementById("download");
const uploadBtn = document.getElementById("upload");
const container = document.getElementById("cnt");
const modal = document.getElementById("modal");

// create table and tableController variables with arguments
const [table, tableController] = Table({
  headers: ["A", "B"],
  colCount: 2,
  body: [
    ["1.1", "1.2"],
    ["2.1", "2.2"],
  ],
});

// final enum for days
const validDays = Object.freeze({
  Monday: Symbol("monday"),
  Tuesday: Symbol("tuesday"),
  Wednesday: Symbol("wednesday"),
  Thursday: Symbol("thursday"),
  Friday: Symbol("friday"),

})

// final enum for times of the day
const validTimes = Object.freeze({
  Morning: Symbol("morning"),
  Afternoon: Symbol("afternoon"),
})

var tempCounter = 0;
var objectCounter = 0;
let myArray = {
  data: [],
};


function readFile(){
  let file = document.getElementById("csvFile").files[0];
  if (file) {
    tableController.loadCSV(file);
    switch(tempCounter){
      case 0:
      break;
    }
    modal.style.display = "none";
    tempCounter++;
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


// make below objects public
export {myArray, validDays, validTimes};
