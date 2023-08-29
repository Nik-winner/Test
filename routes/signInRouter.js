const exp = require("express");
const signInController = require("../controllers/signInController.js");
const signInRouter = exp.Router();

signInRouter.use("/", signInController.signIn);

module.exports = signInRouter;