import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CeoDetails = () => {
    const [errors, setErrors] = useState({});
    const [ceoDetails, setCeoDetails] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCeo, setSelectedCeo] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [language, setLanguage] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    
    const itemsPerPage = 10;

    useEffect(() => {
        fetchCeoDetails();
    }, []);

    const fetchCeoDetails = async () => {
        try {
            const response = await api.get("/ceodetails");
            setCeoDetails(response.data);
        } catch (error) {
            console.error("Error fetching CEO details:", error);
        }
    };

    const totalPages = Math.ceil(ceoDetails.length / itemsPerPage);
    const currentPageData = ceoDetails.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleDelete = (ceo) => {
        setSelectedCeo(ceo);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/ceodetails/${selectedCeo.id}`);
            setCeoDetails(ceoDetails.filter((ceo) => ceo.id !== selectedCeo.id));
            toast.success("CEO details deleted successfully!");
            setShowDeleteModal(false);
            setSelectedCeo(null);
        } catch (error) {
            console.error("Error deleting CEO details:", error);
            toast.error("Error deleting CEO details!");
        }
    };

    const handleEdit = (ceo) => {
        setSelectedCeo(ceo);
        setLanguage(ceo.language_code || "");
        setShowEditModal(true);
        setSelectedFile(null);
    };
    
    const handleSaveEdit = async () => {
        if (!selectedCeo.ceo_name?.trim() || !selectedCeo.description?.trim() || !language) {
            toast.error("All fields including language must be filled.");
            return;
        }
    
        const formData = new FormData();
        formData.append("ceo_name", selectedCeo.ceo_name);
        formData.append("description", selectedCeo.description);
        formData.append("language_code", language);
    
        if (selectedFile) {
            formData.append("image", selectedFile);
        }
    
        try {
            // Ensure the API call is awaited
            await api.put(`/ceodetails/${selectedCeo.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Re-fetch after update
            fetchCeoDetails();
            toast.success("CEO details updated successfully!");
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating CEO details:", error.response || error);
            toast.error("Error updating CEO details!");
        }
    };
    
    // const handleSaveEdit = async () => {
    //     const formData = new FormData();

    //     if (selectedCeo.ceo_name) {
    //         formData.append("ceoName", selectedCeo.ceo_name);
    //     }

    //     if (selectedCeo.description) {
    //         formData.append("description", selectedCeo.description);
    //     }

    //     if (selectedFile) {
    //         formData.append("image", selectedFile);
    //     }
    //     if (language) {
    //         formData.append("language_code", language);
    //     }        
        

    //     try {
    //         await api.put(`/ceodetails/${selectedCeo.id}`, formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });
    //         fetchCeoDetails();
    //         toast.success("CEO details updated successfully!");
    //         setShowEditModal(false);
    //     } catch (error) {
    //         console.error("Error updating CEO details:", error);
    //         toast.error("Error updating CEO details!");
    //     }

    // };
    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };    
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        if (e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setSelectedCeo({ ...selectedCeo, image: imageUrl });
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                CEO Details
                            </li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">CEO Details</h4>
                                        </div>
                                        <div className="col-sm-8 col-9 text-right m-b-20">
                                            <Link
                                                to="/add-ceodetails"
                                                className="btn btn-primary btn-rounded float-right"
                                            >
                                                <i className="fa fa-plus"></i> Add CEO Details
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Sr. No.</th>
                                                    <th>Image</th>
                                                    <th>CEO Name</th>
                                                    <th>Description</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPageData.map((ceo, index) => (
                                                    <tr key={ceo.id}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>
                                                            <img
                                                                width="100px"
                                                                src={`${baseURL}${ceo.image_path}`}
                                                                alt={`CEO ${index + 1}`}
                                                            />
                                                        </td>
                                                        <td>{ceo.ceo_name}</td>
                                                        <td>{ceo.description}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success btn-sm m-t-10"
                                                                onClick={() => handleEdit(ceo)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm m-t-10"
                                                                onClick={() => handleDelete(ceo)}
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

                    {/* Pagination */}
                    <div>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Delete Modal */}
                    {showDeleteModal && (
                        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body text-center">
                                        <h5>Are you sure you want to delete these CEO details?</h5>
                                    </div>
                                    <div className="modal-footer text-center">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-secondary btn-lg"
                                            data-dismiss="modal"
                                            onClick={() => setShowDeleteModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-danger btn-lg"
                                            onClick={confirmDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {showEditModal && (
                        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit CEO Details</h5>
                                        <button
                                            type="button"
                                            className="close"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-3">Language <span className="text-danger">*</span></label>
                                        <div className="col-md-9">
                                            <select className="form-control" value={language} onChange={handleLanguageChange}>
                                                <option value="">Select Language</option>
                                                <option value="en">English</option>
                                                <option value="mr">Marathi</option>
                                                {/* Add more language codes as needed */}
                                            </select>
                                        </div>
                                    </div>

                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">CEO Name <span className="text-danger">*</span></label>
                                            <div className="col-md-9">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={selectedCeo?.ceo_name || ""}
                                                    onChange={(e) => setSelectedCeo({ ...selectedCeo, ceo_name: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Description <span className="text-danger">*</span></label>
                                            <div className="col-md-9">
                                                <textarea
                                                    className="form-control"
                                                    value={selectedCeo?.description || ""}
                                                    onChange={(e) => setSelectedCeo({ ...selectedCeo, description: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Upload Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            {selectedCeo?.image ? (
                                                <img
                                                    src={selectedCeo.image}
                                                    alt="Selected"
                                                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                                                    className="img-thumbnail"
                                                />
                                            ) : selectedCeo?.image_path ? (
                                                <img
                                                    src={`${baseURL}${selectedCeo.image_path}`}
                                                    alt="Current"
                                                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                                                    className="img-thumbnail"
                                                />
                                            ) : (
                                                <p>No image available</p> // Fallback text if neither image nor image_path is available
                                            )}
                                        </div>

                                        {/* <div className="form-group">
                                            <label>CEO Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={selectedCeo?.ceo_name || ""}
                                                onChange={(e) =>
                                                    setSelectedCeo({
                                                        ...selectedCeo,
                                                        ceo_name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                className="form-control"
                                                rows="4"
                                                value={selectedCeo?.description || ""}
                                                onChange={(e) =>
                                                    setSelectedCeo({
                                                        ...selectedCeo,
                                                        description: e.target.value,
                                                    })
                                                }
                                            />
                                        </div> */}
                                        {/* <div className="form-group">
                                            <label>Upload Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="text-center mt-3">
                                            {selectedCeo?.image ? (
                                                <img
                                                    src={selectedCeo.image}
                                                    alt="Selected"
                                                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                                                    className="img-thumbnail"
                                                />
                                            ) : (
                                                <img
                                                    src={`${baseURL}${selectedCeo?.image_path}`}
                                                    alt="Current"
                                                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                                                    className="img-thumbnail"
                                                />
                                            )}
                                        </div> */}
                                    </div>
                                    <div className="modal-footer sticky-bottom bg-white pt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleSaveEdit}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default CeoDetails;