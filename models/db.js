const mongoose = require("mongoose");
require("dotenv").config();

const db = "kohinoor444";

mongoose.connect(
  `mongodb+srv://saiakshitha33:${db}@cluster0.8saqp1s.mongodb.net/?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);

require("./userModel");
