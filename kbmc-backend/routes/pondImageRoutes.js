const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const db = require("../config/db.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/pond-images", upload.single("pondImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  const sql = "INSERT INTO pond_images (image_path) VALUES (?)";
  db.query(sql, [imagePath], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res
      .status(200)
      .json({ message: "Image added successfully", imageId: result.insertId });
  });
});

router.get("/pond-images", (req, res) => {
  const language = req.query.lang;
     let query;
     let params = [];
     if (language) {
       query = `SELECT * FROM pond_images WHERE language_code = ?`;
       params.push(language);
     } else {
       query = "SELECT * FROM pond_images";
     }
 
   db.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json(results);
    });
});

router.get("/pond-images/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM pond_images WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/pond-images/:id", upload.single("pondImage"), (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No image file provided for update" });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  const sql = "UPDATE pond_images SET image_path = ? WHERE id = ?";

  const selectSql = "SELECT image_path FROM pond_images WHERE id = ?";
  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const oldImagePath = result[0].image_path;

    db.query(sql, [imagePath, id], (err, updateResult) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      const fullPath = path.join(
        __dirname,
        "..",
        oldImagePath.replace(/^\//, "")
      );
      fs.unlink(fullPath, (fsErr) => {
        if (fsErr) {
          console.error("Error deleting old image:", fsErr);
        }
      });

      res.status(200).json({ message: "Image updated successfully" });
    });
  });
});

router.delete("/pond-images/:id", (req, res) => {
  const { id } = req.params;

  const selectSql = "SELECT image_path FROM pond_images WHERE id = ?";
  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = result[0].image_path;

    const deleteSql = "DELETE FROM pond_images WHERE id = ?";
    db.query(deleteSql, [id], (err, deleteResult) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      fs.unlink(path.join(__dirname, "..", imagePath), (fsErr) => {
        if (fsErr) {
          console.error("Error deleting image:", fsErr);
        }
      });

      res.status(200).json({ message: "Image deleted successfully" });
    });
  });
});

module.exports = router;
