import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddAwards = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    language_code: "",
  });

  const [errors, setErrors] = useState({
    heading: "",
    description: "",
    language_code: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.heading.trim()) {
      newErrors.heading = "Heading is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.language_code.trim()) {
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
    if (!validate()) {
      return;
    }

    try {
      const response = await api.post(
        "/awards",
        {
          heading: formData.heading,
          description: formData.description,
          language_code: formData.language_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Failed to add award");
      }

      // Reset form
      setFormData({
        heading: "",
        description: "",
        language_code: "",
      });
      setErrors({});
      navigate("/awards");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#.">About KBMC</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/awards">Awards</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Awards
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Awards</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2">
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

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="heading"
                        className={`form-control form-control-md ${
                          errors.heading ? "is-invalid" : ""
                        }`}
                        value={formData.heading}
                        onChange={handleChange}
                        placeholder="Enter award heading"
                      />
                      {errors.heading && (
                        <div className="invalid-feedback">
                          {errors.heading}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <textarea
                        name="description"
                        className={`form-control form-control-md ${
                          errors.description ? "is-invalid" : ""
                        }`}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a brief description"
                        rows="3"
                        style={{ resize: "none" }}
                      />
                      {errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
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
  );
};

export default AddAwards;
