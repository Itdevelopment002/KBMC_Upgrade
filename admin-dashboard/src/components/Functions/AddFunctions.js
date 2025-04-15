import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const AddFunctions = () => {
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
    if (!formData.language_code) {
      newErrors.language_code = "Language is required.";
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
      const response = await api.post("/functions", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setFormData({
          heading: "",
          description: "",
          language_code: "",
        });
      
        navigate("/functions");
      }
    } catch (error) {
      console.error("Error adding function:", error);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#.">About KBMC</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/functions">Functions</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Functions
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Functions</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">Select Language <span className="text-danger">*</span></label>
                      <div className="col-md-4">
                        <select
                          className={`form-control ${errors.language_code ? "is-invalid" : ""}`}
                          name="language_code"
                          value={formData.language_code}
                          onChange={handleChange}
                        >
                          <option value="">Select Language</option>
                          <option value="en">English</option>
                          <option value="mr">Marathi</option>
                        </select>
                        {errors.language_code && <div className="invalid-feedback">{errors.language_code}</div>}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${errors.heading ? "is-invalid" : ""}`}
                          name="heading"
                          value={formData.heading}
                          onChange={handleChange}
                          placeholder="Enter heading"
                        />
                        {errors.heading && (
                          <div className="invalid-feedback">{errors.heading}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <div className="input-group mb-3">
                          <textarea
                            className={`form-control form-control-md ${errors.description ? "is-invalid" : ""
                              }`}
                            placeholder="Enter description"
                            value={formData.description}
                            onChange={(handleChange)}
                            rows="2"
                            name="description"
                          />
                          {errors.description && (
                            <div className="invalid-feedback">
                              {errors.description}
                            </div>
                          )}
                        </div>
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

export default AddFunctions;
