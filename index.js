require("dotenv").config();
const express = require("express");
const connect = require("./db");
const app = express();
const PORT = process.env.PORT || 8081;
const routes = require("./routes/index.js")
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/api", routes);

app.listen(PORT, () => {
  connect();
  console.log("Server running on port " + PORT);
});
