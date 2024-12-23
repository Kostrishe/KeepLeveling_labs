const pool = require("../db");

exports.getAllPlaytests = async (req, res) => {
  try {
    const result = await pool("playtests").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении плейтестов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getPlaytestById = async (req, res) => {
  try {
    const { playtest_id } = req.params;

    const result = await pool("playtests").where({ playtest_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Плейтест не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении плейтеста с ID ${req.params.playtest_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createPlaytest = async (req, res) => {
  try {
    const { title, description, author_id, date, participants_count, participant_level, server_id } = req.body;

    if (!title || !description || !author_id || !date || !participants_count || !participant_level || !server_id) {
      return res.status(400).json({
        message: "Все поля обязательны.",
      });
    }

    const [result] = await pool("playtests")
      .insert({ title, description, author_id, date, participants_count, participant_level, server_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании плейтеста:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updatePlaytest = async (req, res) => {
  try {
    const { playtest_id } = req.params;
    const { title, description, author_id, date, participants_count, participant_level, server_id } = req.body;

    const [result] = await pool("playtests")
      .where({ playtest_id })
      .update({
        title,
        description,
        author_id,
        date,
        participants_count,
        participant_level,
        server_id
      })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Плейтест не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении плейтеста с ID ${req.params.playtest_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deletePlaytest = async (req, res) => {
  try {
    const { playtest_id } = req.params;

    const [result] = await pool("playtests")
      .where({ playtest_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Плейтест не найден" });
    }

    res.status(200).json({ message: "Плейтест удален" });
  } catch (err) {
    console.error(`Ошибка при удалении плейтеста с ID ${req.params.playtest_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
