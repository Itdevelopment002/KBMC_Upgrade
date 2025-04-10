const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/wards", (req, res) => {
 const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM wards WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM wards";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.post("/wards", (req, res) => {
  const { ward_no, ward_name } = req.body;
  const sql = "INSERT INTO wards (ward_no, ward_name) VALUES (?, ?)";
  db.query(sql, [ward_no, ward_name], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ward_no, ward_name });
  });
});

router.put("/wards/:id", (req, res) => {
  const { ward_no, ward_name } = req.body;
  const sql = "UPDATE wards SET ward_no = ?, ward_name = ? WHERE id = ?";
  db.query(sql, [ward_no, ward_name, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

router.delete("/wards/:id", (req, res) => {
  const sql = "DELETE FROM wards WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
