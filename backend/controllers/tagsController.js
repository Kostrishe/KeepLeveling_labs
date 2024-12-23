const pool = require("../db");

exports.getAllTags = async (req, res) => {
  try {
    const result = await pool("tags").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех тегов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const { tag_id } = req.params;
    const result = await pool("tags").where({ tag_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Тег не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении тега по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createTag = async (req, res) => {
  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      return res.status(400).json({ message: "tag_name обязательное поле" });
    }

    const [result] = await pool("tags")
      .insert({ tag_name })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании тега:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const { tag_id } = req.params;
    const { tag_name } = req.body;

    const [result] = await pool("tags")
      .where({ tag_id })
      .update({ tag_name })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Тег не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении тега:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const { tag_id } = req.params;

    const [result] = await pool("tags")
      .where({ tag_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Тег не найден" });
    }

    res.status(200).json({ message: "Тег удален" });
  } catch (err) {
    console.error("Ошибка при удалении тега:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
