const sql = require("sequelize");
const db = require("../database/pokolenie.js")

const Attendance = db.define("attendances", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    check: {
        type: sql.INTEGER,
        allowNull: true
    }
})

module.exports = Attendance;