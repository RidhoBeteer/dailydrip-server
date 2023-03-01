require("dotenv").config();
const express = require("express");
const routerNavigation = require("./src/routers");

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routerNavigation);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
