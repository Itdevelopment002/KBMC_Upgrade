import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const AddPrivacyPolicy = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    language_code: "",
  });
  const [errors, setErrors] = useState({ heading: "", description: "", language_code: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.heading) {
      newErrors.heading = "Heading is required.";
    }
    if (!formData.description) {
      newErrors.description = "Description is required.";
    }
    if (!formData.language_code) {
      newErrors.language_code = "Language is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { heading, description, language_code } = formData;

    try {
      const response = await api.post("/privacy-policy", {
        heading,
        description,
        language_code,
      });

      if (response.status === 201) {
        setFormData({ heading: "", description: "", language_code: "" });
        setErrors({ heading: "", description: "", language_code: "" });
        navigate("/privacy-policy");
      } else {
        console.error("Failed to add privacy policy");
      }
    } catch (error) {
      console.error("Error adding privacy policy:", error);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Privacy Policy
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Privacy Policy</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Language <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <select
                          name="language_code"
                          className={`form-control ${
                            errors.language_code ? "is-invalid" : ""
                          }`}
                          value={formData.language_code}
                          onChange={handleChange}
                        >
                          <option value="">Select language</option>
                          <option value="en">English</option>
                          <option value="mr">Marathi</option>
                          {/* add more languages as needed */}
                        </select>
                        {errors.language_code && (
                          <small className="text-danger">{errors.language_code}</small>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.heading ? "is-invalid" : ""
                          }`}
                          placeholder="Enter heading"
                          name="heading"
                          value={formData.heading}
                          onChange={handleChange}
                        />
                        {errors.heading && (
                          <small className="text-danger">{errors.heading}</small>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <textarea
                          className={`form-control ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          placeholder="Enter description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows="2"
                        />
                        {errors.description && (
                          <small className="text-danger">{errors.description}</small>
                        )}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrivacyPolicy;
