const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// router.post("/functions", (req, res) => {
//   const { heading, description } = req.body;

//   const sql = "INSERT INTO functions (heading, description) VALUES (?, ?)";
//   db.query(sql, [heading, description], (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       return res.status(500).json({ error: "Failed to add function" });
//     }
//     res.status(201).json({ id: result.insertId, heading, description });
//   });
// });

router.post("/functions",  (req, res) => {
  const {
    heading, description,
    language_code,
  } = req.body;

  if (
    !heading ||
    !description ||
    !language_code 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO functions (heading, description, language_code) VALUES (?, ?, ?)`;
  db.query(
    sql,
    [
      heading, description, language_code
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res
        .status(200)
        .json({ message: "Functions added successfully", id: result.insertId });
    }
  );
});

router.get("/functions", (req, res) => {
    const language = req.query.lang;
    let query;
    let params = [];
    if (language) {
      query = `SELECT * FROM functions WHERE language_code = ?`;
      params.push(language);
    } else {
      query = "SELECT * FROM functions";
    }

  db.query(query, params, (err, results) => {
     if (err) {
       return res.status(500).json({ message: "Database error", error: err });
     }
     res.status(200).json(results);
   });
});

router.delete("/functions/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM functions WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ error: "Failed to delete function" });
    }
    res.json({ message: "Function deleted successfully" });
  });
});

router.put("/functions/:id", (req, res) => {
  const { id } = req.params;
  const { heading, description } = req.body;
  const sql = "UPDATE functions SET heading = ?, description = ? WHERE id = ?";
  db.query(sql, [heading, description, id], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).json({ error: "Failed to update function" });
    }
    res.json({ message: "Function updated successfully" });
  });
});

module.exports = router;
