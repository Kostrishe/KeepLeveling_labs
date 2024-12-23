const pool = require("../db");

exports.getAllLogs = async (req, res) => {
  try {
    const result = await pool("logs").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех логов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getLogById = async (req, res) => {
  try {
    const { log_id } = req.params;
    const result = await pool("logs").where({ log_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Лог не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении лога по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createLog = async (req, res) => {
  try {
    const { user_id, action, details } = req.body;

    if (!user_id || !action || !details) {
      return res
        .status(400)
        .json({ message: "Все поля (user_id, action, details) обязательны" });
    }

    const result = await pool("logs")
      .insert({ user_id, action, details })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании лога:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateLog = async (req, res) => {
  try {
    const { log_id } = req.params;
    const { user_id, action, details } = req.body;

    // Проверка на обязательные поля
    if (!user_id && !action && !details) {
      return res.status(400).json({
        message:
          "Необходимо передать хотя бы одно из полей (user_id, action, details)",
      });
    }

    const [result] = await pool("logs")
      .where({ log_id })
      .update({ user_id, action, details })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Лог не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(
      `Ошибка при обновлении лога с ID ${req.params.log_id}:`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const { log_id } = req.params;

    const [result] = await pool("logs").where({ log_id }).del().returning("*");

    if (!result) {
      return res.status(404).json({ message: "Лог не найден" });
    }

    res.status(200).json({ message: "Лог успешно удалён" });
  } catch (err) {
    console.error(
      `Ошибка при удалении лога с ID ${req.params.log_id}:`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
