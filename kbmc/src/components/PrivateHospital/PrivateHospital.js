import React, { useState, useEffect } from "react";
import api from "../api";
import bannerImage from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PrivateHospital = () => {
  const { i18n, t } = useTranslation();
  const [eastHospitals, setEastHospitals] = useState([]);
  const [westHospitals, setWestHospitals] = useState([]);

  const fetchHospitals = async () => {
    try {
      const response = await api.get(`/private-hospital?lang=${i18n.language}`);
      // const response = await api.get(`/private-hospital`);
      const hospitals = response.data;
      const eastDivisionHospitals = hospitals.filter(
        (hospital) => hospital.division === "East"
      );
      const westDivisionHospitals = hospitals.filter(
        (hospital) => hospital.division === "West"
      );
      setEastHospitals(eastDivisionHospitals);
      setWestHospitals(westDivisionHospitals);
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
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
            <h1>{t("hospital.pageTitle")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("hospital.breadcrumb.cityProfile")}</Link>
              </li>
              <li>
                <span>{t("hospital.breadcrumb.hospital")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="service-style-four mt-5">
        <div className="auto-container">
          <h5>{t("hospital.mainHeading")}</h5>
          <div className="table-responsive mt-3">
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.srNo")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.hospitalName")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.doctorSpeciality")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.address")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.phone")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.beds")}</th>
                  <th style={{ backgroundColor: "#29aae1", color: "#fff" }}>{t("hospital.facilities")}</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td colSpan="7">
                    <b>{t("hospital.eastHospitalsTitle")}</b>
                  </td>
                </tr>
                {eastHospitals.map((east, index) => (
                  <tr key={east.id}>
                    <td>{index + 1}</td>
                    <td>{east.hospital_name}</td>
                    <td>{east.principal_doctor}</td>
                    <td>{east.address}</td>
                    <td>{east.phone_no} / {east.mobile_no}</td>
                    <td>{east.beds}</td>
                    <td>{east.facility}</td>
                  </tr>
                ))}
              </tbody>

              <tbody>
                <tr>
                  <td colSpan="7">
                    <b>{t("hospital.westHospitalsTitle")}</b>
                  </td>
                </tr>
                {westHospitals.map((west, index) => (
                  <tr key={west.id}>
                    <td>{index + 1}</td>
                    <td>{west.hospital_name}</td>
                    <td>{west.principal_doctor}</td>
                    <td>{west.address}</td>
                    <td>{west.phone_no} / {west.mobile_no}</td>
                    <td>{west.beds}</td>
                    <td>{west.facility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateHospital;
