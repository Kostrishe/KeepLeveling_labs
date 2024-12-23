const pool = require("../db");

exports.getAllServerStatus = async (req, res) => {
  try {
    const result = await pool("server_status").select("*");
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};

exports.getServerStatusById = async (req, res) => {
  try {
    const { status_id } = req.params;

    const result = await pool("server_status")
      .where({ status_id })
      .first();

    if (!result) {
      return res.status(404).json({ message: "Статус сервера не найден" });
    }

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};

exports.createServerStatus = async (req, res) => {
  try {
    const { status_name } = req.body;

    const [newStatus] = await pool("server_status")
      .insert({ status_name })
      .returning("*");

    res.status(201).json(newStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};

exports.updateServerStatus = async (req, res) => {
  try {
    const { status_id } = req.params;
    const { status_name } = req.body;

    const [updatedStatus] = await pool("server_status")
      .where({ status_id })
      .update({ status_name })
      .returning("*");

    if (!updatedStatus) {
      return res.status(404).json({ message: "Статус сервера не найден" });
    }

    res.json(updatedStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};

exports.deleteServerStatus = async (req, res) => {
  try {
    const { status_id } = req.params;

    const [deletedStatus] = await pool("server_status")
      .where({ status_id })
      .del()
      .returning("*");

    if (!deletedStatus) {
      return res.status(404).json({ message: "Статус сервера не найден" });
    }

    res.json({ message: "Статус сервера удален", deletedStatus });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
};
