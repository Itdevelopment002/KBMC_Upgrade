import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Flatpickr from "react-flatpickr";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const PreviousOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOfficerId, setSelectedOfficerId] = useState(null);
  const [editData, setEditData] = useState({
    officer_name: "",
    start_date: "",
    end_date: "",
    image_path: "",
    language_code: "en",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const officersPerPage = 10;

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
   
  
    return () => {
      lightbox.destroy();
    };
  }, [officers]);

  const fetchOfficers = async () => {
    try {
      const response = await api.get("/chief-officers");
      setOfficers(response.data);
    } catch (error) {
      toast.error("Failed to fetch officers.");
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedOfficerId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    api
      .delete(`/chief-officers/${selectedOfficerId}`)
      .then(() => {
        setOfficers(
          officers.filter((officer) => officer.id !== selectedOfficerId)
        );
        setShowDeleteModal(false);
        toast.success("Officer deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting officer:", error);
        toast.error("Failed to delete officer.");
      });
  };

  const handleEditClick = (id) => {
    const officerToEdit = officers.find((officer) => officer.id === id);
    if (officerToEdit) {
      setEditData({
        officer_name: officerToEdit.officer_name,
        start_date: officerToEdit.start_date,
        end_date: officerToEdit.end_date,
        image_path: officerToEdit.image_path,
        language_code: officerToEdit.language_code || "en",
      });
      setSelectedOfficerId(id); // Important: needed for update
      setShowEditModal(true);   // <-- This line was missing!
    }
  };
  
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = editData.start_date
      ? formatDate(editData.start_date)
      : "";
    const formattedEndDate = editData.end_date
      ? formatDate(editData.end_date)
      : "";

    const formData = new FormData();
    formData.append("officer_name", editData.officer_name);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    formData.append("language_code", editData.language_code);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.put(`/chief-officers/${selectedOfficerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Officer updated successfully!");
      fetchOfficers();
    } catch (error) {
      toast.error("Failed to update officer.");
    } finally {
      setShowEditModal(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setEditData((prevData) => ({
        ...prevData,
        image_path: URL.createObjectURL(file),
      }));
    }
  };

  const indexOfLastOfficer = currentPage * officersPerPage;
  const indexOfFirstOfficer = indexOfLastOfficer - officersPerPage;
  const currentOfficers = officers.slice(
    indexOfFirstOfficer,
    indexOfLastOfficer
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#.">About KBMC</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Previous Chief officers of the council
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">
                        Previous Chief officers of the council
                      </h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                      <Link
                        to="/add-previous-officers"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Officer
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Officer Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Image</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOfficers.length > 0 ? (
                          currentOfficers.map((officer, index) => (
                            <tr key={officer.id}>
                              <td>
                                {index +
                                  1 +
                                  (currentPage - 1) * officersPerPage}
                              </td>
                              <td>{officer.officer_name}</td>
                              <td>
                                {new Date(officer.start_date)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td>
                                {officer.end_date &&
                                !isNaN(new Date(officer.end_date))
                                  ? new Date(officer.end_date)
                                      .toLocaleDateString("en-GB")
                                      .replace(/\//g, "-")
                                  : "Present"}
                              </td>
                              <td>
                                <Link
                                  to={`${baseURL}${officer.image_path}`}
                                  className="glightbox"
                                  data-gallery="chief-images"
                                >
                                  <img
                                    width="50px"
                                    src={`${baseURL}${officer.image_path}`}
                                    alt={`chief${index + 1}`}
                                  />
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm m-t-10"
                                  onClick={() => handleEditClick(officer.id)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-danger btn-sm m-t-10"
                                  onClick={() => handleDeleteClick(officer.id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                              No officer available
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

          <div className="mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(officers.length / officersPerPage) },
                (_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(officers.length / officersPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>

          {showEditModal && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Officer</h5>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleEditSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Select Language</label>
                        <select
  className="form-control"
  name="language_code"
  value={editData.language_code}
  onChange={handleFormChange}
>
  <option value="en">English</option>
  <option value="mr">Marathi</option>
</select>

                      </div>
                      <div className="mb-3">
                        <label htmlFor="offcierName" className="form-label">
                          Officer Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-md"
                          name="officer_name"
                          value={editData.officer_name}
                          onChange={handleFormChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">
                          Start Date
                        </label>
                        <Flatpickr
                          value={
                            editData.start_date
                              ? new Date(editData.start_date)
                              : ""
                          }
                          onChange={(date) =>
                            handleFormChange({
                              target: { name: "start_date", value: date[0] },
                            })
                          }
                          className="form-control"
                          options={{ dateFormat: "d-m-Y" }}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">
                          End Date
                        </label>
                        <Flatpickr
                          value={
                            editData.end_date ? new Date(editData.end_date) : ""
                          }
                          onChange={(date) =>
                            handleFormChange({
                              target: { name: "end_date", value: date[0] },
                            })
                          }
                          className="form-control"
                          options={{ dateFormat: "d-m-Y" }}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="uploadImage" className="form-label">
                          Upload Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImageChange}
                        />
                      </div>

                      <div className="mt-3">
                        {imageFile ? (
                          <img
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            width="100"
                          />
                        ) : (
                          editData.image_path && (
                            <img
                              src={`${baseURL}${editData.image_path}`}
                              alt="Current"
                              width="100"
                            />
                          )
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowEditModal(false)}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm"
                      onClick={handleEditSubmit}
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
                    <h5>Are you sure you want to delete this entry?</h5>
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
                      onClick={confirmDelete}
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
      <ToastContainer />
    </div>
  );
};

export default PreviousOfficers;
