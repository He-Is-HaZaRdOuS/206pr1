# 206pr1
This JavaScript program takes input from the user in the form of .csv files containing data delimtied by semicolons and linebreaks,
The data consists of Service Courses, Department Courses, Lecture Halls and Busy times for certain Professors.
The data is sorted into arrays of objects of their respective classes and relevant objects are nested into other objects in the form of a property.
The Service Courses precede other Courses so they're placed first inside the schedule array, then Courses with their busy Professors and then regular Courses.
Courses from different grades cannot occupy the same Lecture Hall as another Course from another grade at the same time of day.
All Courses must have a Lecture Hall, else a pop-up message is displayed asking the user to add a new Lecture Hall to use and to try again.
After successful insertion of all Courses according to rules, the Weekly program is displayed (WIP) and the user may choose to create another schedule (Also WIP).
