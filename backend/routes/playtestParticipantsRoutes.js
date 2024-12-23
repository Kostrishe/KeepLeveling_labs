const express = require("express");
const router = express.Router();
const { getAllPlaytestParticipants, getPlaytestParticipantById, createPlaytestParticipant, deletePlaytestParticipant } = require("../controllers/playtestParticipantsController");

router.get("/", getAllPlaytestParticipants);
router.get("/:playtest_id/:user_id", getPlaytestParticipantById);
router.post("/", createPlaytestParticipant);
router.delete("/:playtest_id/:user_id", deletePlaytestParticipant);

module.exports = router;