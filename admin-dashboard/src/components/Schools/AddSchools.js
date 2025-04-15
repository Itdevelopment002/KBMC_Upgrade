import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddSchools = () => {
  const [formData, setFormData] = useState({
    heading: "",
    schoolName: "",
    address: "",
    medium: "",
    language_code: "",
  });

  const [imageData, setImageData] = useState({
    schoolPhoto: null,
  });

  const [errors, setErrors] = useState({
    heading: "",
    schoolName: "",
    address: "",
    medium: "",
    language_code: "",
  });
  const [isSubmittingSchool, setIsSubmittingSchool] = useState(false);
  const [isSubmittingImage, setIsSubmittingImage] = useState(false);

  const navigate = useNavigate();

  const handleSchoolChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
 
  const [imageError, setImageError] = useState("");
  const handleImageChange = (e) => {
    setImageError("");
    setImageData({
      schoolPhoto: e.target.files[0],
    });
  };

  const validateSchoolForm = () => {
    const newErrors = {};
    if (!formData.heading) newErrors.heading = "Heading is required.";
    if (!formData.schoolName)
      newErrors.schoolName = "School Name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.medium || formData.medium === "Select Medium")
      newErrors.medium = "Please select a medium.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSchoolSubmit = async (e) => {
    e.preventDefault();
    if (!validateSchoolForm()) return;
    setIsSubmittingSchool(true);

    try {
      await api.post("/schools", {
        heading: formData.heading,
        schoolName: formData.schoolName,
        address: formData.address,
        medium: formData.medium,
        language_code: formData.language_code,
      });
      setFormData({
        heading: "",  schoolName: "",  address: "", medium: "", language_code: "",
      });
      navigate("/schools");
    } catch (err) {
      console.error("Error submitting description:", err);
    } finally {
      setIsSubmittingSchool(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!imageData.schoolPhoto) {
      setImageError("Please upload a valid school photo.");
      return;
    }
    setIsSubmittingImage(true);
    try {
      const imageFormData = new FormData();
      imageFormData.append("schoolPhoto", imageData.schoolPhoto);

      await api.post("/school-images", imageFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageData({
        schoolPhoto: null,
      });
      setImageError("");
      navigate("/schools");
    } catch (error) {
      console.error("Failed to upload image", error);
    } finally {
      setIsSubmittingImage(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/home">City Profile</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/schools">Schools</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Schools
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Schools</h4>
                  </div>
                </div>
                <form onSubmit={handleSchoolSubmit}>
                <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        className={`form-control ${errors.language_code ? "is-invalid" : ""
                          }`}
                        name="language_code"
                        value={formData.language_code}
                        onChange={handleSchoolChange}
                      >
                        <option value="" disabled>Select Language</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                      </select>
                      {errors.language_code && (
                        <div className="invalid-feedback">{errors.language_code}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={`form-control form-control-md ${
                          errors.heading ? "is-invalid" : ""
                        }`}
                        name="heading"
                        value={formData.heading}
                        onChange={handleSchoolChange}
                      />
                      {errors.heading && (
                        <div className="invalid-feedback">{errors.heading}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      School Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={`form-control form-control-md ${
                          errors.schoolName ? "is-invalid" : ""
                        }`}
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleSchoolChange}
                      />
                      {errors.schoolName && (
                        <div className="invalid-feedback">
                          {errors.schoolName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Address <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <textarea
                        className={`form-control form-control-md ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        rows="4"
                        name="address"
                        value={formData.address}
                        onChange={handleSchoolChange}
                      ></textarea>
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Medium <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <select
                        className={`form-control form-control-md ${
                          errors.medium ? "is-invalid" : ""
                        }`}
                        name="medium"
                        value={formData.medium}
                        onChange={handleSchoolChange}
                      >
                        <option>Select Medium</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Urdu">Urdu</option>
                        <option value="English">English</option>
                        <option value="Semi English">Semi English</option>
                      </select>
                      {errors.medium && (
                        <div className="invalid-feedback">{errors.medium}</div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={isSubmittingSchool}
                  >
                    {isSubmittingSchool ? "Submitting..." : "Submit"}
                  </button>
                </form>
                <hr />
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add School Images</h4>
                  </div>
                </div>
                <form onSubmit={handleImageSubmit} className="pt-3">
                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Upload School Photos
                    </label>
                    <div className="col-md-4">
                      <div className="input-group">
                        <input
                          type="file"
                          className={`form-control form-control-md ${
                            imageError ? "is-invalid" : ""
                          }`}
                          name="schoolPhoto"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </div>

                      {imageError && (
                        <div className="text-danger mt-1">{imageError}</div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={isSubmittingImage}
                  >
                    {isSubmittingImage ? "Uploading..." : "Upload"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSchools;
