const pool = require("../db");

exports.getAllMapBugReportCategories = async (req, res) => {
  try {
    const result = await pool("map_bug_report_categories").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error(
      "Ошибка при получении всех связей баг-репортов и категорий:",
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapBugReportCategoryById = async (req, res) => {
  try {
    const { bug_report_id, category_id } = req.params;

    const result = await pool("map_bug_report_categories")
      .where({ bug_report_id, category_id })
      .first();

    if (!result) {
      return res
        .status(404)
        .json({ message: "Связь баг-репорта и категории не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(
      `Ошибка при получении связи баг-репорта ${req.params.bug_report_id} и категории ${req.params.category_id}:`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createMapBugReportCategory = async (req, res) => {
  try {
    const { bug_report_id, category_id } = req.body;

    // Проверка на обязательные поля
    if (!bug_report_id || !category_id) {
      return res
        .status(400)
        .json({ message: "Поля bug_report_id и category_id обязательны" });
    }

    const [result] = await pool("map_bug_report_categories")
      .insert({ bug_report_id, category_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error(
      "Ошибка при создании связи баг-репорта и категории:",
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapBugReportCategory = async (req, res) => {
  try {
    const { bug_report_id, category_id } = req.params;

    const [result] = await pool("map_bug_report_categories")
      .where({ bug_report_id, category_id })
      .del()
      .returning("*");

    if (!result) {
      return res
        .status(404)
        .json({ message: "Связь баг-репорта и категории не найдена" });
    }

    res
      .status(200)
      .json({ message: "Связь баг-репорта и категории успешно удалена" });
  } catch (err) {
    console.error(
      `Ошибка при удалении связи баг-репорта ${req.params.bug_report_id} и категории ${req.params.category_id}:`,
      err.message
    );
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
