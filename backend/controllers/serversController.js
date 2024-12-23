const pool = require("../db");

exports.getAllServers = async (req, res) => {
  try {
    const result = await pool("servers").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех серверов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getServerById = async (req, res) => {
  try {
    const { server_id } = req.params;
    const result = await pool("servers").where({ server_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Сервер не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении сервера по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createServer = async (req, res) => {
  try {
    const { ip_address, location, status_id } = req.body;

    if (!ip_address || !location || !status_id) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const [result] = await pool("servers")
      .insert({ ip_address, location, status_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании сервера:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateServer = async (req, res) => {
  try {
    const { server_id } = req.params;
    const { ip_address, location, status_id } = req.body;

    const [result] = await pool("servers")
      .where({ server_id })
      .update({ ip_address, location, status_id })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Сервер не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении сервера:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteServer = async (req, res) => {
  try {
    const { server_id } = req.params;

    const [result] = await pool("servers")
      .where({ server_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Сервер не найден" });
    }

    res.status(200).json({ message: "Сервер удален" });
  } catch (err) {
    console.error("Ошибка при удалении сервера:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
