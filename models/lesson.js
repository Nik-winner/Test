const sql = require("sequelize");
const db = require("../database/pokolenie.js")

const Lesson = db.define("lessons", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    mentor: {
        type: sql.STRING,
        allowNull: false
    },
    date: {
        type: sql.DATEONLY,
        allowNull: true
    },
    shortDate: {
        type: sql.VIRTUAL,
        get() {
            const fullDate = new Date(this.date)
            return `${fullDate.getDate()}.${fullDate.getMonth() + 1}`
        },
        set(val) {
            throw new Error("Don't do it!")
        }
    },
    getWeek: {
        type: sql.VIRTUAL,
        get() {
            const fullDate = new Date(this.date)
            let weeksDay = fullDate
            let day = fullDate.getDate()
            let month = fullDate.getMonth() + 1
            weeksDay = weeksDay.setDate(weeksDay.getDate() + 6)
            let lastDay = weeksDay.getDate()
            return (day < 10) ? (month < 10) ? `0${day}.0${month} - 0${lastDay}.0${month}`: `0${day}.${month} - 0${lastDay}.${month}` : `${day}.${month} - ${lastDay}.${month}`
        },
        set(val) {
            throw new Error("Don't do it!")
        }
    }
})

module.exports = Lesson;