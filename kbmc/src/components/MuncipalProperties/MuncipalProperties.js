import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MuncipalProperties = () => {
  const { i18n, t} = useTranslation();
  const [muncipals, setMuncipals] = useState([]);

  useEffect(() => {
    fetchMuncipal(i18n.language);
  }, [i18n.language]);
  
  const fetchMuncipal = async () => {
    try {
      const response = await api.get(`/muncipal?lang=${i18n.language}`);
      setMuncipals(response.data);
    } catch (error) {
      console.error("Error fetching muncipal data");
    }
  };

  return (
    <>
      <section className="page-title mb-5">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${img1})`,
          }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1> {t("muncipal-contents.muncipalProperties")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("cityProfile")}</Link>
              </li>
              <li>
                <span>{t("muncipal-contents.muncipalProperties")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="service-style-four">
        <div className="auto-container mt-4">
          <h5 className="pb-4">
          {t("muncipal-contents.muncipalStatement")}
          </h5>

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
                    {t("muncipal-contents.name")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("muncipal-contents.places")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("address")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {muncipals.map((muncipal, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{muncipal.name}</td>
                    <td>{muncipal.propertyType}</td>
                    <td>{muncipal.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default MuncipalProperties;
