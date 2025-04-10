import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Wards = () => {
  const { i18n, t } = useTranslation();
  const [wardData, setWardData] = useState([]);

  const fetchWardData = async () => {
    try {
      const response = await api.get(`/wards?lang=${i18n.language}`);
      setWardData(response.data);
    } catch (error) {
      console.error("Error fetching ward data");
    }
  };

  useEffect(() => {
    fetchWardData();
  }, [i18n.language]);

  return (
    <section>
      <section className="page-title">
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
            <h1>{t("wards.title")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">{t("home")}</Link>
              </li>
              <li>
                <span>{t("wards.title")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="service-style-four mt-5">
        <div className="auto-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#29aae1", color: "#fff" }}
                  >
                    {t("wards.srNo")}
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#29aae1", color: "#fff" }}
                  >
                    {t("wards.wardNo")}
                  </th>
                  <th
                    scope="col"
                    style={{ backgroundColor: "#29aae1", color: "#fff" }}
                  >
                    {t("wards.wardName")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {wardData.map((ward, index) => (
                  <tr key={ward.id}>
                    <td>{index + 1}</td>
                    <td>{ward.ward_no}</td>
                    <td className="text-start" width="700px">
                      {ward.ward_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Wards;
