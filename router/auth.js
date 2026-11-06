const express = require("express");
const controller = require("../controller/auth");
const router = express.Router();

router.route("/signup").post(controller.signup);
router.route("/signin").post(controller.signin);

module.exports = router;
