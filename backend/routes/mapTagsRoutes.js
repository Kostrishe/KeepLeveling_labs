const express = require("express");
const router = express.Router();
const { getAllMapTags, getMapTagById, createMapTag, deleteMapTag } = require("../controllers/mapTagsController");

router.get("/", getAllMapTags);
router.get("/:map_id/:tag_id", getMapTagById);
router.post("/", createMapTag);
router.delete("/:map_id/:tag_id", deleteMapTag);

module.exports = router;