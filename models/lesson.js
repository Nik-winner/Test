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
    week: {
        type: sql.DATEONLY,
        set(val) {
            this.setDataValue(val)
        },
        get() {
            const week = this.getDataValue(week)
            console.log(week)
            let date = new Date(week)
            let day = date.getDate()
            let month = data.getMonth() + 1
            return `${day}.${month}-${day + 6}.${month}`
        }
    }
})

module.exports = Lesson;