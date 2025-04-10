import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCeoDetails = () => {
  const [ceoName, setCeoName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!ceoName.trim()) {
      newErrors.ceoName = "CEO name is required.";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!selectedFile) {
      newErrors.selectedFile = "Please select a CEO image to upload.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("ceoName", ceoName);
    formData.append("description", description);

    try {
      await api.post("/ceodetails", formData, {
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
      });
      
      setCeoName("");
      setDescription("");
      setSelectedFile(null);
      document.getElementById("image").value = "";
      toast.success("CEO details added successfully!");
      navigate("/ceodetails");
    } catch (error) {
      console.error("Error adding CEO details:", error);
      toast.error("Error adding CEO details. Please try again.");
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
              <Link to="/ceo-details">CEO Details</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add CEO Details
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add CEO Details</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        CEO Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-lg ${
                            errors.ceoName ? "is-invalid" : ""
                          }`}
                          placeholder="Enter CEO name"
                          value={ceoName}
                          onChange={(e) => {
                            setCeoName(e.target.value);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              ceoName: "",
                            }));
                          }}
                        />
                        {errors.ceoName && (
                          <div className="invalid-feedback">
                            {errors.ceoName}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <textarea
                          className={`form-control form-control-lg ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          placeholder="Enter CEO description"
                          value={description}
                          rows="4"
                          onChange={(e) => {
                            setDescription(e.target.value);
                            setErrors((prevErrors) => ({
                              ...prevErrors,
                              description: "",
                            }));
                          }}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Upload CEO Image <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            id="image"
                            name="image"
                            className={`form-control col-md-12 col-xs-12 userfile ${
                              errors.selectedFile ? "is-invalid" : ""
                            }`}
                            onChange={(e) => {
                              handleFileChange(e);
                              if (e.target.files[0]) {
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  selectedFile: "",
                                }));
                              }
                            }}
                          />
                          {errors.selectedFile && (
                            <div className="invalid-feedback">
                              {errors.selectedFile}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Add CEO Details"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default AddCeoDetails;