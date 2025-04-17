const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/ponds-talao", (req, res) => {
  const { name, language_code } = req.body;
  if ( !name || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO ponds_table (name, language_code) VALUES (?,?)`;
  db.query(sql, [name, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Ponds-Talao added successfully", id: result.insertId });
  });
});

router.get("/ponds-talao", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM ponds_table WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM ponds_table";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.get("/ponds-talao/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM ponds_table WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Ponds-Talao not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/ponds-talao/:id", (req, res) => {
  const { id } = req.params;
  const { name, language_code } = req.body;

  if (!name || !language_code) {
    return res.status(400).json({ message: "All fields is required" });
  }

  const sql = "UPDATE ponds_table SET name = ?, language_code = ? WHERE id = ?";
  db.query(sql,
    [name.trim(), language_code.trim(), id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Ponds/Talao not found" });
      }

      res.json({ message: "Ponds/Talao updated successfully" });
  });
});

router.delete("/ponds-talao/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM ponds_table WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ponds/Talao not found" });
    }
    res.status(200).json({ message: "Ponds/Talao deleted successfully" });
  });
});

module.exports = router;
