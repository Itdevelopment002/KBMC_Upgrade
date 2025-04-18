const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/terms-and-conditions", (req, res) => {
  const { heading, description, language_code } = req.body;

  console.log("POST Body Received:", req.body);

  if (!heading || !description || !language_code) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    INSERT INTO conditions (heading, description, language_code)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [heading, description, language_code], (err, result) => {
    if (err) {
      console.error("Database insert error:", err);
      return res.status(500).json({ error: "Insert failed." });
    }

    res.status(201).json({
      message: "Inserted successfully",
      data: { id: result.insertId, heading, description, language_code },
    });
  });
});


router.get("/terms-and-conditions", (req, res) => {
  const { lang } = req.query;
  let query = "SELECT * FROM conditions";
  const params = [];

  if (lang) {
    query += " WHERE language_code = ?";
    params.push(lang);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch terms and conditions" });
    }
    res.status(200).json(results);
  });
});


router.delete("/terms-and-conditions/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM conditions WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res
        .status(500)
        .json({ error: "Failed to delete terms and conditions" });
    }
    res.json({ message: "Terms and conditions deleted successfully" });
  });
});

router.put("/terms-and-conditions/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description, language_code } = req.body;

  if (!heading || !description || !language_code) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const sql = `
    UPDATE conditions
    SET heading = ?, description = ?, language_code = ?
    WHERE id = ?
  `;

  db.query(sql, [heading, description, language_code, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res
        .status(500)
        .json({ error: "Failed to update terms and conditions" });
    }

    res.json({ message: "Terms and conditions updated successfully" });
  });
});


module.exports = router;
