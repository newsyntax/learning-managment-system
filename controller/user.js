const usersModel = require("../model/user");

exports.signup = async (req, res) => {
  const { username, fullname, phone, email, profile, password } = req.body;
  const users = usersModel.find({}).lean();
  res.json(users);
};

exports.signin = async (req, res) => {
  // Code ...
};

exports.create = async (req, res) => {
  // Code ...
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
