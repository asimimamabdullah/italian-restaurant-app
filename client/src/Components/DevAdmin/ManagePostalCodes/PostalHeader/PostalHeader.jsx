import React from "react";
import "./PostalHeader.css";

const PostalHeader = ({ codes, allOffline, activePostalCodes }) => {
  return (
    <div className="manage__postalCodes-headers">
      <div className="postalCode__box-sec">
        <span className="postalCode__box-title">total postal codes</span>
        <span className="postalCode__box-value">{codes?.length}</span>
      </div>
      <div className="postalCode__box-sec">
        <span className="postalCode__box-title">active postal codes</span>
        <span className="postalCode__box-value">
          {activePostalCodes}/{codes?.length}
        </span>
      </div>
      <div className="postalCode__box-status-sec">
        <span className="postalCode__box-status-text">Status</span>
        <span
          className="postalCode__box-status"
          style={{
            background: allOffline ? "rgb(245, 41, 41)" : "#47a851",
            boxShadow: allOffline
              ? "0 0 15px 3px rgb(233, 32, 32)"
              : "0 0 15px 3px rgb(6, 167, 6)",
          }}></span>
      </div>
    </div>
  );
};

export default PostalHeader;
