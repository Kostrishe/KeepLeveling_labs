const pool = require("../db");

exports.getAllRoles = async (req, res) => {
  try {
    const result = await pool("roles").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех ролей:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { role_id } = req.params;
    const result = await pool("roles").where({ role_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Роль не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении роли по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ message: "role_name обязательное поле" });
    }

    const [result] = await pool("roles")
      .insert({ role_name })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании роли:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { role_id } = req.params;
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ message: "role_name обязательное поле" });
    }

    const [result] = await pool("roles")
      .where({ role_id })
      .update({ role_name })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Роль не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении роли:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { role_id } = req.params;

    const [result] = await pool("roles")
      .where({ role_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Роль не найдена" });
    }

    res.status(200).json({ message: "Роль удалена" });
  } catch (err) {
    console.error("Ошибка при удалении роли:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
