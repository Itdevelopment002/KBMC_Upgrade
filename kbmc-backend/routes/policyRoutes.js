const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

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

router.put('/privacy-policy/:id', (req, res) => {
  const { heading, description, language_code } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE policy 
    SET heading = ?, description = ?, language_code = ?
    WHERE id = ?
  `;

  db.query(sql, [heading, description, language_code, id], (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: 'Update failed' });
    }
    res.json({ success: true });
  });
});


module.exports = router;
