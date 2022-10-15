require("dotenv").config();
const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(express.json());

const { eventroute } = require("./src/routes/eventroute.js");

app.get("/info", (req, res) => {
  res.send("Server Running");
});

app.use("/api/v3/app", eventroute);

app.listen("8080", () => {
  console.log(`Server Started At Port:${process.env.PORT}`);
});
