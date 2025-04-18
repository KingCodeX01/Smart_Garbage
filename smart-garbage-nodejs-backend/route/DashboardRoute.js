const router = require("express");
const app = router();
const Controller = require("../controller/DashboardController");

app.get("/dashboard", Controller.GetData);

module.exports = app;
