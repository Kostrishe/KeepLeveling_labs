const express = require("express");
const router = express.Router();
const { getAllMapFiles, getMapFileById, createMapFile, updateMapFile, deleteMapFile } = require("../controllers/mapFilesController");

router.get("/", getAllMapFiles);
router.get("/:file_id", getMapFileById);
router.post("/", createMapFile);
router.put("/:file_id", updateMapFile);
router.delete("/:file_id", deleteMapFile);

module.exports = router;