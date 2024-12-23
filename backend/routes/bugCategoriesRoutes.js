const express = require("express");
const router = express.Router();
const { getAllBugCategories, getBugCategoryById, createBugCategory, updateBugCategory, deleteBugCategory } = require("../controllers/bugCategoriesController");

router.get("/", getAllBugCategories);
router.get("/:category_id", getBugCategoryById);
router.post("/", createBugCategory);
router.put("/:category_id", updateBugCategory);
router.delete("/:category_id", deleteBugCategory);

module.exports = router;