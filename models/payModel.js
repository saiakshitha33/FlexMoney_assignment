const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  holderName: {
    type: String,
  },
  expirationDate: {
    type: String,
  },
  cardNo: {
    type: String,
  },
  cvvCode: {
    type: String,
  },
});
const payCollection = new mongoose.model("paymentModes", paySchema);

module.exports = payCollection;
