const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// router.post("/history", (req, res) => {
//   const { description } = req.body;
//   if (!description) {
//     return res.status(400).json({ message: "Description is required" });
//   }
//   const sql = "INSERT INTO history (description) VALUES (?)";
//   db.query(sql, [description], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Database error", error: err });
//     }
//     res
//       .status(201)
//       .json({
//         message: "History added successfully",
//         historyId: result.insertId,
//       });
//   });
// });

router.post("/history", (req, res) => {
  const {  description, language_code } = req.body;
  if (!description || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO history (description, language_code) VALUES (?,?)`;
  db.query(sql, [description, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "History description added successfully", id: result.insertId });
  });
});

router.get("/history", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM history WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM history";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.get("/history/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM history WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "History not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/history/:id", (req, res) => {
  const { id } = req.params;
  const { description, language_code } = req.body;

  if (!description || !language_code) {
    return res.status(400).json({ message: "Description and language_code are required" });
  }

  const sql = "UPDATE history SET description = ?, language_code = ? WHERE id = ?";
  db.query(sql, [description, language_code, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "History not found" });
    }
    res.status(200).json({ message: "History updated successfully" });
  });
});


router.delete("/history/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM history WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "History not found" });
    }
    res.status(200).json({ message: "History deleted successfully" });
  });
});

module.exports = router;




