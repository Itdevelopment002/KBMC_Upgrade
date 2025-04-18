import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const AddMainMenu = () => {

  const [formData, setFormData] = useState({
      description: "",
      publishDate: "",
      videoUrl: "",
      language_code: "",
    });
  
    const [errors, setErrors] = useState({
      description: "",
      publishDate: "",
      videoUrl: "",
      language_code: "",
    });
  
  const initialMenuItems = [
    { mainMenu: "", mainMenuLink: "", subMenus: [], errors: {} },
  ];
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    menuItems.forEach((item, index) => {
      const itemErrors = {};
      if (!item.mainMenu.trim()) {
        itemErrors.mainMenu = "Main Menu name is required.";
      }
      if (!item.mainMenuLink.trim()) {
        itemErrors.mainMenuLink = "Main Menu link is required.";
      }
      item.subMenus.forEach((subMenu, subIndex) => {
        const subErrors = {};
        if (!subMenu.subMenu.trim()) {
          subErrors.subMenu = "Sub Menu name is required.";
        }
        if (!subMenu.subLink.trim()) {
          subErrors.subLink = "Sub Menu link is required.";
        }
        if (Object.keys(subErrors).length > 0) {
          itemErrors.subMenus = itemErrors.subMenus || [];
          itemErrors.subMenus[subIndex] = subErrors;
        }
      });
      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
  
    try {
      // Include the language_code in the request body
      const payload = {
        menuItems,
        language_code: formData.language_code, // Add language_code here
      };
  
      await api.post("/add-main-menu", payload); // Send the data along with language_code
      navigate("/"); // Redirect to home page or another route
      setMenuItems(initialMenuItems); // Reset menu items state
    } catch (err) {
      console.error(
        err.response ? err.response.data.message : "An error occurred."
      );
    }
  };
  

  const handleAddMoreSubMenu = (index) => {
    const errors = formErrors[index];
    if (errors?.mainMenuLink) {
      return;
    }

    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.push({ subMenu: "", subLink: "" });
    newMenuItems[index].mainMenuLink = "#";
    newMenuItems[index].isDisabled = true;

    setMenuItems(newMenuItems);
  };

  const handleInputChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
    const errors = { ...formErrors };
    if (errors[index]?.[field]) {
      delete errors[index][field];
      setFormErrors(errors);
    }
  };

  const handleSubMenuChange = (index, subIndex, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus[subIndex][field] = value;
    setMenuItems(newMenuItems);
    const errors = { ...formErrors };
    if (errors[index]?.subMenus?.[subIndex]?.[field]) {
      delete errors[index].subMenus[subIndex][field];
      setFormErrors(errors);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDeleteSubMenu = (index, subIndex) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.splice(subIndex, 1);
    setMenuItems(newMenuItems);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home">Main Menu</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Main Menu
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Main Menu</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-md-2">
                      Select Language <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-3">
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
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <div className="form-group row">
                          <label className="col-form-label col-md-2">
                            Main Menu <span className="text-danger">*</span>
                          </label>
                          <div className="col-md-3">
                            <input
                              type="text"
                              placeholder="Enter Main menu name"
                              className={`form-control ${
                                formErrors[index]?.mainMenu ? "is-invalid" : ""
                              }`}
                              value={item.mainMenu}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "mainMenu",
                                  e.target.value
                                )
                              }
                            />
                            {formErrors[index]?.mainMenu && (
                              <span className="text-danger">
                                {formErrors[index].mainMenu}
                              </span>
                            )}
                          </div>
                          <div className="col-md-3">
                            <input
                              type="text"
                              placeholder="Enter Main menu link"
                              className={`form-control ${
                                formErrors[index]?.mainMenuLink
                                  ? "is-invalid"
                                  : ""
                              }`}
                              value={item.mainMenuLink}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  "mainMenuLink",
                                  e.target.value
                                )
                              }
                              disabled={item.isDisabled}
                            />
                            {formErrors[index]?.mainMenuLink && (
                              <span className="text-danger">
                                {formErrors[index].mainMenuLink}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.subMenus.map((subMenu, subIndex) => (
                          <div className="form-group row" key={subIndex}>
                            <label className="col-form-label col-md-2">
                              Sub Menu <span className="text-danger">*</span>
                            </label>
                            <div className="col-md-3">
                              <input
                                type="text"
                                placeholder="Enter Sub menu name"
                                className={`form-control ${
                                  formErrors[index]?.subMenus[subIndex]?.subMenu
                                    ? "is-invalid"
                                    : ""
                                }`}
                                value={subMenu.subMenu}
                                onChange={(e) =>
                                  handleSubMenuChange(
                                    index,
                                    subIndex,
                                    "subMenu",
                                    e.target.value
                                  )
                                }
                              />
                              {formErrors[index]?.subMenus?.[subIndex]
                                ?.subMenu && (
                                <span className="text-danger">
                                  {formErrors[index].subMenus[subIndex].subMenu}
                                </span>
                              )}
                            </div>
                            <div className="col-md-3">
                              <input
                                type="text"
                                placeholder="Enter Sub menu link"
                                className={`form-control m-t-10 ${
                                  formErrors[index]?.subMenus[subIndex]?.subLink
                                    ? "is-invalid"
                                    : ""
                                }`}
                                value={subMenu.subLink}
                                onChange={(e) =>
                                  handleSubMenuChange(
                                    index,
                                    subIndex,
                                    "subLink",
                                    e.target.value
                                  )
                                }
                              />
                              {formErrors[index]?.subMenus?.[subIndex]
                                ?.subLink && (
                                <span className="text-danger">
                                  {formErrors[index].subMenus[subIndex].subLink}
                                </span>
                              )}
                            </div>
                            <div className="col-md-1">
                              <button
                                type="button"
                                className="btn btn-danger m-t-10"
                                onClick={() =>
                                  handleDeleteSubMenu(index, subIndex)
                                }
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}

                        <div className="form-group row">
                          <div className="col-md-2"></div>
                          <div className="col-md-4">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={() => handleAddMoreSubMenu(index)}
                              disabled={
                                !item.mainMenu.trim() ||
                                item.mainMenuLink !== "#"
                              }
                            >
                              <i className="fa fa-plus"></i> Add Sub menu
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <input
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMainMenu;
