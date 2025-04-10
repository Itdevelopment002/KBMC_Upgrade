import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Gardens = () => {
  const { i18n,t } = useTranslation();
  const [activeTab, setActiveTab] = useState("#tab-1");
  const [gardenData, setGardenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGardenData(i18n.language);
  }, [i18n.language]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const fetchGardenData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/gardens?lang=${i18n.language}`);
      setGardenData(response.data);
    } catch (error) {
      console.error("Error fetching garden data:", error);
      setError("Failed to fetch garden data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [activeTab, gardenData]);

  if (loading) return <div>{t("loading")}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${innerBanner})`,
          }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("gardens-contents.gardens")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("gardens-contents.gardens")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />

      <div className="auto-container mb-5 mt-5">
        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
          <div className="department-details-content">
            <div className="content-three">
              <div className="tabs-box">
                <div className="tab-btn-box">
                  <ul className="tab-btns tab-buttons clearfix">
                    {gardenData.map((garden, index) => (
                      <li
                        key={index}
                        className={`tab-btn ${
                          activeTab === `#tab-${index + 1}` ? "active-btn" : ""
                        }`}
                        data-tab={`#tab-${index + 1}`}
                        onClick={() => handleTabClick(`#tab-${index + 1}`)}
                      >
                        {garden.heading}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tabs-content">
                  {gardenData.map((garden, index) => (
                    <div
                      key={index}
                      className={`tab ${
                        activeTab === `#tab-${index + 1}` ? "active-tab" : ""
                      }`}
                      id={`tab-${index + 1}`}
                    >
                      <div className="content-box department-section">
                        <div className="row">
                          {activeTab === `#tab-${index + 1}` && garden.images
                            ? JSON.parse(garden.images).map((img, imgIndex) => (
                                <Link
                                  to={`${baseURL}${img}`}
                                  className="glightbox col-sm-2"
                                  data-gallery="garden-images"
                                >
                                  <img
                                    src={`${baseURL}${img}`}
                                    alt={`garden${index + 1}`}
                                    className="img-fluid"
                                  />
                                </Link>
                              ))
                            : activeTab === `#tab-${index + 1}` && (
                                <p className="col-sm-12">
                                  {t("gardens-contents.noData")}
                                </p>
                              )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gardens;
