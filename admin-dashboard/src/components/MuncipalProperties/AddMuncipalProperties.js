import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const AddMuncipalProperties = () => {
  const [formData, setFormData] = useState({
    heading: "",
    name: "",
    propertyType: "",
    address: "",
    language_code: "",
  });

  const [errors, setErrors] = useState({
    heading: "",
    name: "",
    propertyType: "",
    address: "",
    language_code: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    // if (!formData.heading) newErrors.heading = "Heading is required.";
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.propertyType) newErrors.propertyType = "Property type is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.language_code) { newErrors.language_code = "Language selection is required.";
   

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
  }

    try {
      const response = await api.post("/muncipal", formData);
      navigate("/muncipal-properties");
    } catch (error) {
      console.error(
        "Error adding municipal property:",
        error.response?.data || error.message
      );
      alert("Failed to add municipal property. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <Link to="/muncipal-properties">Municipal Properties</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Municipal Properties
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Municipal Properties</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
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
                        onChange={handleChange}
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
                  {/* Heading Field */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Heading 
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={`form-control  ${
                          errors.heading ? "is-invalid" : ""
                        }`}
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                        placeholder=""
                      />
                     
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className={`form-control  ${
                          errors.name ? "is-invalid" : ""
                        }`}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=""
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Shops / Sabhagruha etc.{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        name="propertyType"
                        className={`form-control  ${
                          errors.propertyType ? "is-invalid" : ""
                        }`}
                        value={formData.propertyType}
                        onChange={handleChange}
                        placeholder=""
                      />
                      {errors.propertyType && (
                        <div className="invalid-feedback">
                          {errors.propertyType}
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
                        className={`form-control  ${
                          errors.address ? "is-invalid" : ""
                        }`}
                        rows="4"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                      {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                      )}
                    </div>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary"
                    value={isSubmitting ? "Submitting..." : "Submit"}
                    disabled={isSubmitting}
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

export default AddMuncipalProperties;
