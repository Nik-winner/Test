const sql = require("sequelize");
const cls = require("cls-hooked");
const namespace = cls.createNamespace("my-namespace");
sql.useCLS(namespace);

module.exports = sequelize = new sql("pokolenie", "root", "Flower_Nerlin", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    },
    pool: {
        min: 0,
        max: 50,
        idle: 10000,
        acquire: 30000
    }
})