import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Awards.css";
import bannerImage from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [awardimages, setAwardImages] = useState([]);
  const { i18n, t } = useTranslation();

  const fetchAwards = async () => {
    try {
      const response = await api.get(`/awards?lang=${i18n.language}`);
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards data");
    }
  };

  const fetchAwardImages = async () => {
    try {
      const response = await api.get("/award-images");
      setAwardImages(response.data);
    } catch (error) {
      console.error("Error fetching award images data");
    }
  };

  useEffect(() => {
    fetchAwards();
    fetchAwardImages();
  }, [i18n.language]);

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
  <div className="content-box">
    <h1>{t("awards.pageTitle")}</h1>
    <ul className="bread-crumb clearfix">
      <li>
        <Link to="/">{t("awards.breadcrumb.home")}</Link>
      </li>
      <li>
        <span>{t("awards.breadcrumb.title")}</span>
      </li>
    </ul>
  </div>
</div>

      </section>
      <br />
      <section className="departments-style-two alternat-2 nuhm_inner">
        <div className="auto-container">
          <div className="content-two">
            <h5 className="mb-3">{t("awards.sectionTitle")}</h5>
            <ul className="nuhm_list">
              {awards.map((award, index) => (
                <li key={index}>{award.description}</li>
              ))}
            </ul>
          </div>
          <div className="row mt-3 pmay_img">
            {awardimages.map((image, index) => (
              <div className="col-md-3">
                <img
                  src={`${baseURL}${image.image_path}`}
                  alt={`image-${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
