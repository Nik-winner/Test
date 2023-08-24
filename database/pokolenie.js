const sql = require("sequelize");

module.exports = sequelize = new sql("pokolenie", "root", "Flower_Nerlin", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
})