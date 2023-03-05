const express = require("express");
const ordersController = require("../controllers/orders.controller");

const Router = express.Router();

Router.post("/", ordersController.createOrder);

module.exports = Router;
