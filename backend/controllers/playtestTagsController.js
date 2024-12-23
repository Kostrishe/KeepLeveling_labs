const pool = require("../db");

exports.getAllPlaytestTags = async (req, res) => {
  try {
    const result = await pool("playtest_tags").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении тегов плейтестов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getPlaytestTagById = async (req, res) => {
  try {
    const { playtest_id, tag_id } = req.params;

    const result = await pool("playtest_tags")
      .where({ playtest_id, tag_id })
      .first();

    if (!result) {
      return res.status(404).json({ message: "Связь плейтеста и тега не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении связи плейтеста и тега с ID плейтеста ${req.params.playtest_id} и тега ${req.params.tag_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createPlaytestTag = async (req, res) => {
  try {
    const { playtest_id, tag_id } = req.body;

    if (!playtest_id || !tag_id) {
      return res.status(400).json({
        message: "Плейтест и тег обязаны быть указаны.",
      });
    }

    const [result] = await pool("playtest_tags")
      .insert({ playtest_id, tag_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании связи плейтеста и тега:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deletePlaytestTag = async (req, res) => {
  try {
    const { playtest_id, tag_id } = req.params;

    const [result] = await pool("playtest_tags")
      .where({ playtest_id, tag_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Связь плейтеста и тега не найдена" });
    }

    res.status(200).json({ message: "Связь плейтеста и тега удалена" });
  } catch (err) {
    console.error(`Ошибка при удалении связи плейтеста и тега с ID плейтеста ${req.params.playtest_id} и тега ${req.params.tag_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
