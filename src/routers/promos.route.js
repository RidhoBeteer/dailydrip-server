const express = require("express");
const promosController = require("../controllers/promos.controller");

const Router = express.Router();

Router.get("/", promosController.getPromos);
Router.get("/:id", promosController.getPromoDetails);
Router.post("/", promosController.createNewPromo);
Router.patch("/:id", promosController.updatePromo);

module.exports = Router;
