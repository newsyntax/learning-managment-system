const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./router/auth");
const usersRouter = require("./router/user");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

module.exports = app;
