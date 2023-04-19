class Course{
    // variables
    code;
    name;
    year;
    credit;
    isCompulsory;
    isService;
    studentCount;
    instructorName;
    inHall;
    hasInstructorObject;
    serviceObject;
    instructorObject;
    currentHall;

    constructor(code, name, year, credit, CEbool, DSbool, studentCount, instructorName){
        this.code = code;
        this.name = name;
        this.year = Number(year);
        this.credit = Number(credit);
        this.isCompulsory = CEbool;
        this.isService = DSbool;
        this.studentCount = Number(studentCount);
        this.instructorName = instructorName;
        this.inHall = false;
        this.hasInstructorObject = false;
    }

    /*
        // override toString, console.log() does not automatically call this method so you need to explicitly call it.
        toString(){
            return `${this.name} is reserved on ${this.day.description} ${this.time.description}`;
        }
    */


}

export {Course};
