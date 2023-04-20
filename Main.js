import { LectureHall } from "./models/LectureHall.js";
import { Instructor } from "./models/Instructor.js";
import { ServiceCourse } from "./models/ServiceCourse.js";
import { Course } from "./models/Course.js";
import { getStateCopy, setAppState } from "./App.js";

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

  if(array[2] == validTimes.Morning.description){
    time.push(validTimesDigit.Morning.description);
  }
  else{
    time.push(validTimesDigit.Afternoon.description);
  }

  if (array[1] == validDays.Monday.description) {
    day.push(validDaysDigit.Monday.description);

    instructors[index] = new Instructor(array[0], day, time);
    return true;

  } else if (array[1] == validDays.Tuesday.description) {
    day.push(validDaysDigit.Tuesday.description);

    instructors[index] = new Instructor(array[0], day, time);
    return true;

  } else if (array[1] == validDays.Wednesday.description) {
    day.push(validDaysDigit.Wednesday.description);

    instructors[index] = new Instructor(array[0], day, time);
    return true;

  } else if (array[1] == validDays.Thursday.description) {
    day.push(validDaysDigit.Thursday.description);

    instructors[index] = new Instructor(array[0], day, time);
    return true;

    } else if (array[1] == validDays.Friday.description) {
      day.push(validDaysDigit.Friday.description);

      instructors[index] = new Instructor(array[0], day, time);
      return true;
    }
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

function findInstructor(instructorName){
  for(let i = 0 ; i < instructors.length; i++)
  {
    if(instructorName == instructors[i].name)
    {
      return instructors[i];
    }

    return false;
  }
}

// SPAGHETTI CODE ALERT (sorry for the disappointment)
function placeServiceCourses(plan){
  var columnOffset = Number.MIN_SAFE_INTEGER;
  var columnIndex = Number.MIN_SAFE_INTEGER;

    // place Service courses ahead of time
    for(let j = 0; j < firstGrade.length; j++){
      // check if an empty classroom is suitable

      if(firstGrade[j].isService == true){
      for(let i = 0; i < lectureHalls.length; i++){  
          // store column info
          columnIndex = Number(firstGrade[j].serviceObject.day.description);
          columnOffset = Number(firstGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if((firstGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == false && firstGrade[j].inHall == false)) 
          || ((firstGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == true  && firstGrade[j].inHall == false))
          && (Number(firstGrade[j].serviceObject.day.description) != Number(lectureHalls[i].day)
          || Number(firstGrade[j].serviceObject.time.description) != Number(lectureHalls[i].time)))){
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = Number(firstGrade[j].serviceObject.day.description);
            lectureHalls[i].time = Number(firstGrade[j].serviceObject.time.description);
            firstGrade[j].currentHall = lectureHalls[i];
            firstGrade[j].inHall = true;
            // place service course in the plan array
            plan[0][columnIndex + columnOffset] = firstGrade[j];
        }
      }
    }
  }

  for(let j = 0; j < secondGrade.length; j++){
    // check if an empty classroom is suitable

    if(secondGrade[j].isService == true){
      for(let i = 0; i < lectureHalls.length; i++){ 
        // store column info
        columnIndex = Number(secondGrade[j].serviceObject.day.description);
        columnOffset = Number(secondGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((secondGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == false && secondGrade[j].inHall == false)) 
        || ((secondGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == true && secondGrade[j].inHall == false))
        && (Number(secondGrade[j].serviceObject.day.description) != Number(lectureHalls[i].day)
        ||  Number(secondGrade[j].serviceObject.time.description) != Number(lectureHalls[i].time)))){
          if(typeof(plan[0][columnIndex + columnOffset]) != 'undefined'){
            if(plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
          // set properties
          lectureHalls[i].isSoftOccupied = true;
          lectureHalls[i].day = Number(secondGrade[j].serviceObject.day.description);
          lectureHalls[i].time = Number(secondGrade[j].serviceObject.time.description);
          secondGrade[j].currentHall = lectureHalls[i];
          secondGrade[j].inHall = true;
          // place service course in the plan array
          plan[1][columnIndex + columnOffset] = secondGrade[j];
            }
          }
          else{
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = Number(secondGrade[j].serviceObject.day.description);
            lectureHalls[i].time = Number(secondGrade[j].serviceObject.time.description);
            secondGrade[j].currentHall = lectureHalls[i];
            secondGrade[j].inHall = true;
            // place service course in the plan array
            plan[1][columnIndex + columnOffset] = secondGrade[j];
          }
        }
      }
    }
  }

for(let j = 0; j < thirdGrade.length; j++){
  // check if an empty classroom is suitable

  if(thirdGrade[j].isService == true){
    for(let i = 0; i < lectureHalls.length; i++){  
        // store column info
        columnIndex = Number(thirdGrade[j].serviceObject.day.description);
        columnOffset = Number(thirdGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((thirdGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == false && thirdGrade[j].inHall == false)) 
        || ((thirdGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == true && thirdGrade[j].inHall == false))
        && (Number(thirdGrade[j].serviceObject.day.description) != Number(lectureHalls[i].day)
        || Number(thirdGrade[j].serviceObject.time.description) != Number(lectureHalls[i].time)))){
          if(typeof(plan[0][columnIndex + columnOffset]) != 'undefined'){
            if(typeof(plan[1][columnIndex + columnOffset]) != 'undefined'){
              if((plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
              && (plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(thirdGrade[j].serviceObject.day.description);
                lectureHalls[i].time = Number(thirdGrade[j].serviceObject.time.description);
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            }
            else{
              if(plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(thirdGrade[j].serviceObject.day.description);
                lectureHalls[i].time = Number(thirdGrade[j].serviceObject.time.description);
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            }
          }
          else{
            if(typeof(plan[1][columnIndex + columnOffset]) != 'undefined'){
              if(plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(thirdGrade[j].serviceObject.day.description);
                lectureHalls[i].time = Number(thirdGrade[j].serviceObject.time.description);
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            }
            else{
              // set properties
              lectureHalls[i].isSoftOccupied = true;
              lectureHalls[i].day = Number(thirdGrade[j].serviceObject.day.description);
              lectureHalls[i].time = Number(thirdGrade[j].serviceObject.time.description);
              thirdGrade[j].currentHall = lectureHalls[i];
              thirdGrade[j].inHall = true;
              // place service course in the plan array
              plan[2][columnIndex + columnOffset] = thirdGrade[j];
            }
          }
      }
    }
  }
}

for(let j = 0; j < fourthGrade.length; j++){
  // check if an empty classroom is suitable

  if(fourthGrade[j].isService == true){
    for(let i = 0; i < lectureHalls.length; i++){  
        // store column info
        columnIndex = Number(fourthGrade[j].serviceObject.day.description);
        columnOffset = Number(fourthGrade[j].serviceObject.time.description);
      // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
      if((fourthGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == false && fourthGrade[j].inHall == false)) 
        || ((fourthGrade[j].studentCount <= lectureHalls[i].capacity && (lectureHalls[i].isSoftOccupied == true && fourthGrade[j].inHall == false))
        && (Number(fourthGrade[j].serviceObject.day.description) != Number(lectureHalls[i].day)
        || Number(fourthGrade[j].serviceObject.time.description) != Number(lectureHalls[i].time)))){
          if(typeof(plan[0][columnIndex + columnOffset]) != 'undefined'){
            if(typeof(plan[1][columnIndex + columnOffset]) != 'undefined'){
              if(typeof(plan[2][columnIndex + columnOffset]) != 'undefined'){
                if(((plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                  && (plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                  && (plan[2][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id))){
                    // set properties
                    lectureHalls[i].isSoftOccupied = true;
                    lectureHalls[i].day = Number(fourthGrade[j].serviceObject.day.description);
                    lectureHalls[i].time = Number(fourthGrade[j].serviceObject.time.description);
                    fourthGrade[j].currentHall = lectureHalls[i];
                    fourthGrade[j].inHall = true;
                    // place service course in the plan array
                    plan[3][columnIndex + columnOffset] = fourthGrade[j];
                }
              }
              else{
                if((plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                && (plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                  // set properties
                  lectureHalls[i].isSoftOccupied = true;
                  lectureHalls[i].day = Number(fourthGrade[j].serviceObject.day.description);
                  lectureHalls[i].time = Number(fourthGrade[j].serviceObject.time.description);
                  fourthGrade[j].currentHall = lectureHalls[i];
                  fourthGrade[j].inHall = true;
                  // place service course in the plan array
                  plan[3][columnIndex + columnOffset] = fourthGrade[j];
                }
              }
            }
            else{
              if(plan[0][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(fourthGrade[j].serviceObject.day.description);
                lectureHalls[i].time = Number(fourthGrade[j].serviceObject.time.description);
                fourthGrade[j].currentHall = lectureHalls[i];
                fourthGrade[j].inHall = true;
                // place service course in the plan array
                plan[3][columnIndex + columnOffset] = fourthGrade[j];
              }
            }
          }
          else{
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = Number(fourthGrade[j].serviceObject.day.description);
            lectureHalls[i].time = Number(fourthGrade[j].serviceObject.time.description);
            fourthGrade[j].currentHall = lectureHalls[i];
            fourthGrade[j].inHall = true;
            // place service course in the plan array
            plan[3][columnIndex + columnOffset] = fourthGrade[j];
          }
        }
      }
    }
  }
  // end of function
}

function coursePlannerAlgorithm(){
  cnt = 0;  // reset counter
  let rows = 4;
  let columns = 10;
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

  // sort lecture halls too [while at it :P]
  lectureHalls.sort(
    (obj1, obj2) => 
    (obj1.capacity < obj2.capacity) ? 1 : (obj1.capacity > obj2.capacity) ? -1 : 0);
    

    placeServiceCourses(plan);
 

////////////////////////////////////////////////////////////////////////////////////////////////
// place courses with instructor busy schedules second

for(let j = 0; j < instructors.length; j++){
  for(let i = 0; i < lectureHalls.length; i++){
    for(let k = 0; k < firstGrade.length; k++){

      if(firstGrade[k].hasInstructorObject == true && firstGrade[k].isService == false){
        if(firstGrade[k].studentCount <= lectureHalls[i].capacity){
          if(firstGrade[k].instructorObject.name == instructors[j].name){
            
              for(let p = 0; p < plan[0].length; p++){
                
                if(typeof(plan[0][p]) == 'undefined' && firstGrade[k].inHall == false){
                  if(p < instructors[j].day.length){
                    if(((Number(instructors[j].day[p]) + (Number(instructors[j].time[p])) != p))){
                      if((lectureHalls[i].isSoftOccupied == false) || ((lectureHalls[i].isSoftOccupied == true)
                        && ((Number(instructors[j].day[p]) != lectureHalls[i].day)
                        || (Number(instructors[j].time[p]) != lectureHalls[i].time)))){

                          if(typeof(plan[1][columnIndex + columnOffset]) != 'undefined'){
                            if(typeof(plan[2][columnIndex + columnOffset]) != 'undefined'){
                              if(typeof(plan[3][columnIndex + columnOffset]) != 'undefined'){
                                if(((plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                                  && (plan[2][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                                  && (plan[3][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id))){
                                    // set properties
                                    plan[0][p] = firstGrade[k];
                                    lectureHalls[i].isSoftOccupied = true;
                                    lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                    lectureHalls[i].time = p%2;
                                    firstGrade[k].currentHall = lectureHalls[i];
                                    firstGrade[k].inHall = true;
                                }
                              }
                              else{
                                if((plan[2][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                                && (plan[3][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                            }
                            else{
                              if(typeof(plan[3][columnIndex + columnOffset]) != 'undefined'){
                                if(plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id
                                  && (plan[3][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                              else{
                                if(plan[1][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }

                            }
                          }
                          else{
                            if(typeof(plan[2][columnIndex + columnOffset]) != 'undefined'){
                              if(typeof(plan[3][columnIndex + columnOffset]) != 'undefined'){
                                if((plan[2][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)
                                && (plan[3][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                              else{
                                if(plan[2][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                            }
                            else{
                              if(typeof(plan[3][columnIndex + columnOffset]) != 'undefined'){
                                if((plan[3][columnIndex + columnOffset].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                            }
                            // set properties
                            plan[0][p] = firstGrade[k];
                            lectureHalls[i].isSoftOccupied = true;
                            lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                            lectureHalls[i].time = p%2;
                            firstGrade[k].currentHall = lectureHalls[i];
                            firstGrade[k].inHall = true;
                          }
                        }
                      }
                    }
                    else{

                    if((lectureHalls[i].isSoftOccupied == false) || ((lectureHalls[i].isSoftOccupied == true)
                    && ((((p%2 == 0) ? p : p-1) != lectureHalls[i].day) || (p%2 != lectureHalls[i].time)))){

                      if(typeof(plan[0][p]) != 'undefined'){
                        if(typeof(plan[1][p]) != 'undefined'){
                          if(typeof(plan[2][p]) != 'undefined'){
                            if(typeof(plan[3][p]) != 'undefined'){
                            if(((plan[0][p].currentHall.id != lectureHalls[i].id)
                              && (plan[1][p].currentHall.id != lectureHalls[i].id)
                              && (plan[2][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id))){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                            else{
                              if(((plan[0][p].currentHall.id != lectureHalls[i].id)
                              && (plan[1][p].currentHall.id != lectureHalls[i].id)
                              && (plan[2][p].currentHall.id != lectureHalls[i].id))){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                          }
                          else{
                            if(typeof(plan[3][p]) != 'undefined'){
                              if((plan[0][p].currentHall.id != lectureHalls[i].id)
                              && (plan[1][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id)){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                            else {
                              if((plan[0][p].currentHall.id != lectureHalls[i].id)
                              && (plan[1][p].currentHall.id != lectureHalls[i].id)){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                          }
                        }
                        else{
                            if(typeof(plan[2][p]) != 'undefined'){
                              if(typeof(plan[3][p]) != 'undefined'){
                                if((plan[0][p].currentHall.id != lectureHalls[i].id)
                                && (plan[2][p].currentHall.id != lectureHalls[i].id)
                                && (plan[3][p].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                              else{
                                if((plan[0][p].currentHall.id != lectureHalls[i].id)
                                && (plan[2][p].currentHall.id != lectureHalls[i].id)){
                                  // set properties
                                  plan[0][p] = firstGrade[k];
                                  lectureHalls[i].isSoftOccupied = true;
                                  lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                  lectureHalls[i].time = p%2;
                                  firstGrade[k].currentHall = lectureHalls[i];
                                  firstGrade[k].inHall = true;
                                }
                              }
                           }
                           else{
                            if(typeof(plan[3][p]) != 'undefined'){
                              if((plan[0][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id)){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                            else{
                              if(plan[0][p].currentHall.id != lectureHalls[i].id){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                           }
                        }
                      }
                      else{
                        if(typeof(plan[1][p]) != 'undefined'){
                          if(typeof(plan[2][p]) != 'undefined'){
                            if(typeof(plan[3][p]) != 'undefined'){
                              if(((plan[1][p].currentHall.id != lectureHalls[i].id)
                              && (plan[2][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id))){
                                // set properties
                                plan[0][p] = firstGrade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                                lectureHalls[i].time = p%2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                            if(((plan[1][p].currentHall.id != lectureHalls[i].id)
                            && (plan[2][p].currentHall.id != lectureHalls[i].id))){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                            }
                          }
                          else{
                            if(typeof(plan[3][p]) != 'undefined'){
                              if(((plan[1][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id))){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                              }
                            }
                            else{
                              if(plan[1][p].currentHall.id != lectureHalls[i].id){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                              }
                            }
                          }
                        }
                        else{
                          if(typeof(plan[2][p]) != 'undefined'){
                            if(typeof(plan[3][p]) != 'undefined'){
                              if(((plan[2][p].currentHall.id != lectureHalls[i].id)
                              && (plan[3][p].currentHall.id != lectureHalls[i].id))){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                              }
                            }
                            else{
                              if(plan[2][p].currentHall.id != lectureHalls[i].id){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                              }
                            }
                          }
                          else{
                            if(typeof(plan[3][p]) != 'undefined'){
                              if(plan[3][p].currentHall.id != lectureHalls[i].id){
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                              }
                            }
                            else{
                              // set properties
                              plan[0][p] = firstGrade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
                              lectureHalls[i].time = p%2;
                              firstGrade[k].currentHall = lectureHalls[i];
                              firstGrade[k].inHall = true;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

/*
for(let i = 0; i < lectureHalls.length; i++){
  for(let j = 0; j < firstGrade.length; j++){

    if(firstGrade[j].hasInstructorObject == false && firstGrade[j].isService == false){
      if(firstGrade[j].studentCount <= lectureHalls[i].capacity){

        for(let p = 0; p < plan[0].length; p++){
          if(typeof(plan[0][p]) == 'undefined' && firstGrade[j].inHall == false){
            if((lectureHalls[i].isSoftOccupied == false) || ((lectureHalls[i].isSoftOccupied == true)
            && ((((p%2 == 0) ? p : p-1) != lectureHalls[i].day) || (p%2 != lectureHalls[i].time)))){

              plan[0][p] = firstGrade[j];
              lectureHalls[i].isSoftOccupied = true;
              lectureHalls[i].day = ((p%2 == 0) ? p : p-1);
              lectureHalls[i].time = p%2;
              firstGrade[j].currentHall = lectureHalls[i];
              firstGrade[j].inHall = true;
            } 
          }
        }
      }
    }
  }
}
*/

////////////////////////////////////////////////////////////


  console.log(firstGrade);
  console.log(secondGrade);
  console.log(thirdGrade);
  console.log(fourthGrade);
  console.table(plan);
  console.log(lectureHalls);






}

// function is async
async function readFile(files) {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // moved this to FileInput.js
  //let file = document.getElementById("csvFile").files[0];
  let file = files[0];
  let newState;
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
            switch (sub_len) {
              case 2:
                // classroom.csv
                if (boolarray[0]) {
                  lectureHalls = new Array(csvarray[i].length);
                  boolarray[0] = false;
                }
                console.log("classroom.csv");
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // testing the state
                newState = { ...getStateCopy() };
                newState.parameters.fileStatus.lectureHalls = true;
                setAppState(newState);

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
                if (bool) {
                  // service.csv
                  console.log("service.csv");

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  // testing the state
                  newState = { ...getStateCopy() };
                  newState.parameters.fileStatus.serviceCourses = true;
                  setAppState(newState);

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
                else {
                  // busy.csv
                  if (boolarray[2]) {
                    instructors = new Array(csvarray[i].length);
                    boolarray[2] = false;
                  }
                  console.log("busy.csv");

                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                  // testing the state
                  newState = { ...getStateCopy() };
                  newState.parameters.fileStatus.instructors = true;
                  setAppState(newState);

                  if(instructors && instructors.length){
                    var personExists = false;
                    for(let j = 0; j < instructors.length; j++){
                      if(typeof(instructors[j]) !== 'undefined'){
                        if(instructors[j].name == csvarray[i][0]){
                          personExists = true;
                          if(csvarray[i][1] == validDays.Monday.description){
                            instructors[j].day.push("0");
                          }
                          else if(csvarray[i][1] == validDays.Tuesday.description){
                            instructors[j].day.push("2");
                          }
                          else if(csvarray[i][1] == validDays.Wednesday.description){
                            instructors[j].day.push("4");
                          }
                          else if(csvarray[i][1] == validDays.Thursday.description){
                            instructors[j].day.push("6");
                          }
                          else if(csvarray[i][1] == validDays.Friday.description){
                            instructors[j].day.push("8");
                          }
                          
                          if(csvarray[i][2] == validTimes.Morning.description){
                            instructors[j].time.push("0");
                          }
                          else if(csvarray[i][2] == validTimes.Afternoon.description){
                            instructors[j].time.push("1");
                          }
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
                if (boolarray[3]) {
                  courses = new Array(csvarray[i].length);
                  boolarray[3] = false;
                }
                console.log("courses.csv");
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // testing the state
                newState = { ...getStateCopy() };
                newState.parameters.fileStatus.courses = true;
                setAppState(newState);

                if(assignArrayToCourseObject(csvarray[i], i)){
                  if(boolarray2[3]){
                    cnt = cnt + 1;
                    boolarray2[3] = false;
                  }
                }
                break;
            }
          }

          if(personExists){
          // clean up instructors array
          instructors = instructors.filter(function(x) {
            return x !== undefined;
          });
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

          if(cnt == 4){
            // invoke algorithm
            coursePlannerAlgorithm();
          }

          ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          // moved this to the FileInput.js
          //modal.style.display = "none";

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

async function startReadingFile(files) {
  const wait = await readFile(files); // wait for this function call to return promise result
  console.log("doneing"); // test async waiting
  console.log(wait);
  // return 0 for success
  return 1;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// moved this to the FileInput.js, added startReadingFile to the export,
//document.getElementById("load-btn").addEventListener("click", startReadingFile);

// make below objects public
export { validDays, validTimes, startReadingFile };
