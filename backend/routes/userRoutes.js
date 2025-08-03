const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  protect,
  getMe,
} = require("../controllers/userControl");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;
