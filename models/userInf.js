const sql = require("sequelize");
const db = require("../database/pokolenie.js");
const MainInf = require("./mainInf.js");

const UserInf = db.define("userInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sql.STRING,
        allowNull: false
    },
    surname: {
        type: sql.STRING,
        allowNull: false
    },
    parentsName: {
        type: sql.STRING,
        allowNull: true
    },
    parentsNumber: {
        type: sql.STRING(11),
        allowNull: true
    },
    usersNumber: {
        type: sql.STRING(11),
        allowNull: true
    },
    birthday: {
        type: sql.DATEONLY,
        allowNull: true
    },
    dateStartTrialLesson: {
        type: sql.DATEONLY,
        allowNull: true
    },
    dateStartMainLesson: {
        type: sql.DATEONLY,
        allowNull: true
    },
    payment: {
        type: sql.INTEGER,
        allowNull: true
    }
})

module.exports = UserInf;