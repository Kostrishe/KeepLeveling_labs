const pool = require("../db");

exports.getAllPlaytestParticipants = async (req, res) => {
  try {
    const result = await pool("playtest_participants").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех участников плейтестов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getPlaytestParticipantById = async (req, res) => {
  try {
    const { playtest_id, user_id } = req.params;
    const result = await pool("playtest_participants")
      .where({ playtest_id, user_id })
      .first();

    if (!result) {
      return res.status(404).json({ message: "Участник плейтеста не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(
      `Ошибка при получении участника плейтеста с ID (playtest_id: ${req.params.playtest_id}, user_id: ${req.params.user_id}):`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createPlaytestParticipant = async (req, res) => {
  try {
    const { playtest_id, user_id } = req.body;

    if (!playtest_id || !user_id) {
      return res.status(400).json({
        message: "Поля playtest_id и user_id обязательны.",
      });
    }

    const [result] = await pool("playtest_participants")
      .insert({ playtest_id, user_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при добавлении участника в плейтест:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deletePlaytestParticipant = async (req, res) => {
  try {
    const { playtest_id, user_id } = req.params;

    const [result] = await pool("playtest_participants")
      .where({ playtest_id, user_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Участник плейтеста не найден" });
    }

    res.status(200).json({ message: "Участник плейтеста успешно удален" });
  } catch (err) {
    console.error(
      `Ошибка при удалении участника плейтеста с ID (playtest_id: ${req.params.playtest_id}, user_id: ${req.params.user_id}):`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
