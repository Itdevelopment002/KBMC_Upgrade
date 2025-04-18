import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { baseURL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { FaFilePdf } from "react-icons/fa";

const DevelopmentPlan = () => {
  const [developmentData, setDevelopmentData] = useState([]);
  const [developmentPdfData, setDevelopmentPdfData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Declare delete modal state
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({
    description: "",
    language: "en",
    imageFile: null,
    pdfFile: null,
    name: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevelopmentData();
    fetchDevelopmentPdfData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [developmentPdfData]);

  const fetchDevelopmentData = async () => {
    try {
      const response = await api.get("/development-plan-desc");
      setDevelopmentData(response.data);
    } catch (error) {
      toast.error("Error fetching Development Plan Data!");
    }
  };

  const fetchDevelopmentPdfData = async () => {
    try {
      const response = await api.get("/development-plan-pdf");
      setDevelopmentPdfData(response.data);
    } catch (error) {
      toast.error("Error fetching Development Plan Pdf!");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, imageFile: file });
    }
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, pdfFile: file });
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "desc") {
        await api.delete(`/development-plan-desc/${id}`);
        setDevelopmentData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      } else if (type === "pdf") {
        await api.delete(`/development-plan-pdf/${id}`);
        setDevelopmentPdfData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      }
      toast.success(
        `${type === "desc"
          ? "Development Plan Description"
          : "Development Plan Pdf"
        } deleted successfully!`
      );
    } catch (error) {
      console.error(error);
      toast.error("Error deleting the entry!");
    }
    setShowDeleteModal(false); // Close the delete modal after deletion
  };

  const openEditModal = (item, type) => {
    setSelectedItem(item);
    setModalType(type);

    if (type === "desc") {
      setEditData({
        description: item.description,
        language: item.language || "en",
        imageFile: null,
        pdfFile: null,
        name: "",
      });
    } else if (type === "pdf") {
      setEditData({
        description: "",
        language: item.language || "en",
        imageFile: null,
        pdfFile: null,
        name: item.name,
      });
    }

    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
    setEditData({
      description: "",
      language: "en",
      imageFile: null,
      pdfFile: null,
      name: "",
    });
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();

    // In handleSaveChanges
if (modalType === "desc") {
  try {
    await api.put(`/development-plan-desc/${selectedItem.id}`, {
      description: editData.description,
      language_code: editData.language,
    });

    toast.success("Development Plan Description updated successfully!");
    fetchDevelopmentData(); // To refresh the data
  } catch (error) {
    console.error(error);
    toast.error("Error updating Development Plan Description!");
  }
}
 else if (modalType === "pdf") {
      formData.append("name", editData.name);
      formData.append("language_code", editData.language); 
      
      if (editData.imageFile) {
        formData.append("image", editData.imageFile);
      }
      if (editData.pdfFile) {
        formData.append("pdf", editData.pdfFile);
      }

      try {
        await api.put(`/development-plan-pdf/${selectedItem.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fetchDevelopmentPdfData();
        toast.success("Development Plan PDF updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Error updating Development Plan PDF!");
      }
    }

    closeModal();
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/home">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Development Plan
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Development Plan</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right">
                      <Link
                        to="/add-development-plan-description"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Description
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive m-t-10">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Description</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {developmentData.length > 0 ? (
                          developmentData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.description}</td>
                              <td>
                                <button
                                  onClick={() => openEditModal(item, "desc")}
                                  className="btn btn-success btn-sm m-t-10"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setModalType("desc");
                                    setShowDeleteModal(true); // Open delete modal
                                  }}
                                  className="btn btn-danger btn-sm m-t-10"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">
                              No Development plan data Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="row m-t-50">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Development Plan Pdf</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right">
                      <Link
                        to="/add-development-plan-pdf"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Pdf
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive m-t-10">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Description</th>
                          <th>Uploaded Image</th>
                          <th>Uploaded PDF</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {developmentPdfData.length > 0 ? (
                          developmentPdfData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                <Link
                                  to={`${baseURL}/${item.image_path}`}
                                  className="glightbox"
                                >
                                  <img
                                    width="100px"
                                    src={`${baseURL}/${item.image_path}`}
                                    alt={`pdf-image${index + 1}`}
                                  />
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`${baseURL}/${item.pdf_path}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FaFilePdf
                                    size={35}
                                    style={{ color: "red" }}
                                  />
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() => openEditModal(item, "pdf")}
                                  className="btn btn-success btn-sm m-t-10"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setModalType("pdf");
                                    setShowDeleteModal(true); // Open delete modal
                                  }}
                                  className="btn btn-danger btn-sm m-t-10"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">
                              No Development plan pdf Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
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
                    <h5 className="modal-title">
                      {modalType === "desc"
                        ? "Edit Description"
                        : "Edit Development Plan PDF"}
                    </h5>
                  </div>
                  <div className="modal-body">
                    {modalType === "desc" ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="language">Select Language</label>
                          <select
                            className="form-control form-control-md"
                            id="language"
                            value={editData.language}
                            onChange={(e) =>
                              setEditData({ ...editData, language: e.target.value })
                            }
                          >
                            <option value="en">English</option>
                            <option value="mr">Marathi</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="description">Description</label>
                          <textarea
                            className="form-control form-control-md"
                            id="description"
                            value={editData.description}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                description: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <label htmlFor="language">Select Language</label>
                          <select
                            className="form-control form-control-md"
                            id="language"
                            value={editData.language}
                            onChange={(e) =>
                              setEditData({ ...editData, language: e.target.value })
                            }
                          >
                            <option value="en">English</option>
                            <option value="mr">Marathi</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control form-control-md"
                            id="name"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="image">Upload Image</label>
                          <input
                            type="file"
                            className="form-control form-control-md"
                            id="image"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="pdf">Upload PDF</label>
                          <input
                            type="file"
                            className="form-control form-control-md"
                            id="pdf"
                            accept="application/pdf"
                            onChange={handlePDFChange}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          {showDeleteModal && (
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Confirmation</h5>
                  </div>
                  <div className="modal-body">
                    <p>
                      Are you sure you want to delete this{" "}
                      {modalType === "desc" ? "description" : "pdf"}?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleDelete(selectedItem.id, modalType)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevelopmentPlan;
