require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Daily Drip API",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
