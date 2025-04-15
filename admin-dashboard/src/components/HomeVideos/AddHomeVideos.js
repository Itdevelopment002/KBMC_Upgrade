import React, { useState } from "react";
import api from "../api";
// eslint-disable-next-line
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router-dom";

const AddHomeVideos = () => {
  const [formData, setFormData] = useState({
    description: "",
    publishDate: "",
    videoUrl: "",
    language_code: "",
  });

  const [errors, setErrors] = useState({
    description: "",
    publishDate: "",
    videoUrl: "",
    language_code: "",
  });

  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description) {
      newErrors.description = "Home Video Description is required.";
    }
    if (!formData.publishDate) {
      newErrors.publishDate = "Publish Date is required.";
    }
    if (!formData.videoUrl) {
      newErrors.videoUrl = "Video URL is required.";
    }
    if (!formData.language_code) {
      newErrors.language_code = "Language selection is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedDate = formatDate(formData.publishDate);

    const videoData = {
      description: formData.description,
      publishDate: formattedDate,
      videoUrl: formData.videoUrl,
      language_code: formData.language_code,
    };

    try {
      await api.post("/home-videos", videoData);
      toast.success("Video added successfully!");
      setFormData({
        description: "",
        publishDate: "",
        videoUrl: "",
        language_code: "",
      });
      setErrors({});
      navigate("/home-videos");
    } catch (error) {
      toast.error("Failed to add video. Please try again.");
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home-videos">Home Video</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Home Video
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Home Video</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        name="language_code"
                        value={formData.language_code}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.language_code ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                      </select>
                      {errors.language_code && (
                        <div className="invalid-feedback">
                          {errors.language_code}
                        </div>
                      )}
                    </div>
                  </div>
                    {/* Description */}
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Home Video Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="description"
                          className={`form-control ${errors.description ? "is-invalid" : ""}`}
                          value={formData.description}
                          onChange={handleChange}
                        />
                        {errors.description && (
                          <small className="text-danger">{errors.description}</small>
                        )}
                      </div>
                    </div>

                    {/* Publish Date */}
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Publish Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon col-md-4">
                        <Flatpickr
                          className={`form-control ${errors.publishDate ? "is-invalid" : ""}`}
                          value={formData.publishDate}
                          onChange={(date) => {
                            setFormData({ ...formData, publishDate: date[0] });
                            setErrors({ ...errors, publishDate: "" });
                          }}
                          options={{
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                          }}
                          placeholder="Select Publish Date"
                        />
                        {errors.publishDate && (
                          <small className="text-danger">{errors.publishDate}</small>
                        )}
                      </div>
                    </div>

                    {/* Video URL */}
                    <div className="form-group row">
                      <label className="col-form-label col-lg-3">
                        Upload URL <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          name="videoUrl"
                          className={`form-control ${errors.videoUrl ? "is-invalid" : ""}`}
                          value={formData.videoUrl}
                          onChange={handleChange}
                        />
                        {errors.videoUrl && (
                          <small className="text-danger">{errors.videoUrl}</small>
                        )}
                      </div>
                    </div>

                    {/* Language Selection */}
                   

                    {/* Submit */}
                    <div className="form-group row">
                      <div className="col-md-4 offset-md-3">
                        <input
                          type="submit"
                          className="btn btn-primary"
                          value="Submit"
                        />
                      </div>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHomeVideos;
