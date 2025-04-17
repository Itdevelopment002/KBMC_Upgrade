import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import pdficon from "../../assets/images/icons/PDF-Icons.png";
import api, { baseURL } from "../api";
import { useTranslation } from "react-i18next";

const Downloads = () => {
  const { i18n, t } = useTranslation();
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    fetchDownloads();
  }, [i18n.language]);

  const fetchDownloads = async () => {
    try {
      const response = await api.get(`/downloads?language_code=${i18n.language}`);
      setDownloads(response.data);
    } catch (error) {
      console.error("Fetching download data", error);
    }
  };

  return (
    <>
      <section className="page-title ">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>{t("downloads.title")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("downloads.breadcrumbHome")}</Link>
              </li>
              <li>
                <span>{t("downloads.breadcrumbCurrent")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="row clearfix">
                {downloads.map((download) => (
                  <div key={download.id} className="col-md-6">
                    <div className="department-details-content citizen-chart-pdf">
                      <div className="content-two">
                        <div className="download-box">
                          <div className="icon-box">
                            <img src={pdficon} alt="pdf-icon" />
                          </div>
                          <h6>{download.name}</h6>
                          <div className="download-btn">
                            <Link
                              to={`${baseURL}/${download.pdf}`}
                              rel="noreferrer"
                              target="_blank"
                              className="theme-btn btn-one"
                            >
                              {t("downloads.viewBtn")}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Downloads;
