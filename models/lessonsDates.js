const sql = require("sequelize");
const db = require("../database/pokolenie.js")

const LessonsDate = db.define("lessonsDates", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: sql.DATEONLY,
        allowNull: false
    },
    shortDate: {
        type: sql.VIRTUAL,
        get() {
            const date = this.date
            let fullDate = new Date(date)
            return `${fullDate.getDate()}.${fullDate.getMonth() + 1}`
        }
    }
})

module.exports = LessonsDate