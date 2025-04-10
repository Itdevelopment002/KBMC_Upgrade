import React from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Nuhm = () => {
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
        <h1>{t("nuhm-contents.NUHM")}</h1>
        <ul className="bread-crumb clearfix">
          <li>
            <Link to="#.">{t("nuhm-contents.Schemes")}</Link>
          </li>
          <li>
            <span>{t("nuhm-contents.NUHM")}</span>
          </li>
        </ul>
      </div>
    </div>
      </section>
      <section className="departments-style-two alternat-2 nuhm_inner">
        <div className="auto-container">
          <div className="content-two">
          <h3 className="color_blue nuhm heading-margin">{t("nuhm-contents.Title")}</h3>
      <br />
      <h5 className="mb-3">{t("nuhm-contents.Intro")}</h5>
      <h5>
        <b>{t("nuhm-contents.GoalsHeading")}</b>
      </h5>
      <ul className="list-item clearfix mt-2">
        <li>{t("nuhm-contents.Goal1")}</li>
        <li>{t("nuhm-contents.Goal2")}</li>
        <li>{t("nuhm-contents.Goal3")}</li>
        <li>{t("nuhm-contents.Goal4")}</li>
        <li>{t("nuhm-contents.Goal5")}</li>
      </ul>
            <h5 className="mt-3">
              <b>{t("nuhm-contents.GoalsHeading")}</b>
            </h5>
            <p>{t("nuhm-contents.ServicesProvided")}</p>
            <ul className="list-item clearfix mt-2">
              <li>{t("nuhm-contents.Service1")}</li>
              <li>{t("nuhm-contents.Service2")}</li>
              <li>
              {t("nuhm-contents.Service3")}
              </li>
              <li>{t("nuhm-contents.Service4")}</li>
            </ul>

            <h5 className="mt-3">
            <b>{t("nuhm-contents.SchemesUnderNUHM")}</b>
          </h5>
          <p>{t("nuhm-contents.ReproductiveAndChildHealth")}</p>
          <p>{t("nuhm-contents.RCHDescription")}</p>

          <h5 className="mt-3">
            <b>{t("nuhm-contents.RCHTitle")}</b>
          </h5>
          <ul className="list-item clearfix mt-2 nuhm_list">
            <li>{t("nuhm-contents.RCH1")}</li>
            <li>{t("nuhm-contents.RCH2")}</li>
            <li>{t("nuhm-contents.RCH3")}</li>
            <li>{t("nuhm-contents.RCH4")}</li>
          </ul>

          <h5 className="mt-3">
              <b>{t("nuhm-contents.RoutineImmunisation")}</b>
            </h5>
            <ul className="list-item clearfix mt-2 nuhm_list">
              <li>{t("nuhm-contents.RoutineList1")}</li>
              <li>{t("nuhm-contents.RoutineList2")}</li>
              <li>{t("nuhm-contents.RoutineList3")}</li>
            </ul>

            <h5 className="mt-3 mb-2">
              <b><i>{t("nuhm-contents.PMMVY")}</i></b>
            </h5>
            <p><b>{t("nuhm-contents.ObjectivesPMMVY")}</b></p>
            <ul className="list-item clearfix mt-2 nuhm_list">
              <li>{t("nuhm-contents.PMMVYPoint1")}</li>
              <li>{t("nuhm-contents.PMMVYPoint2")}</li>
              <li>{t("nuhm-contents.PMMVYPoint3")}</li>
              <li>{t("nuhm-contents.PMMVYPoint4")}</li>
            </ul>
            <ul className="list-item clearfix mt-2 nuhm_list">
              <li>
              {t("nuhm-contents.list1")}
              </li>
              <li>
              {t("nuhm-contents.list2")}
              </li>
              <li>{t("nuhm-contents.list3")}</li>
              <li>
              {t("nuhm-contents.list4")}
              </li>
              <li>{t("nuhm-contents.list5")}</li>
              <li>
              {t("nuhm-contents.list6")}
              </li>
              <li>{t("nuhm-contents.list7")}</li>
              <li>
              {t("nuhm-contents.list8")}
              </li>
              <li>{t("nuhm-contents.list9")}</li>
              <li>
              {t("nuhm-contents.list10")}
              </li>
            </ul>

            <p>
            {t("nuhm-contents.des1")}
              <b>
              {t("nuhm-contents.des2b")}
              </b>{" "}
              {t("nuhm-contents.des3")}
            </p>
            <br />

            <p>
            {t("nuhm-contents.des4")}
            </p>

            <h5 className="mt-3 mb-2">
              <b>{t("nuhm-contents.des5b")}</b>
            </h5>
            <ul className="list-item clearfix mt-2 nuhm_list">
              <li>
              {t("nuhm-contents.step1")}
              </li>
              <li>
              {t("nuhm-contents.step2")}
              </li>
              <li>
                {t("nuhm-contents.step3")}
              </li>
            </ul>

            <h5 className="mt-3 mb-2">
              <b>{t("nuhm-contents.titleJanani")}</b>
            </h5>
            <p>
            {t("nuhm-contents.paraJanani1")}
            </p>
            <br />
            <p>
            {t("nuhm-contents.paraJanani2")}
            </p>

            <h5 className="mt-3 mb-2">
              <b>{t("nuhm-contents.titleObj")}</b>
            </h5>
            <p>
            {t("nuhm-contents.paraObj1")}
            </p>

            <h5 className="mt-3 mb-2">
              <b>{t("nuhm-contents.titleStrategy")}</b>
            </h5>
            <p>
            {t("nuhm-contents.paraStrategy1")}
            </p>
            <br />
            <p>
            {t("nuhm-contents.paraStrategy2")}
            </p>
            <br />
            <p>
              <b>
              {t("nuhm-contents.aboutNUHM")}
              </b>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nuhm;
