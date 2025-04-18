const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// POST - Add new development plan
router.post("/development-plan-desc", (req, res) => {
  const { description, language_code } = req.body;

  if (!description || !language_code) {
    return res.status(400).json({ message: "Description and language_code are required." });
  }

  const sql = "INSERT INTO development_plan (description, language_code) VALUES (?, ?)";
  db.query(sql, [description, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database insertion failed", error: err });
    }
    res.status(201).json({ message: "Development Plan added successfully", data: result });
  });
});

// GET - Fetch all OR by language_code
router.get("/development-plan-desc", (req, res) => {
  const { language_code } = req.query;
  let sql = "SELECT * FROM development_plan";
  const values = [];

  if (language_code) {
    sql += " WHERE language_code = ?";
    values.push(language_code);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching data", error: err });
    }
    res.json(results);
  });
});

// PUT - Update development plan by id
router.put("/development-plan-desc/:id", (req, res) => {
  const { description, language_code } = req.body;

  if (!description || !language_code) {
    return res.status(400).json({ message: "Description and language_code are required." });
  }

  const sql = "UPDATE development_plan SET description = ?, language_code = ? WHERE id = ?";
  db.query(sql, [description, language_code, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to update development plan data",
        error: err,
      });
    }
    res.json({ success: true });
  });
});

// DELETE - Remove development plan by id
router.delete("/development-plan-desc/:id", (req, res) => {
  const sql = "DELETE FROM development_plan WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete development plan data",
        error: err,
      });
    }
    res.json({ success: true });
  });
});

module.exports = router;
