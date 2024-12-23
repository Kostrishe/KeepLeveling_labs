const express = require("express");
const router = express.Router();
const { getAllMapBugReportCategories, getMapBugReportCategoryById, createMapBugReportCategory, deleteMapBugReportCategory } = require("../controllers/mapBugReportCategoriesController");

router.get("/", getAllMapBugReportCategories);
router.get("/:bug_report_id/:category_id", getMapBugReportCategoryById);
router.post("/", createMapBugReportCategory);
router.delete("/:bug_report_id/:category_id", deleteMapBugReportCategory);

module.exports = router;