const pool = require("../db");

exports.getAllMapFiles = async (req, res) => {
  try {
    const result = await pool("map_files").select("*");
    res.status(200).json(result);
  } catch (err) {
    console.error("Ошибка при получении файлов карт:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.getMapFileById = async (req, res) => {
  try {
    const { file_id } = req.params;

    const result = await pool("map_files").where({ file_id }).first();

    if (!result) {
      return res.status(404).json({ message: "Файл не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при получении файла с ID ${req.params.file_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};


exports.createMapFile = async (req, res) => {
  try {
    const { map_id, file_path, file_type } = req.body;

    if (!map_id || !file_path || !file_type) {
      return res
        .status(400)
        .json({ message: "Поля map_id, file_path и file_type обязательны" });
    }

    const [result] = await pool("map_files")
      .insert({ map_id, file_path, file_type })
      .returning("*");

    res.status(201).json(result);
  } catch (err) {
    console.error("Ошибка при создании файла карты:", err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.updateMapFile = async (req, res) => {
  try {
    const { file_id } = req.params;
    const { map_id, file_path, file_type } = req.body;

    if (!map_id && !file_path && !file_type) {
      return res
        .status(400)
        .json({ message: "Необходимо указать хотя бы одно поле для обновления" });
    }

    const [result] = await pool("map_files")
      .where({ file_id })
      .update({
        map_id: map_id || pool.raw("map_id"),
        file_path: file_path || pool.raw("file_path"),
        file_type: file_type || pool.raw("file_type"),
      })
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Файл не найден" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(`Ошибка при обновлении файла с ID ${req.params.file_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.deleteMapFile = async (req, res) => {
  try {
    const { file_id } = req.params;

    const [result] = await pool("map_files")
      .where({ file_id })
      .del()
      .returning("*");

    if (!result) {
      return res.status(404).json({ message: "Файл не найден" });
    }

    res.status(200).json({ message: "Файл успешно удалён" });
  } catch (err) {
    console.error(`Ошибка при удалении файла с ID ${req.params.file_id}:`, err.message);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};