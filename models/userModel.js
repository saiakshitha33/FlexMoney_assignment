const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
  },
});

const UserCollection = new mongoose.model("users", userSchema);

module.exports = UserCollection;
