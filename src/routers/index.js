const express = require("express");
const authMiddleware = require("../middlewares/auth");

const authRouter = require("./auth.route");

const usersRouter = require("./users.route");
const productsRouter = require("./products.route");
const promosRouter = require("./promos.route");
const ordersRouter = require("./orders.route");

const Router = express.Router();

Router.use("/users", authMiddleware.authentication, usersRouter);
Router.use("/products", productsRouter);
Router.use("/promos", promosRouter);
Router.use("/histories", authMiddleware.authentication, ordersRouter);
Router.use("/auth", authRouter);

module.exports = Router;
