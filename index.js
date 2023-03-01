require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routerNavigation = require("./src/routers");

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routerNavigation);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
