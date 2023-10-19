const sql = require("sequelize");
const db = require("../database/pokolenie.js");
const Attendance = require("./attendance.js")
const Lesson = require("./attendance.js")

const MainInf = db.define("mainInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sql.STRING,
        allowNull: false
    },
    password: {
        type: sql.STRING,
        allowNull: false
    },
    role: {
        type: sql.STRING,
        allowNull: false
    }
})

// MainInf.hasMany(Attendance)
MainInf.belongsToMany(Lesson, {through: Attendance})

module.exports = MainInf;
