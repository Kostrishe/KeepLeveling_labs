const express = require("express");
const router = express.Router();
const { getAllMapBugReports, getMapBugReportById, createMapBugReport, updateMapBugReport, deleteMapBugReport } = require("../controllers/mapBugReportsController");

router.get("/", getAllMapBugReports);
router.get("/:bug_report_id", getMapBugReportById);
router.post("/", createMapBugReport);
router.put("/:bug_report_id", updateMapBugReport);
router.delete("/:bug_report_id", deleteMapBugReport);

module.exports = router;