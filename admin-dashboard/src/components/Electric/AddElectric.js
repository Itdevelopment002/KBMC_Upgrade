import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddElectric = () => {
  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    mobileNo: "",
    vendorName: "",
    language_code: "",
  });
  const [errors, setErrors] = useState({
    heading: "",
    description: "",
    mobileNo: "",
    vendorName: "",
    language_code: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value,});
    setErrors({ ...errors, [name]: "" });
    // if (errors[name]) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [name]: "",
    //   }));
    // }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.heading.trim()) {
      newErrors.heading = "Heading is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Please enter a valid 10-digit mobile number.";
    }
    if (!formData.vendorName.trim()) {
      newErrors.vendorName = "Vendor name is required.";
    }
    if (!formData.language_code) {
      newErrors.language_code = "Language selection is required.";
    }
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setErrors({});
    setLoading(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await api.post("/electric", {
        heading: formData.heading,
        description: formData.description,
        mobileNo: formData.mobileNo,
        vendorName: formData.vendorName,
        language_code: formData.language_code,
      });
      setFormData({ heading: "", description: "", mobileNo: "", vendorName: "", language_code: "",
      });
      navigate("/electric");
    } catch (err) {
      console.error("Error submitting description:", err);
    } finally {
      setLoading(false);
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
              <Link to="/electric">Electric</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Electric
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Electric</h4>
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
                          placeholder="Enter heading"
                        />
                        {errors.heading && (
                          <div className="text-danger mt-1">
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
                          placeholder="Enter description"
                        />
                        {errors.description && (
                          <div className="text-danger mt-1">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Mobile No. <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.mobileNo ? "is-invalid" : ""
                          }`}
                          name="mobileNo"
                          value={formData.mobileNo}
                          onChange={handleChange}
                          placeholder="Enter mobile number"
                        />
                        {errors.mobileNo && (
                          <div className="text-danger mt-1">
                            {errors.mobileNo}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Vendor Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          className={`form-control  ${
                            errors.vendorName ? "is-invalid" : ""
                          }`}
                          name="vendorName"
                          value={formData.vendorName}
                          onChange={handleChange}
                          placeholder="Enter vendor name"
                        />
                        {errors.vendorName && (
                          <div className="text-danger mt-1">
                            {errors.vendorName}
                          </div>
                        )}
                      </div>
                    </div>

                    {errors.global && (
                      <div className="text-danger mb-3">{errors.global}</div>
                    )}

                    <div className="form-group row">
                      <div className="col-md-5">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md"
                          disabled={loading}
                        >
                          {loading ? "Submitting..." : "Submit"}
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

export default AddElectric;
