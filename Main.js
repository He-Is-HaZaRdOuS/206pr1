import {Table} from "./components/Table.js";
import { LectureHall } from "./LectureHall.js"; 
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
  Monday: Symbol("Monday"),
  Tuesday: Symbol("Tuesday"),
  Wednesday: Symbol("Wednesday"),
  Thursday: Symbol("Thursday"),
  Friday: Symbol("Friday"),

})

// final enum for times of the day
const validTimes = Object.freeze({
  Morning: Symbol("Morning"),
  Afternoon: Symbol("Afternoon"),
})

// declare variables to hold objects
var serviceCourses;
var courses;
var instructors;
var lectureHalls;

function assignArrayToServiceObject(array, index){
  // check if 1st and 2nd index of array matches enums using if-else and ternary operations
  if(array[1] == validDays.Monday.description){
    serviceCourses[index] = new ServiceCourse(array[0], validDays.Monday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Tuesday.description){
    serviceCourses[index] = new ServiceCourse(array[0], validDays.Tuesday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Wednesday.description){
    serviceCourses[index] = new ServiceCourse(array[0], validDays.Wednesday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Thursday.description){
    serviceCourses[index] = new ServiceCourse(array[0], validDays.Thursday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Friday.description){
    serviceCourses[index] = new ServiceCourse(array[0], validDays.Friday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  
  //console.log(serviceCourses);
}

function assignArrayToCourseObject(array, index){
  courses[index] = new Course(array[0], array[1], array[2], array[3], ((array[4] == "C") ? true : false), ((array[5] == "S") ? true : false), array[6], array[7]);
  //console.log(courses);
}

function assignArrayToInstructorObject(array, index){
  // check if 1st and 2nd index of array matches enums using if-else and ternary operations
  if(array[1] == validDays.Monday.description){
    instructors[index] = new Instructor(array[0], validDays.Monday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Tuesday.description){
    instructors[index] = new Instructor(array[0], validDays.Tuesday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Wednesday.description){
    instructors[index] = new Instructor(array[0], validDays.Wednesday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Thursday.description){
    instructors[index] = new Instructor(array[0], validDays.Thursday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }
  else if(array[1] == validDays.Friday.description){
    instructors[index] = new Instructor(array[0], validDays.Friday, ((array[2] == validTimes.Morning.description) ? validTimes.Morning : validTimes.Afternoon));
  }

  //console.log(instructors);
}

function assignArrayToLectureHallObject(array, index){
  lectureHalls[index] = new LectureHall(array[0], array[1]);
  //console.log(lectureHalls);
}

var boolarray = [true, true, true, true]; // array to stop the 'for' loop from constantly resetting the object arrays
var csvarray = [];  // array to store loadCSV result
// function is async
async function readFile(){
  let file = document.getElementById("csvFile").files[0];
  // wait for everything inside the below curly braces to finish before returning promise (makes invoking objects/functions wait for this function's completion)
  return new Promise((resolve) => {
    if (file) {
      // load .csv file
      tableController.loadCSV(file).then(a => { 
        csvarray = [...a]; // deep-copy resultant array
        let arr_len = csvarray.length;
        var hasDigit = /\d/;  // regex to match digits
        for(let i = 0; i < arr_len - 1; i++){
          let sub_len = csvarray[i].length;  // know what .csv was uploaded based on sub-array length
          switch(sub_len){
            case 2:
              // classroom.csv
              if(boolarray[0]){
                lectureHalls = new Array(csvarray[i].length);
                boolarray[0] = false;
              }
              console.log("classroom.csv")
              assignArrayToLectureHallObject(csvarray[i], i);

            break;
  
            case 3:
              // if length 3, then check if first sub-index has digits, if yes then service.csv, if no then busy.csv
              let bool = hasDigit.test(csvarray[i][0]);
              if(bool){
                // service.csv
                console.log("service.csv")
                if(boolarray[1]){
                  serviceCourses = new Array(csvarray[i].length);
                  boolarray[1] = false;
                }
                assignArrayToServiceObject(csvarray[i], i);
              }
              else{
                // busy.csv
                if(boolarray[2]){
                  instructors = new Array(csvarray[i].length);
                  boolarray[2] = false;
                }
                console.log("busy.csv")
                assignArrayToInstructorObject(csvarray[i], i);
              }
  
            break;
  
            case 8:
              // courses.csv
              if(boolarray[3]){
                courses = new Array(csvarray[i].length);
                boolarray[3] = false;
              }
              console.log("courses.csv")
              assignArrayToCourseObject(csvarray[i], i);
            break;
          }
  
        }

        console.log(serviceCourses);
        console.log(courses);
        console.log(instructors);
        console.log(lectureHalls);
        // reset variables
        boolarray[0] = true;
        boolarray[1] = true;
        boolarray[2] = true;
        boolarray[3] = true;

        modal.style.display = "none";
        // return promise
        resolve("done");
      })
      .catch(error => {
        console.error(error); // Error handling
      });
    }
  });

}


async function startReadingFile(){
  const wait = await readFile();  // wait for this function call to return promise result
  console.log("doneing")  // test async waiting
  console.log(wait)

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
export {validDays, validTimes};
