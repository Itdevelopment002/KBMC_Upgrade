const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require("../config/db.js");

router.get("/departments", (req, res) => {
     const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM departments WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM departments";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

// router.post("/departments", (req, res) => {
//   const { name, hod } = req.body;
//   const sql = "INSERT INTO departments (name, hod) VALUES (?, ?)";
//   db.query(sql, [name, hod], (err, result) => {
//     if (err) throw err;
//     res.json({ id: result.insertId, name, hod });
//   });
// });
router.post("/departments", (req, res) => {
  const {
    name, hod,
    language_code,
  } = req.body;

  if (
    !name ||
    !hod ||
    !language_code
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO departments (name, hod, language_code) VALUES (?, ?,?)`;
  db.query(
    sql,
    [
      name, hod,
      language_code,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res
        .status(200)
        .json({ message: "Department added successfully", id: result.insertId });
    }
  );
});
router.put("/departments/:id", (req, res) => {
  const { name, hod } = req.body;
  const sql = "UPDATE departments SET name = ?, hod = ? WHERE id = ?";
  db.query(sql, [name, hod, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

router.delete("/departments/:id", (req, res) => {
  const sql = "DELETE FROM departments WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
