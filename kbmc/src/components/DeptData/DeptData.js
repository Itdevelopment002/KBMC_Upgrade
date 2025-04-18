import React, { useEffect, useState } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DeptData = ({ fetchDepartments, fetchDepartmentData }) => {
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const state = location.state || {};
  const { id } = state;

  const [headings, setHeadings] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);

  const fetchDeptData = async () => {
    try {
      const response = await api.get(`/public_disclosure`, {
        params: { language_code: i18n.language },
      });

      const filteredDepartments = response.data.filter(
        (department) => department.status === 1
      );
      setDepartmentName(filteredDepartments);

      const filteredData = filteredDepartments.filter(
        (item) => String(item?.id) === String(id)
      );
      setDeptData(filteredData);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const fetchHeadings = async () => {
    try {
      if (deptData.length === 0) return;

      const response = await api.get("/department-datas", {
        params: { language_code: i18n.language },
      });

      await fetchDepartmentData();
      await fetchDepartments();

      const filteredDepartments = response.data.filter(
        (department) => department.status === 1
      );

      const filteredData = filteredDepartments.filter(
        (item) => item.public_disclosure_id === deptData[0]?.id
      );
      setHeadings(filteredData);
    } catch (error) {
      console.error("Error fetching headings:", error);
    }
  };

  useEffect(() => {
    fetchDeptData();
  }, [id, i18n.language]); // refetch when ID or language changes

  useEffect(() => {
    fetchHeadings();
  }, [deptData, i18n.language]); // refetch when data or language changes

  return (
    <div>
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
            <h1>{deptData[0]?.department_name}</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/departments">{t("departmentsmain")} </Link>
              </li>
              <li>
                <span>{deptData[0]?.department_name}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />

      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one dept_leyer_1">
                  <div className="title-box">
                    <h3>{deptData[0]?.department_name}</h3>
                    <hr />
                  </div>
                  <ul>
                    {headings.map((dept) => (
                      <li key={dept.id}>
                        <Link to={dept.heading_link} state={{ id: dept?.id }}>
                          {dept.department_heading}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
              <div className="department-sidebar">
                <div className="category-widget">
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      {departmentName.map((department, index) => (
                        <li key={index}>
                          <Link
                            to={
                              department?.department_name ===
                              "General Admin Department"
                                ? "/general-admin-department"
                                : department?.department_name ===
                                  "Town Planning"
                                ? "/town-planning"
                                : `/${department?.department_name
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                            }
                            state={{ id: department?.id }}
                          >
                            {department?.department_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeptData;
