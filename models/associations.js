const Attendance = require("./attendance.js");
const MainInf = require("./mainInf.js");
const Lesson = require("./lesson.js");
const Branch = require("../models/branch.js");
const UserInf = require("../models/userInf.js");

Lesson.belongsToMany(MainInf, {through: Attendance});
MainInf.belongsToMany(Lesson, {through: Attendance});

Lesson.hasMany(Attendance, {onDelete: "cascade"});
Attendance.belongsTo(Lesson, {onDelete: "cascade"});
MainInf.hasMany(Attendance, {onDelete: "cascade"});

Attendance.belongsTo(MainInf, {onDelete: "cascade"})

UserInf.hasOne(MainInf, {onDelete: "cascade"});
MainInf.belongsTo(UserInf, {onDelete: "cascade"})

Branch.hasMany(Lesson, {onDelete: "cascade"});

module.exports = {Attendance, MainInf, Lesson}