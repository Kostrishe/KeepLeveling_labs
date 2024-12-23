const pool = require("../db");

exports.getAllUserProfiles = async (req, res) => {
  try {
    const result = await pool("user_profiles").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех профилей пользователей:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const { profile_id } = req.params;
    const result = await pool("user_profiles").where({ profile_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Профиль пользователя не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении профиля пользователя по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createUserProfile = async (req, res) => {
  try {
    const { user_id, username, first_name, bio, avatar_url } = req.body;

    if (!user_id || !username) {
      return res.status(400).json({ message: "user_id и username обязательные поля" });
    }

    const [result] = await pool("user_profiles")
      .insert({ user_id, username, first_name, bio, avatar_url })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании профиля пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { profile_id } = req.params;
    const { user_id, username, first_name, bio, avatar_url } = req.body;

    const [result] = await pool("user_profiles")
      .where({ profile_id })
      .update({ user_id, username, first_name, bio, avatar_url })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Профиль пользователя не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении профиля пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const { profile_id } = req.params;

    const [result] = await pool("user_profiles")
      .where({ profile_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Профиль пользователя не найден" });
    }

    res.status(200).json({ message: "Профиль пользователя удален" });
  } catch (err) {
    console.error("Ошибка при удалении профиля пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
