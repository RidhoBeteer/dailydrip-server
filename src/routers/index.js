const express = require("express");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");

const Router = express.Router();

Router.use("/users", usersRouter);
Router.use("/products", productsRouter);

module.exports = Router;
