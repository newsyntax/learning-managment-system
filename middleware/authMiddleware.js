const jwt = require("jsonwebtoken");
const usersModel = require("../model/user");

module.exports = async (req, res, next) => {
  const authHeader = req.header("Authorization")?.split(" ");

  if (authHeader?.length !== 2) {
    return res.status(422).json({ message: "this route is protected" });
  }

  const token = authHeader[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usersModel.findOne({ _id: payload.id });
    const mainUser = user.toObject();
    Reflect.deleteProperty(mainUser, "password");
    req.user = mainUser;
    console.log(req.user);
    next();
  } catch (error) {
    return res.json(error);
  }
};
