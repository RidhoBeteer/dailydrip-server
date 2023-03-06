const express = require("express");
const ordersController = require("../controllers/orders.controller");

const Router = express.Router();

Router.get("/", ordersController.getOrdersHistory);
Router.get("/:id", ordersController.getOrderDetails);
Router.post("/", ordersController.createOrder);
Router.patch("/:id", ordersController.updateOrder);
Router.delete("/:id", ordersController.deleteOrder);

module.exports = Router;
