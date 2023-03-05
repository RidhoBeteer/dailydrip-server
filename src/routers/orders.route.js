const express = require("express");
const ordersController = require("../controllers/orders.controller");

const Router = express.Router();

Router.get("/", ordersController.getOrdersHistory);
Router.post("/", ordersController.createOrder);

module.exports = Router;
