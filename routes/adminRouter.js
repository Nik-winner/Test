const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

adminRouter.use("/add_user", adminController.addUser);

module.exports = adminRouter;