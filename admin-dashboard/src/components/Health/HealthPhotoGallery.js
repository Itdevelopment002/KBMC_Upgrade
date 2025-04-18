import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "react-router-dom";

const HealthPhotoGallery = () => {
  const [editData, setEditData] = useState({
    heading: "",
    language_code: "",
  });  
  const [errors, setErrors] = useState({ 
    heading: "", img: "", language_code: "" });
  const [photos, setPhotos] = useState([]);
  const [languageCode, setLanguageCode] = useState("");
  const [heading, setHeading] = useState("");
  const [img, setImg] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [photos]);

  const fetchPhotos = async () => {
    try {
      const response = await api.get("/health_photo_gallery");
      setPhotos(response.data);
    } catch (error) {
      toast.error("Error fetching photos.");
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { heading: "", img: "", language_code: "" };
  
    if (!heading.trim()) {
      newErrors.heading = "Heading is required.";
      valid = false;
    }
  
    if (!img) {
      newErrors.img = "Image is required.";
      valid = false;
    }
  
    if (!editData.language_code) {  // Use editData.language_code for validation
      newErrors.language_code = "Language selection is required.";
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const handleEditPhoto = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("heading", editData.heading); // Use editData here
      formData.append("language_code", editData.language_code); // Make sure this is included
      
      if (img) {
        formData.append("image", img); // Only append if a new image is selected
      }
  
      try {
        const response = await api.put(
          `/health_photo_gallery/${selectedPhoto.id}`, 
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        // Update photos state after successful update
        setPhotos(
          photos.map((photo) =>
            photo.id === selectedPhoto.id ? response.data : photo
          )
        );
        fetchPhotos(); // Refresh photo list
        toast.success("Photo updated successfully!");
        setShowEditModal(false); // Close the modal after successful update
      } catch (error) {
        console.error("Error updating photo:", error);
        toast.error("Error updating photo.");
      } finally {
        // Reset errors and close the modal
        setErrors({ heading: "", img: "", language_code: "" });
      }
    }
  };
  
  
  const handleAddPhoto = async () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("image", img);
      
      try {
        const response = await api.post("/health_photo_gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPhotos([...photos, response.data]);
        resetForm();
        setShowAddModal(false);
        fetchPhotos();
        toast.success("Photo added successfully!");
      } catch (error) {
        console.error(
          "Error details:",
          error.response ? error.response.data : error.message
        );
        toast.error("Error adding photo.");
      }
      setErrors({ heading: "", img: "", language_code: "" });
    }
  };

  

  const handleDeletePhoto = async (id) => {
    try {
      await api.delete(`/health_photo_gallery/${id}`);
      setPhotos(photos.filter((photo) => photo.id !== id));
      fetchPhotos();
      toast.success("Photo deleted successfully!");
    } catch (error) {
      toast.error("Error deleting photo.");
    } finally {
      setShowDeleteModal(false);
    }
  };
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setEditData((prevData) => ({
      ...prevData,
      language_code: selectedLanguage,
    }));
  };
  
  const resetForm = () => {
    setHeading("");
    setImg(null);
    setLanguageCode("");
    setErrors({ heading: "", img: "", language_code: "" });
  };

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card-box">
            <div className="card-block">
              <div className="row">
                <div className="col-sm-4 col-3">
                  <h4 className="page-title">Photo Gallery</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn-primary btn-rounded float-right"
                  >
                    <i className="fa fa-plus"></i> Add New
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered m-b-0">
                  <thead>
                    <tr>
                      <th width="10%">Sr. No.</th>
                      <th>Heading</th>
                      <th>Image</th>
                      <th width="15%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {photos.map((photo, index) => (
                      <tr key={photo.id}>
                        <td>{index + 1}</td>
                        <td>{photo.heading}</td>
                        <td>
                          <Link
                            to={`${baseURL}${photo.img_path}`}
                            className="glightbox"
                            data-gallery="slider-images"
                          >
                            <img
                              width="100px"
                              src={`${baseURL}${photo.img_path}`}
                              alt={`photo${index + 1}`}
                            />
                          </Link>
                        </td>
                          <td>
                            <button
                              onClick={() => {
                                setSelectedPhoto(photo);
                                setEditData({
                                  heading: photo.heading,
                                  language_code: photo.language_code,
                                });
                                setShowEditModal(true);
                              }}
                              className="btn btn-success btn-sm m-t-10"
                            >
                              Edit
                            </button>                          
                          <button
                            onClick={() => {
                              setShowDeleteModal(true);
                              setSelectedPhoto(photo);
                            }}
                            className="btn btn-danger btn-sm m-t-10"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addPhotoModalLabel">
                  Add Photo
                </h5>
              </div>
              <div className="modal-body">
                <form>
                <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                        <select
                          className={`form-control ${errors.language_code ? "is-invalid" : ""}`}
                          value={editData.language_code}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              language_code: e.target.value,
                            }))
                          }
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
                  <div className="mb-3">
                    <label htmlFor="formBasicHeading" className="form-label">
                      Heading
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.heading ? "is-invalid" : ""
                      }`}
                      id="formBasicHeading"
                      value={heading}
                      onChange={(e) => {
                        setHeading(e.target.value);
                        setErrors((prev) => ({ ...prev, heading: "" }));
                      }}
                    />
                    {errors.heading && (
                      <div className="invalid-feedback">{errors.heading}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formBasicImage" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className={`form-control ${
                        errors.img ? "is-invalid" : ""
                      }`}
                      id="formBasicImage"
                      onChange={(e) => {
                        setImg(e.target.files[0]);
                        setErrors((prev) => ({ ...prev, img: "" }));
                      }}
                    />
                    {errors.img && (
                      <div className="invalid-feedback">{errors.img}</div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleAddPhoto}
                >
                  Add Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editPhotoModalLabel">
                  Edit Photo
                </h5>
              </div>
              <div className="modal-body">
                <form>
                <div className="form-group row">
                  <label className="col-form-label col-md-3">
                    Select Language <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-4">
                    <select
                      className={`form-control ${errors.language_code ? "is-invalid" : ""
                        }`}
                      name="language_code"
                      value={editData.language_code}
                      onChange={(e) =>
                        setEditData({ ...editData, language_code: e.target.value })
                      } 
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
                  {/* Heading Field */}
                  <div className="mb-3">
                    <label htmlFor="editPhotoHeading" className="form-label">
                      Heading
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editPhotoHeading"
                      value={selectedPhoto?.heading || ""}
                      onChange={(e) =>
                        setSelectedPhoto((prev) => ({
                          ...prev,
                          heading: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="editPhotoImage" className="form-label">
                      Image (optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="editPhotoImage"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setImg(file);
                        setImagePreview(URL.createObjectURL(file));
                      }}
                    />
                    <div style={{ marginTop: "10px" }}>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <img
                          src={`${baseURL}${selectedPhoto?.img_path}`}
                          alt="Uploaded"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={handleEditPhoto}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <h5>Are you sure you want to delete this photo?</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeletePhoto(selectedPhoto.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default HealthPhotoGallery;
