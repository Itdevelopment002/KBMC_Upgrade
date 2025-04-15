import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddPondsAndTalao = () => {
  const [pondsName, setPondsName] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ language_code: "", });
  const [errorMessage, setErrorMessage] = useState({ pondsName: "", language_code: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let errors = {};
  
    if (!formData.language_code) {
      errors.language_code = "Language is required.";
    }
  
    if (!pondsName.trim()) {
      errors.pondsName = "Talao name is required.";
    }
  
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    } else {
      setErrorMessage({});
    }
  
    try {
      setLoading(true);
      const response = await api.post(
        "/ponds-talao",
        { name: pondsName, language_code: formData.language_code },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        navigate("/ponds-talao");
      } else {
        setErrorMessage({ form: "Failed to add ponds. Please try again." });
      }
    } catch (error) {
      console.error("Error while adding ponds:", error);
      setErrorMessage({ form: "Error submitting the form. Please try again." });
    } finally {
      setLoading(false);
    }
  
    setPondsName("");
  };  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "language_code") {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errorMessage.language_code) {
        setErrorMessage((prev) => ({ ...prev, language_code: "" }));
      }
    } else {
      setPondsName(value);
      if (errorMessage.pondsName) {
        setErrorMessage((prev) => ({ ...prev, pondsName: "" }));
      }
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
            <Link to="/ponds-talao">Ponds and Talao</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Ponds and Talao
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <h4 className="page-title">Add Ponds and Talao</h4>
                <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        className={`form-control ${errorMessage.language_code ? "is-invalid" : ""
                          }`}
                        name="language_code"
                        value={formData.language_code}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>Select Language</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                      </select>
                      {errorMessage.language_code && (
                        <div className="invalid-feedback">{errorMessage.language_code}</div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Talao Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                    <input
                      type="text"
                      className={`form-control ${errorMessage.pondsName ? "is-invalid" : ""}`}
                      name="pondsName"
                      placeholder="Enter Talao Name"
                      value={pondsName}
                      onChange={handleInputChange}
                      aria-label="Talao Name"
                    />
                    {errorMessage.pondsName && (
                      <small className="text-danger">{errorMessage.pondsName}</small>
                    )}

                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-5">
                      <button
                        type="submit"
                        className="btn btn-primary"
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
  );
};

export default AddPondsAndTalao;
