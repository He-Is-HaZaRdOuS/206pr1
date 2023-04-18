import { validDays, validTimes } from "./Main.js";

class Instructor{
    // variables
    name;
    day;
    time;

    constructor(name, day, time){
        this.name = name;
        this.day = day;
        this.time = time;
    }

        // override toString, console.log() does not automatically call this method so you need to explicitly call it.
        toString(){
            return `Instructor ${this.name} is Busy on ${this.day.description} ${this.time.description}`;
        }

}

// make class public
export {Instructor};