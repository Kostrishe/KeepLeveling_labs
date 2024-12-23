const express = require("express");
const router = express.Router();
const { getAllUserProfiles, getUserProfileById, createUserProfile, updateUserProfile, deleteUserProfile } = require("../controllers/userProfilesController");

router.get("/", getAllUserProfiles);
router.get("/:profile_id", getUserProfileById);
router.post("/", createUserProfile);
router.put("/:profile_id", updateUserProfile);
router.delete("/:profile_id", deleteUserProfile);

module.exports = router;