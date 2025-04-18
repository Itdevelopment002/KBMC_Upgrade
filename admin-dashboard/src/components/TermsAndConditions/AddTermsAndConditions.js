import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const AddTermsAndConditions = () => {
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.heading) newErrors.heading = "Heading is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.language_code) newErrors.language_code = "Language selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post(
        "/terms-and-conditions",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        // reset form
        setFormData({ heading: "", description: "", language_code: "" });
        navigate("/terms-and-conditions");
      }
    } catch (error) {
      console.error("Error adding terms & conditions:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          <li className="breadcrumb-item active">Add Terms & Conditions</li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <h4 className="page-title">Add Terms & Conditions</h4>
                <form onSubmit={handleSubmit}>
                  {/* Heading */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="heading"
                        className={`form-control ${errors.heading ? "is-invalid" : ""}`}
                        placeholder="Enter heading"
                        value={formData.heading}
                        onChange={handleChange}
                      />
                      {errors.heading && <small className="text-danger">{errors.heading}</small>}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <textarea
                        name="description"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        placeholder="Enter description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {errors.description && <small className="text-danger">{errors.description}</small>}
                    </div>
                  </div>

                  {/* Language */}
                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        name="language_code"
                        className={`form-control ${errors.language_code ? "is-invalid" : ""}`}
                        value={formData.language_code}
                        onChange={handleChange}
                      >
                        <option value="">Select language</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                        {/* add more as needed */}
                      </select>
                      {errors.language_code && (
                        <small className="text-danger">{errors.language_code}</small>
                      )}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="form-group row">
                    <div className="col-md-6 text-right">
                      <input
                        type="submit"
                        className="btn btn-primary btn-sm"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTermsAndConditions;
