const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); 

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

router.get("/citizen-charter", (req, res) => {
    const language_code = req.query.lang;
       let query;
       let params = [];
       if (language_code) {
         query = "SELECT * FROM `citizen-charter` WHERE language_code = ?";
         params.push(language_code);
       } else {
         query = "SELECT * FROM `citizen-charter`";
       }
   
     db.query(query, params, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json(results);
      });
  });
  
 router.post('/citizen-charter', upload.single('pdf'), (req, res) => {
    const { name, language_code } = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : null;
  
    console.log('Body:', req.body);
    console.log('File:', req.file);
  
    if (!name || !pdf || !language_code) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const sql = 'INSERT INTO `citizen-charter` (name, pdf, language_code) VALUES (?, ?, ?)';
  
    db.query(sql, [name, pdf, language_code], (err, result) => {
      if (err) {
        console.error('Error Inserting data in MySQL:', err);
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.status(200).json({ message: "Citizen Charter added successfully", id: result.insertId });
    });
  });
  
  router.put('/citizen-charter/:id', upload.single('pdf'), (req, res) => {
    const { id } = req.params;
    const { name, language_code } = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : null;
  
    const fields = [];
    const values = [];
  
    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (pdf) {
      fields.push('pdf = ?');
      values.push(pdf);
    }
    if (language_code) {
      fields.push('language_code = ?');
      values.push(language_code);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }
  
    const query = `UPDATE \`citizen-charter\` SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
  
    db.query(query, values, (err) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json({ message: "Citizen Charter updated successfully" });
    });
  });
  

router.delete('/citizen-charter/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM `citizen-charter` WHERE id = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting citizen charter:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Citizen charter deleted' });
    });
});

router.use('/uploads', express.static('uploads'));

module.exports = router;
