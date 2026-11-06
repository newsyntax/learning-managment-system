const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/auth");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

module.exports = app;
