const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../config/db.js");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post(
  "/development-plan-pdf",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  (req, res) => {
    const { name, language_code } = req.body;  // Capture the language_code
    const imagePath = req.files?.image ? req.files.image[0].path : null;
    const pdfPath = req.files?.pdf ? req.files.pdf[0].path : null;

    if (!name || !language_code || !imagePath || !pdfPath) {
      return res
        .status(400)
        .json({ message: "Name, language_code, image, and PDF files are required." });
    }

    const sql =
      "INSERT INTO development_plan_pdf (name, language_code, image_path, pdf_path) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, language_code, imagePath, pdfPath], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database insertion failed", error: err });
      }
      res
        .status(201)
        .json({ message: "Record added successfully", data: result });
    });
  }
);



router.get("/development-plan-pdf", (req, res) => {
  const { language_code } = req.query;

  let sql = "SELECT * FROM development_plan_pdf";
  let params = [];

  if (language_code) {
    sql += " WHERE language_code = ?";
    params.push(language_code);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database retrieval failed", error: err });
    }

    res.json(results);
  });
});

router.put(
  "/development-plan-pdf/:id",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  (req, res) => {
    const { id } = req.params;
    const { name, language_code } = req.body;

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push("name = ?");
      values.push(name);
    }

    if (language_code) {
      fieldsToUpdate.push("language_code = ?");
      values.push(language_code);
    }

    if (req.files?.image) {
      const newImagePath = `uploads/${req.files.image[0].filename}`;
      fieldsToUpdate.push("image_path = ?");
      values.push(newImagePath);
    }

    if (req.files?.pdf) {
      const newPdfPath = `uploads/${req.files.pdf[0].filename}`;
      fieldsToUpdate.push("pdf_path = ?");
      values.push(newPdfPath);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const updateSql = `UPDATE development_plan_pdf SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    values.push(id);

    // First, get old paths for cleanup
    const selectSql = "SELECT image_path, pdf_path FROM development_plan_pdf WHERE id = ?";
    db.query(selectSql, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Development Plan not found" });
      }

      const { image_path: oldFilePath, pdf_path: oldPdfPath } = result[0];

      db.query(updateSql, values, (err) => {
        if (err) {
          return res.status(500).json({ message: "Update failed", error: err });
        }

        // Delete old image if replaced
        if (req.files?.image && oldFilePath) {
          fs.unlink(path.join(__dirname, "..", oldFilePath), (fsErr) => {
            if (fsErr) console.error("Failed to delete old image:", fsErr);
          });
        }

        // Delete old PDF if replaced
        if (req.files?.pdf && oldPdfPath) {
          fs.unlink(path.join(__dirname, "..", oldPdfPath), (fsErr) => {
            if (fsErr) console.error("Failed to delete old PDF:", fsErr);
          });
        }

        res.status(200).json({ message: "Development Plan updated successfully." });
      });
    });
  }
);

router.delete("/development-plan-pdf/:id", (req, res) => {
  const sql = "DELETE FROM development_plan_pdf WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database deletion failed", error: err });
    }
    res.json({ success: true });
  });
});

module.exports = router;
