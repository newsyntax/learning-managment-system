const validator = require("fastest-validator");
const v = new validator();

const schema = {
  role: {
    type: "string",
    required: true,
  },
  username: {
    type: "string",
    required: true,
  },
  fullname: {
    type: "string",
    required: true,
  },
  phone: {
    type: "number",
    required: true,
    min: 10,
    max: 11,
  },
  email: {
    type: "string",
    required: true,
  },
  profile: {
    type: "string",
    required: false,
  },
  password: {
    type: "string",
    required: true,
    min: 8,
  },
};

const check = v.compile(schema);

module.exports = check;
