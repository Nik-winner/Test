const Attendance = require("./attendance.js")
const MainInf = require("./mainInf.js")
const Lesson = require("./lesson.js")

Lesson.belongsToMany(MainInf, {through: Attendance});
MainInf.belongsToMany(Lesson, {through: Attendance});

Lesson.hasMany(Attendance);
Attendance.belongsTo(Lesson);

MainInf.hasMany(Attendance);
Attendance.belongsTo(MainInf)

module.exports = {Attendance, MainInf, Lesson}