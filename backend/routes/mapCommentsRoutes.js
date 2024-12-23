const express = require("express");
const router = express.Router();
const { getAllMapComments, getMapCommentById, createMapComment, updateMapComment, deleteMapComment } = require("../controllers/mapCommentsController");

router.get("/", getAllMapComments);
router.get("/:comment_id", getMapCommentById);
router.post("/", createMapComment);
router.put("/:comment_id", updateMapComment);
router.delete("/:comment_id", deleteMapComment);

module.exports = router;