import { LectureHall } from "./models/LectureHall.js";
import { Instructor } from "./models/Instructor.js";
import { ServiceCourse } from "./models/ServiceCourse.js";
import { Course } from "./models/Course.js";

// final enum for days (pseudo-index)
const validDaysDigit = Object.freeze({
  Monday: Symbol("0"),
  Tuesday: Symbol("2"),
  Wednesday: Symbol("4"),
  Thursday: Symbol("6"),
  Friday: Symbol("8"),
});

// final enum for times of the day (pseudo-index)
const validTimesDigit = Object.freeze({
  Morning: Symbol("0"),
  Afternoon: Symbol("1"),
});

// final enum for days (pseudo-index)
const validDays = Object.freeze({
  Monday: Symbol("Monday"),
  Tuesday: Symbol("Tuesday"),
  Wednesday: Symbol("Wednesday"),
  Thursday: Symbol("Thursday"),
  Friday: Symbol("Friday"),
});

// final enum for times of the day (pseudo-index)
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
      validDaysDigit.Monday,
      array[2] == validTimes.Morning.description
        ? validTimesDigit.Morning
        : validTimesDigit.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Tuesday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDaysDigit.Tuesday,
      array[2] == validTimes.Morning.description
        ? validTimesDigit.Morning
        : validTimesDigit.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Wednesday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDaysDigit.Wednesday,
      array[2] == validTimes.Morning.description
        ? validTimesDigit.Morning
        : validTimesDigit.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Thursday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDaysDigit.Thursday,
      array[2] == validTimes.Morning.description
        ? validTimesDigit.Morning
        : validTimesDigit.Afternoon
    );
    return true;
  } else if (array[1] == validDays.Friday.description) {
    serviceCourses[index] = new ServiceCourse(
      array[0],
      validDaysDigit.Friday,
      array[2] == validTimes.Morning.description
        ? validTimesDigit.Morning
        : validTimesDigit.Afternoon
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
  let day = [];
  let time = [];
  day.push(array[1]);
  time.push(array[2]);
    instructors[index] = new Instructor(array[0], day, time);
    return true;
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
  var plan = new Array(rows);
  for (let i = 0; i < rows; i++) {
    plan[i] = new Array(columns);
  }


  // nest ServiceCourse objects into their respective Course objects
  for(let i = 0; i < serviceCourses.length; i++){
    for(let j = 0; j < courses.length; j++){
      if(courses[j].code == serviceCourses[i].name && courses[j].isService == true){
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
    let year = Number(courses[i].year);
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

  // sort lecture halls in ascending order [while at it :P]
  lectureHalls.sort(
    (obj1, obj2) => 
    (obj1.capacity > obj2.capacity) ? 1 : (obj1.capacity < obj2.capacity) ? -1 : 0);

  // place Service courses ahead of time
  for(let i = 0; i < lectureHalls.length; i++){
      // check if an empty classroom is suitable
      for(let j = 0; j < firstGrade.length; j++){
        if(firstGrade[j].isService == true){
          // store column info
          columnIndex = Number(firstGrade[j].serviceObject.day.description);
          columnOffset = Number(firstGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if((firstGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == false) 
          || ((firstGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == true)
          && (firstGrade[j].serviceObject.day.description != lectureHalls[i].day.description
          || firstGrade[j].serviceObject.time.description != lectureHalls[i].time.description))){
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = firstGrade[j].serviceObject.day;
            lectureHalls[i].time = firstGrade[j].serviceObject.time;
            firstGrade[j].currentHall = lectureHalls[i];
            // place service course in the plan array
            plan[0][columnIndex + columnOffset] = firstGrade[j];
        }
      }
    }
  }

  // place Service courses ahead of time
  for(let i = 0; i < lectureHalls.length; i++){
    // check if an empty classroom is suitable
    for(let j = 0; j < secondGrade.length; j++){
      if(secondGrade[j].isService == true){
        // store column info
        columnIndex = Number(secondGrade[j].serviceObject.day.description);
        columnOffset = Number(secondGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((secondGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == false) 
        || ((secondGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == true)
        && (secondGrade[j].serviceObject.day.description != lectureHalls[i].day.description
        || secondGrade[j].serviceObject.time.description != lectureHalls[i].time.description))){
          // set properties
          lectureHalls[i].isSoftOccupied = true;
          lectureHalls[i].day = secondGrade[j].serviceObject.day;
          lectureHalls[i].time = secondGrade[j].serviceObject.time;
          secondGrade[j].currentHall = lectureHalls[i];
          // place service course in the plan array
          plan[1][columnIndex + columnOffset] = secondGrade[j];
      }
    }
  }
}

  // place Service courses ahead of time
  for(let i = 0; i < lectureHalls.length; i++){
    // check if an empty classroom is suitable
    for(let j = 0; j < thirdGrade.length; j++){
      if(thirdGrade[j].isService == true){
        // store column info
        columnIndex = Number(thirdGrade[j].serviceObject.day.description);
        columnOffset = Number(thirdGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((thirdGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == false) 
        || ((thirdGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == true)
        && (thirdGrade[j].serviceObject.day.description != lectureHalls[i].day.description
        || thirdGrade[j].serviceObject.time.description != lectureHalls[i].time.description))){
          // set properties
          lectureHalls[i].isSoftOccupied = true;
          lectureHalls[i].day = thirdGrade[j].serviceObject.day;
          lectureHalls[i].time = thirdGrade[j].serviceObject.time;
          thirdGrade[j].currentHall = lectureHalls[i];
          // place service course in the plan array
          plan[2][columnIndex + columnOffset] = thirdGrade[j];
      }
    }
  }
}

  // place Service courses ahead of time
  for(let i = 0; i < lectureHalls.length; i++){
    // check if an empty classroom is suitable
    for(let j = 0; j < fourthGrade.length; j++){
      if(fourthGrade[j].isService == true){
        // store column info
        columnIndex = Number(fourthGrade[j].serviceObject.day.description);
        columnOffset = Number(fourthGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((fourthGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == false) 
        || ((fourthGrade[j].studentCount <= lectureHalls[i].capacity && lectureHalls[i].isSoftOccupied == true)
        && (fourthGrade[j].serviceObject.day.description != lectureHalls[i].day.description
        || fourthGrade[j].serviceObject.time.description != lectureHalls[i].time.description))){
          // set properties
          lectureHalls[i].isSoftOccupied = true;
          lectureHalls[i].day = fourthGrade[j].serviceObject.day;
          lectureHalls[i].time = fourthGrade[j].serviceObject.time;
          fourthGrade[j].currentHall = lectureHalls[i];
          // place service course in the plan array
          plan[3][columnIndex + columnOffset] = fourthGrade[j];
      }
    }
  }
}
  
    

  console.log(firstGrade);
  console.log(secondGrade);
  console.log(thirdGrade);
  console.log(fourthGrade);
  console.table(plan);
  console.log(lectureHalls);






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
                  if(instructors && instructors.length){
                    var personExists = false;
                    for(let j = 0; j < instructors.length; j++){
                      if(typeof(instructors[j]) !== 'undefined'){
                        if(instructors[j].name == csvarray[i][0]){
                          personExists = true;
                          instructors[j].day.push(csvarray[i][1]);
                          instructors[j].time.push(csvarray[i][2]);
                        }
                      }
                    }
                  }
                  if(!personExists && assignArrayToInstructorObject(csvarray[i], i)){
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
          // clean up instructors array
          instructors = instructors.filter(function(x) {
            return x !== undefined;
        });

        
        /*
          console.log(serviceCourses);
          console.log(courses);
          console.log(instructors);
          console.log(lectureHalls);
          */
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
