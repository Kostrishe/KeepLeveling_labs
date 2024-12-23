const express = require("express");
const router = express.Router();
const { getAllPlaytestTags, getPlaytestTagById, createPlaytestTag, deletePlaytestTag } = require("../controllers/playtestTagsController");

router.get("/", getAllPlaytestTags);
router.get("/:playtest_id/:tag_id", getPlaytestTagById);
router.post("/", createPlaytestTag);
router.delete("/:playtest_id/:tag_id", deletePlaytestTag);

module.exports = router;