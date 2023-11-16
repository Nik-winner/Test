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
        allowNull: false,
        get(){
            let date = this.getDataValue(date);
            const month = date.getMonth();
            const day = date.getDate();
            return `${month}.${day}`
        }
    }
})

module.exports = LessonsDate