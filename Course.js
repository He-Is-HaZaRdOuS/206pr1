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

    constructor(name, day, time){
        this.code = code;
        this.name = name;
        this.year = year;
        this.credit = credit;
        this.isCompulsory = CEbool;
        this.isService = DSbool;
        this.studentCount = studentCount;
        this.instructorName = this.instructorName;
    }

    /*
        // override toString, console.log() does not automatically call this method so you need to explicitly call it.
        toString(){
            return `${this.name} is reserved on ${this.day.description} ${this.time.description}`;
        }
    */


}

export {Course};
