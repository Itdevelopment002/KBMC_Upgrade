const express = require("express");
const router = express.Router();
const db = require("../config/db");

const convertToMySQLDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

router.post("/home-videos", (req, res) => {
  const { description, publishDate, videoUrl, language_code } = req.body;

  const formattedDate = convertToMySQLDate(publishDate);

  if (!description || !publishDate || !videoUrl || !language_code) {
    return res
      .status(400)
      .json({
        message: "Description, publish date, and video URL are required",
      });
  }

  const sql =
    "INSERT INTO home_videos (description, publish_date, video_url, language_code) VALUES (?, ?, ? ,?)";
  db.query(sql, [description, formattedDate, videoUrl, language_code], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res
      .status(200)
      .json({ message: "Video added successfully", videoId: result.insertId });
  });
});

router.get("/home-videos", (req, res) => {
  const language = req.query.lang;
  let query;
  let params = [];
  if (language) {
    query = `SELECT * FROM home_videos WHERE language_code = ?`;
    params.push(language);
  } else {
    query = "SELECT * FROM home_videos";
  }

db.query(query, params, (err, results) => {
   if (err) {
     return res.status(500).json({ message: "Database error", error: err });
   }
   res.status(200).json(results);
 });
});

router.get("/home-videos/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM home_videos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json(result[0]);
  });
});

router.put("/home-videos/:id", (req, res) => {
  const { id } = req.params;
  const { description, publish_date, video_url, language_code } = req.body;

  const formattedDate = publish_date ? convertToMySQLDate(publish_date) : null;

  let updateSql = "UPDATE home_videos SET";
  const updateParams = [];

  const updateFields = [];

  if (description) {
    updateFields.push("description = ?");
    updateParams.push(description);
  }

  if (formattedDate) {
    updateFields.push("publish_date = ?");
    updateParams.push(formattedDate);
  }

  if (video_url) {
    updateFields.push("video_url = ?");
    updateParams.push(video_url);
  }

  if (language_code) {
    updateFields.push("language_code = ?");
    updateParams.push(language_code);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  updateSql += " " + updateFields.join(", ");
  updateSql += " WHERE id = ?";
  updateParams.push(id);

  db.query(updateSql, updateParams, (err) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(200).json({ message: "Video updated successfully" });
  });
});

router.delete("/home-videos/:id", (req, res) => {
  const { id } = req.params;

  const deleteSql = "DELETE FROM home_videos WHERE id = ?";
  db.query(deleteSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  });
});

module.exports = router;