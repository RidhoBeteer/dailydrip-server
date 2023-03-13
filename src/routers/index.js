const express = require("express");
const authMiddleware = require("../middlewares/auth");

const authRouter = require("./auth.route");

const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promosRouter = require("./promos.route");
const ordersRouter = require("./orders.route");

const Router = express.Router();

Router.use("/users", usersRouter);
Router.use("/products", authMiddleware.authentication, productsRouter);
Router.use("/promos", promosRouter);
Router.use("/histories", ordersRouter);
Router.use("/auth", authRouter);

module.exports = Router;
