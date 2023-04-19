// class to store info about classrooms
class LectureHall{
    // variables
    id;
    capacity;

    constructor(id, capacity){
        this.id = id;
        this.capacity = capacity;
    }

    // override toString, console.log() does not automatically call this method so you need to explicitly call it.
    toString(){
        return `${this.id} ${this.capacity}`;
    }

}

// make class public
export {LectureHall};
