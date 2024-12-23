const pool = require("../db");

exports.getAllMapTags = async (req, res) => {
  try {
    const result = await pool("map_tags").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении связей карт и тегов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapTagById = async (req, res) => {
  try {
    const { map_id, tag_id } = req.params;
    const result = await pool("map_tags").where({ map_id, tag_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Связь карты и тега не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении связи карты ${req.params.map_id} и тега ${req.params.tag_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createMapTag = async (req, res) => {
  try {
    const { map_id, tag_id } = req.body;

    if (!map_id || !tag_id) {
      return res.status(400).json({
        message: "Поля map_id и tag_id обязательны.",
      });
    }

    const [result] = await pool("map_tags")
      .insert({ map_id, tag_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании связи карты и тега:", err.message);

    if (err.code === "23505") {
      return res.status(409).json({ message: "Такая связь уже существует." });
    }

    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapTag = async (req, res) => {
  try {
    const { map_id, tag_id } = req.params;

    const [result] = await pool("map_tags")
      .where({ map_id, tag_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Связь карты и тега не найдена" });
    }

    res.status(200).json({ message: "Связь карты и тега успешно удалена" });
  } catch (err) {
    console.error(`Ошибка при удалении связи карты ${req.params.map_id} и тега ${req.params.tag_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
