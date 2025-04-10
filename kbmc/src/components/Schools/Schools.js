import React, { useEffect, useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Schools = () => {
  const { i18n, t } = useTranslation();
  const [schools, setSchools] = useState([]);
  const [schoolPhotos, setSchoolPhotos] = useState([]);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [schoolPhotos]);

  const fetchSchools = async () => {
    try {
      const response = await api.get(`/schools?lang=${i18n.language}`);
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching school data");
    }
  };

  const fetchSchoolPhotos = async () => {
    try {
      const response = await api.get("/school-images");
      setSchoolPhotos(response.data);
    } catch (error) {
      console.error("Error fetching school images data");
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchSchoolPhotos();
  }, [i18n.language]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
  }, []);

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("schools-contents.schools")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("schools-contents.schools")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />

      <section className="service-style-four mt-5 pb-1">
        <div className="auto-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("srNo")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("schools-contents.schoolNames")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                     {t("address")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                     {t("schools-contents.medium")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr key={school.id}>
                    <td>{index + 1}</td>
                    <td>{school.schoolName}</td>
                    <td>{school.address}</td>
                    <td>{school.medium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="auto-container mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
          <div className="department-details-content">
            <div className="content-three">
              <div className="tabs-box">
                <div className="tab-btn-box">
                  <ul className="tab-btns tab-buttons clearfix">
                    <li className="tab-btn active-btn" data-tab="#tab-1">
                    {t("schools-contents.schoolsPhotoGallery")}
                    </li>
                  </ul>
                </div>
                <div className="tabs-content">
                  <div className="tab active-tab" id="tab-1">
                    <div className="content-box">
                      <div className="content-box department-section">
                        <div className="row">
                          {schoolPhotos.map((image, index) => (
                            <Link
                              to={`${baseURL}${image.image_path}`}
                              className="glightbox col-sm-2"
                              data-gallery="slider-images"
                            >
                              <img
                                src={`${baseURL}${image.image_path}`}
                                alt={`img${index + 1}`}
                                className="img-fluid"
                              />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schools;
