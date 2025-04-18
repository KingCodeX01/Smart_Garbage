const router = require("express"); // Import express

const app = router(); // Create an instance of express
const Controller = require("../controller/GarbageController"); // Import the controller

app.post("/pickup", Controller.Gpickup);
app.get("/getgarbage", Controller.GetGarbage);
app.get("/getname/:id", Controller.GetName);
// app.post("/addproduct", Controller.AddProduct);

module.exports = app; // Export the app instance
