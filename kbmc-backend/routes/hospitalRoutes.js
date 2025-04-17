const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/private-hospital", (req, res) => {
  const { hospital_name, division, principal_doctor, address, phone_no, mobile_no, beds, facility, language_code,} = req.body;
  if (!hospital_name || !division || !principal_doctor || !address || !phone_no || !mobile_no || !beds || !facility || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO prvt_hospital (hospital_name, division, principal_doctor, address, phone_no, mobile_no, beds, facility, language_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, 
    [hospital_name, division, principal_doctor, address, phone_no, mobile_no, beds, facility, language_code,], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Hospital added successfully", id: result.insertId });
  });
});

router.get("/private-hospital", (req, res) => {
  const language = req.query.lang;
      let query;
      let params = [];
      if (language) {
        query = `SELECT * FROM prvt_hospital WHERE language_code = ?`;
        params.push(language);
      } else {
        query = "SELECT * FROM prvt_hospital";
      }
  
    db.query(query, params, (err, results) => {
       if (err) {
         return res.status(500).json({ message: "Database error", error: err });
       }
       res.status(200).json(results);
     });
});

router.delete("/private-hospital/:id", (req, res) => {
  const hospitalId = req.params.id;

  const sql = "DELETE FROM prvt_hospital WHERE id = ?";

  db.query(sql, [hospitalId], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  });
});

router.put("/private-hospital/:id", (req, res) => {
  const hospitalId = req.params.id;
  const {
    hospital_name, division, principal_doctor, address, phone_no, mobile_no, beds, facility, language_code,
  } = req.body;
  

  const sql = `
    UPDATE prvt_hospital
    SET hospital_name = ?, division = ?, principal_doctor = ?, address = ?, phone_no = ?, mobile_no = ?, beds = ?, facility = ?, language_code = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [hospital_name, division, principal_doctor, address, phone_no, mobile_no, beds, facility, language_code, hospitalId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update hospital data" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Hospital record not found" });
      }

      res.json({ message: "Hospital updated successfully" });
    }
  );
});


module.exports = router;
