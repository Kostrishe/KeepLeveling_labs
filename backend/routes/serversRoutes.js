const express = require("express");
const router = express.Router();
const { getAllServers, getServerById, createServer, updateServer, deleteServer } = require("../controllers/serversController");

router.get("/", getAllServers);
router.get("/:server_id", getServerById);
router.post("/", createServer);
router.put("/:server_id", updateServer);
router.delete("/:server_id", deleteServer);

module.exports = router;