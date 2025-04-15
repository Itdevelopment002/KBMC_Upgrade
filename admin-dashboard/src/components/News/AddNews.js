import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
const AddNews = () => {
   const [formData, setFormData] = useState({
    newsDescription: "",
    
      language_code: "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    };
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ newsDescription: "", language_code:"" });
  const validateForm = () => {
    const newErrors = {};
    if (!formData.newsDescription) {
      newErrors.newsDescription = "News Description is required.";
    }
    if (!formData.language_code) {
      newErrors.language_code = "Language code is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await api.post(
        "/newsupdate",
        {
          description: formData.newsDescription,
          language_code: formData.language_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setErrors({ newsDescription: "" });

      if (response.status === 200) {
        navigate("/news");
      } else {
        console.error("Failed to add news");
      }
    } catch (error) {
      console.error("Error while adding news:", error);
    }

   
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
              <Link to="/news">News Update</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add News
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add News</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        name="language_code"
                        value={formData.language_code}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.language_code ? "is-invalid" : ""
                        }`}
                      >
                        <option value="">Select Language</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                      </select>
                      {errors.language_code && (
                        <div className="invalid-feedback">
                          {errors.language_code}
                        </div>
                      )}
                    </div>
                  </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        News Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.newsDescription ? "is-invalid" : ""
                          }`}
                          placeholder=""
                          value={formData.newsDescription}
                          onChange={(handleChange)}
                          name="newsDescription"
                        />
                        {errors.newsDescription && (
                          <small className="text-danger">
                            {errors.newsDescription}
                          </small>
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

export default AddNews;
