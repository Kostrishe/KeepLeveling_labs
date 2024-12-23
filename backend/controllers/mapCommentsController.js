const pool = require("../db");

exports.getAllMapComments = async (req, res) => {
  try {
    const result = await pool("map_comments").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении комментариев:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapCommentById = async (req, res) => {
  try {
    const { comment_id } = req.params;
    
    const result = await pool("map_comments").where({ comment_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении комментария с ID ${req.params.comment_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createMapComment = async (req, res) => {
  try {
    const { map_id, user_id, comment } = req.body;

    // Проверка на обязательные поля
    if (!map_id || !user_id || !comment) {
      return res.status(400).json({ message: "Поля map_id, user_id и comment обязательны" });
    }

    const [result] = await pool("map_comments")
      .insert({ map_id, user_id, comment })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании комментария:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateMapComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { map_id, user_id, comment } = req.body;

    if (!map_id && !user_id && !comment) {
      return res.status(400).json({ message: "Необходимо указать хотя бы одно поле для обновления" });
    }

    const [result] = await pool("map_comments")
      .where({ comment_id })
      .update({
        map_id: map_id || pool.raw("map_id"),
        user_id: user_id || pool.raw("user_id"),
        comment: comment || pool.raw("comment")
      })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении комментария с ID ${req.params.comment_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const [result] = await pool("map_comments")
      .where({ comment_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    res.status(200).json({ message: "Комментарий успешно удалён" });
  } catch (err) {
    console.error(`Ошибка при удалении комментария с ID ${req.params.comment_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};