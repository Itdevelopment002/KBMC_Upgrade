import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const AddPreviousPresidents = () => {
  const [formData, setFormData] = useState({
    presidentName: "",
    startDate: "",
    endDate: "",
    presidentImage: null,
    language_code: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      presidentImage: e.target.files[0],
    }));
    setErrors((prev) => ({ ...prev, presidentImage: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.presidentName) newErrors.presidentName = "President's Name is required.";
    if (!formData.startDate) newErrors.startDate = "Start Date is required.";
    if (!formData.presidentImage) newErrors.presidentImage = "President Image is required.";
    if (!formData.language_code) newErrors.language_code = "Language is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submissionData = new FormData();
    submissionData.append("presidentName", formData.presidentName);
    submissionData.append("startDate", formatDate(formData.startDate));
    submissionData.append("endDate", formData.endDate ? formatDate(formData.endDate) : "");
    submissionData.append("presidentImage", formData.presidentImage);
    submissionData.append("language_code", formData.language_code);

    try {
      await api.post("/presidents", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form
      setFormData({
        presidentName: "",
        startDate: "",
        endDate: "",
        presidentImage: null,
        language_code: "",
      });
      document.getElementById("userfile").value = null;
      navigate("/previous-presidents");
    } catch (error) {
      console.error(error.response?.data?.message || "Error adding president");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="#">About KBMC</Link></li>
          <li className="breadcrumb-item"><Link to="/previous-presidents">Previous Presidents</Link></li>
          <li className="breadcrumb-item active">Add President</li>
        </ol>

        <div className="card-box">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label className="col-md-2">Select Language <span className="text-danger">*</span></label>
              <div className="col-md-4">
                <select
                  name="language_code"
                  value={formData.language_code}
                  onChange={handleChange}
                  className={`form-control ${errors.language_code ? "is-invalid" : ""}`}
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="mr">Marathi</option>
                </select>
                {errors.language_code && <div className="invalid-feedback">{errors.language_code}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-2">President Name <span className="text-danger">*</span></label>
              <div className="col-md-4">
                <input
                  type="text"
                  name="presidentName"
                  value={formData.presidentName}
                  onChange={handleChange}
                  className={`form-control ${errors.presidentName ? "is-invalid" : ""}`}
                  placeholder="Enter President's Name"
                />
                {errors.presidentName && <div className="invalid-feedback">{errors.presidentName}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-2">Start Date <span className="text-danger">*</span></label>
              <div className="col-md-4">
                <Flatpickr
                 className="flatpickr-input form-control form-control-md"
                  value={formData.startDate}
                   placeholder="Select Start Date"
                  onChange={(date) => setFormData({ ...formData, startDate: date[0] })}
                  options={{
                    dateFormat: "d-m-Y",
                    monthSelectorType: "dropdown",
                  }}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-2">End Date</label>
              <div className="col-md-4">
                <Flatpickr
                 placeholder="Select Start Date"
                   className="flatpickr-input form-control form-control-md"
                  value={formData.endDate}
                  onChange={(date) => setFormData({ ...formData, endDate: date[0] })}
                  options={{ dateFormat: "d-m-Y",monthSelectorType:"dropdown" }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-md-2">Upload President Image <span className="text-danger">*</span></label>
              <div className="col-md-4">
                <input
                  type="file"
                  name="userfile"
                  id="userfile"
                  className={`form-control ${errors.presidentImage ? "is-invalid" : ""}`}
                  onChange={handleFileChange}
                />
                {errors.presidentImage && <div className="invalid-feedback">{errors.presidentImage}</div>}
              </div>
            </div>

            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPreviousPresidents;
