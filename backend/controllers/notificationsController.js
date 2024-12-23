const pool = require("../db");

exports.getAllNotifications = async (req, res) => {
  try {
    const result = await pool("notifications").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех уведомлений:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const { notification_id } = req.params;
    const result = await pool("notifications").where({ notification_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Уведомление не найдено" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении уведомления по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { user_id, message, is_read } = req.body;

    if (!user_id || !message) {
      return res.status(400).json({ message: "user_id и message обязательны" });
    }

    const [result] = await pool("notifications")
      .insert({ user_id, message, is_read: is_read || false })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании уведомления:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;
    const { user_id, message, is_read } = req.body;

    const [result] = await pool("notifications")
      .where({ notification_id })
      .update({ user_id, message, is_read })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Уведомление не найдено" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении уведомления:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { notification_id } = req.params;

    const [result] = await pool("notifications")
      .where({ notification_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Уведомление не найдено" });
    }

    res.status(200).json({ message: "Уведомление удалено" });
  } catch (err) {
    console.error("Ошибка при удалении уведомления:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
