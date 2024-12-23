const express = require("express");
const router = express.Router();
const { getAllMapReviews, getMapReviewById, createMapReview, updateMapReview, deleteMapReview } = require("../controllers/mapReviewsController");

router.get("/", getAllMapReviews);
router.get("/:review_id", getMapReviewById);
router.post("/", createMapReview);
router.put("/:review_id", updateMapReview);
router.delete("/:review_id", deleteMapReview);

module.exports = router;