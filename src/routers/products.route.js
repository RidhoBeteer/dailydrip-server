const express = require("express");

const Router = express.Router();
const productController = require("../controllers/products.controller");

Router.get("/", productController.getProducts);
Router.post("/", productController.createNewProduct);
Router.delete("/:id", productController.deleteProduct);

module.exports = Router;
