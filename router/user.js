const express = require("express");
const controller = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const router = express.Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);
router.route("/").get(controller.getAllUsers);
// router
//   .route("/")
//   .post(authMiddleware, isAdminMiddleware, controller.create)
//   .get(authMiddleware, isAdminMiddleware, controller.getAllUsers);

// router
//   .route("/:id")
//   .get(authMiddleware, isAdminMiddleware, controller.getOneUser)
//   .put(authMiddleware, isAdminMiddleware, controller.update)
//   .delete(authMiddleware, isAdminMiddleware, controller.delete);

module.exports = router;
