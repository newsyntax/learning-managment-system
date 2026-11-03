const mongoose = require("mongoose");
const schema = mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
});

const model = mongoose.model("User", schema);
module.exports = model;
