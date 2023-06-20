const exp = require("express");
const pageUsersController = require("../controllers/pageUsersController.js");
const pageUsers = exp.Router();

pageUsers.use("/", pageUsersController.pageUsers);
module.exports = pageUsers;