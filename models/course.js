const sql = require("sequelize");
const db = require("../database/pokolenie.js")

const Course = db.define("courses", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    course: {
        type: sql.STRING,
        allowNull: true
    }
})

module.exports = Course;
