import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginSignup.css";
import Logo from "./Assets/Logo_3.png";
import { ReactComponent as LangIcon } from "./Assets/icon.svg";

import "../../i18n";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("LoginSignup");

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState("en");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("Login successful:", response.data);
      setErrorMessage("");
      navigate("/nav");
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="row vh-100 g-0">
      {/* Left Side */}
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <div className="bg-holder"></div>
      </div>

      {/* Right Side */}
      <div className="col-lg-6 d-flex flex-column justify-content-center right-side">
        {/* Language Toggle */}
        <div className="d-flex justify-content-between">
          <img src={Logo} alt="Logo" width="60" className="erp-logo" />
          <button
            className="btn btn-outline btn-lg w-30 language mt-2 me-2"
            onClick={toggleLanguage}
          >
            <LangIcon className="icon" />
            {language === "en" ? "हिन्दी" : "English"}
          </button>
        </div>

        {/* Form Centering */}
        <div className="row align-items-center justify-content-center h-100 g-0 px-4 px-sm-0">
          <div className="col col-sm-6 col-lg-7 col-xl-6">
            <div className="text-center mb-5">
              <h3 className="fw-bold">{t("heading-1")}</h3>
              <p className="text-secondary">{t("accounts-1")}</p>
            </div>

            {/* Social Login */}
            {/* <button className="btn btn-lg btn-outline-secondary btn-outline-custom w-100 mb-3">
              <i className="bx bxl-google text-danger me-1 input-font"></i>
              {t("google-login")}
            </button> */}

            {/* Divider */}
            {/* <div className="position-relative mb-3">
              <hr className="text-secondary" />
              <div className="divider-content-center">{t("divider-1")}</div>
            </div> */}

            {/* Form */}
            <form>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  className="form-control form-control-lg input-font"
                  placeholder={t("username-1")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg input-font"
                  placeholder={t("password-1")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-custom eye-btn"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              {/* <div className="input-group mb-3 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                    required
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary terms"
                  >
                    <small>{t("remember-1")}</small>
                  </label>
                </div>
                <div className="terms">
                  <small>
                    <a href="#">{t("forgot-text-1")}</a>
                  </small>
                </div>
              </div> */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3" onClick={handleLogin}>
                {t("lognin-button-1")}
              </button>
            </form>

            <div className="text-center">
                {t("account-info-1")}{" "}
                <Link to="/signup">
                  {t("signup-button-1")}
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;