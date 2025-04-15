const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/property_holder", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM property_holder WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM property_holder";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
  // db.query("SELECT * FROM property_holder", (err, results) => {
  //   if (err) {
  //     console.error("Error fetching property holders:", err);
  //     return res.status(500).json({ error: "Server Error" });
  //   }
  //   res.json(results);
  // });
});

router.post("/property_holder", (req, res) => {
  const {  heading, description, property, language_code } = req.body;
  if (!heading || !description || !property || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO property_holder (heading, description, property, language_code) VALUES (?, ?, ? ,?)`;
  db.query(sql, [heading, description, property, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Property holder added successfully", id: result.insertId });
  });
});

router.put("/property_holder/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description, property } = req.body;

  const sql =
    "UPDATE property_holder SET heading = ?, description = ?, property = ? WHERE id = ?";
  db.query(sql, [heading, description, property, id], (err, result) => {
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

router.delete("/property_holder/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM property_holder WHERE id = ?";
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
