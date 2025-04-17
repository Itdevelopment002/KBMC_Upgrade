const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// Create or update privacy policy for a specific language
router.post("/privacy-policy", (req, res) => {
  const { language_code, heading, description } = req.body;

  const sql = "INSERT INTO policy (language_code, heading, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE heading = ?, description = ?";
  db.query(sql, [language_code, heading, description, heading, description], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to add privacy policy" });
    }
    res.status(201).json({ id: result.insertId, language_code, heading, description });
  });
});

// Get privacy policy based on language code
router.get("/privacy-policy", (req, res) => {
  const { language_code } = req.query;

  if (!language_code) {
    return res.status(400).json({ error: "Language code is required" });
  }

  const sql = "SELECT * FROM policy WHERE language_code = ?";
  db.query(sql, [language_code], (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Failed to fetch privacy policy" });
    }
    res.json(results);
  });
});

// Delete privacy policy for a specific language
router.delete("/privacy-policy/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM policy WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ error: "Failed to delete privacy policy" });
    }
    res.json({ message: "Privacy Policy deleted successfully" });
  });
});

// Update privacy policy for a specific language
router.put("/privacy-policy/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;
  const sql = "UPDATE policy SET heading = ?, description = ? WHERE id = ?";
  db.query(sql, [heading, description, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ error: "Failed to update privacy policy" });
    }
    res.json({ message: "Privacy Policy updated successfully" });
  });
});

module.exports = router;
