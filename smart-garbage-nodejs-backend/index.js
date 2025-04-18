const express = require("express");
const app = express();
const router = express.Router();
const conn = require("./database/connection");
const cors = require("cors");
const bodyPraser = require("body-parser");

const authRoute = require("./route/AuthRoute");
const routeGarbage = require("./route/GarbageRoute");
const routePrice = require("./route/GpriceRoute");
const countData = require("./route/DashboardRoute");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json({ limit: "20000mb" }));
app.use(bodyPraser.urlencoded({ extended: true, limit: "20000mb" }));
app.use([authRoute, routeGarbage, routePrice, countData]);
app.use(express.static("./uploads"));

app.listen(8080, (err) => {
  if (err) {
    console.log("Server not started");
  } else {
    console.log("Server started at 8080");
  }
});
