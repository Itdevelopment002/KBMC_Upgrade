const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/roads", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM roads WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM roads";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});
router.post("/roads", (req, res) => {
  const {  heading, description, length, language_code } = req.body;
  if (!heading || !description || !length || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO roads (heading, description, length, language_code) VALUES (?, ?, ? ,?)`;
  db.query(sql, [heading, description, length, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Roads added successfully", id: result.insertId });
  });
});

router.put("/roads/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description, length, language_code } = req.body;
  
  if (!heading || !description || !length || !language_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "UPDATE roads SET heading = ?, description = ?, length = ?, language_code = ? WHERE id = ?";
  
  db.query(
    sql,
    [heading.trim(), description.trim(), length, language_code.trim(), id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update Road data" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Road record not found" });
      }

      res.json({ message: "Road updated successfully" });
    }
  );
});


router.delete("/roads/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM roads WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting road:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Road not found" });
    }
    res.status(204).send();
  });
});

module.exports = router;
