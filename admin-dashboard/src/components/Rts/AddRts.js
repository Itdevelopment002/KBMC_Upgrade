import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddRts = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [language_code, setLanguageCode] = useState("");

  const [errors, setErrors] = useState({ heading: "", description: "", language_code: "",});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!heading) {
      newErrors.heading = "Heading is required.";
    }
    if (!description) {
      newErrors.description = "Description is required.";
    }
    if (!language_code) {
      newErrors.language_code = "Language selection is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await api.post("/righttoservices", {
        heading,
        description,
        language_code,
      });      
      setHeading("");
      setDescription("");
      setLanguageCode("");      
      setErrors({ heading: "", description: "", language_code: ""});
      navigate("/rts");
    } catch (error) {
      console.error("Error adding Right to Service:", error);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/rts">Right to Service</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Right to Service
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Right to Service</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                  <label className="col-form-label col-md-3">
                    Language <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-4">
                  <select
                  className={`form-control form-control-md ${
                    errors.language_code ? "is-invalid" : ""
                  }`}
                  value={language_code}
                  onChange={(e) => {
                    setLanguageCode(e.target.value);
                    setErrors((prev) => ({ ...prev, language_code: "" }));
                  }}
                >
                  <option value="" disabled>Select Language</option>
                  <option value="en">English</option>
                  <option value="mr">Marathi</option>
                </select>

                    {errors.language_code && (
                      <small className="text-danger">{errors.language_code}</small>
                    )}
                  </div></div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${
                            errors.heading ? "is-invalid" : ""
                          }`}
                          placeholder=""
                          value={heading}
                          onChange={(e) => {
                            setHeading(e.target.value);
                            if (errors.heading) {
                              setErrors({ ...errors, heading: "" });
                            }
                          }}
                        />
                        {errors.heading && (
                          <small className="text-danger">
                            {errors.heading}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          placeholder=""
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                            if (errors.description) {
                              setErrors({ ...errors, description: "" });
                            }
                          }}
                        />
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
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

export default AddRts;
