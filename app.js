const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
require("./models/db");

const app = express();

app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());

const viewsPath = path.join(__dirname, "/public/views");
const publicDirectoryPath = path.join(__dirname, "/public");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index");
});

var initialName;
var initialAge;
var initialDate;
var initialBatch;

const userCollection = require("./models/userModel");
app.post("/user", async (req, res) => {
  initialName = req.body.name;
  initialAge = req.body.age;
  initialDate = req.body.startDate;
  initialBatch = req.body.batch;
  console.log(initialName);

  const { name, email, phone, age, startDate, batch } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !age ||
    startDate == "NaN/undefinedundefined/" ||
    batch == 0
  ) {
    res
      .status(400)
      .json({ message: "Information insufficient", message_id: "0" });
    return;
  } else {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, "0");
    var month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var year = today.getFullYear();
    const currentDate = month + "/" + day + "/" + year; //month//day//year format

    if (startDate < currentDate) {
      res.status(401).json({
        message: "Start date cannot be smaller than today's date",
        message_id: "da",
      });
      return;
    } else if (age < 18 || age > 65) {
      res
        .status(401)
        .json({ message: "Age must be between 18 & 65", message_id: "ag" });
      return;
    } else if (phone.length != 10) {
      res
        .status(401)
        .json({ message: "Invalid Phone number", message_id: "ph" });
      return;
    }

    userCollection
      .findOne({ email: email })
      .then((userSaved) => {
        if (userSaved) {
          const userStartDate = String(userSaved.startDate);
          const daysDiff =
            Number(new Date(currentDate).getTime()) -
            Number(new Date(userStartDate).getTime()) / (1000 * 60 * 60 * 24);
          if (daysDiff > 30) {
            userCollection
              .updateOne({ email: email }, { $set: { startDate: currentDate } })
              .then((updatedUser) => {
                res.render("payment_page", {
                  name: name,
                });
              })
              .catch((err) => {
                console.log(`Error in updation of new start date is ${err}`);
                return;
              });
          } else {
            res.render("payment_page", {
              name: name,
            });
            return;
          }
        } else {
          const userData = new userCollection({
            name: name,
            phone: phone,
            age: age,
            email: email,
            startDate: startDate,
            batch: batch,
          });

          //Save the document to the database
          userData.save();

          res.render("payment_page", {
            name: name,
          });
        }
      })
      .catch((err) => {
        console.log("Error finding user");
      });
  }
});

const payCollection = require("./models/payModel");
const User = require("./models/userModel");

app.post("/payment", async (req, res) => {
  const { holderName, expirationDate, cardNo, cvvCode } = req.body;

  var user = new User();
  user.name = initialName;
  console.log(initialBatch);
  user.startDate = initialDate;
  user.age = initialAge;
  user.batch = initialBatch;

  const paymentDoc = new payCollection({
    holderName: holderName,
    expirationDate: expirationDate,
    cardNo: cardNo,
    cvvCode: cvvCode,
  });

  await paymentDoc.save();
  res.render("success_page", { user: user });
});

app.listen(3000, () => {
  console.log("Server is Up and Running");
});
