const exp = require("express");
const adminController = require("../controllers/adminController.js");
const adminRouter = exp.Router();

adminRouter.use("/", adminController.admin);
module.exports = adminRouter;