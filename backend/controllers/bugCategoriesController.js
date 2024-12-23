const pool = require("../db");

exports.getAllBugCategories = async (req, res) => {
  try {
    const result = await pool("bug_categories").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех категорий багов:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getBugCategoryById = async (req, res) => {
  try {
    const { category_id } = req.params;
    const result = await pool("bug_categories").where({ category_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Категория бага не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении категории бага по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createBugCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "category_name обязательное поле" });
    }

    const [result] = await pool("bug_categories")
      .insert({ category_name })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании категории бага:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateBugCategory = async (req, res) => {
  try {
    const { category_id } = req.params;
    const { category_name } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "category_name обязательное поле" });
    }

    const [result] = await pool("bug_categories")
      .where({ category_id })
      .update({ category_name })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Категория бага не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении категории бага:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteBugCategory = async (req, res) => {
  try {
    const { category_id } = req.params;

    const [result] = await pool("bug_categories")
      .where({ category_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Категория бага не найдена" });
    }

    res.status(200).json({ message: "Категория бага удалена" });
  } catch (err) {
    console.error("Ошибка при удалении категории бага:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
