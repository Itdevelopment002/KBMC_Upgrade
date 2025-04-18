import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TermsAndConditions = () => {
  const [conditionsData, setConditionsData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Always fetch all entries
  useEffect(() => {
    fetchConditions();
  }, []);

  const fetchConditions = async () => {
    try {
      const response = await api.get("/terms-and-conditions");
      setConditionsData(response.data);
    } catch (error) {
      toast.error("Failed to fetch condition data!");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/terms-and-conditions/${selectedCondition.id}`);
      setConditionsData(prev =>
        prev.filter(item => item.id !== selectedCondition.id)
      );
      setShowDeleteModal(false);
      toast.success("Terms and Conditions deleted successfully!");
    } catch {
      toast.error("Failed to delete the terms and conditions!");
    }
  };

  const handleEditSave = async () => {
    try {
      await api.put(`/terms-and-conditions/${selectedCondition.id}`, {
        heading: selectedCondition.heading,
        description: selectedCondition.description,
        language_code: selectedCondition.language_code,
      });
      setConditionsData(prev =>
        prev.map(item =>
          item.id === selectedCondition.id ? selectedCondition : item
        )
      );
      setShowEditModal(false);
      toast.success("Terms and Conditions updated successfully!");
    } catch {
      toast.error("Failed to update the terms and conditions!");
    }
  };

  const handleEditClick = condition => {
    setSelectedCondition({ ...condition });
    setShowEditModal(true);
  };

  const handleDeleteClick = condition => {
    setSelectedCondition(condition);
    setShowDeleteModal(true);
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setSelectedCondition(prev => ({ ...prev, [name]: value }));
  };

  // Pagination slice
  const currentPageData = conditionsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(conditionsData.length / itemsPerPage);

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">
              Terms & Conditions
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Terms & Conditions</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-right m-b-20">
                    <Link
                      to="/add-terms-and-conditions"
                      className="btn btn-primary btn-rounded float-right"
                    >
                      <i className="fa fa-plus" /> Add Terms & Conditions
                    </Link>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Heading</th>
                        <th>Description</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData.length > 0 ? (
                        currentPageData.map((cond, idx) => (
                          <tr key={cond.id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + idx + 1}
                            </td>
                            <td>{cond.heading}</td>
                            <td>{cond.description}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleEditClick(cond)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDeleteClick(cond)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No terms & conditions available.
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

        {/* Pagination */}
        <div className="mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  currentPage === i + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Terms & Conditions</h5>
                </div>
                <div className="modal-body">
                  <form>
                    {/* Language selector inside modal */}
                    <div className="mb-3">
                      <label className="form-label">Select Language</label>
                      <select
                        className="form-control"
                        name="language_code"
                        value={selectedCondition.language_code || ""}
                        onChange={handleEditChange}
                      >
                        <option value="en">English</option>
                        <option value="mr">Marathi</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Heading</label>
                      <input
                        type="text"
                        className="form-control form-control-md"
                        name="heading"
                        value={selectedCondition.heading || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control form-control-md"
                        name="description"
                        value={selectedCondition.description || ""}
                        onChange={handleEditChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleEditSave}
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
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <h5>Are you sure you want to delete this condition?</h5>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
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
    </div>
  );
};

export default TermsAndConditions;
