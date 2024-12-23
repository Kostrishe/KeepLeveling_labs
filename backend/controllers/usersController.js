const pool = require("../db"); // Подключение к базе данных

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool("users").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении всех пользователей:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool("users").where({ user_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении пользователя по ID:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { login, email, password } = req.body;

    if (!login || !email || !password) {
      return res.status(400).json({ message: "login, email и password обязательные поля" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool("users")
      .insert({ login, email, password_hash: hashedPassword })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { login, email, password } = req.body;

    if (!login && !email && !password) {
      return res.status(400).json({ message: "Необходимо указать хотя бы одно поле для обновления" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result] = await pool("users")
      .where({ user_id })
      .update({
        login: login || pool.raw('login'),
        email: email || pool.raw('email'),
        password_hash: hashedPassword || pool.raw('password_hash')
      })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при обновлении пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const [result] = await pool("users")
      .where({ user_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json({ message: "Пользователь удален" });
  } catch (err) {
    console.error("Ошибка при удалении пользователя:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
