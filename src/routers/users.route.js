const express = require("express");

const Router = express.Router();
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth");

Router.get("/", usersController.getUsers);
Router.get("/:id", usersController.getUser);
Router.post("/", authMiddleware.adminAuthorization, usersController.createUser);

Router.patch(
  "/:id",
  authMiddleware.isAuthorized,
  usersController.updateUserData
);

Router.patch(
  "/:id/change-password",
  authMiddleware.isAuthorized,
  usersController.updateUserPassword
);

Router.delete("/:id", authMiddleware.isAuthorized, usersController.deleteUser);

module.exports = Router;
