import { LectureHall } from "./models/LectureHall.js";
import { Instructor } from "./models/Instructor.js";
import { ServiceCourse } from "./models/ServiceCourse.js";
import { Course } from "./models/Course.js";

// final enum for days
const validDays = Object.freeze({
  Monday: Symbol("Monday"),
  Tuesday: Symbol("Tuesday"),
  Wednesday: Symbol("Wednesday"),
  Thursday: Symbol("Thursday"),
  Friday: Symbol("Friday"),
});

// final enum for times of the day
const validTimes = Object.freeze({
  Morning: Symbol("Morning"),
  Afternoon: Symbol("Afternoon"),
});

// declare variables to hold objects
var serviceCourses;
var courses;
var instructors;
var lectureHalls;
var firstGrade;
var secondGrade;
var thirdGrade;
var fourthGrade;

var boolarray = [true, true, true, true]; // array to stop the 'for' loop from constantly resetting the object arrays
var boolarray2 = [true, true, true, true]; // array to increment counter
var csvarray = [];  // array to store loadCSV result
var cnt = 0;  // counter

function assignArrayToServiceObject(array, index) {
  // check if 1st and 2nd index of array matches enums using if-else and ternary operations
  if (array[1] == validDays.Monday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDays.Monday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Tuesday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDays.Tuesday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Wednesday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDays.Wednesday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Thursday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDays.Thursday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Friday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDays.Friday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  }

  //console.log(serviceCourses);
}

function assignArrayToCourseObject(array, index) {
  courses[index] = new Course(
    array[0],
    array[1],
    array[2],
    array[3],
    array[4] == "C" ? true : false,
    array[5] == "S" ? true : false,
    array[6],
    array[7]
  );
  return true;
  //console.log(courses);
}

function assignArrayToInstructorObject(array, index) {
  // check if 1st and 2nd index of array matches enums using if-else and ternary operations
  if (array[1] == validDays.Monday.description) {
    instructors[index] = new Instructor(
      array[0],
      validDays.Monday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Tuesday.description) {
    instructors[index] = new Instructor(
      array[0],
      validDays.Tuesday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Wednesday.description) {
    instructors[index] = new Instructor(
      array[0],
      validDays.Wednesday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Thursday.description) {
    instructors[index] = new Instructor(
      array[0],
      validDays.Thursday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Friday.description) {
    instructors[index] = new Instructor(
      array[0],
      validDays.Friday,
      array[2] == validTimes.Morning.description
        ? validTimes.Morning
        : validTimes.Afternoon
    );
    return true;
  }

  //console.log(instructors);
}

function assignArrayToLectureHallObject(array, index) {
  lectureHalls[index] = new LectureHall(array[0], array[1]);
  return true;
  //console.log(lectureHalls);
}

function retrieveNumberFromString(str){
  let newstr = str.replace(/\D/g, "");
  let num = Number(newstr);
  return num;
}

function findYearOfService(array){
  for(let i = 0; i < array.length; i++){
    array[i].year = Math.floor((retrieveNumberFromString(array[i].name) / 100));
  }
}

function coursePlannerAlgorithm(){
  cnt = 0;  // reset counter
  var plan = [];
  let rows = 4;
  let columns = 10;
  var columnOffset = Number.MIN_SAFE_INTEGER;
  var columnIndex = Number.MIN_SAFE_INTEGER;
  firstGrade = [];
  secondGrade = [];
  thirdGrade = [];
  fourthGrade = [];

  // assign year property to serviceCourse objects
  findYearOfService(serviceCourses);

  // create two dimensional array for final course plan ([4][10])
  for (let i = 0; i < rows; i++) {
    plan[i] = [];
    for (let j = 0; j < columns; j++) {
      plan[i][j] = "";
    }
  }

  // nest ServiceCourse objects into their respective Course objects
  for(let i = 0; i < serviceCourses.length; i++){
    for(let j = 0; j < courses.length; j++){
      if(courses[j].code == serviceCourses[i].name){
        courses[j].serviceObject = serviceCourses[i];
      }
    }
  }

  // nest Instructor objects into their respective Course objects (check the boolean property before invoking the object)
  for(let i = 0; i < instructors.length; i++){
    for(let j = 0; j < courses.length; j++){
      if(courses[j].instructorName == instructors[i].name){
        courses[j].instructorObject = instructors[i];
        courses[j].hasInstructorObject = true;
      }
    }
  }

  // sort courses according to their year
  for(let i = 0; i < courses.length; i++){
    let year = courses[i].year;
    switch(year){
      case 1:
          firstGrade.push(courses[i]);
        break;
      case 2:
          secondGrade.push(courses[i]);
        break;
      case 3:
          thirdGrade.push(courses[i]);
        break;
      case 4:
          fourthGrade.push(courses[i]);
        break;
    }
  }

  // sort course arrays according to their student count
  firstGrade.sort(
    (obj1, obj2) => 
    (obj1.studentCount < obj2.studentCount) ? 1 : (obj1.studentCount > obj2.studentCount) ? -1 : 0);

  secondGrade.sort(
    (obj1, obj2) => 
    (obj1.studentCount < obj2.studentCount) ? 1 : (obj1.studentCount > obj2.studentCount) ? -1 : 0);

  thirdGrade.sort(
    (obj1, obj2) => 
    (obj1.studentCount < obj2.studentCount) ? 1 : (obj1.studentCount > obj2.studentCount) ? -1 : 0);

  fourthGrade.sort(
    (obj1, obj2) => 
    (obj1.studentCount < obj2.studentCount) ? 1 : (obj1.studentCount > obj2.studentCount) ? -1 : 0);

  // sort lecture halls too while at it :P
  lectureHalls.sort(
    (obj1, obj2) => 
    (obj1.capacity < obj2.capacity) ? 1 : (obj1.capacity > obj2.capacity) ? -1 : 0);

  // place Service courses ahead of time
  // NEED TO ASSIGN LECTURE HALL OBJECTS INSIDE COURSE OBJECT WHEN PLACING IT INSIDE PLAN ARRAY 
  for(let i = 0; i < firstGrade.length; i++){
      if(firstGrade[i].isService == true){
        if(firstGrade[i].serviceObject.time.description == validTimes.Morning.description){
          columnOffset = 0; // zero offset if morning
        }
        else{
          columnOffset = 1; // one offset otherwise (afternoon)
        }
        // find column index number ( [columnIndex + columnOffset] will be used to store this course object into plan array)
        switch(firstGrade[i].serviceObject.day.description){
          case validDays.Monday.description:
            columnIndex = 0;
            break;

          case validDays.Tuesday.description:
            columnIndex = 2;
            break;

          case validDays.Wednesday.description:
            columnIndex = 4;
            break;

          case validDays.Thursday.description:
            columnIndex = 6;
            break;

          case validDays.Friday.description:
            columnIndex = 8;
            break;
        }
        plan[0][columnIndex+columnOffset] = firstGrade[i];
      }  
  }

  // do the same for the rest of the grades and then start placing department courses
  
    
  console.log(lectureHalls);
  console.log(firstGrade);
  console.log(secondGrade);
  console.log(thirdGrade);
  console.log(fourthGrade);






}

// function is async
async function readFile() {
  let file = document.getElementById("csvFile").files[0];
  // wait for everything inside the below curly braces to finish before returning promise (makes invoking objects/functions wait for this function's completion)
  return new Promise((resolve) => {
    if (file) {
      // load .csv file
      loadCSV(file)
        .then((a) => {
          csvarray = [...a]; // deep-copy resultant array
          let arr_len = csvarray.length;
          var hasDigit = /\d/; // regex to match digits
          for (let i = 0; i < arr_len - 1; i++) {
            let sub_len = csvarray[i].length; // know what .csv was uploaded based on sub-array length
            switch(sub_len){
              case 2:
                // classroom.csv
                if(boolarray[0]){
                  lectureHalls = new Array(csvarray[i].length);
                  boolarray[0] = false;
                }
                console.log("classroom.csv")
                if(assignArrayToLectureHallObject(csvarray[i], i)){
                  if(boolarray2[0]){
                    cnt = cnt + 1;
                    boolarray2[0] = false;
                  }
                }
  
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
                  if(assignArrayToServiceObject(csvarray[i], i)){
                    if(boolarray2[1]){
                      cnt = cnt + 1;
                      boolarray2[1] = false;
                    }
                  }
                }
                else{
                  // busy.csv
                  if(boolarray[2]){
                    instructors = new Array(csvarray[i].length);
                    boolarray[2] = false;
                  }
                  console.log("busy.csv")
                  if(assignArrayToInstructorObject(csvarray[i], i)){
                    if(boolarray2[2]){
                      cnt = cnt + 1;
                      boolarray2[2] = false;
                    }
                  }
                }
    
              break;
    
              case 8:
                // courses.csv
                if(boolarray[3]){
                  courses = new Array(csvarray[i].length);
                  boolarray[3] = false;
                }
                console.log("courses.csv")
                if(assignArrayToCourseObject(csvarray[i], i)){
                  if(boolarray2[3]){
                    cnt = cnt + 1;
                    boolarray2[3] = false;
                  }
                }
              break;
            }
    
          }
  
          console.log(serviceCourses);
          console.log(courses);
          console.log(instructors);
          console.log(lectureHalls);
          console.log(cnt)
          // reset variables
          boolarray[0] = true;
          boolarray[1] = true;
          boolarray[2] = true;
          boolarray[3] = true;
  
          if(cnt == 4){
            // invoke algorithm
            coursePlannerAlgorithm();
          }
          modal.style.display = "none";
          // return promise
          resolve("done");
        })
        .catch((error) => {
          console.error(error); // Error handling
        });
    }
  });
}

const loadCSV = async (file) => {
  // if there is error we'll use reject if not we'll use resolve
  return new Promise((resolve, reject) => {
    //  the array that will hold all the info
    let data = [];
    // read csv file as a one line
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      // if there is error we'll return reject
      if (e == null) {
        reject(e);
      } else {
        let rows = e.target.result.split("\r\n");
        rows.forEach((r) => {
          let splitted = r.split(";");
          data.push(splitted);
        });
        // then return them
        resolve(data);
      }
    };
  });
};

async function startReadingFile() {
  const wait = await readFile(); // wait for this function call to return promise result
}

document.getElementById("load-btn").addEventListener("click", startReadingFile);

// make below objects public
export { validDays, validTimes };
