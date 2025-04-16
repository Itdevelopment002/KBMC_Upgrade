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

// router.post("/elected-wings", upload.single("image"), (req, res) => {
//   const { correspondentName, wardNo, startDate, endDate, mobileNo } = req.body;

//   const formattedStartDate = convertToMySQLDate(startDate);
//   const formattedEndDate = convertToMySQLDate(endDate);

//   if (!correspondentName || !wardNo || !startDate || !endDate || !mobileNo) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

//   const sql =
//     "INSERT INTO elected_wings (correspondentName, wardNo, startDate, endDate, mobileNo, image_path) VALUES (?, ?, ?, ?, ?, ?)";
//   db.query(
//     sql,
//     [
//       correspondentName,
//       wardNo,
//       formattedStartDate,
//       formattedEndDate,
//       mobileNo,
//       imagePath,
//     ],
//     (err, result) => {
//       if (err) {
//         return res.status(500).json({ message: "Database error", error: err });
//       }
//       res
//         .status(200)
//         .json({
//           message: "Correspondent added successfully",
//           correspondentId: result.insertId,
//         });
//     }
//   );
// });


router.post("/elected-wings", upload.single("image"), (req, res) => {
  const {
    correspondentName,
    wardNo,
    startDate,
    endDate,
    mobileNo,
    language_code,
  } = req.body;

  if (
    !correspondentName ||
    !wardNo ||
    !startDate ||
    !endDate ||
    !mobileNo ||
    !language_code
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const formattedStartDate = convertToMySQLDate(startDate);
  const formattedEndDate = convertToMySQLDate(endDate);
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `INSERT INTO elected_wings (correspondentName, wardNo, startDate, endDate, mobileNo, image_path, language_code) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      correspondentName,
      wardNo,
      formattedStartDate,
      formattedEndDate,
      mobileNo,
      imagePath,
      language_code,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res
        .status(200)
        .json({ message: "Elected-Wings added successfully", id: result.insertId });
    }
  );
});

router.get("/elected-wings", (req, res) => {
   const language = req.query.lang;
      let query;
      let params = [];
      if (language) {
        query = `SELECT * FROM elected_wings WHERE language_code = ?`;
        params.push(language);
      } else {
        query = "SELECT * FROM elected_wings";
      }
  
    db.query(query, params, (err, results) => {
       if (err) {
         return res.status(500).json({ message: "Database error", error: err });
       }
       res.status(200).json(results);
     });
});

router.get("/elected-wings/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM elected_wings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Correspondent not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/elected-wings/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  let { correspondentName, wardNo, startDate, endDate, mobileNo, language_code } = req.body;

  if (startDate) startDate = convertToMySQLDate(startDate);
  if (endDate) endDate = convertToMySQLDate(endDate);

  const fields = [];
  const values = [];

  if (correspondentName) {
    fields.push("correspondentName = ?");
    values.push(correspondentName);
  }
  if (wardNo) {
    fields.push("wardNo = ?");
    values.push(wardNo);
  }
  if (startDate) {
    fields.push("startDate = ?");
    values.push(startDate);
  }
  if (endDate) {
    fields.push("endDate = ?");
    values.push(endDate);
  }
  if (mobileNo) {
    fields.push("mobileNo = ?");
    values.push(mobileNo);
  }
  if (req.file) {
    const imagePath = `/uploads/${req.file.filename}`;
    fields.push("image_path = ?");
    values.push(imagePath);
  }if (language_code) {
    fields.push("language_code = ?");
    values.push(language_code);
  }
  

  if (fields.length === 0) {
    return res.status(400).json({ message: "No fields provided to update" });
  }

  const updateSql = `UPDATE elected_wings SET ${fields.join(", ")} WHERE id = ?`;
  values.push(id);

  const selectSql = "SELECT image_path FROM elected_wings WHERE id = ?";
  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Correspondent not found" });
    }

    const oldImagePath = result[0].image_path;

    db.query(updateSql, values, (err) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }

      if (req.file && oldImagePath) {
        const fullPath = path.join(__dirname, "..", oldImagePath.replace(/^\//, ""));
        fs.unlink(fullPath, (fsErr) => {
          if (fsErr) {
            console.error("Error deleting old image:", fsErr);
          }
        });
      }

      res.status(200).json({ message: "Correspondent updated successfully" });
    });
  });
});


router.delete("/elected-wings/:id", (req, res) => {
  const { id } = req.params;

  const selectSql = "SELECT image_path FROM elected_wings WHERE id = ?";
  db.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Correspondent not found" });
    }

    const imagePath = result[0].image_path;

    const deleteSql = "DELETE FROM elected_wings WHERE id = ?";
    db.query(deleteSql, [id], (err) => {
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

      res.status(200).json({ message: "Correspondent deleted successfully" });
    });
  });
});

module.exports = router;
