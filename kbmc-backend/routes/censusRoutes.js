const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/tree-census", (req, res) => {
  const {  description, total, language_code } = req.body;
  if (!description || !total || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO tree_census (description, total, language_code) VALUES (?, ?, ?)`;
  db.query(sql, [description, total, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Tree Census added successfully", id: result.insertId });
  });
});

router.get("/tree-census", (req, res) => {
  const language = req.query.lang;
  let query;
  let params = [];
  if (language) {
    query = `SELECT * FROM tree_census WHERE language_code = ?`;
    params.push(language);
  } else {
    query = "SELECT * FROM tree_census";
  }

db.query(query, params, (err, results) => {
   if (err) {
     return res.status(500).json({ message: "Database error", error: err });
   }
   res.status(200).json(results);
 });
});

router.put("/tree-census/:id", (req, res) => {
  const treeCensusId = req.params.id;
  const { description, total } = req.body;

  const sql = `
        UPDATE tree_census
        SET description = ?, total = ?
        WHERE id = ?
    `;

  db.query(sql, [description, total, treeCensusId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Tree Census updated successfully" });
  });
});

router.delete("/tree-census/:id", (req, res) => {
  const treeCensusId = req.params.id;

  const sql = "DELETE FROM tree_census WHERE id = ?";

  db.query(sql, [treeCensusId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Tree Census deleted successfully" });
  });
});

module.exports = router;
