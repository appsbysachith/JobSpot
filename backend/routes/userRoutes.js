const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  protect,
} = require("../controllers/userControl");
const { uploadProfilePhoto } = require("../controllers/userControl");
const upload = require("../middleware/upload");
const { updateUser } = require("../controllers/userControl");
const {
  saveJob,
  removeSavedJob,
  getSavedJobs,
} = require("../controllers/userControl");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.post(
  "/upload-photo",
  protect,
  upload.single("photo"),
  uploadProfilePhoto
);

router.put("/update", protect, updateUser);
router.post("/save-job", protect, saveJob);

router.post("/remove-saved-job", protect, removeSavedJob);

router.get("/saved-jobs", protect, getSavedJobs);

module.exports = router;
