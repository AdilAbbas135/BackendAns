const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
const connect_to_db = require("./db");

//MiddleWears
connect_to_db();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// PORT
app.listen(5000, () => {
  console.log("Bacend server is running at port 5000");
});

// ROUTES
app.use("/account", require("./Routes/account"));
app.use("/api/offerings", require("./Routes/offering"));
app.use("/donate", require("./Routes/Stripe"));
app.use("/admin", require("./Routes/admin"));
