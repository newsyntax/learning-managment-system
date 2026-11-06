const Validator = require("fastest-validator");
const v = new Validator();

const schema = {
  username: {
    type: "string",
    min: 3,
    max: 100,
  },
  fullname: {
    type: "string",
    min: 3,
    max: 255,
  },
  phone: {
    type: "string",
    min: 10,
    max: 11,
  },
  email: {
    type: "email",
  },
  password: {
    type: "string",
    min: 8,
    max: 16,
  },
  $$strict: true,
};

const check = v.compile(schema);

module.exports = check;
