const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// top of your route file
const multer = require("multer");
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // keep extension
  },
});
const upload = multer({ storage: storage });

// POST route
router.post("/righttoservices", upload.single("userfile"), (req, res) => {
  const { description, language_code } = req.body;
  const file = req.file;

  if (!description || !language_code || !file) {
    return res.status(400).json({ message: "All fields including PDF are required." });
  }

  const sql = `INSERT INTO righttoservices (heading, description, language_code) VALUES (?, ?, ?)`;
  db.query(sql, [file.filename, description.trim(), language_code.trim()], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Right to Service added successfully", id: result.insertId });
  });
});
router.get("/righttoservices", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM righttoservices WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM righttoservices";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});
router.put("/righttoservices/:id", (req, res) => {
  const { heading, description, language_code  } = req.body;
  if (!heading || !description || !language_code) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const sql =
    "UPDATE righttoservices SET heading = ?, description = ?,  language_code = ? WHERE id = ?";
  db.query(sql, [heading.trim(), description.trim(), language_code.trim(), req.params.id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to update RTS", error: err });
    }
    res.json({ success: true });
  });
});

router.delete("/righttoservices/:id", (req, res) => {
  const sql = "DELETE FROM righttoservices WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to delete RTS", error: err });
    }
    res.json({ success: true });
  });
});

module.exports = router;
