const sql = require("sequelize");
const db = require("../database/pokolenie.js");
const MainInf = db.define("mainInfs", {
    id: {
        type: sql.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: sql.STRING,
        allowNull: false
    },
    password: {
        type: sql.STRING,
        allowNull: false
    },
    role: {
        type: sql.STRING,
        allowNull: false
    }
})

module.exports = MainInf;
