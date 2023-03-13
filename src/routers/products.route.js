const express = require("express");

const Router = express.Router();

const productController = require("../controllers/products.controller");
const authMiddleware = require("../middlewares/auth");

Router.get("/", productController.getProducts);
Router.get("/:id", productController.getProductDetails);
Router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.adminAuthorization,
  productController.createNewProduct
);
Router.patch(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.adminAuthorization,
  productController.updateProduct
);
Router.delete(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.adminAuthorization,
  productController.deleteProduct
);

module.exports = Router;
