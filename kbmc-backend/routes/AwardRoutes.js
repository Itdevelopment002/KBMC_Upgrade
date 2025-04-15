const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/awards", (req, res) => {
     const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM awards WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM awards";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.post("/awards", (req, res) => {
  const { heading, description, language_code } = req.body;

  if (!heading || !description || !language_code) {
    return res
      .status(400)
      .json({ error: "Heading, description, and language code are required" });
  }

  const sql = "INSERT INTO awards (heading, description, language_code) VALUES (?, ?, ?)";
  db.query(sql, [heading, description, language_code], (err, result) => {
    if (err) {
      console.error("Error adding awards:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    res.status(201).json({ id: result.insertId, heading, description, language_code });
  });
});


router.put("/awards/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;

  const sql = "UPDATE awards SET heading = ?, description = ? WHERE id = ?";
  db.query(sql, [heading, description, id], (err, result) => {
    if (err) {
      console.error("Error updating awards:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Awards not found" });
    }
    res.json({ message: "Awards updated successfully" });
  });
});

router.delete("/awards/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM awards WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting award:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Awards not found" });
    }
    res.status(204).send();
  });
});

module.exports = router;
