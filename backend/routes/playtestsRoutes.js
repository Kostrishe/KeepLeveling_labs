const express = require("express");
const router = express.Router();
const { getAllPlaytests, getPlaytestById, createPlaytest, updatePlaytest, deletePlaytest } = require("../controllers/playtestsController");

router.get("/", getAllPlaytests);
router.get("/:playtest_id", getPlaytestById);
router.post("/", createPlaytest);
router.put("/:playtest_id", updatePlaytest);
router.delete("/:playtest_id", deletePlaytest);

module.exports = router;