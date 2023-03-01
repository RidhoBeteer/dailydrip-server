const express = require("express");

const Router = express.Router();
const userController = require("../controllers/users.controller");

Router.get("/", userController.getUsers);
Router.get("/:id", userController.getUser);

module.exports = Router;
