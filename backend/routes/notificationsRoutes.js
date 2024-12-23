const express = require("express");
const router = express.Router();
const { getAllNotifications, getNotificationById, createNotification, updateNotification, deleteNotification } = require("../controllers/notificationsController");

router.get("/", getAllNotifications);
router.get("/:notification_id", getNotificationById);
router.post("/", createNotification);
router.put("/:notification_id", updateNotification);
router.delete("/:notification_id", deleteNotification);

module.exports = router;