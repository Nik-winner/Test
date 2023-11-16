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
        set(val){
            let halfName = Math.round(this.login.length / 2);
            const name = this.login.slice(0, halfName);
            let halfSurname = Math.round(val.length / 2);
            const surname = val.slice(0, halfSurname)
            this.setDataValue("password", name + surname)
        }
    },
    role: {
        type: sql.STRING,
        allowNull: false
    }
})

module.exports = MainInf;
