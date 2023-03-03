const express = require("express");

const Router = express.Router();
const usersController = require("../controllers/users.controller");

Router.get("/", usersController.getUsers);
Router.get("/:id", usersController.getUser);
Router.post("/", usersController.createUser);
Router.patch("/:id", usersController.updateUserData);
Router.patch("/:id/change-password", usersController.updateUserPassword);
Router.delete("/:id", usersController.deleteUser);

module.exports = Router;
