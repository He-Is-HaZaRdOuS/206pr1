import {Table} from "./components/Table.js";
import { LectureHalls } from "./LectureHalls.js"; 
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

var array = [];
var length = 0;
var s = new ServiceCourse();

async function readFile(){

  let file = document.getElementById("csvFile").files[0];
  if (file) {
    tableController.loadCSV(file).then(a => { 
      // everything outside the curly braces is async, need to assign array to objects in here and nowhere else
      //console.log(a); 
      array = a;
      console.log(array)

    })
    .catch(error => {
      console.error(error); // Error handling
    });
    
   // var myArray = await tableController.loadCSV(file);
   // console.log(myArray);
   /* switch(length){
      case 8:
      break;
    }*/
    modal.style.display = "none";
  //  return myArray;
  }
}

async function startReadingFile(){
  await readFile();
  // everything below is async
  //console.log(array);
};



container.insertBefore(table, container.childNodes[0]);
addRowBtn.addEventListener("click", tableController.addRow);
downloadBtn.addEventListener("click", tableController.download);

document.getElementById("load-btn").addEventListener("click", startReadingFile);

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
export { length, s, validDays, validTimes};
