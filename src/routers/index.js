const express = require("express");
const usersRouter = require("./users.route");

const Router = express.Router();

Router.use("/users", usersRouter);

module.exports = Router;
