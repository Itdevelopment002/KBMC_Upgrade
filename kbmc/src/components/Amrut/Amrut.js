import React from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Amrut = () => {
  const { t } = useTranslation();

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
            <h1>{t("amrut.title")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("amrut.breadcrumb.schemes")}</Link>
              </li>
              <li>
                <span>{t("amrut.breadcrumb.amrut")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />

      <section className="service-style-four">
        <div className="auto-container">
          <h4 className="heading-margin">{t("amrut.ulb_code")}</h4>
          <h4 className="pb-3 pt-2 color_blue">{t("amrut.mission_title")}</h4>
          <p className="text-black text-justify">{t("amrut.description")}</p>

          {[2, 3].map((index) => (
            <div key={index} className="table-responsive mt-3">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td rowSpan="3">{index}</td>
                    <th rowSpan="3">{t("amrut.table.heading")}</th>
                    <th>{t("amrut.table.columns.sr_no")}</th>
                    <th>{t("amrut.table.columns.matter")}</th>
                    <th colSpan="3">{t("amrut.table.columns.physical")}</th>
                    <th colSpan="4">{t("amrut.table.columns.financial")}</th>
                    <th rowSpan="3">{t("amrut.table.columns.shera")}</th>
                  </tr>
                  <tr>
                    <td rowSpan="2">1</td>
                    <td rowSpan="2">{t("amrut.table.columns.sewerageScheme")}</td>
                    <td>{t("amrut.table.columns.purpose")}</td>
                    <td>{t("amrut.table.columns.achieved")}</td>
                    <td>{t("amrut.table.columns.percentage")}</td>
                    <td>{t("amrut.table.columns.expenditure")}</td>
                    <td>{t("amrut.table.columns.funds_available")}</td>
                    <td>{t("amrut.table.columns.cost")}</td>
                    <td>{t("amrut.table.columns.percentage")}</td>
                  </tr>
                  <tr>
                    <td>{t("amrut.table.data.purpose")}</td>
                    <td>{t("amrut.table.data.achieved")}</td>
                    <td>{t("amrut.table.data.percentage")}</td>
                    <td>{t("amrut.table.data.expenditure")}</td>
                    <td>{t("amrut.table.data.funds")}</td>
                    <td>{t("amrut.table.data.cost")}</td>
                    <td>{t("amrut.table.data.financial_percentage")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}

          <p className="text-black text-justify">{t("amrut.final_para")}</p>
        </div>
      </section>
    </div>
  );
};

export default Amrut;
