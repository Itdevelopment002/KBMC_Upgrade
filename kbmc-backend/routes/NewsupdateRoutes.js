const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/newsupdate", (req, res) => {
  const { description, language_code } = req.body;

  if (!description || !language_code) {
    return res.status(400).json({ message: "Description and language selection are required" });
  }

  const sql = "INSERT INTO newsupdate (description, language_code) VALUES (?,?)";
  db.query(sql, [description, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res
      .status(200)
      .json({
        message: "News update added successfully",
        newsId: result.insertId,
      });
  });
});

router.get("/newsupdate", (req, res) => {
  const { language } = req.query;
  let sql = "SELECT * FROM newsupdate";
  const params = [];

  if (language && language.trim()) {
    sql += " WHERE language_code = ?";
    params.push(language.trim());
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});
router.get("/newsupdate/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM newsupdate WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "News update not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/newsupdate/:id", (req, res) => {
  const { id } = req.params;
  const { description, language_code } = req.body;

  if (!description && !language_code) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  let updateSql = "UPDATE newsupdate SET";
  const updateParams = [];

  if (description) {
    updateSql += " description = ?";
    updateParams.push(description);
  }

  if (language_code) {
    updateSql += updateParams.length > 0 ? ", language_code = ?" : " language_code = ?";
    updateParams.push(language_code);
  }

  updateSql += " WHERE id = ?";
  updateParams.push(id);

  db.query(updateSql, updateParams, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "News update not found" });
    }

    res.status(200).json({ message: "News update updated successfully" });
  });
});

router.delete("/newsupdate/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM newsupdate WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "News update not found" });
    }
    res.status(200).json({ message: "News update deleted successfully" });
  });
});

module.exports = router;