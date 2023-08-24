const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

adminRouter.use("/add_user", adminController.create);
adminRouter.use("/", adminController.admin);
adminRouter.use("/list_admins", adminController.admin);
adminRouter.use("/edit/:id", adminController.edit);
adminRouter.use("/addUser", adminController.addUser);

module.exports = adminRouter;