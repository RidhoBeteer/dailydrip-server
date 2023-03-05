const express = require("express");
const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promosRouter = require("./promos.route");
const ordersRouter = require("./orders.route");

const Router = express.Router();

Router.use("/users", usersRouter);
Router.use("/products", productsRouter);
Router.use("/promos", promosRouter);
Router.use("/histories", ordersRouter);

module.exports = Router;
