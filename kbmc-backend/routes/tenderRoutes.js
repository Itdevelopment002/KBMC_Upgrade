const fs = require("fs");
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/tenders", (req, res) => {
     const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM tenders WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM tenders";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});
router.post("/tenders", upload.single("pdf"), (req, res) => {
  const { description, status, language_code } = req.body;
  const pdfPath = req.file ? req.file.path : null;

  if (!description || !status || !pdfPath || !language_code) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO tenders (description, status, pdf, language_code) VALUES (?, ?, ?, ?)`;
  db.query(sql, [description, status, pdfPath, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Tender added successfully", id: result.insertId });
  });
});
router.put("/tenders/:id", upload.single("pdf"), (req, res) => {
  const { id } = req.params;
  const { description, status, retainPdf } = req.body;
  const newPdfPath = req.file ? req.file.path : null;

  db.query("SELECT pdf FROM `tenders` WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching tender:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const currentPdfPath = results[0]?.pdf;

    const updatedTender = {
      description,
      status,
      pdf: newPdfPath || (retainPdf ? currentPdfPath : null),
    };

    db.query(
      "UPDATE `tenders` SET description = ?, status = ?, pdf = ? WHERE id = ?",
      [description, status, updatedTender.pdf, id],
      (err) => {
        if (err) {
          console.error("Error updating tender:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (newPdfPath && currentPdfPath) {
          fs.unlink(currentPdfPath, (err) => {
            if (err) {
              console.error("Error deleting old PDF:", err);
            }
          });
        }

        res.json({ id, ...updatedTender });
      }
    );
  });
});

router.delete("/tenders/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT pdf FROM `tenders` WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching tender:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const pdfPath = results[0]?.pdf;

    db.query("DELETE FROM `tenders` WHERE id = ?", [id], (deleteErr) => {
      if (deleteErr) {
        console.error("Error deleting tender:", deleteErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (pdfPath) {
        fs.unlink(pdfPath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting PDF:", unlinkErr);
          }
        });
      }

      res.json({ message: "Tender and associated PDF deleted successfully" });
    });
  });
});

router.use("/uploads", express.static("uploads"));

module.exports = router;