const Attendance = require("./attendance.js")
const MainInf = require("./mainInf.js")
const Lesson = require("./lesson.js")

Lesson.belongsToMany(MainInf, {through: Attendance});
MainInf.belongsToMany(Lesson, {through: Attendance});

module.exports = {Attendance, MainInf, Lesson}