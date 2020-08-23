import React from "react";

const IconSuccess = ({ role }) => {
  if (role === "success")
    return (
      <div
        className="swal2-icon swal2-success swal2-icon-show"
        style={{ display: "flex" }}
      >
        <div
          className="swal2-success-circular-line-left"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        ></div>
        <span className="swal2-success-line-tip"></span>
        <span className="swal2-success-line-long"></span>
        <div className="swal2-success-ring"></div>
        <div
          className="swal2-success-fix"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        ></div>
        <div
          className="swal2-success-circular-line-right"
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        ></div>
      </div>
    );
  if (role === "error")
    return (
      <div
        className="swal2-icon swal2-error swal2-icon-show"
        style={{ display: "flex" }}
      >
        <span class="swal2-x-mark">
          <span class="swal2-x-mark-line-left"></span>
          <span class="swal2-x-mark-line-right"></span>
        </span>
      </div>
    );
};

export default IconSuccess;
