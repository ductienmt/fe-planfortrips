import React, { useEffect, useState } from "react";
import "./EnterpriseTopbar.css";
import { InputFlied } from "../../client/Components/Input/InputFlied";
import avt from "../../assets/avt.jpg";
import AccountEtpService from "../../services/apis/AccountEnterprise";

const EnterpriseTopbar = () => {
  const [img, setImage] = useState("");
  const loadUserData = async () => {
    try {
      const res = await AccountEtpService.detail();
      console.log("res", res);
      setImage(res.data.urlImage);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <>
      <div className="enterprise-topbar-container">
        <div className="left-compo">
          <InputFlied
            content={"Tìm kiếm tài nguyên"}
            dai={"300px"}
          ></InputFlied>
        </div>
        <div
          className="right-compo"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <div className="notification">
            <i
              className="fa-regular fa-bell"
              style={{ fontSize: "24px", cursor: "pointer" }}
            ></i>
          </div>
          <div className="avatar">
            <img
              src={img}
              alt=""
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterpriseTopbar;
