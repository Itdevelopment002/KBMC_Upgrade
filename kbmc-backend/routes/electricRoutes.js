const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.get("/electric", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM electric WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM electric";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.post("/electric", (req, res) => {
  const {  heading, description, mobileNo, vendorName, language_code } = req.body;
  if (!heading || !description || !mobileNo || !vendorName || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO electric (heading, description, mobileNo, vendorName, language_code) VALUES (?, ?, ? ,?, ?)`;
  db.query(sql, [heading, description, mobileNo, vendorName, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Electric added successfully", id: result.insertId });
  });
});
router.put("/electric/:id", (req, res) => {
  const { heading, description, mobileNo, vendorName } = req.body;
  const sql =
    "UPDATE electric SET heading = ?, description = ?, mobileNo = ?, vendorName = ? WHERE id = ?";

  db.query(
    sql,
    [heading, description, mobileNo, vendorName, req.params.id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Failed to update electric data" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Electric record not found" });
      }
      res.json({ success: true });
    }
  );
});

router.delete("/electric/:id", (req, res) => {
  const sql = "DELETE FROM electric WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to delete electric data" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Electric record not found" });
    }
    res.json({ success: true });
  });
});

module.exports = router;
