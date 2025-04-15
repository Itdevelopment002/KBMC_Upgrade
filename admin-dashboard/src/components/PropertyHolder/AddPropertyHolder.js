import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddPropertyHolder = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    property: "",
    language_code: "",
  });

  const [errors, setErrors] = useState({
    heading: "",
    description: "",
    property: "",
    language_code: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.heading) newErrors.heading = "Heading is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.property) newErrors.property = "Property is required";
    if (!formData.language_code) {
      newErrors.language_code = "Language selection is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    try {
      await api.post("/property_holder", {
        heading: formData.heading,
        description: formData.description,
        property: formData.property,
        language_code: formData.language_code,
      });
      setFormData({
        heading: "", description: "", property: "", language_code: "",
      });
      navigate("/property-holder");
    } catch (err) {
      console.error("Error submitting description:", err);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">City Profile</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/property-holder">Property Holder</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Property Holder
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Property Holder</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        className={`form-control ${errors.language_code ? "is-invalid" : ""}`}
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
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Heading <span className="text-danger">*</span>
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
                        {errors.heading && (
                          <div className="invalid-feedback">
                            {errors.heading}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder=""
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Property <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.property ? "is-invalid" : ""
                          }`}
                          name="property"
                          value={formData.property}
                          onChange={handleChange}
                          placeholder=""
                        />
                        {errors.property && (
                          <div className="invalid-feedback">
                            {errors.property}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPropertyHolder;
