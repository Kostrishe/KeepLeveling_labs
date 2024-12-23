const express = require("express");
const router = express.Router();
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require("../controllers/tagsController");

router.get("/", getAllTags);
router.get("/:tag_id", getTagById);
router.post("/", createTag);
router.put("/:tag_id", updateTag);
router.delete("/:tag_id", deleteTag);

module.exports = router;