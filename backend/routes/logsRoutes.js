const express = require("express");
const router = express.Router();
const { getAllLogs, getLogById, createLog, updateLog, deleteLog } = require("../controllers/logsController");

router.get("/", getAllLogs);
router.get("/:log_id", getLogById);
router.post("/", createLog);
router.put("/:log_id", updateLog);
router.delete("/:log_id", deleteLog);

module.exports = router;