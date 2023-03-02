const express = require("express");

const Router = express.Router();
const userController = require("../controllers/users.controller");

Router.get("/", userController.getUsers);
Router.get("/:id", userController.getUser);
Router.post("/", userController.createUser);
Router.patch("/:id", userController.updateUserData);
Router.patch("/:id/change-password", userController.updateUserPassword);
Router.delete("/:id", userController.deleteUser);

module.exports = Router;
