import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router-dom";

const AddElectedWings = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correspondentName: "",
    wardNo: "",
    startDate: "",
    endDate: "",
    mobileNo: "",
    correspondentImage: null,
    language_code: "",
  });

  const [errors, setErrors] = useState({});

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, correspondentImage: file }));
    setErrors((prev) => ({ ...prev, correspondentImage: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.language_code) validationErrors.language_code = "Language is required";
    if (!formData.correspondentName) validationErrors.correspondentName = "Name is required";
    if (!formData.wardNo) validationErrors.wardNo = "Ward number is required";
    if (!formData.startDate) validationErrors.startDate = "Start date is required";
    if (!formData.endDate) validationErrors.endDate = "End date is required";
    if (!formData.mobileNo) validationErrors.mobileNo = "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobileNo)) validationErrors.mobileNo = "Enter a valid 10-digit mobile number";
    if (!formData.correspondentImage) validationErrors.correspondentImage = "Image is required";

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const payload = new FormData();
    payload.append("language_code", formData.language_code);
    payload.append("correspondentName", formData.correspondentName);
    payload.append("wardNo", formData.wardNo);
    payload.append("startDate", formatDate(formData.startDate));
    payload.append("endDate", formatDate(formData.endDate));
    payload.append("mobileNo", formData.mobileNo);
    payload.append("image", formData.correspondentImage);

    try {
      const response = await api.post("/elected-wings", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setFormData({
          correspondentName: "",
          wardNo: "",
          startDate: "",
          endDate: "",
          mobileNo: "",
          correspondentImage: null,
          language_code: "",
        });
        document.getElementById("userfile").value = null;
        navigate("/elected-wings");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#">About KBMC</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/elected-wings">Elected Wings</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Correspondent
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <h4 className="page-title">Add Correspondent</h4>
                <form onSubmit={handleSubmit}>
                  {/* Language */}
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
                    <label className="col-form-label col-md-2">Correspondent Name <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="correspondentName"
                        className={`form-control ${errors.correspondentName ? "is-invalid" : ""}`}
                        placeholder="Enter Correspondent's Name"
                        value={formData.correspondentName}
                        onChange={handleChange}
                      />
                      {errors.correspondentName && <small className="text-danger">{errors.correspondentName}</small>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Ward No. <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="wardNo"
                        className={`form-control ${errors.wardNo ? "is-invalid" : ""}`}
                        placeholder="Enter Ward Number"
                        value={formData.wardNo}
                        onChange={handleChange}
                      />
                      {errors.wardNo && <small className="text-danger">{errors.wardNo}</small>}
                    </div>
                  </div>
                 
                  <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        End Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon col-md-4">
                        <Flatpickr
                          id="endDatePicker"
                          className={`flatpickr-input form-control ${errors.endDate ? "is-invalid" : ""
                            }`}
                          placeholder="Select End Date"
                          value={formData.startDate}
                          onChange={(date) => {
                            setFormData((prev) => ({ ...prev, startDate: date[0] }));
                            setErrors((prev) => ({ ...prev, startDate: "" }));
                          }}
                          options={{
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                        {errors.endDate && (
                          <small className="text-danger">{errors.endDate}</small>
                        )}
                      </div>
                    </div>

                  <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        End Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon col-md-4">
                        <Flatpickr
                          id="endDatePicker"
                          className={`flatpickr-input form-control ${errors.endDate ? "is-invalid" : ""
                            }`}
                          placeholder="Select End Date"
                          value={formData.endDate}
                          onChange={(date) => {
                            setFormData((prev) => ({ ...prev, endDate: date[0] }));
                            setErrors((prev) => ({ ...prev, endDate: "" }));
                          }}
                          options={{
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                        {errors.endDate && (
                          <small className="text-danger">{errors.endDate}</small>
                        )}
                      </div>
                    </div>
                
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Mobile No. <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="mobileNo"
                        className={`form-control ${errors.mobileNo ? "is-invalid" : ""}`}
                        placeholder="Enter Mobile Number"
                        value={formData.mobileNo}
                        onChange={handleChange}
                      />
                      {errors.mobileNo && <small className="text-danger">{errors.mobileNo}</small>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Upload Correspondent Image <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <input
                        type="file"
                        id="userfile"
                        className={`form-control ${errors.correspondentImage ? "is-invalid" : ""}`}
                        onChange={handleFileChange}
                      />
                      {errors.correspondentImage && <small className="text-danger">{errors.correspondentImage}</small>}
                    </div>
                  </div>

                  <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddElectedWings;
