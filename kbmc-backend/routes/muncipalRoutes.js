const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/muncipal", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM muncipal WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM muncipal";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });

});
router.post("/muncipal", (req, res) => {
  const {  heading, name, propertyType, address, language_code } = req.body;
  if ( !name || !propertyType || !address|| !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO  muncipal (heading, name, propertyType, address, language_code) VALUES (?, ?, ? ,?, ?)`;
  db.query(sql, [heading, name, propertyType, address, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "muncipal added successfully", id: result.insertId });
  });
});

router.put("/muncipal/:id", (req, res) => {
  const { id } = req.params;
  const { heading, name, propertyType, address } = req.body;

  const sql =
    "UPDATE muncipal SET heading = ?, name = ?, propertyType = ?, address = ? WHERE id = ?";
  db.query(sql, [heading, name, propertyType, address, id], (err, result) => {
    if (err) {
      console.error("Error updating property holder:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property holder not found" });
    }
    res.json({ message: "Property holder updated successfully" });
  });
});

router.delete("/muncipal/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM muncipal WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting property holder:", err);
      return res.status(500).json({ error: "Server Error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Property holder not found" });
    }
    res.status(204).send();
  });
});

module.exports = router;
