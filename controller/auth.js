const usersModel = require("../model/user");
// const bannedUsersModelModel = require("../model/bann-user");
const validator = require("../validator/signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  const isValidInfo = validator(req.body);
  if (isValidInfo !== true) {
    return res.status(422).json(isValidInfo);
  }
  const { username, fullname, phone, email, password } = req.body;

  const isUserExists = await usersModel.findOne({
    $or: [{ username: username }, { email: email }, { phone: phone }],
  });

  if (isUserExists) {
    return res.status(409).json({ message: "user already exists" });
  }

  // const isBanned = await bannedUsersModel.findOne({
  //   $or: [{ username: username }, { email: email }, { phone: phone }],
  // });

  // if (isBanned) {
  //   return res.status(403).json({ message: "user have banned, access denied" });
  // }

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = await usersModel.create({
    username,
    fullname,
    phone,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.json(accessToken);
};

exports.signin = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.json({ message: "fill out the fields" });
  }

  const user = await usersModel
    .findOne({
      $or: [
        { username: identifier },
        { phone: identifier },
        { email: identifier },
      ],
    })
    .lean();

  if (!user) {
    return res.json({ message: "invalid password or username" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "invalid password or username" });
  }

<<<<<<< HEAD
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
=======
  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
>>>>>>> 8020f5c50ee02857c164d59cb99fb76c6539398e

  res.json(accessToken);
};
