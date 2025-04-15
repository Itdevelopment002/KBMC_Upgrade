import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddDepartments = () => {
    const [formData, setFormData] = useState({
      departmentName: "",
      departmentHod: "",
      language_code: "",
    });
  
    const [errors, setErrors] = useState({
      departmentName: "",
      departmentHod: "",
      language_code: "",
    });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.departmentName.trim())
      newErrors.departmentName = "Department name is required.";
    if (!formData.departmentHod.trim())
      newErrors.departmentHod = "Name of HOD is required.";
    if (!formData.language_code) 
      newErrors.language_code = "Language is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setErrorMessage("");
    try {
      //eslint-disable-next-line
      const response = await api.post("/departments", {
        name: formData.departmentName,
        hod: formData.departmentHod,
        language_code: formData.language_code,
      });

     setFormData({ departmentName: "",
      departmentHod: "",
      language_code: "",});
      navigate("/departments");
    } catch (error) {
      console.error("Error adding department:", error);
      setErrorMessage("Failed to add department. Please try again.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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
              <Link to="/departments">Departments</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Departments
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Departments</h4>
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
                        Department Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.departmentName ? "is-invalid" : ""
                          }`}
                          placeholder="Enter department name"
                          value={formData.departmentName}
                          onChange={(handleChange)}
                          name="departmentName"
                        />
                        {errors.departmentName && (
                          <div className="invalid-feedback">
                            {errors.departmentName}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Name of HOD <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.departmentHod ? "is-invalid" : ""
                          }`}
                          placeholder="Enter HOD name"
                          value={formData.departmentHod}
                          onChange={(handleChange)}
                          name="departmentHod"
                        />
                        {errors.departmentHod && (
                          <div className="invalid-feedback">
                            {errors.departmentHod}
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

export default AddDepartments;
