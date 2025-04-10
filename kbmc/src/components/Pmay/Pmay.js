import React from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import img1 from "../../assets/images/pmay/img1.jpg";
import img2 from "../../assets/images/pmay/img2.jpg";
import img3 from "../../assets/images/pmay/img3.jpg";
import img4 from "../../assets/images/pmay/img4.jpg";
import img5 from "../../assets/images/pmay/img5.jpg";
import img6 from "../../assets/images/pmay/img6.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Pmay = () => {
  const {t} = useTranslation();
  return (
    <div>
      <section clas="page-title">
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
            <h1>{t("pmay-contents.pmay")}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">{t("pmay-contents.schemes")}</Link>
              </li>
              <li>
                <span>{t("pmay-contents.pmay")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />
      <br />

      <section className="service-style-four">
        <div className="auto-container">
          <h4 className="pb-3 color_blue pmay-heading-margin">Introduction</h4>
          <p className="text-black">
          {t("pmay-contents.pmayStatement")}
          </p>
          <div className="table-responsive mt-3">
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
                    {t("pmay-contents.class")}
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    {t("description")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{t("pmay-contents.ISSR")}</td>
                  <td>
                  {t("pmay-contents.ISSRStatement")}
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{t("pmay-contents.CLSS")}</td>
                  <td> 
                  {t("pmay-contents.CLSSStatement")}             </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{t("pmay-contents.AHP")}</td>
                  <td>
                  {t("pmay-contents.AHPStatement")}
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{t("pmay-contents.BLC")}</td>
                  <td>
                  {t("pmay-contents.BLCStatement")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h5 className="color_blue">
          {t("pmay-contents.pmayHeadingBlue1")}
          </h5>
          <ul className="pt-3 pmay-list">
            <li>
              <b>
              {t("pmay-contents.pmaylist1")}
              </b>
              <br />{t("pmay-contents.pmaylist11")}
              <br />{t("pmay-contents.pmaylist12")}
            </li>
            <li>
              <b>{t("pmay-contents.pmaylist2")}</b>
            </li>
            <li>
              <b>
              {t("pmay-contents.pmaylist3")}
              </b>
            </li>
            <li>
              <b>
              {t("pmay-contents.pmaylist4")}
              </b>
              <br />
              {t("pmay-contents.pmaylist41")}
              <br />
              {t("pmay-contents.pmaylist42")}
              <br />
              {t("pmay-contents.pmaylist43")}
              <br />
              {t("pmay-contents.pmaylist44")}
              <br />{t("pmay-contents.pmaylist45")}
            </li>
          </ul>
          <h5 className="pt-2 color_blue">
          {t("pmay-contents.pmayHeadingBlue2")}
          </h5>
          <ul className="pt-3 pmay-list">
            <li>
              <b>
              {t("pmay-contents.plist1")}
              </b>
            </li>
          </ul>
          <h5 className="color_blue">
          {t("pmay-contents.pmayHeadingBlue3")}
          </h5>
          <div className="mt-3">
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
                      {t("pmay-contents.component")}
                    </th>
                    <th
                      style={{
                        backgroundColor: "#29aae1",
                        color: "#fff",
                      }}
                    >
                     {t("pmay-contents.approvedCribNumber")}
                    </th>
                    <th
                      style={{
                        backgroundColor: "#29aae1",
                        color: "#fff",
                      }}
                    >
                       {t("pmay-contents.projectPrice")}
                    </th>
                    <th
                      style={{
                        backgroundColor: "#29aae1",
                        color: "#fff",
                      }}
                    >
                       {t("pmay-contents.currentWorkStatus")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>
                      {t("pmay-contents.td1b")}
                      </b>
                    </td>
                    <td>{t("pmay-contents.td2")}</td>
                    <td>{t("pmay-contents.td3")}</td>
                    <td>{t("pmay-contents.td4")}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                      {t("pmay-contents.td5b")}
                      </b>
                    </td>
                    <td>{t("pmay-contents.td6")}</td>
                    <td>{t("pmay-contents.td7")}</td>
                    <td>
                    {t("pmay-contents.td8")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                      {t("pmay-contents.td9b")}
                      </b>
                    </td>
                    <td>{t("pmay-contents.td10")}</td>
                    <td>{t("pmay-contents.td11")}</td>
                    <td>{t("pmay-contents.td12")}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                      {t("pmay-contents.td13b")}
                      </b>
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h5 className="color_blue">
          {t("pmay-contents.pmayHeadingBlue4")}
          </h5>
          <div className="row mt-3 pmay_img">
            <div className="col-md-4">
              <img src={img1} alt="img1" />
            </div>
            <div className="col-md-4">
              <img src={img2} alt="img2" />
            </div>
            <div className="col-md-4">
              <img src={img3} alt="img3" />
            </div>
            <div className="col-md-4">
              <img src={img4} alt="img4" />
            </div>
            <div className="col-md-4">
              <img src={img5} alt="img5" />
            </div>
            <div className="col-md-4">
              <img src={img6} alt="img6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pmay;
