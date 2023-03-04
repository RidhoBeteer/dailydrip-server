const express = require("express");
const promosController = require("../controllers/promos.controller");

const Router = express.Router();

Router.get("/", promosController.getPromos);
Router.post("/", promosController.createNewPromo);

module.exports = Router;
