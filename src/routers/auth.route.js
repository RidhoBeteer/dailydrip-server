const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");
const Router = express.Router();

Router.post("/login", authController.loginHandler);
Router.post("/register", authController.registerHandler);
Router.post("/reset-password", authController.requestReset);
Router.patch("/reset-password/change", authController.resetPassword);
Router.patch(
  "/change-password",
  authMiddleware.authentication,
  authController.changePassword
);

module.exports = Router;
