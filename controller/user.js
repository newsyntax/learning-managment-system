const usersModel = require("../model/user");
const banUsersModel = require("../model/ban-user");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  const { username, fullname, phone, email, password, role } = req.body;
  const isUserExists = await usersModel.findOne({
    $or: [{ username: username }, { email: email }, { phone: phone }],
  });
  if (isUserExists) {
    return res.json({ message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await usersModel.create({
    username,
    fullname,
    phone,
    email,
    password: hashedPassword,
    role,
  });

  res.status(201).json(user);
};

exports.getAllUsers = async (req, res) => {
  // Code ...
};

exports.getOneUser = async (req, res) => {
  // Code ...
};

exports.update = async (req, res) => {
  // Code ...
};

exports.delete = async (req, res) => {
  // Code ...
};

exports.banUser = async (req, res) => {
  // Code ...
};

exports.unBanUser = async (req, res) => {
  // Code ...
};
