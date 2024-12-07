import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TermsConditionModal from "./Modal Box/TermsConditionModal";
import PrivacyPolicyModal from "./Modal Box/PrivacyPolicyModal";
import "./LoginSignup.css";
import Logo from "./Assets/Logo_3.png";
import { ReactComponent as LangIcon } from "./Assets/icon.svg";
import "../../i18n";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("LoginSignup");
  const [language, setLanguage] = useState("en");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Validate username
  const validateUsername = (username) => {
    if (username.trim() && username.length >= 3) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  };

  // Validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (password.length >= 6) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword === password) {
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordValid(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUsername(value);
      validateUsername(value);
    } else if (name === "email") {
      setEmail(value);
      validateEmail(value);
    } else if (name === "password") {
      setPassword(value);
      validatePassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      validateConfirmPassword(value);
    }
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset error
    setError("");

    // Check if all fields are filled
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill out all the fields.");
      return;
    }

    if (usernameValid && emailValid && passwordValid && confirmPasswordValid) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/registration",
          { username, email, password }
        );

        if (
          response.status === 201 || 200 &&
          response.data === "User registered successfully"
        ) {
          alert("User registered successfully");
          navigate("/"); 
        }
      } catch (error) {
        if (error.response) {
          setError(error.response.data || "Signup failed. Please try again.");
        } else if (error.request) {
          setError(
            "No response from server. Please check your connection or try again later."
          );
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        console.error("Error details:", error);
      }
    } else {
      setError("Please check the fields.");
    }
  };

  return (
    <div className="row vh-100 g-0">
      <TermsConditionModal />
      <PrivacyPolicyModal />

      {/* Left Side */}
      <div className="col-lg-6 position-relative d-none d-lg-block">
        <div className="bg-holder"></div>
      </div>

      {/* Right Side */}
      <div className="col-lg-6 d-flex flex-column justify-content-center right-side">
        {/* Language Toggle */}
        <div className="d-flex justify-content-between">
          <img src={Logo} alt="" width="60" className="erp-logo" />
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
              <h3 className="fw-bold">{t("heading-2")}</h3>
              <p className="text-secondary">{t("accounts-2")}</p>
            </div>

            {/* Social Login */}
            {/* <button className="btn btn-lg btn-outline-secondary btn-outline-custom btn-lg w-100">
              <i className="bx bxl-google text-danger me-1 input-font"></i>{" "}
              {t("google-login-2")}
            </button> */}

            {/* Divider */}
            {/* <div className="position-relative">
              <hr className="text-secondary" />
              <div className="divider-content-center">{t("divider-1")}</div>
            </div> */}

            {/* Form */}
            <form onSubmit={handleSignup}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-user"></i>
                </span>
                <input
                  type="text"
                  name="username"
                  className={`form-control form-control-lg input-font ${!usernameValid ? 'border-danger' : ''}`}
                  placeholder={t("username-2")}
                  value={username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  className={`form-control form-control-lg input-font ${!emailValid ? 'border-danger' : ''}`}
                  placeholder={t("email-2")}
                  value={email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`form-control form-control-lg input-font ${!passwordValid ? 'border-danger' : ''}`}
                  placeholder={t("password-2")}
                  value={password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-custom eye-btn"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-lock-alt"></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={`form-control form-control-lg input-font ${!confirmPasswordValid ? 'border-danger' : ''}`}
                  placeholder={t("confirm-pass-2")}
                  value={confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-custom eye-btn"
                  onClick={togglePasswordVisibility}
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              <div className="mb-3">
                {error && <p className="text-danger">{error}</p>}
              </div>
              <button type="submit" className="btn btn-lg btn-primary w-100">
                {t("signup-button-2")}
              </button>

              {/* Account Already */}
              <div className="text-center mt-3">
                <p className="mb-0">
                  {t("account-info-2")}{" "}
                  <Link to="/" className="text-primary">
                    {t("login-button-2")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
