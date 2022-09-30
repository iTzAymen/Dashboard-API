const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/auth");

const {
  register,
  login,
  resetPassword,
  changeUsername,
} = require("../controllers/auth");

router.patch("/", authenticateUser, changeUsername);
router.post("/register", register);
router.post("/login", login);
router.patch("/reset", authenticateUser, resetPassword);

module.exports = router;
