import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddRoads = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    length: "",
    language_code: "",
  });
  const [errors, setErrors] = useState({
    heading: "",
    description: "",
    length: "",
    language_code: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,});
    setErrors({ ...errors, [name]: "" });
    };

    // if (errors[name]) {
    //   setErrors({
    //     ...errors,
    //     [name]: "",
    //   });
    // }

  const validateFields = () => {
    const newErrors = {};
    if (!formData.heading.trim()) newErrors.heading = "Heading is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.length.trim()) newErrors.length = "Length is required.";
    if (!formData.language_code) newErrors.language_code = "Language selection is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    // return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    try {
      await api.post("/roads", {
        heading: formData.heading,
        description: formData.description,
        length: formData.length,
        language_code: formData.language_code,
      });
      setFormData({
        heading: "",  description: "",  length: "", language_code: "",
      });
      navigate("/roads");
    } catch (err) {
      console.error("Error submitting description:", err);
    }
  };
  //   try {
  //     const response = await api.post("/roads", formData);
  //     navigate("/roads");
  //   } catch (error) {
  //     console.error(
  //       "Error adding road:",
  //       error.response ? error.response.data : error.message
  //     );
  //   }
  // };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">City Profile</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/roads">Roads</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Roads
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <h4 className="page-title">Add Roads</h4>
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
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.heading ? "is-invalid" : ""
                          }`}
                          name="heading"
                          value={formData.heading}
                          onChange={handleChange}
                        />
                        {errors.heading && (
                          <small className="text-danger">
                            {errors.heading}
                          </small>
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
                          className={`form-control ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                        />
                        {errors.description && (
                          <small className="text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Length <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.length ? "is-invalid" : ""
                          }`}
                          name="length"
                          value={formData.length}
                          onChange={handleChange}
                        />
                        {errors.length && (
                          <small className="text-danger">{errors.length}</small>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-5">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
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

export default AddRoads;
