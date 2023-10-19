const express = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = express.Router();

adminRouter.post("/delete/:id", adminController.delete);
adminRouter.post("/edit", adminController.change);
adminRouter.post("/adduser", adminController.addUser);
adminRouter.post("/search", adminController.search);
adminRouter.use("/branch", adminController.branch);
adminRouter.use("/detail/:id", adminController.detail);
adminRouter.use("/edit/:id", adminController.edit);
adminRouter.use("/add_user", adminController.create);
adminRouter.use("/list_users", adminController.listUsers);
adminRouter.use("/list_mentors", adminController.listMentors);
adminRouter.use("/list_admins", adminController.listAdmins);
adminRouter.use("/", adminController.admin);

module.exports = adminRouter;