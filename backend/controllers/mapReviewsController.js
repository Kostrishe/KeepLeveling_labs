const pool = require("../db");

exports.getAllMapReviews = async (req, res) => {
  try {
    const result = await pool("map_reviews").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении отзывов карт:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapReviewById = async (req, res) => {
  try {
    const { review_id } = req.params;

    const result = await pool("map_reviews").where({ review_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Отзыв не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении отзыва с ID ${req.params.review_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createMapReview = async (req, res) => {
  try {
    const { map_id, user_id, rating } = req.body;

    if (!map_id || !user_id || typeof rating !== "number") {
      return res.status(400).json({
        message: "Поля map_id, user_id и rating обязательны. Рейтинг должен быть числом.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Рейтинг должен быть в диапазоне от 1 до 5.",
      });
    }

    const [result] = await pool("map_reviews")
      .insert({ map_id, user_id, rating })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании отзыва карты:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateMapReview = async (req, res) => {
  try {
    const { review_id } = req.params;
    const { map_id, user_id, rating } = req.body;

    if (rating !== undefined && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        message: "Рейтинг должен быть в диапазоне от 1 до 5.",
      });
    }

    if (!map_id && !user_id && rating === undefined) {
      return res.status(400).json({
        message: "Необходимо указать хотя бы одно поле для обновления.",
      });
    }

    const [result] = await pool("map_reviews")
      .where({ review_id })
      .update({ map_id, user_id, rating })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Отзыв не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении отзыва с ID ${req.params.review_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapReview = async (req, res) => {
  try {
    const { review_id } = req.params;

    const [result] = await pool("map_reviews")
      .where({ review_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Отзыв не найден" });
    }

    res.status(200).json({ message: "Отзыв успешно удалён" });
  } catch (err) {
    console.error(`Ошибка при удалении отзыва с ID ${req.params.review_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};