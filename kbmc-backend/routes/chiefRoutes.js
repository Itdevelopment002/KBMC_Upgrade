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

const upload = multer({ storage });

const convertToMySQLDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

// router.post("/chief-officers", upload.single("officerImage"), (req, res) => {
//   const { officerName, startDate, endDate } = req.body;

//   const sql =
//     "INSERT INTO previous_chief_officer (officer_name, start_date, end_date, image_path) VALUES (?, ?, ?, ?)";
//   db.query(
//     sql,
//     [officerName, formattedStartDate, formattedEndDate, imagePath],
//     (err, result) => {
//       if (err) {
//         console.error("Database Error:", err);
//         return res.status(500).json({ message: "Database error", error: err });
//       }
//       res
//         .status(200)
//         .json({
//           message: "Chief officer added successfully",
//           officerId: result.insertId,
//         });
//     }
//   );
// });

router.post("/chief-officers", upload.single("officerImage"), (req, res) => {
  const {
    officerName, startDate, endDate, language_code,
  } = req.body;

  const formattedStartDate = convertToMySQLDate(startDate);
  const formattedEndDate = endDate ? convertToMySQLDate(endDate) : null;

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  if (!officerName || !startDate || !language_code || !imagePath) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO previous_chief_officer (officer_name, start_date, end_date, image_path, language_code) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [officerName, formattedStartDate, formattedEndDate, imagePath, language_code],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Chief added successfully", id: result.insertId });
    }
  );
});



router.get("/chief-officers", (req, res) => {
  const language = req.query.lang;
  let query;
  let params = [];
  if (language) {
    query = `SELECT * FROM previous_chief_officer WHERE language_code = ?`;
    params.push(language);
  } else {
    query = "SELECT * FROM previous_chief_officer";
  }

db.query(query, params, (err, results) => {
   if (err) {
     return res.status(500).json({ message: "Database error", error: err });
   }
   res.status(200).json(results);
 });
});

router.get("/chief-officers/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM previous_chief_officer WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Chief officer not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/chief-officers/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  let { officer_name, start_date, end_date, language_code } = req.body;

  if (start_date) {
    start_date = convertToMySQLDate(start_date);
  }
  if (end_date) {
    end_date = convertToMySQLDate(end_date);
  } else {
    end_date = null;
  }

  const updateFields = [];
  const updateParams = [];

  if (officer_name) {
    updateFields.push("officer_name = ?");
    updateParams.push(officer_name);
  }
  if (start_date) {
    updateFields.push("start_date = ?");
    updateParams.push(start_date);
  }
  if (end_date !== undefined) {
    updateFields.push("end_date = ?");
    updateParams.push(end_date);
  }
  if (language_code) {
    updateFields.push("language_code = ?");
    updateParams.push(language_code);
  }
  if (req.file) {
    const imagePath = `/uploads/${req.file.filename}`;
    updateFields.push("image_path = ?");
    updateParams.push(imagePath);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const updateSql = `UPDATE previous_chief_officer SET ${updateFields.join(
    ", "
  )} WHERE id = ?`;
  updateParams.push(id);

  const selectSql =
    "SELECT image_path FROM previous_chief_officer WHERE id = ?";

  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Officer not found" });
    }

    const oldImagePath = result[0].image_path;

    db.query(updateSql, updateParams, (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      // Delete old image if new one uploaded
      if (req.file && oldImagePath) {
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
      }

      res.status(200).json({ message: "Chief officer updated successfully" });
    });
  });
});


router.delete("/chief-officers/:id", (req, res) => {
  const { id } = req.params;

  const selectSql =
    "SELECT image_path FROM previous_chief_officer WHERE id = ?";
  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Chief officer not found" });
    }

    const imagePath = result[0].image_path;

    const deleteSql = "DELETE FROM previous_chief_officer WHERE id = ?";
    db.query(deleteSql, [id], (err, deleteResult) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (imagePath) {
        fs.unlink(path.join(__dirname, "..", imagePath), (fsErr) => {
          if (fsErr) {
            console.error("Error deleting image:", fsErr);
          }
        });
      }

      res.status(200).json({ message: "Chief officer deleted successfully" });
    });
  });
});

module.exports = router;

