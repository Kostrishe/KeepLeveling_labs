const pool = require("../db");

exports.getAllMaps = async (req, res) => {
  try {
    const result = await pool("maps").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении карт:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapById = async (req, res) => {
  try {
    const { map_id } = req.params;
    const result = await pool("maps").where({ map_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Карта не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении карты с ID ${req.params.map_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createMap = async (req, res) => {
  try {
    const { title, description, author_id } = req.body;

    if (!title || !description || !author_id) {
      return res.status(400).json({
        message: "Поля title, description и author_id обязательны.",
      });
    }

    const [result] = await pool("maps")
      .insert({ title, description, author_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании карты:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateMap = async (req, res) => {
  try {
    const { map_id } = req.params;
    const { title, description, author_id } = req.body;

    if (!title && !description && !author_id) {
      return res.status(400).json({
        message: "Необходимо указать хотя бы одно поле для обновления.",
      });
    }

    const [result] = await pool("maps")
      .where({ map_id })
      .update({ title, description, author_id })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Карта не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении карты с ID ${req.params.map_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMap = async (req, res) => {
  try {
    const { map_id } = req.params;

    const [result] = await pool("maps")
      .where({ map_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Карта не найдена" });
    }

    res.status(200).json({ message: "Карта успешно удалена" });
  } catch (err) {
    console.error(`Ошибка при удалении карты с ID ${req.params.map_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
