const sql = require("sequelize");
const db = require("../database/pokolenie.js");
const Lesson = require("./lesson.js");

LessonsDate = db.define("lessonsDate", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: sql.DATEONLY,
        allowNull: true
    },
    shortDate: {
        type: sql.VIRTUAL,
        get() {
            let fullDate = new Date(this.date)
            let day = fullDate.getDate()
            let month = fullDate.getMonth() + 1
            let date = ["0" + day, '0' + month].map(d => d.slice(-2))
            return date.slice(0, 2).join(".")
        },
        set(val) {
            throw new Error("Don't do it!")
        }
    },
    weekDay: {
        type: sql.VIRTUAL,
        get() {
            let fullDate = new Date(this.date)
            let weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
            return weekDays[fullDate.getDay()]
        },
        set(val) {
            throw new Error("Don't do it!")
        }
    },
    getWeek: {
        type: sql.VIRTUAL,
        get() {
            let fullDate = new Date(Date.parse(this.date))
            let day = fullDate.getDate()
            let month = fullDate.getMonth() + 1
            let endDay = fullDate.setDate(fullDate.getDate() + 6)
            let lastDay = new Date(endDay).getDate()
            let nextMonth = new Date(endDay).getMonth() + 1
            let date = [
                "0" + day,
                '0' + month,
                '0' + lastDay,
                '0' + nextMonth].map(d => d.slice(-2))
            return date.slice(0, 2).join(".") + '-' + date.slice(2).join('.')
        },
        set(val) {
            throw new Error("Don't do it!")
        }
    }
})

module.exports = LessonsDate