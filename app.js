const express = require("express");
const app = express();
const usersRouter = require("./router/user");

app.use("/api/user", usersRouter);

module.exports = app;
