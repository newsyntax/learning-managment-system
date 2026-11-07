const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const user = req.user;

  if (user.role !== "ADMIN") {
    return res.json({ message: "this route only for admins" });
  }

  next();
};
