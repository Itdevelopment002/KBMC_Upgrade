import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import { Link } from "react-router-dom";

const PrivateHospital = () => {
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    hospital_name: '',
    division: '',
    principal_doctor: '',
    address: '',
    phone_no: '',
    mobile_no: '',
    beds: '',
    facility: '',
    language_code: 'en',
  });  
  const [errors, setErrors] = useState({
    id: null,
    hospital_name: '',
    division: '',
    principal_doctor: '',
    address: '',
    phone_no: '',
    mobile_no: '',
    beds: '',
    facility: '',
    language_code: 'en',
  });
  const [hospitals, setHospitals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await api.get("/private-hospital");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleDeleteModalOpen = (hospital) => {
    setSelectedHospital(hospital);
    document.getElementById("deleteModal").classList.add("show");
    document.getElementById("deleteModal").style.display = "block";
  };

  const handleEditModalOpen = (hospital) => {
    setEditData({
      id: hospital.id,
      hospital_name: hospital.hospital_name || '',
      division: hospital.division || '',
      principal_doctor: hospital.principal_doctor || '',
      address: hospital.address || '',
      phone_no: hospital.phone_no || '',
      mobile_no: hospital.mobile_no || '',
      beds: hospital.beds || '',
      facility: hospital.facility || '',
      language_code: hospital.language_code || '',
    });
    document.getElementById("editModal").classList.add("show");
    document.getElementById("editModal").style.display = "block";
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/private-hospital/${selectedHospital.id}`);
      toast.success(`Hospital deleted successfully.`);
      fetchHospitals();
    } catch (error) {
      console.error("Error deleting hospital:", error);
      toast.error("Failed to delete hospital.");
    } finally {
      closeModal("deleteModal");
      setSelectedHospital(null);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/private-hospital/${editData.id}`, {
        hospital_name: editData.hospital_name,
        division: editData.division,
        principal_doctor: editData.principal_doctor,
        address: editData.address,
        phone_no: editData.phone_no,
        mobile_no: editData.mobile_no,
        beds: editData.beds,
        facility: editData.facility,
        language_code: editData.language_code,
      })      
      toast.success(`Hospital updated successfully.`);
      fetchHospitals();
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast.error("Failed to update hospital.");
    } finally {
      closeModal("editModal");
    }
  };

  const handleCloseModal = (modalId) => {
    document.getElementById(modalId).classList.remove("show");
    document.getElementById(modalId).style.display = "none";
  };

  const closeModal = (modalId) => {
    handleCloseModal(modalId);
  };

  const indexOfLastHospital = currentPage * itemsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - itemsPerPage;
  const currentHospitals = hospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Hospital
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Hospital</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right">
                      <Link
                        to="/add-hospital"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Hospital
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive mt-4 datatable">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Hospital Name</th>
                          <th>Division</th>
                          <th>Principal Doctor</th>
                          <th>Address</th>
                          <th>Phone</th>
                          <th>Mobile</th>
                          <th>Beds</th>
                          <th>Facilities</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentHospitals.map((hospital, index) => (
                          <tr key={hospital.id}>
                            <td>{indexOfFirstHospital + index + 1}</td>
                            <td>{hospital.hospital_name}</td>
                            <td>{hospital.division}</td>
                            <td>{hospital.principal_doctor}</td>
                            <td>{hospital.address}</td>
                            <td>{hospital.phone_no}</td>
                            <td>{hospital.mobile_no}</td>
                            <td>{hospital.beds}</td>
                            <td>{hospital.facility}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleEditModalOpen(hospital)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDeleteModalOpen(hospital)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from(
                        { length: Math.ceil(hospitals.length / itemsPerPage) },
                        (_, i) => (
                          <li
                            className={`page-item ${
                              currentPage === i + 1 ? "active" : ""
                            }`}
                            key={i}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        )
                      )}
                      <li
                        className={`page-item ${
                          currentPage ===
                          Math.ceil(hospitals.length / itemsPerPage)
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="deleteModal"
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="deleteModalLabel"
            aria-hidden="true"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h5>Are you sure you want to delete this hospital?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleCloseModal("deleteModal")}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="editModal"
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            style={{
              overflowY: "auto",
              maxHeight: "100vh",
              scrollbarWidth: "none",
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered"
              style={{ marginTop: "5vh" }}
            >
              {" "}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit Hospital
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
                    <div className="form-group">
                      <label>Hospital Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.hospital_name}
                        onChange={(e) => setEditData({ ...editData, hospital_name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Division</label>
                      <select
                        className="form-control"
                        value={editData.division}
                        onChange={(e) => setEditData({ ...editData, division: e.target.value })}
                        required
                      >
                        <option value="" disabled>
                          Select Division
                        </option>{" "}
                        <option value="West">West</option>
                        <option value="East">East</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Principal Doctor Specialty</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.principal_doctor}
                        onChange={(e) => setEditData({ ...editData, principal_doctor: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.address}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.phone_no}
                        onChange={(e) => setEditData({ ...editData, phone_no: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.mobile}
                        onChange={(e) => setEditData({ ...editData, mobile_no: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Number of Beds</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editData.beds}
                        onChange={(e) => setEditData({ ...editData, beds: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Facilities</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editData.facility}
                        onChange={(e) => setEditData({ ...editData, facility: e.target.value })}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleEditSubmit}
                  >
                    Save changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleCloseModal("editModal")}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateHospital;
