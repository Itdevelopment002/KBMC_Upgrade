import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddWards = () => {

  const [formData, setFormData] = useState({
    wardNo: "",
    wardName: "",
    language_code: "",
  });

  const [errors, setErrors] = useState({
    wardNo: "",
    wardName: "",
    language_code: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };


  const validateForm = () => {
    const validationErrors = {};

    if (!formData.wardNo) {
      validationErrors.wardNo = "Ward No. is required.";
    }

    if (!formData.wardName) {
      validationErrors.wardName = "Ward Name is required.";
    }

    if (!formData.language_code) {
      validationErrors.language_code = "Language selection is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await api.post("/wards", {
        ward_no: formData.wardNo,
        ward_name: formData.wardName,
        language_code: formData.language_code,
      });

      setFormData({ wardNo: "", wardName: "", language_code: "" });
      navigate("/wards");
    } catch (err) {
      console.error("Error adding ward:", err);
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
              <Link to="/wards">Wards</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Wards
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Wards</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
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
                      <label className="col-form-label col-md-2">
                        Ward No. <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${errors.wardNo ? "is-invalid" : ""}`}
                          placeholder="Enter Ward No."
                          name="wardNo"
                          value={formData.wardNo}
                          onChange={handleChange}
                        />

                        {errors.wardNo && (
                          <div className="invalid-feedback">
                            {errors.wardNo}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row mt-3">
                      <label className="col-form-label col-md-2">
                        Ward Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${errors.wardName ? "is-invalid" : ""}`}
                          placeholder="Enter Ward Name"
                          name="wardName"
                          value={formData.wardName}
                          onChange={handleChange}
                        />

                        {errors.wardName && (
                          <div className="invalid-feedback">
                            {errors.wardName}
                          </div>
                        )}
                      </div>
                    </div>

                    <input
                      type="submit"
                      className="btn btn-primary btn-sm mt-3"
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

export default AddWards;
