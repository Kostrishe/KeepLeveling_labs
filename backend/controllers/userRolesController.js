const pool = require("../db");

exports.getAllUserRoles = async (req, res) => {
  try {
    const result = await pool("user_roles").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех ролей пользователей:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getUserRoleById = async (req, res) => {
  try {
    const { user_id, role_id } = req.params;
    const result = await pool("user_roles")
      .where({ user_id, role_id })
      .first();

    if (!result) {
      return res.status(404).json({ message: "Связь пользователя и роли не найдена" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении роли пользователя по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    if (!user_id || !role_id) {
      return res.status(400).json({ message: "user_id и role_id обязательные поля" });
    }

    const [result] = await pool("user_roles")
      .insert({ user_id, role_id })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании связи пользователя и роли:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.params;
    const [result] = await pool("user_roles")
      .where({ user_id, role_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Связь пользователя и роли не найдена" });
    }

    res.status(200).json({ message: "Связь пользователя и роли удалена" });
  } catch (err) {
    console.error("Ошибка при удалении связи пользователя и роли:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
