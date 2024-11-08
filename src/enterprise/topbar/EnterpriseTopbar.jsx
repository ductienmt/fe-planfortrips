import React from "react";
import "./EnterpriseTopbar.css";
import { InputFlied } from "../../client/Components/Input/InputFlied";
import avt from "../../assets/avt.jpg";

const EnterpriseTopbar = () => {
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
              src={avt}
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
