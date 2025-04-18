import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { BiSliderAlt } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { ImNewspaper } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { BiSolidWidget } from "react-icons/bi";
import { SiDeutschepost } from "react-icons/si";
import { IoPersonAdd } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";
import { BiMessageSquareError } from "react-icons/bi";
import { MdContactMail } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";

const Sidebar = ({ isOpen, closeSidebar, userDepartment }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeItem, setActiveItem] = useState("/");

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu((prevId) => (prevId === menuId ? null : menuId));
  };

  const handleItemClick = (path) => {
    setActiveItem(path);
    if (isOpen) {
      closeSidebar();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay opened" onClick={closeSidebar} />
      )}

      {/* Sidebar component */}
      <div className={`sidebar ${isOpen ? "opened" : ""}`}>
        <div className="sidebar-inner">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              {userDepartment === "Admin" && (
                <>
                  <li
                    className={activeItem === "/" ? "active" : ""}
                    onClick={() => handleItemClick("/")}
                  >
                    <Link to="/home">
                      <i className="fa fa-dashboard"></i>Main Menu
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/slider" ? "active" : ""}
                    onClick={() => handleItemClick("/slider")}
                  >
                    <Link to="/slider">
                      <i className="fa">
                        <BiSliderAlt />
                      </i>{" "}
                      Slider
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/services" ? "active" : ""}
                    onClick={() => handleItemClick("/services")}
                  >
                    <Link to="/services">
                      <i className="fa">
                        <MdMiscellaneousServices />
                      </i>{" "}
                      Services
                    </Link>
                  </li>
                </>
              )}
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("subservices")}>
                  <i className="fa">
                    <GrServices />
                  </i>{" "}
                  <span>Sub Services </span>{" "}
                  <span
                    className={`menu-arrow ${
                      openSubmenu === "subservices" ? "rotate" : ""
                    }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "subservices" ? "open" : ""}>
                  <li
                    className={
                      activeItem === "/public-disclosure" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/public-disclosure")}
                  >
                    <Link to="/public-disclosure">Public Disclosure</Link>
                  </li>
                  {userDepartment === "Admin" && (
                  <li
                    className={
                      activeItem === "/citizen-charter" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/citizen-charter")}
                  >
                    <Link to="/citizen-charter">Citizen Charter</Link>
                  </li>
                )}
                  {userDepartment === "Admin" && (
                  <li
                    className={activeItem === "/rts" ? "active" : ""}
                    onClick={() => handleItemClick("/rts")}
                  >
                    <Link to="/rts">Right to Service</Link>
                  </li>
                  )}
                  {userDepartment === "Admin" && (
                  <li
                    className={
                      activeItem === "/development-plan" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/development-plan")}
                  >
                    <Link
                     to="/development-plan">Development Plan</Link>
                  </li>
                  )}
                  {userDepartment === "Admin" && (
                  <li
                    className={activeItem === "/downloads" ? "active" : ""}
                    onClick={() => handleItemClick("/downloads")}
                  >
                    <Link to="/downloads" onClick={handleItemClick}>
                      Downloads
                    </Link>
                  </li>
                  )}
                  {userDepartment === "Admin" && (
                  <li
                    className={activeItem === "#" ? "active" : ""}
                    onClick={() => handleItemClick("#")}
                  >
                    <Link to="#" onClick={handleItemClick}>
                      City Map
                    </Link>
                  </li>
                  )}
                  {userDepartment === "Admin" && (
                  <li
                    className={activeItem === "/elected-wings" ? "active" : ""}
                    onClick={() => handleItemClick("/elected-wings")}
                  >
                    <Link to="/elected-wings" onClick={handleItemClick}>
                      Elected Wing
                    </Link>
                  </li>
                  )}
                  {userDepartment === "Admin" && (
                  <li
                    className={
                      activeItem === "/official-publications" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/official-publications")}
                  >
                    <Link to="/official-publications" onClick={handleItemClick}>
                      Official Publications
                    </Link>
                  </li>
                  )}
                </ul>
              </li>
              {userDepartment === "Admin" && (
                <>
                 <li
                    className={activeItem === "/ceodetails" ? "active" : ""}
                    onClick={() => handleItemClick("/ceodetails")}
                  >
                    <Link to="/ceodetails">
                    <i className="fa fa-user user"></i> Ceo Details
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/home-videos" ? "active" : ""}
                    onClick={() => handleItemClick("/home-videos")}
                  >
                    <Link to="/home-videos">
                      <i className="fa fa-video-camera camera"></i> Home Video
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/news" ? "active" : ""}
                    onClick={() => handleItemClick("/news")}
                  >
                    <Link to="/news">
                      <i className="fa">
                        <ImNewspaper />
                      </i>{" "}
                      News Update
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/tenders" ? "active" : ""}
                    onClick={() => handleItemClick("/tenders")}
                  >
                    <Link to="/tenders">
                      <i className="fa fa-calendar"></i> Tenders
                    </Link>
                  </li>
                  <li className="submenu">
                    <Link to="#." onClick={() => toggleSubmenu("gallery")}>
                      <i className="fa">
                        <GrGallery />
                      </i>{" "}
                      <span>Gallery </span>{" "}
                      <span
                        className={`menu-arrow ${
                          openSubmenu === "gallery" ? "rotate" : ""
                        }`}
                      ></span>
                    </Link>
                    <ul className={openSubmenu === "gallery" ? "open" : ""}>
                      <li
                        className={
                          activeItem === "/photo-gallery" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/photo-gallery")}
                      >
                        <Link to="/photo-gallery">Photo Gallery</Link>
                      </li>
                    </ul>
                  </li>
                  <li
                    className={
                      activeItem === "/gov-website-link" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/gov-website-link")}
                  >
                    <Link to="/gov-website-link">
                      <i className="fa ">
                        <FaLink />
                      </i>
                      Govt. Website Links
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/departments" ? "active" : ""}
                    onClick={() => handleItemClick("/departments")}
                  >
                    <Link to="/departments">
                      <i className="fa fa-calendar-check-o"></i>Departments
                    </Link>
                  </li>

                  
                  <li className="submenu">
                    <Link to="#." onClick={() => toggleSubmenu("aboutkbmc")}>
                      <i className="fa">
                        <BsFillMenuButtonWideFill />
                      </i>{" "}
                      <span> About KBMC</span>{" "}
                      <span
                        className={`menu-arrow ${
                          openSubmenu === "aboutkbmc" ? "rotate" : ""
                        }`}
                      ></span>
                    </Link>
                    <ul className={openSubmenu === "aboutkbmc" ? "open" : ""}>
                      <li
                        className={activeItem === "/history" ? "active" : ""}
                        onClick={() => handleItemClick("/history")}
                      >
                        <Link to="/history">History</Link>
                      </li>
                      <li
                        className={activeItem === "/wards" ? "active" : ""}
                        onClick={() => handleItemClick("/wards")}
                      >
                        <Link to="/wards">Wards</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/elected-wings" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/elected-wings")}
                      >
                        <Link to="/elected-wings">Elected Wings</Link>
                      </li>
                      <li
                        className={activeItem === "/functions" ? "active" : ""}
                        onClick={() => handleItemClick("/functions")}
                      >
                        <Link to="/functions">Functions</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/previous-officers" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/previous-officers")}
                      >
                        <Link to="/previous-officers">
                          Previous Chief officers of the council
                        </Link>
                      </li>
                      <li
                        className={
                          activeItem === "/previous-presidents" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/previous-presidents")}
                      >
                        <Link
                          to="/previous-presidents"
                          onClick={handleItemClick}
                        >
                          Previous Presidents
                        </Link>
                      </li>
                      <li
                        className={activeItem === "/awards" ? "active" : ""}
                        onClick={() => handleItemClick("/awards")}
                      >
                        <Link to="/awards" onClick={handleItemClick}>
                          Awards
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <Link to="#." onClick={() => toggleSubmenu("cityprofile")}>
                      <i className="">
                        <BiSolidWidget />
                      </i>{" "}
                      <span> City Profile</span>{" "}
                      <span
                        className={`menu-arrow ${
                          openSubmenu === "cityprofile" ? "rotate" : ""
                        }`}
                      ></span>
                    </Link>
                    <ul className={openSubmenu === "cityprofile" ? "open" : ""}>
                      <li
                        className={
                          activeItem === "/property-holder" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/property-holder")}
                      >
                        <Link to="/property-holder">Property Holder</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/muncipal-properties" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/muncipal-properties")}
                      >
                        <Link to="/muncipal-properties">
                          Muncipal Properties
                        </Link>
                      </li>
                      <li
                        className={activeItem === "/schools" ? "active" : ""}
                        onClick={() => handleItemClick("/schools")}
                      >
                        <Link to="/schools">Schools</Link>
                      </li>
                      <li
                        className={activeItem === "/garden" ? "active" : ""}
                        onClick={() => handleItemClick("/garden")}
                      >
                        <Link to="/garden">Gardens</Link>
                      </li>
                      <li
                        className={activeItem === "/electric" ? "active" : ""}
                        onClick={() => handleItemClick("/electric")}
                      >
                        <Link to="/electric">Electric</Link>
                      </li>
                      <li
                        className={activeItem === "/roads" ? "active" : ""}
                        onClick={() => handleItemClick("/roads")}
                      >
                        <Link to="/roads">Roads</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/tree-census" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/tree-census")}
                      >
                        <Link to="/tree-census">Tree Census</Link>
                      </li>
                      <li
                        className={activeItem === "/health" ? "active" : ""}
                        onClick={() => handleItemClick("/health")}
                      >
                        <Link to="/health">Health</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/ponds-talao" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/ponds-talao")}
                      >
                        <Link to="/ponds-talao">Ponds / Talao</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/fire-station" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/fire-station")}
                      >
                        <Link to="/fire-station">Fire Station</Link>
                      </li>
                      <li
                        className={
                          activeItem === "/hospital" ? "active" : ""
                        }
                        onClick={() => handleItemClick("/hospital")}
                      >
                        <Link to="/hospital" onClick={handleItemClick}>
                          Hospital
                        </Link>
                      </li>
                    </ul>
                  </li>
                
                  <li
                    className={activeItem === "/user" ? "active" : ""}
                    onClick={() => handleItemClick("/user")}
                  >
                    <Link to="/user">
                      <i className="fa">
                        <IoPersonAdd />
                      </i>
                      Add User
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/privacy-policy" ? "active" : ""}
                    onClick={() => handleItemClick("/privacy-policy")}
                  >
                    <Link to="/privacy-policy">
                      <i className="fa">
                        <MdPrivacyTip />
                      </i>
                      Privacy Policy
                    </Link>
                  </li>
                  <li
                    className={
                      activeItem === "/terms-conditions" ? "active" : ""
                    }
                    onClick={() => handleItemClick("/terms-conditions")}
                  >
                    <Link to="/terms-and-conditions">
                      <i className="fa">
                        <BiMessageSquareError />
                      </i>
                      Terms & Conditions
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/contact-us" ? "active" : ""}
                    onClick={() => handleItemClick("/contact-us")}
                  >
                    <Link to="/contact-us">
                      <i className="fa">
                        <MdContactMail />
                      </i>
                      Contact Us{" "}
                    </Link>
                  </li>
                  <li
                    className={activeItem === "/notification" ? "active" : ""}
                    onClick={() => handleItemClick("/notification")}
                  >
                    <Link to="/notifications">
                      <i className="fa">
                        <MdNotificationsActive />
                      </i>
                      Notifications{" "}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

