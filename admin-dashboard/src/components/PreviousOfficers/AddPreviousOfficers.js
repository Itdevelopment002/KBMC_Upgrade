import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const AddPreviousOfficers = () => {
  const [formData, setFormData] = useState({
    officerName: "",
    startDate: "",
    endDate: "",
    officerImage: "",
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
    const { name, value, files } = e.target;

    if (name === "userfile") {
      setFormData({ ...formData, officerImage: files[0] });
      setErrors({ ...errors, officerImage: "" });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.officerName) newErrors.officerName = "Officer name is required.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.officerImage) newErrors.officerImage = "Officer image is required.";
    if (!formData.language_code) newErrors.language_code = "Language selection is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedStartDate = formatDate(formData.startDate);
    const formattedEndDate = formData.endDate ? formatDate(formData.endDate) : "";

    const submissionData = new FormData();
    submissionData.append("officerName", formData.officerName);
    submissionData.append("startDate", formattedStartDate);
    submissionData.append("endDate", formattedEndDate);
    submissionData.append("officerImage", formData.officerImage);
    submissionData.append("language_code", formData.language_code);

    try {
      await api.post("/chief-officers", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Clear form after successful submission
      setFormData({
        officerName: "",
        startDate: "",
        endDate: "",
        officerImage: "",
        language_code: "",
      });

      document.getElementById("userfile").value = null;
      navigate("/previous-officers");
    } catch (error) {
      console.error("Error adding officer", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#.">About KBMC</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/previous-officers">Previous Chief Officers</Link>
          </li>
          <li className="breadcrumb-item active">Add Officer</li>
        </ol>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Officer</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Select Language <span className="text-danger">*</span>
                    </label>
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
                      Officer Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-md"
                        placeholder="Enter Officer's Name"
                        value={formData.officerName}
                        onChange={handleChange}
                        name="officerName"
                      />
                      {errors.officerName && <div className="text-danger">{errors.officerName}</div>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon col-md-4">
                      <Flatpickr
                        className="flatpickr-input form-control form-control-md"
                        placeholder="Select Start Date"
                        value={formData.startDate}
                        onChange={(date) => setFormData({ ...formData, startDate: date[0] })}
                        options={{
                          dateFormat: "d-m-Y",
                          monthSelectorType: "dropdown",
                        }}
                      />
                      {errors.startDate && <div className="text-danger">{errors.startDate}</div>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">End Date</label>
                    <div className="cal-icon col-md-4">
                      <Flatpickr
                        className="flatpickr-input form-control form-control-md"
                        placeholder="Select End Date"
                        value={formData.endDate}
                        onChange={(date) => setFormData({ ...formData, endDate: date[0] })}
                        options={{
                          dateFormat: "d-m-Y",
                          monthSelectorType: "dropdown",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Upload Officer Image <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <div className="input-group">
                        <input
                          type="file"
                          id="userfile"
                          name="userfile"
                          className="form-control form-control-md"
                          onChange={handleChange}
                        />
                      </div>
                      {errors.officerImage && <div className="text-danger">{errors.officerImage}</div>}
                    </div>
                  </div>

                  <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreviousOfficers;
