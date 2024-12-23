const express = require("express");
const router = express.Router();
const { getAllMaps, getMapById, createMap, updateMap, deleteMap } = require("../controllers/mapsController");

router.get("/", getAllMaps);
router.get("/:map_id", getMapById);
router.post("/", createMap);
router.put("/:map_id", updateMap);
router.delete("/:map_id", deleteMap);

module.exports = router;