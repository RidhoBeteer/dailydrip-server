const express = require("express");

const Router = express.Router();
const productController = require("../controllers/products.controller");

Router.get("/", productController.getProducts);

module.exports = Router;
