const pool = require("../db");

exports.getAllMapBugReports = async (req, res) => {
  try {
    const result = await pool("map_bug_reports").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех баг-репортов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapBugReportById = async (req, res) => {
  try {
    const { bug_report_id } = req.params;

    const result = await pool("map_bug_reports").where({ bug_report_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Баг-репорт не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении баг-репорта с ID ${req.params.bug_report_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


exports.createMapBugReport = async (req, res) => {
  try {
    const { map_id, user_id, description } = req.body;

    if (!map_id || !user_id || !description) {
      return res.status(400).json({ message: "Поля map_id, user_id и description обязательны" });
    }

    const [result] = await pool("map_bug_reports")
      .insert({ map_id, user_id, description })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании баг-репорта:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


exports.updateMapBugReport = async (req, res) => {
  try {
    const { bug_report_id } = req.params;
    const { map_id, user_id, description } = req.body;

    if (!map_id && !user_id && !description) {
      return res.status(400).json({ message: "Необходимо указать хотя бы одно поле для обновления" });
    }

    const updateData = {};
    if (map_id) updateData.map_id = map_id;
    if (user_id) updateData.user_id = user_id;
    if (description) updateData.description = description;

    const [result] = await pool("map_bug_reports")
      .where({ bug_report_id })
      .update(updateData)
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Баг-репорт не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении баг-репорта с ID ${req.params.bug_report_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapBugReport = async (req, res) => {
  try {
    const { bug_report_id } = req.params;

    const [result] = await pool("map_bug_reports")
      .where({ bug_report_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Баг-репорт не найден" });
    }

    res.status(200).json({ message: "Баг-репорт успешно удален" });
  } catch (err) {
    console.error(`Ошибка при удалении баг-репорта с ID ${req.params.bug_report_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
