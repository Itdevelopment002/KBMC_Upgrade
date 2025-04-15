const multer = require('multer');
const path = require('path');
const fs = require('fs');

const db = require('../config/db.js');
 const express = require("express");
 const router = express.Router();

 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Create CEO details
router.post('/ceodetails', upload.single('image'), (req, res) => {
    // Check if image is uploaded
    if (!req.file) {
        return res
        .status(400)
        .json({ message: 'No image uploaded' });
    }

    // Construct file path for image
    const filePath = `uploads/${req.file.filename}`;

    // Get other required fields
    const ceo_name = req.body.ceoName;
    const description = req.body.description;
    const language_code = req.body.languageCode;    

    if (!ceo_name || !description || !language_code) {
        return res.status(400).json({ message: 'CEO name, description, and language code are required' });
    }

    const sql =`INSERT INTO ceodetails (ceo_name, description, image_path, language_code) VALUES (?, ?, ?, ?)`;
    db.query(sql, [ceo_name, description, filePath, language_code], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }
        res.status(200).json({
            message: 'CEO details added successfully',
            imageUrl: filePath,
            ceoName: ceo_name,
            description,
            languageCode: language_code
        });
    });
});
 
// Get CEO details by language
router.get("/ceodetails", (req, res) => {
    const language = req.query.lang;
    let query;
    let params = [];
    if (language) {
      query = `SELECT * FROM ceodetails WHERE language_code = ?`;
      params.push(language);
    } else {
      query = "SELECT * FROM ceodetails";
    }

  db.query(query, params, (err, results) => {
     if (err) {
       return res.status(500).json({ message: "Database error", error: err });
     }
     res.status(200).json(results);
   });
});

// Get single CEO detail
router.get('/ceodetails/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM ceodetails WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'CEO details not found' });
        }

        const ceoDetail = result[0];
        res.status(200).json({
            id: ceoDetail.id,
            ceo_name: ceoDetail.ceo_name,
            description: ceoDetail.description,
            image_path: ceoDetail.image_path,
            language_code: ceoDetail.language_code,
            created_at: ceoDetail.created_at
        });
    });
});

// Update CEO details
router.put('/ceodetails/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { ceoName, description, languageCode } = req.body;

    let updateSql = 'UPDATE ceodetails SET';
    const updateParams = [];

    if (ceoName) {
        updateSql += ' ceo_name = ?';
        updateParams.push(ceoName);
    }

    if (description) {
        updateSql += updateParams.length > 0 ? ', description = ?' : ' description = ?';
        updateParams.push(description);
    }

    if (languageCode) {
        updateSql += updateParams.length > 0 ? ', language_code = ?' : ' language_code = ?';
        updateParams.push(languageCode);
    }

    if (req.file) {
        const newFilePath = `/uploads/${req.file.filename}`;
        updateSql += updateParams.length > 0 ? ', image_path = ?' : ' image_path = ?';
        updateParams.push(newFilePath);
    }

    if (updateParams.length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
    }

    updateSql += ' WHERE id = ?';
    updateParams.push(id);

    const selectSql = 'SELECT image_path FROM ceodetails WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'CEO details not found' });
        }

        const oldFilePath = result[0].image_path;

        db.query(updateSql, updateParams, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (req.file && oldFilePath) {
                fs.unlink(path.join(__dirname, '..', oldFilePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting old file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'CEO details updated successfully' });
        });
    });
});

// Delete CEO details
router.delete('/ceodetails/:id', (req, res) => {
    const { id } = req.params;

    const selectSql = 'SELECT image_path FROM ceodetails WHERE id = ?';
    db.query(selectSql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'CEO details not found' });
        }

        const filePath = result[0].image_path;

        const deleteSql = 'DELETE FROM ceodetails WHERE id = ?';
        db.query(deleteSql, [id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Database error', error: err });
            }

            if (filePath) {
                fs.unlink(path.join(__dirname, '..', filePath), (fsErr) => {
                    if (fsErr) {
                        console.error('Error deleting file:', fsErr);
                    }
                });
            }

            res.status(200).json({ message: 'CEO details deleted successfully' });
        });
    });
});

module.exports = router;

