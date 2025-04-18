const router = require("express");
const app = router();
const Controller = require("../controller/AuthController");

app.post("/signup", Controller.register);
app.get("/getuser", Controller.getuser);
app.post("/login", Controller.login);
app.post("/ChangePassword", Controller.changepassword);
app.post("/admin", Controller.adminLogin);
module.exports = app;
