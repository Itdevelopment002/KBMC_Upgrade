import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import { useTranslation } from "react-i18next";

const OfficialPublication = () => {
  const { i18n, t } = useTranslation();
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    fetchPublications();
  }, [i18n.language]);

  const fetchPublications = async () => {
    try {
      const response = await api.get(`/publications?language_code=${i18n.language}`);
      setPublications(response.data);
    } catch (error) {
      console.error("Error fetching publications!");
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
            <h1>{t("officialPublication.title")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("officialPublication.breadcrumbHome")}</Link>
              </li>
              <li>
                <span>{t("officialPublication.breadcrumbCurrent")}</span>
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
                {publications.map((publication, index) => (
                  <div className="col-md-3" key={index}>
                    <Link
                      to={`${baseURL}${publication.pdf_path}`}
                      target="_blank"
                    >
                      <img
                        src={`${baseURL}${publication.file_path}`}
                        alt={`publication-${index + 1}`}
                      />
                    </Link>
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

export default OfficialPublication;
