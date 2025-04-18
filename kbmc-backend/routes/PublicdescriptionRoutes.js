const express = require("express");
const router = express.Router();
const db = require("../config/db.js");

router.post("/public_disclosure", (req, res) => {
  const {  department_name, language_code } = req.body;
  if (!department_name || !language_code) {
    return res
      .status(400)
      .json({ message: "All fields are required" });
  }
  const sql = `INSERT INTO public_disclosure (department_name, language_code) VALUES (?,?)`;
  db.query(sql, [department_name, language_code], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Department added successfully", id: result.insertId });
  });
});

router.get("/public_disclosure", (req, res) => {
  const { language_code } = req.query;
  let sql = "SELECT * FROM public_disclosure";

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


router.get("/public_disclosure/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM public_disclosure WHERE id = ?";
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
router.put("/public_disclosure/:id", (req, res) => {
  const { department_name, language_code,} = req.body;

  if (!department_name || !language_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    UPDATE public_disclosure 
    SET department_name = ?, language_code = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [ department_name.trim(), language_code.trim(), req.params.id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update Public Disclosure data" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Public Disclosure record not found" });
      }

      res.status(200).json({ message: "Department updated successfully" });
    }
  );
});

router.delete("/public_disclosure/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM public_disclosure WHERE id = ?";
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
