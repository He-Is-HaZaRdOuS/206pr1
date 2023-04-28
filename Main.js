import { LectureHall } from "./models/LectureHall.js";
import { Instructor } from "./models/Instructor.js";
import { ServiceCourse } from "./models/ServiceCourse.js";
import { Course } from "./models/Course.js";
import { getStateCopy, setAppState } from "./App.js";
import { getNewClassroom } from "./util/getNewClassroom.js";

// the below four symbol objects declarations are meant to be used as enumerations
// to make recognizing day and time values easier and use them directly as integers
// to compare and place courses into the plan array directly

// final enum for days (pseudo-index) Immutable
const validDaysDigit = Object.freeze({
  Monday: Symbol("0"),
  Tuesday: Symbol("2"),
  Wednesday: Symbol("4"),
  Thursday: Symbol("6"),
  Friday: Symbol("8"),
});

// final enum for times of the day (pseudo-index) Immutable
const validTimesDigit = Object.freeze({
  Morning: Symbol("0"),
  Afternoon: Symbol("1"),
});

// final enum for days (pseudo-index) Immutable
const validDays = Object.freeze({
  Monday: Symbol("Monday"),
  Tuesday: Symbol("Tuesday"),
  Wednesday: Symbol("Wednesday"),
  Thursday: Symbol("Thursday"),
  Friday: Symbol("Friday"),
});

// final enum for times of the day (pseudo-index) Immutable
const validTimes = Object.freeze({
  Morning: Symbol("Morning"),
  Afternoon: Symbol("Afternoon"),
});

// declare variables to hold objects
var serviceCourses;
var courses;
var instructors;
var lectureHalls;
var wantedCapacity = 0; // this is used to keep track of the largest needed classroom
var errorString;  // this is used to display error messages to the user

var boolReadOnce = [true, true, true, true]; // array to stop the 'for' loop from constantly resetting the object arrays
var boolIncrementOnce = [true, true, true, true]; // array to increment counter once (for activating the algorithm)
var csvarray = []; // array to store loadCSV result
var cnt = 0; // counter
var hasDigit = /\d/; // regex to match digits in a string
var isInteger = /^\d+$/; // regex to check if a string has only digits

// fill array with service courses
function assignArrayToServiceObject(array, index) {
  if (array.length != 3) {
    console.log("INVALID DATA READ FROM COURSES.CSV");
    return false; // data is invalid
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "undefined") {
      console.log("INVALID DATA READ FROM SERVICE.CSV");
      return false; // data is invalid
    }
  }

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

  return false; // data is invalid
}

// fill array with courses
function assignArrayToCourseObject(array, index) {
  if (array.length != 8) {
    console.log("INVALID DATA READ FROM COURSES.CSV");
    return false; // data is invalid
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "undefined") {
      console.log("INVALID DATA READ FROM COURSES.CSV");
      return false; // data is invalid
    }
  }

  // data is valid, proceed
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
}

function assignArrayToInstructorObject(array, index) {
  if (array.length != 3) {
    console.log("INVALID DATA READ FROM COURSES.CSV");
    return false; // data is invalid
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "undefined") {
      console.log("INVALID DATA READ FROM BUSY.CSV");
      return false; // data is invalid
    }
  }

  // variables
  let day = [];
  let time = [];

  // check if 1st and 2nd index of array matches enums using if-else and ternary operations
  if (array[2] == validTimes.Morning.description) {
    time.push(validTimesDigit.Morning.description);
  } else {
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

  return false; // data is invalid
}

function assignArrayToLectureHallObject(array, index) {
  if (array.length != 2) {
    console.log("INVALID DATA READ FROM COURSES.CSV");
    return false; // data is invalid
  }

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "undefined") {
      console.log("INVALID DATA READ FROM CLASSROOM.CSV");
      return false; // data is invalid
    }
  }

  lectureHalls[index] = new LectureHall(array[0], array[1]);
  return true; // data is valid
}

// get integer from an alphanumeric string
function retrieveNumberFromString(str) {
  let newstr = str.replace(/\D/g, "");
  let num = Number(newstr);
  return num;
}

// find grade of service courses from their course code
function findYearOfService(array) {
  for (let i = 0; i < array.length; i++) {
    array[i].year = Math.floor(retrieveNumberFromString(array[i].name) / 100);
  }
}

// create and insert a new lecture hall object when needed
function addLectureHall(hallInfo) {
  let newHall = hallInfo.split(" ");
  let boolIsInteger0 = isInteger.test(newHall[0]);
  let boolIsInteger1 = isInteger.test(newHall[1]);

  // if more or less arguments than 2, ask user for inputs again
  if (newHall.length != 2) {
    errorString =
      "Invalid number of arguments, please enter only two arguments containing classroom id and capacity";
    return [false, errorString]; // ask user again for inputs
  }

  // if either one of them is true (if one is a capacity value and another is an id string)
  if (boolIsInteger0 ^ boolIsInteger1) {
    if (boolIsInteger0 === true) {
      for(let x = 0; x < lectureHalls.length; x++){
        if(newHall[1] == lectureHalls[x].id){
          errorString =
          "Lecture hall "+ newHall[1] + " already exists, please choose a different name";
          return [false, errorString]; // ask user again for inputs
        }
      }
      // check if new hall info is not suitable
      if (newHall[0] < wantedCapacity) {
        errorString =
          "Please enter a higher capacity number, equal to " +
          wantedCapacity +
          " or more";
        return [false, errorString]; // ask user again for inputs
      } else {
        lectureHalls.push(new LectureHall(newHall[1], newHall[0]));
        return [true, errorString];
      }
    } else if (boolIsInteger1 === true) {
      for(let x = 0; x < lectureHalls.length; x++){
        if(newHall[0] == lectureHalls[x].id){
          errorString =
          "Lecture hall "+ newHall[0] + " already exists, please choose a different name";
          return [false, errorString]; // ask user again for inputs
        }
      }
      // check if new hall info is not suitable
      if (newHall[1] < wantedCapacity) {
        errorString =
          "Please enter a higher capacity number, equal to " +
          wantedCapacity +
          " or more";
        return [false, errorString]; // ask user again for inputs
      } else {
        lectureHalls.push(new LectureHall(newHall[0], newHall[1]));
        return [true, errorString];
      }
    }
  }

  // both values were integers or both were non-integers
  else {
    errorString =
      "The info you entered were invalid, please enter the id and capacity of the classroom";
    return [false, errorString]; // ask user again for inputs
  }
}

// below functions places service courses in their respective time slots
// SPAGHETTI CODE ALERT (sorry for the disappointment)
function placeServiceCourses(
  plan,
  firstGrade,
  secondGrade,
  thirdGrade,
  fourthGrade
) {
  // variables
  let columnOffset = Number.MIN_SAFE_INTEGER;
  let columnIndex = Number.MIN_SAFE_INTEGER;

  // place Service courses ahead of time
  for (let j = 0; j < firstGrade.length; j++) {
    if (firstGrade[j].isService == true) {
      for (let i = 0; i < lectureHalls.length; i++) {
        // store column info
        columnIndex = Number(firstGrade[j].serviceObject.day.description);
        columnOffset = Number(firstGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if (
          (firstGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == false &&
            firstGrade[j].inHall == false) ||
          (firstGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == true &&
            firstGrade[j].inHall == false &&
            (Number(firstGrade[j].serviceObject.day.description) !=
              Number(lectureHalls[i].day) ||
              Number(firstGrade[j].serviceObject.time.description) !=
                Number(lectureHalls[i].time)))
        ) {
          // set properties
          lectureHalls[i].isSoftOccupied = true;
          lectureHalls[i].day = Number(
            firstGrade[j].serviceObject.day.description
          );
          lectureHalls[i].time = Number(
            firstGrade[j].serviceObject.time.description
          );
          firstGrade[j].currentHall = lectureHalls[i];
          firstGrade[j].inHall = true;
          // place service course in the plan array
          plan[0][columnIndex + columnOffset] = firstGrade[j];
        }
      }
    }
  }

  for (let j = 0; j < secondGrade.length; j++) {
    if (secondGrade[j].isService == true) {
      for (let i = 0; i < lectureHalls.length; i++) {
        // store column info
        columnIndex = Number(secondGrade[j].serviceObject.day.description);
        columnOffset = Number(secondGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if (
          (secondGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == false &&
            secondGrade[j].inHall == false) ||
          (secondGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == true &&
            secondGrade[j].inHall == false &&
            (Number(secondGrade[j].serviceObject.day.description) !=
              Number(lectureHalls[i].day) ||
              Number(secondGrade[j].serviceObject.time.description) !=
                Number(lectureHalls[i].time)))
        ) {
          // check the same column for conflicting lecture halls
          if (typeof plan[0][columnIndex + columnOffset] != "undefined") {
            if (
              plan[0][columnIndex + columnOffset].currentHall.id !=
              lectureHalls[i].id
            ) {
              // set properties
              lectureHalls[i].isSoftOccupied = true;
              lectureHalls[i].day = Number(
                secondGrade[j].serviceObject.day.description
              );
              lectureHalls[i].time = Number(
                secondGrade[j].serviceObject.time.description
              );
              secondGrade[j].currentHall = lectureHalls[i];
              secondGrade[j].inHall = true;
              // place service course in the plan array
              plan[1][columnIndex + columnOffset] = secondGrade[j];
            }
          } else {
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = Number(
              secondGrade[j].serviceObject.day.description
            );
            lectureHalls[i].time = Number(
              secondGrade[j].serviceObject.time.description
            );
            secondGrade[j].currentHall = lectureHalls[i];
            secondGrade[j].inHall = true;
            // place service course in the plan array
            plan[1][columnIndex + columnOffset] = secondGrade[j];
          }
        }
      }
    }
  }

  for (let j = 0; j < thirdGrade.length; j++) {
    if (thirdGrade[j].isService == true) {
      for (let i = 0; i < lectureHalls.length; i++) {
        // store column info
        columnIndex = Number(thirdGrade[j].serviceObject.day.description);
        columnOffset = Number(thirdGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if (
          (thirdGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == false &&
            thirdGrade[j].inHall == false) ||
          (thirdGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == true &&
            thirdGrade[j].inHall == false &&
            (Number(thirdGrade[j].serviceObject.day.description) !=
              Number(lectureHalls[i].day) ||
              Number(thirdGrade[j].serviceObject.time.description) !=
                Number(lectureHalls[i].time)))
        ) {
          // check the same column for conflicting lecture halls
          if (typeof plan[0][columnIndex + columnOffset] != "undefined") {
            if (typeof plan[1][columnIndex + columnOffset] != "undefined") {
              if (
                plan[0][columnIndex + columnOffset].currentHall.id !=
                  lectureHalls[i].id &&
                plan[1][columnIndex + columnOffset].currentHall.id !=
                  lectureHalls[i].id
              ) {
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(
                  thirdGrade[j].serviceObject.day.description
                );
                lectureHalls[i].time = Number(
                  thirdGrade[j].serviceObject.time.description
                );
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            } else {
              if (
                plan[0][columnIndex + columnOffset].currentHall.id !=
                lectureHalls[i].id
              ) {
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(
                  thirdGrade[j].serviceObject.day.description
                );
                lectureHalls[i].time = Number(
                  thirdGrade[j].serviceObject.time.description
                );
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            }
          } else {
            if (typeof plan[1][columnIndex + columnOffset] != "undefined") {
              if (
                plan[1][columnIndex + columnOffset].currentHall.id !=
                lectureHalls[i].id
              ) {
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(
                  thirdGrade[j].serviceObject.day.description
                );
                lectureHalls[i].time = Number(
                  thirdGrade[j].serviceObject.time.description
                );
                thirdGrade[j].currentHall = lectureHalls[i];
                thirdGrade[j].inHall = true;
                // place service course in the plan array
                plan[2][columnIndex + columnOffset] = thirdGrade[j];
              }
            } else {
              // set properties
              lectureHalls[i].isSoftOccupied = true;
              lectureHalls[i].day = Number(
                thirdGrade[j].serviceObject.day.description
              );
              lectureHalls[i].time = Number(
                thirdGrade[j].serviceObject.time.description
              );
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

  for (let j = 0; j < fourthGrade.length; j++) {
    // check if an empty classroom is suitable

    if (fourthGrade[j].isService == true) {
      for (let i = 0; i < lectureHalls.length; i++) {
        // store column info
        columnIndex = Number(fourthGrade[j].serviceObject.day.description);
        columnOffset = Number(fourthGrade[j].serviceObject.time.description);
        // if student count of a service course is less than the classroom and the classroom is empty on that day and that time
        if (
          (fourthGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == false &&
            fourthGrade[j].inHall == false) ||
          (fourthGrade[j].studentCount <= lectureHalls[i].capacity &&
            lectureHalls[i].isSoftOccupied == true &&
            fourthGrade[j].inHall == false &&
            (Number(fourthGrade[j].serviceObject.day.description) !=
              Number(lectureHalls[i].day) ||
              Number(fourthGrade[j].serviceObject.time.description) !=
                Number(lectureHalls[i].time)))
        ) {
          // check the same column for conflicting lecture halls
          if (typeof plan[0][columnIndex + columnOffset] != "undefined") {
            if (typeof plan[1][columnIndex + columnOffset] != "undefined") {
              if (typeof plan[2][columnIndex + columnOffset] != "undefined") {
                if (
                  plan[0][columnIndex + columnOffset].currentHall.id !=
                    lectureHalls[i].id &&
                  plan[1][columnIndex + columnOffset].currentHall.id !=
                    lectureHalls[i].id &&
                  plan[2][columnIndex + columnOffset].currentHall.id !=
                    lectureHalls[i].id
                ) {
                  // set properties
                  lectureHalls[i].isSoftOccupied = true;
                  lectureHalls[i].day = Number(
                    fourthGrade[j].serviceObject.day.description
                  );
                  lectureHalls[i].time = Number(
                    fourthGrade[j].serviceObject.time.description
                  );
                  fourthGrade[j].currentHall = lectureHalls[i];
                  fourthGrade[j].inHall = true;
                  // place service course in the plan array
                  plan[3][columnIndex + columnOffset] = fourthGrade[j];
                }
              } else {
                if (
                  plan[0][columnIndex + columnOffset].currentHall.id !=
                    lectureHalls[i].id &&
                  plan[1][columnIndex + columnOffset].currentHall.id !=
                    lectureHalls[i].id
                ) {
                  // set properties
                  lectureHalls[i].isSoftOccupied = true;
                  lectureHalls[i].day = Number(
                    fourthGrade[j].serviceObject.day.description
                  );
                  lectureHalls[i].time = Number(
                    fourthGrade[j].serviceObject.time.description
                  );
                  fourthGrade[j].currentHall = lectureHalls[i];
                  fourthGrade[j].inHall = true;
                  // place service course in the plan array
                  plan[3][columnIndex + columnOffset] = fourthGrade[j];
                }
              }
            } else {
              if (
                plan[0][columnIndex + columnOffset].currentHall.id !=
                lectureHalls[i].id
              ) {
                // set properties
                lectureHalls[i].isSoftOccupied = true;
                lectureHalls[i].day = Number(
                  fourthGrade[j].serviceObject.day.description
                );
                lectureHalls[i].time = Number(
                  fourthGrade[j].serviceObject.time.description
                );
                fourthGrade[j].currentHall = lectureHalls[i];
                fourthGrade[j].inHall = true;
                // place service course in the plan array
                plan[3][columnIndex + columnOffset] = fourthGrade[j];
              }
            }
          } else {
            // set properties
            lectureHalls[i].isSoftOccupied = true;
            lectureHalls[i].day = Number(
              fourthGrade[j].serviceObject.day.description
            );
            lectureHalls[i].time = Number(
              fourthGrade[j].serviceObject.time.description
            );
            fourthGrade[j].currentHall = lectureHalls[i];
            fourthGrade[j].inHall = true;
            // place service course in the plan array
            plan[3][columnIndex + columnOffset] = fourthGrade[j];
          }
        }
      }
    }
  }
  // end of loops

  // check if all service courses were placed
  for (let x = 0; x < firstGrade.length; x++) {
    if (firstGrade[x].inHall == false && firstGrade[x].isService == true) {
      if (wantedCapacity < firstGrade[x].studentCount) {
        wantedCapacity = firstGrade[x].studentCount;
      }
    }
  }

  for (let x = 0; x < secondGrade.length; x++) {
    if (secondGrade[x].inHall == false && secondGrade[x].isService == true) {
      if (wantedCapacity < secondGrade[x].studentCount) {
        wantedCapacity = secondGrade[x].studentCount;
      }
    }
  }

  for (let x = 0; x < thirdGrade.length; x++) {
    if (thirdGrade[x].inHall == false && thirdGrade[x].isService == true) {
      if (wantedCapacity < thirdGrade[x].studentCount) {
        wantedCapacity = thirdGrade[x].studentCount;
      }
    }
  }

  for (let x = 0; x < fourthGrade.length; x++) {
    if (fourthGrade[x].inHall == false && fourthGrade[x].isService == true) {
      if (wantedCapacity < fourthGrade[x].studentCount) {
        wantedCapacity = fourthGrade[x].studentCount;
      }
    }
  }

  // end of function
}

// below function takes in the grade array and compares each index of the plan array
// column by column to place courses in a suitable manner
function placeGradeCourses(plan, grade, index){
  let i1, i2, i3; // variables
  // set according to given grade's year
  if(index == 0){
    i1 = 1;
    i2 = 2
    i3 = 3
  }
  else if(index == 1){
    i1 = 0;
    i2 = 2;
    i3 = 3;
  }
  else if(index == 2){
    i1 = 0;
    i2 = 1;
    i3 = 3;
  }
  else if(index == 3){
    i1 = 0;
    i2 = 1;
    i3 = 2;
  }
  else{
    return false; // index out of bounds
  }

  // courses with instructors that have busy schedules take precedence
  // start of loop
  for (let j = 0; j < instructors.length; j++) {
    for (let i = 0; i < lectureHalls.length; i++) {
      for (let k = 0; k < grade.length; k++) {
        // check for nested intructor object
        if (
          grade[k].hasInstructorObject == true &&
          grade[k].isService == false
        ) {
          if (grade[k].studentCount <= lectureHalls[i].capacity) {
            if (grade[k].instructorObject.name == instructors[j].name) {
              for (let p = 0; p < plan[index].length; p++) {
                // check for empty slots
                if (
                  typeof plan[index][p] == "undefined" &&
                  grade[k].inHall == false
                ) {
                  // if length of busy schedule is less than p, then check for issues till condition is false (more spaghetti)
                  if (p < instructors[j].day.length) {
                    // check for day and time indices
                    if (
                      Number(instructors[j].day[p]) +
                        Number(instructors[j].time[p]) !=
                      p
                    ) {
                      // check if lecture hall is occupied
                      if (
                        lectureHalls[i].isSoftOccupied == false ||
                        (lectureHalls[i].isSoftOccupied == true &&
                          (Number(instructors[j].day[p]) !=
                            lectureHalls[i].day ||
                            Number(instructors[j].time[p]) !=
                              lectureHalls[i].time))
                      ) {
                        // check if other grades in the same column are using the same lecture hall
                        if (typeof plan[i1][p] != "undefined") {
                          if (typeof plan[i2][p] != "undefined") {
                            if (typeof plan[i3][p] != "undefined") {
                              if (
                                plan[i1][p].currentHall.id !=
                                  lectureHalls[i].id &&
                                plan[i2][p].currentHall.id !=
                                  lectureHalls[i].id &&
                                plan[i3][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            } else {
                              if (
                                plan[i1][p].currentHall.id !=
                                  lectureHalls[i].id &&
                                plan[i2][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                firstGrade[k].currentHall = lectureHalls[i];
                                firstGrade[k].inHall = true;
                              }
                            }
                          } else {
                            if (typeof plan[i3][p] != "undefined") {
                              if (
                                plan[i1][p].currentHall.id !=
                                  lectureHalls[i].id &&
                                plan[i3][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            } else {
                              if (
                                plan[i1][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            }
                          }
                        } else {
                          if (typeof plan[i2][p] != "undefined") {
                            if (typeof plan[i3][p] != "undefined") {
                              if (
                                plan[i2][p].currentHall.id !=
                                  lectureHalls[i].id &&
                                plan[i3][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            } else {
                              if (
                                plan[i2][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            }
                          } else {
                            if (typeof plan[i3][p] != "undefined") {
                              if (
                                plan[i3][p].currentHall.id != lectureHalls[i].id
                              ) {
                                // set properties
                                plan[index][p] = grade[k];
                                lectureHalls[i].isSoftOccupied = true;
                                lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                                lectureHalls[i].time = p % 2;
                                grade[k].currentHall = lectureHalls[i];
                                grade[k].inHall = true;
                              }
                            }
                          }
                        }
                      }
                    }
                  } else {
                    // if p is longer than busy schedule's size, stop checking hall id against the instructor's scedule

                    if (
                      lectureHalls[i].isSoftOccupied == false ||
                      (lectureHalls[i].isSoftOccupied == true &&
                        ((p % 2 == 0 ? p : p - 1) != lectureHalls[i].day ||
                          p % 2 != lectureHalls[i].time))
                    ) {
                      if (typeof plan[i1][p] != "undefined") {
                        if (typeof plan[i2][p] != "undefined") {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i2][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i2][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        } else {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        }
                      } else {
                        if (typeof plan[i2][p] != "undefined") {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i2][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (
                              plan[i2][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        } else {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            // set properties
                            plan[index][p] = grade[k];
                            lectureHalls[i].isSoftOccupied = true;
                            lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                            lectureHalls[i].time = p % 2;
                            grade[k].currentHall = lectureHalls[i];
                            grade[k].inHall = true;
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
  // end of loop


    // now place courses without instructors' busy schedules that are compulsory
    for (let i = 0; i < lectureHalls.length; i++) {
      for (let k = 0; k < grade.length; k++) {
        if (
          grade[k].hasInstructorObject == false &&
          grade[k].isService == false && grade[k].isCompulsory == true
        ) {
          if (grade[k].studentCount <= lectureHalls[i].capacity) {
            for (let p = plan[index].length -1; p >= 0; p--) {
              if (
                typeof plan[index][p] == "undefined" &&
                grade[k].inHall == false
              ) {
                if (
                  lectureHalls[i].isSoftOccupied == false ||
                  (lectureHalls[i].isSoftOccupied == true &&
                    p != lectureHalls[i].day + lectureHalls[i].time)
                ) {
                  if (typeof plan[i1][p] != "undefined") {
                    if (typeof plan[i2][p] != "undefined") {
                      if (typeof plan[i3][p] != "undefined") {
                        if (
                          plan[i1][p].currentHall.id != lectureHalls[i].id &&
                          plan[i2][p].currentHall.id != lectureHalls[i].id &&
                          plan[i3][p].currentHall.id != lectureHalls[i].id
                        ) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      } else {
                        if (
                          plan[i1][p].currentHall.id != lectureHalls[i].id &&
                          plan[i2][p].currentHall.id != lectureHalls[i].id
                        ) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      }
                    } else {
                      if (typeof plan[i3][p] != "undefined") {
                        if (
                          plan[i1][p].currentHall.id != lectureHalls[i].id &&
                          plan[i3][p].currentHall.id != lectureHalls[i].id
                        ) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      } else {
                        if (plan[i1][p].currentHall.id != lectureHalls[i].id) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      }
                    }
                  } else {
                    if (typeof plan[i2][p] != "undefined") {
                      if (typeof plan[i3][p] != "undefined") {
                        if (
                          plan[i2][p].currentHall.id != lectureHalls[i].id &&
                          plan[i3][p].currentHall.id != lectureHalls[i].id
                        ) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      } else {
                        if (plan[i2][p].currentHall.id != lectureHalls[i].id) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      }
                    } else {
                      if (typeof plan[i3][p] != "undefined") {
                        if (plan[i3][p].currentHall.id != lectureHalls[i].id) {
                          // set properties
                          plan[index][p] = grade[k];
                          lectureHalls[i].isSoftOccupied = true;
                          lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                          lectureHalls[i].time = p % 2;
                          grade[k].currentHall = lectureHalls[i];
                          grade[k].inHall = true;
                        }
                      } else {
                        // set properties
                        plan[index][p] = grade[k];
                        lectureHalls[i].isSoftOccupied = true;
                        lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                        lectureHalls[i].time = p % 2;
                        grade[k].currentHall = lectureHalls[i];
                        grade[k].inHall = true;
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
    // end of loop


        // now place courses without instructors' busy schedules that are elective
        for (let i = 0; i < lectureHalls.length; i++) {
          for (let k = 0; k < grade.length; k++) {
            if (
              grade[k].hasInstructorObject == false &&
              grade[k].isService == false && grade[k].isCompulsory == false
            ) {
              if (grade[k].studentCount <= lectureHalls[i].capacity) {
                for (let p = 0; p < plan[index].length; p++) {
                  if (
                    typeof plan[index][p] == "undefined" &&
                    grade[k].inHall == false
                  ) {
                    if (
                      lectureHalls[i].isSoftOccupied == false ||
                      (lectureHalls[i].isSoftOccupied == true &&
                        p != lectureHalls[i].day + lectureHalls[i].time)
                    ) {
                      if (typeof plan[i1][p] != "undefined") {
                        if (typeof plan[i2][p] != "undefined") {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i2][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i2][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        } else {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i1][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (plan[i1][p].currentHall.id != lectureHalls[i].id) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        }
                      } else {
                        if (typeof plan[i2][p] != "undefined") {
                          if (typeof plan[i3][p] != "undefined") {
                            if (
                              plan[i2][p].currentHall.id != lectureHalls[i].id &&
                              plan[i3][p].currentHall.id != lectureHalls[i].id
                            ) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            if (plan[i2][p].currentHall.id != lectureHalls[i].id) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          }
                        } else {
                          if (typeof plan[i3][p] != "undefined") {
                            if (plan[i3][p].currentHall.id != lectureHalls[i].id) {
                              // set properties
                              plan[index][p] = grade[k];
                              lectureHalls[i].isSoftOccupied = true;
                              lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                              lectureHalls[i].time = p % 2;
                              grade[k].currentHall = lectureHalls[i];
                              grade[k].inHall = true;
                            }
                          } else {
                            // set properties
                            plan[index][p] = grade[k];
                            lectureHalls[i].isSoftOccupied = true;
                            lectureHalls[i].day = p % 2 == 0 ? p : p - 1;
                            lectureHalls[i].time = p % 2;
                            grade[k].currentHall = lectureHalls[i];
                            grade[k].inHall = true;
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
        // end of loop

    let toReturn = 0;

    // check if any courses remain unplaced
    for (let x = 0; x < grade.length; x++) {
      if (grade[x].inHall == false) {
        toReturn = grade[x].year;
        if (wantedCapacity < grade[x].studentCount) {
          wantedCapacity = grade[x].studentCount;
        }
      }
    }
  
    // return 0
    return toReturn;
}

// below function is the pièce de résistance that ties it all together
// aka the algorithm more or less
function coursePlannerAlgorithm(priority) {
  // variables
  cnt = 0; // reset counter
  let rows = 4;
  let columns = 10;
  let firstGrade = [];
  let secondGrade = [];
  let thirdGrade = [];
  let fourthGrade = [];

  // assign year property to serviceCourse objects (useless currently but can be useful if needed)
  findYearOfService(serviceCourses);

  // create two-dimensional array for final course plan ([4][10])
  let plan = new Array(rows);
  for (let i = 0; i < rows; i++) {
    plan[i] = new Array(columns);
  }

  // nest ServiceCourse objects into their respective Course objects
  for (let i = 0; i < serviceCourses.length; i++) {
    for (let j = 0; j < courses.length; j++) {
      if (
        courses[j].code == serviceCourses[i].name &&
        courses[j].isService == true
      ) {
        courses[j].serviceObject = serviceCourses[i];
      }
    }
  }

  // nest Instructor objects into their respective Course objects (check the boolean property before invoking the object)
  for (let i = 0; i < instructors.length; i++) {
    for (let j = 0; j < courses.length; j++) {
      if (courses[j].instructorName == instructors[i].name) {
        courses[j].instructorObject = instructors[i];
        courses[j].hasInstructorObject = true;
      }
    }
  }

  // sort courses according to their year
  for (let i = 0; i < courses.length; i++) {
    let year = Number(courses[i].year);
    switch (year) {
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

  // sort course arrays according to their student count (helps in placing courses in a suitable classroom)
  firstGrade.sort((obj1, obj2) =>
    obj1.studentCount < obj2.studentCount
      ? 1
      : obj1.studentCount > obj2.studentCount
      ? -1
      : 0
  );

  secondGrade.sort((obj1, obj2) =>
    obj1.studentCount < obj2.studentCount
      ? 1
      : obj1.studentCount > obj2.studentCount
      ? -1
      : 0
  );

  thirdGrade.sort((obj1, obj2) =>
    obj1.studentCount < obj2.studentCount
      ? 1
      : obj1.studentCount > obj2.studentCount
      ? -1
      : 0
  );

  fourthGrade.sort((obj1, obj2) =>
    obj1.studentCount < obj2.studentCount
      ? 1
      : obj1.studentCount > obj2.studentCount
      ? -1
      : 0
  );

  // sort lecture halls too in reverse order [while at it :P]
  lectureHalls.sort((obj1, obj2) =>
    obj1.capacity > obj2.capacity ? 1 : obj1.capacity < obj2.capacity ? -1 : 0
  );

  // self-explanatory
  placeServiceCourses(plan, firstGrade, secondGrade, thirdGrade, fourthGrade);

  // if constructing a plan fails, then whichever grade's year failed,
  // will be passed back as priority argument to this encompassing function to
  // try and place courses of that year first as a means to avoid the error
  // (will probably fail in most cases but worth a try)
  let unplacedYear = 0;
  let flag = 0;
  
  if (priority == 1) {
    unplacedYear = placeGradeCourses(plan, firstGrade, 0);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, secondGrade, 1);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, thirdGrade, 2);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, fourthGrade, 3);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
  } else if (priority == 2) {
    unplacedYear = placeGradeCourses(plan, secondGrade, 1);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, firstGrade, 0);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, thirdGrade, 2);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, fourthGrade, 3);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
  } else if (priority == 3) {
    unplacedYear = placeGradeCourses(plan, thirdGrade, 2);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, secondGrade, 1);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, firstGrade, 0);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, fourthGrade, 3);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
  } else if (priority == 4) {
    unplacedYear = placeGradeCourses(plan, fourthGrade, 3);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, secondGrade, 1);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, thirdGrade, 2);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
    
    unplacedYear = placeGradeCourses(plan, firstGrade, 0);
    if (unplacedYear != 0) {
      flag = unplacedYear;
    }
  }
  
  // reset variables
  boolIncrementOnce[0] = true;
  boolIncrementOnce[1] = true;
  boolIncrementOnce[2] = true;
  boolIncrementOnce[3] = true;

  // destructuring in use???
  return [flag, plan];
}

// reset objects if algorithm fails
function resetLectureHalls() {
  for (let k = 0; k < lectureHalls.length; k++) {
    lectureHalls[k].isSoftOccupied = false;
    lectureHalls[k].day = Number.MIN_SAFE_INTEGER;
    lectureHalls[k].time = Number.MIN_SAFE_INTEGER;
  }
}

// reset objects if algorithm fails
function resetCourses() {
  for (let k = 0; k < courses.length; k++) {
    courses[k].inHall = false;
    courses[k].hasInstructorObject = false;
    courses[k].instructorObject = null;
    courses[k].currentHall = null;
  }
}

// reset objects if algorithm fails
function resetServiceCourses() {
  for (let k = 0; k < serviceCourses.length; k++) {
    serviceCourses[k].year = 0;
  }
}

// reset objects/variables if "Cancel" is clicked
function resetVariables() {
  if (cnt != null) cnt = 0;
  if (instructors != null) instructors.length = 0;
  if (serviceCourses != null) serviceCourses.length = 0;
  if (courses != null) courses.length = 0;
  if (lectureHalls != null) lectureHalls.length = 0;

  boolReadOnce[0] = true;
  boolReadOnce[1] = true;
  boolReadOnce[2] = true;
  boolReadOnce[3] = true;

  boolIncrementOnce[0] = true;
  boolIncrementOnce[1] = true;
  boolIncrementOnce[2] = true;
  boolIncrementOnce[3] = true;
}

// fetch and change property of a css class, can add more logic to it
function changeBackgroundColour(className, colour){
    let element = document.getElementsByClassName(className);
    for(let i = 0; i < sbg.length; i++){
      element[i].style.backgroundColor = colour;
    }
}

// function is async
// read .csv data, insert into array and invoke algorithm if conditions are met
async function readFile(file) {
  let newState;
  // wait for everything inside the below curly braces to finish before returning promise (makes invoking objects/functions wait for this function's completion)
  return new Promise((resolve) => {
    if (file) {
      // load .csv file
      loadCSV(file)
        .then(async (a) => {
          csvarray = [...a]; // deep-copy resultant array
          let arr_len = csvarray.length;
          for (let i = 0; i < arr_len - 1; i++) {
            let sub_len = csvarray[i].length; // know what .csv was uploaded based on sub-array length
            switch (sub_len) {
              case 2:
                // classroom.csv
                if (boolReadOnce[0]) {
                  lectureHalls = new Array(csvarray[i].length);
                  boolReadOnce[0] = false;
                }

                newState = { ...getStateCopy() };
                newState.parameters.fileStatus.lectureHalls = true;
                setAppState(newState);

                // if function returns true (data is valid and object is created) increment counter
                if (assignArrayToLectureHallObject(csvarray[i], i)) {
                  if (boolIncrementOnce[0]) {
                    cnt = cnt + 1;
                    boolIncrementOnce[0] = false;
                  }
                }

                break;

              case 3:
                // if length 3, then check if first sub-index has digits, if yes then service.csv, if no then busy.csv
                let bool = hasDigit.test(csvarray[i][0]);
                if (bool) {
                  // service.csv

                  // testing the state
                  newState = { ...getStateCopy() };
                  newState.parameters.fileStatus.serviceCourses = true;
                  setAppState(newState);

                  if (boolReadOnce[1]) {
                    serviceCourses = new Array(csvarray[i].length);
                    boolReadOnce[1] = false;
                  }
                  // if function returns true (data is valid and object is created) increment counter
                  if (assignArrayToServiceObject(csvarray[i], i)) {
                    if (boolIncrementOnce[1]) {
                      cnt = cnt + 1;
                      boolIncrementOnce[1] = false;
                    }
                  }
                } else {
                  // busy.csv
                  if (boolReadOnce[2]) {
                    instructors = new Array(csvarray[i].length);
                    boolReadOnce[2] = false;
                  }
                  
                  // testing the state
                  newState = { ...getStateCopy() };
                  newState.parameters.fileStatus.instructors = true;
                  setAppState(newState);

                  // tl;dr, cram all instructor's busy schedules into one object instead of creating duplicates
                  // if instructors array exists
                  if (instructors && instructors.length) {
                    var personExists = false;
                    for (let j = 0; j < instructors.length; j++) {
                      // and if the object is not undefined
                      if (typeof instructors[j] !== "undefined") {
                        // and if the name is the same, then push busy schedules into existing object
                        if (instructors[j].name == csvarray[i][0]) {
                          personExists = true;
                          if (csvarray[i][1] == validDays.Monday.description) {
                            instructors[j].day.push("0");
                          } else if (
                            csvarray[i][1] == validDays.Tuesday.description
                          ) {
                            instructors[j].day.push("2");
                          } else if (
                            csvarray[i][1] == validDays.Wednesday.description
                          ) {
                            instructors[j].day.push("4");
                          } else if (
                            csvarray[i][1] == validDays.Thursday.description
                          ) {
                            instructors[j].day.push("6");
                          } else if (
                            csvarray[i][1] == validDays.Friday.description
                          ) {
                            instructors[j].day.push("8");
                          }

                          if (
                            csvarray[i][2] == validTimes.Morning.description
                          ) {
                            instructors[j].time.push("0");
                          } else if (
                            csvarray[i][2] == validTimes.Afternoon.description
                          ) {
                            instructors[j].time.push("1");
                          }
                        }
                      }
                    }
                  }
                  // if no such person exists, then create new object
                  // if function returns true (data is valid and object is created) increment counter
                  if (
                    !personExists &&
                    assignArrayToInstructorObject(csvarray[i], i)
                  ) {
                    if (boolIncrementOnce[2]) {
                      cnt = cnt + 1;
                      boolIncrementOnce[2] = false;
                    }
                  }
                }

                break;

              case 8:
                // courses.csv
                if (boolReadOnce[3]) {
                  courses = new Array(csvarray[i].length);
                  boolReadOnce[3] = false;
                }

                // testing the state
                newState = { ...getStateCopy() };
                newState.parameters.fileStatus.courses = true;
                setAppState(newState);

                // if function returns true (data is valid and object is created) increment counter
                if (assignArrayToCourseObject(csvarray[i], i)) {
                  if (boolIncrementOnce[3]) {
                    cnt = cnt + 1;
                    boolIncrementOnce[3] = false;
                  }
                }
                break;
            }
          }

          if (personExists) {
            // clean up instructors array (array will have extra undefined elements 96.7% guaranteed)
            instructors = instructors.filter(function (x) {
              return x !== undefined;
            });
          }
          
          console.log(lectureHalls);

          // reset variables
          personExists = false;
          boolReadOnce[0] = true;
          boolReadOnce[1] = true;
          boolReadOnce[2] = true;
          boolReadOnce[3] = true;

          // if all .csv files are read and have valid data
          if (cnt == 4) {
  
            // clean rest of the arrays (helps avoid NPE errors)
            lectureHalls = lectureHalls.filter(function (x) {
              return x !== undefined;
            });
  
            courses = courses.filter(function (x) {
              return x !== undefined;
            });
  
            serviceCourses = serviceCourses.filter(function (x) {
              return x !== undefined;
            });

            // invoke algorithm
            let [flag, plan] = coursePlannerAlgorithm(1);

            // if one course isn't placed in the plan, try to add new classroom
            if (flag != 0) {

              // loop till a valid plan is created
              do{
                  let dataIsValid = false;
                  errorString =
                    "Unsufficient classrooms, please enter id and capacity of atleast "; // pass this string to getNewClassroom(); function
                  errorString += wantedCapacity;
                  do {
                    // loop till new data is correct
                    console.log("Data is invalid, calling getNewClassroom");
                    let data = await getNewClassroom(errorString);
                    [dataIsValid, errorString] = addLectureHall(data);
                    // if entered data is invalid, then update string and loop till valid lecture hall data is entered
                  } while (dataIsValid === false);

                  // reset objects/variables
                  wantedCapacity = 0;
                  resetLectureHalls();
                  resetCourses();
                  resetServiceCourses();

                  // run algorithm again
                  [flag, plan] = coursePlannerAlgorithm(flag);

              }while (flag != 0)

              // display weekly plan
              let planState = getStateCopy();
              planState.id = "plan-generated";
              planState.parameters.plan = plan.concat();
              planState.parameters.grade = 0; // show 1. grade plan
              setAppState(planState);
              // YOU CAN USE changeBackgroundColour() function here or below

            }
            // algorithm successful on first attempt WOOT WOOT!
            else{
              let planState = getStateCopy();
                planState.id = "plan-generated";
                planState.parameters.plan = plan.concat();
                planState.parameters.grade = 0; // show 1. grade plan
                setAppState(planState);
                // OR HERE

            }
          }

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
    // read csv file as one string
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (e) => {
      // if there is error we'll return reject
      if (e == null) {
        reject(e);
      } else {
        // split according to linebreaks
        let rows = e.target.result.split("\r\n");
        rows.forEach((r) => {
          // split again according to semicolons
          let splitted = r.split(";");
          data.push(splitted);
        });
        // then return them
        resolve(data);
      }
    };
  });
};

async function startReadingFile(file) {
  const wait = await readFile(file); // wait for this function call to return promise result
  return 1;
}

// make below objects public
export { validDays, validTimes, startReadingFile, resetVariables };
