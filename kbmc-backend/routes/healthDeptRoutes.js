const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/health_dep_sec", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM health_dep_sec WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM health_dep_sec";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});
router.post("/health_dep_sec", (req, res) => {
  const {description, language_code } = req.body;
  if (!description || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO health_dep_sec (description, language_code) VALUES (?, ?)`;
  db.query(sql, [description, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Health Department added successfully", id: result.insertId });
  });
});

router.delete("/health_dep_sec/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM health_dep_sec WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting work:", err);
      return res.status(500).json({ message: "Error deleting work" });
    }

    res.status(204).send();
  });
});

router.put("/health_dep_sec/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  const query = "UPDATE health_dep_sec SET description = ? WHERE id = ?";
  db.query(query, [description, id], (err, result) => {
    if (err) {
      console.error("Error updating work:", err);
      return res.status(500).json({ message: "Error updating work" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Work not found" });
    }

    res.status(200).json({ id, description });
  });
});

module.exports = router;
