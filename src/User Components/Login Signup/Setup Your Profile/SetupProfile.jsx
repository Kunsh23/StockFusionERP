import React from "react";
import "./SetupProfile.css"; // Link to the CSS file

const SetupProfile = () => {
  return (
    <div className="profile">
      <form action="#">
        <div className="d-flex">
          <div className="input-group mb-3 me-3">
            <span className="input-group-text">
              <i className="bx bx-user"></i>
            </span>
            <input type="text" className="form-control form-control-lg fs-6" placeholder="Full Name" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bx bx-user"></i>
            </span>
            <input type="text" className="form-control form-control-lg fs-6" placeholder="Username" />
          </div>
        </div>
        <div className="d-flex">
          <div className="input-group mb-3 me-3">
            <span className="input-group-text">
              <i className="bx bx-phone-call"></i>
            </span>
            <input type="number" className="form-control form-control-lg fs-6" placeholder="Phone" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bx bx-phone-call"></i>
            </span>
            <input type="number" className="form-control form-control-lg fs-6" placeholder="Alternate Phone" />
          </div>
        </div>
        <div className="d-flex">
          <div className="input-group mb-3 me-3">
            <span className="input-group-text">
              <i className="bx bx-envelope"></i>
            </span>
            <input type="mail" className="form-control form-control-lg fs-6" placeholder="Email" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bx bx-envelope"></i>
            </span>
            <input type="mail" className="form-control form-control-lg fs-6" placeholder="Alternate Email" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetupProfile;