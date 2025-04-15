import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const AddServices = () => {
  const [formData, setFormData] = useState({
    serviceHeading: "",
    serviceLink: "",
    mainIcon: null,
    hoverIcon: null,
    language_code: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.serviceHeading) newErrors.serviceHeading = "Service Heading is required.";
    if (!formData.serviceLink) newErrors.serviceLink = "Service Link is required.";
    if (!formData.mainIcon) newErrors.mainIcon = "Main Icon is required.";
    if (!formData.hoverIcon) newErrors.hoverIcon = "Hover Icon is required.";
    if (!formData.language_code) newErrors.language_code = "Language code is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, [fieldName]: file }));
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: "Please upload a valid image file." }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append('serviceHeading', formData.serviceHeading);
    payload.append('serviceLink', formData.serviceLink);
    payload.append('language_code', formData.language_code);
    payload.append('mainIcon', formData.mainIcon);
    payload.append('hoverIcon', formData.hoverIcon);

    try {
      const response = await api.post('/services', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message);

      setFormData({
        serviceHeading: "",
        serviceLink: "",
        mainIcon: null,
        hoverIcon: null,
        language_code: "",
      });

      document.getElementById('mainIconInput').value = '';
      document.getElementById('hoverIconInput').value = '';

      navigate('/services');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to add service. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/services">Services</Link></li>
          <li className="breadcrumb-item active">Add Services</li>
        </ol>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Services</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
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
                      {errors.language_code && (
                        <div className="invalid-feedback">{errors.language_code}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Service Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${errors.serviceHeading ? 'is-invalid' : ''}`}
                        name="serviceHeading"
                        value={formData.serviceHeading}
                        onChange={handleChange}
                      />
                      {errors.serviceHeading && (
                        <span className="text-danger">{errors.serviceHeading}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Service Link <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className={`form-control ${errors.serviceLink ? 'is-invalid' : ''}`}
                        name="serviceLink"
                        value={formData.serviceLink}
                        onChange={handleChange}
                      />
                      {errors.serviceLink && (
                        <span className="text-danger">{errors.serviceLink}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Main Icon <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="file"
                        id="mainIconInput"
                        name="mainIcon"
                        className={`form-control ${errors.mainIcon ? 'is-invalid' : ''}`}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'mainIcon')}
                      />
                      {errors.mainIcon && (
                        <span className="text-danger">{errors.mainIcon}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Hover Icon <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="file"
                        id="hoverIconInput"
                        name="hoverIcon"
                        className={`form-control ${errors.hoverIcon ? 'is-invalid' : ''}`}
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'hoverIcon')}
                      />
                      {errors.hoverIcon && (
                        <span className="text-danger">{errors.hoverIcon}</span>
                      )}
                    </div>
                  </div>

                  <input type="submit" className="btn btn-primary" value="Submit" />
                </form>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
