const sql = require("sequelize");
const db = require("../database/pokolenie.js")
const Lesson = require("./lesson.js")

const Branch = db.define("branches", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sql.STRING,
        allowNull: false
    }
})

Branch.hasMany(Lesson, {onDelete: "cascade"});

module.exports = Branch;