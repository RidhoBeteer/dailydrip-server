const express = require("express");
const promosController = require("../controllers/promos.controller");

const Router = express.Router();

Router.post("/", promosController.createNewPromo);

module.exports = Router;
