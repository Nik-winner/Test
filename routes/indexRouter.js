const exp = require("express");
const indexController = require("../controllers/indexController.js");
const indexRouter = exp.Router();

indexRouter.use("/", indexController.index);
module.exports = indexRouter;