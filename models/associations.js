const Attendance = require("./attendance.js");
const MainInf = require("./mainInf.js");
const Lesson = require("./lesson.js");
const Branch = require("./branch.js");
const UserInf = require("./userInf.js");
const LessonsDate = require("./lessonsDate.js")

Lesson.hasMany(LessonsDate, {onDelete: "cascade"})
LessonsDate.belongsTo(Lesson, {onDelete: "cascade"})

LessonsDate.belongsToMany(MainInf, {through: Attendance});
MainInf.belongsToMany(LessonsDate, {through: Attendance});

LessonsDate.hasMany(Attendance, {onDelete: "cascade"})
Attendance.belongsTo(LessonsDate, {onDelete: "cascade"})

MainInf.hasMany(Attendance, {onDelete: "cascade"})
Attendance.belongsTo(MainInf, {onDelete: "cascade"})

UserInf.hasOne(MainInf, {onDelete: "cascade"});
MainInf.belongsTo(UserInf, {onDelete: "cascade"})

Branch.hasMany(Lesson, {onDelete: "cascade"});

module.exports = {Attendance, MainInf, Lesson, UserInf, Branch, LessonsDate}