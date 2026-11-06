const express = require("express");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const controller = require("../controller/user");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, controller.create)
  .get(authMiddleware, isAdminMiddleware, controller.getAllUsers);

router
  .route("/:id")
  .get(authMiddleware, isAdminMiddleware, controller.getOneUser)
  .put(authMiddleware, isAdminMiddleware, controller.update)
  .delete(authMiddleware, isAdminMiddleware, controller.delete);

module.exports = router;
