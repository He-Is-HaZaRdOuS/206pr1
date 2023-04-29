// class to store info about classrooms
class LectureHall{
    // variables
    id;
    capacity;
    time;
    day;
    isSoftOccupied;

    constructor(id, capacity){
        this.id = id;
        this.capacity = Number(capacity);
        this.isSoftOccupied = false;
    }
}

// make class public
export {LectureHall};
