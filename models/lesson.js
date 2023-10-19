const sql = require("sequelize");
const db = require("../database/pokolenie.js")
const Attendance = require("./attendance.js")
const MainInf = require("./mainInf.js")

const Lesson = db.define("lessons", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: sql.DATEONLY,
        allowNull: false,
    },
    mentor: {
        type: sql.STRING,
        allowNull: false
    }
})

Lesson.belongsToMany(MainInf, {through: Attendance})

module.exports = Lesson;