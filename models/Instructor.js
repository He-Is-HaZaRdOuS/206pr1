import { validDays, validTimes } from "../Main.js";

class Instructor {
  // variables
  name;
  day;
  time;

  constructor(name, day, time) {
    this.name = name;
    this.day = day;
    this.time = time;
  }
}

// make class public
export { Instructor };
