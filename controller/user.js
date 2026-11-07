const usersModel = require("../model/user");
const banUsersModel = require("../model/ban-user");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

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
  const users = await usersModel.find({}).select("-password").lean();
  res.json(users);
};

exports.getOneUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);
  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const user = await usersModel.findOne({ _id: id });

  if (!user) {
    return res.json({ message: "no such user" });
  }

  const isUserBanned = await banUsersModel.find({ userID: user._id });
  if (isUserBanned) {
    return res.json({ message: "this user is banned", user });
  }

  res.json(user);
};

exports.update = async (req, res) => {
  // Code ...
};

exports.delete = async (req, res) => {
  // Code ...
};

exports.banUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);

  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const isUserExists = await usersModel.findOne({ _id: id }).lean();
  const isUserBannedBefore = await banUsersModel.findOne({ userID: id }).lean();

  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }

  if (isUserBannedBefore) {
    return res.json({ message: "user banned before" });
  }

  await banUsersModel.create({ userID: id });
  res.status(201).json({ message: "user banned" });
};

exports.unBanUser = async (req, res) => {
  const { id } = req.params;
  const isValidID = mongoose.isValidObjectId(id);

  if (!isValidID) {
    return res.json({ message: "invalid ID" });
  }
  const isUserExists = await usersModel.findOne({ _id: id }).lean();

  if (!isUserExists) {
    return res.json({ message: "no such user" });
  }
  const isUserBanned = await banUsersModel.findOne({ userID: id }).lean();
  if (!isUserBanned) {
    return res.json({ message: "user is not banned" });
  }

  await banUsersModel.deleteOne({ userID: id });
  res.json({ message: "user unBaneed" });
};
