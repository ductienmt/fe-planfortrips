import React from "react";
import "./MethodItem.css";

const MethodItem = ({ method, image, fee, active, onClick }) => {
  return (
    <>
      <div className="method-item">
        <div
          className={`method-item-container ${
            active ? "active" : "non-active"
          }`}
          onClick={onClick}
        >
          <div className="method-item-image" style={{ display: "flex" }}>
            <img src={image} alt={method} />
            <div className="info" style={{ marginLeft: "10px" }}>
              <div
                className="method-item-name"
                style={{ fontSize: "18px", fontWeight: "600" }}
              >
                {method}
              </div>
              <div className="method-item-fee" style={{ fontSize: "14px" }}>
                {fee}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MethodItem;
