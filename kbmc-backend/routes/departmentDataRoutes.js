const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

// CREATE department-data
router.post("/department-datas", (req, res) => {
  const {
    public_disclosure_id,
    department_name,
    department_heading,
    heading_link,
    language_code,
  } = req.body;

  if (
    !public_disclosure_id ||
    !department_name ||
    !department_heading ||
    !heading_link ||
    !language_code
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO deptdata (public_disclosure_id, department_name, department_heading, heading_link, language_code) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      public_disclosure_id,
      department_name,
      department_heading,
      heading_link,
      language_code,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({
        message: "Department added successfully",
        departmentId: result.insertId,
      });
    }
  );
});

// GET all department-data with optional language_code filter
router.get("/department-datas", (req, res) => {
  const { language_code } = req.query;

  let sql = "SELECT * FROM deptdata";
  const params = [];

  if (language_code) {
    sql += " WHERE language_code = ?";
    params.push(language_code);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json(results);
  });
});

// GET department-data by ID
router.get("/department-datas/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM deptdata WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(result[0]);
  });
});

// UPDATE department-data by ID
router.put("/department-datas/:id", (req, res) => {
  const { id } = req.params;
  const { department_heading, heading_link } = req.body;

  if (!department_heading || !heading_link) {
    return res
      .status(400)
      .json({ message: "Department heading and link are required" });
  }

  const sql =
    "UPDATE deptdata SET department_heading = ?, heading_link = ? WHERE id = ?";
  db.query(sql, [department_heading, heading_link, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department updated successfully" });
  });
});

// DELETE department-data by ID
router.delete("/department-datas/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM deptdata WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json({ message: "Department deleted successfully" });
  });
});

module.exports = router;
