// backend/routers/serverStatusesRoutes

const express = require("express");
const router = express.Router();
const { getAllServerStatus, getServerStatusById, createServerStatus, updateServerStatus, deleteServerStatus } = require("../controllers/serverStatusController");

router.get("/", getAllServerStatus);
router.get("/:status_id", getServerStatusById);
router.post("/", createServerStatus);
router.put("/:status_id", updateServerStatus);
router.delete("/:status_id", deleteServerStatus);

module.exports = router;