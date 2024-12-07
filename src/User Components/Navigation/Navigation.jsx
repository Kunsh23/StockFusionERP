import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styling Sheet
import "./Navigation.css";

// Language Toggle
import "../../i18n";
import { useTranslation } from "react-i18next";

// Axios Connectivity to backend
import axios from "axios";

// Assets
import User_img from "./Assets/User.png";
import Company_logo from "./Assets/Company_logo.png";
import Lang_icon from "./Assets/icon.svg";

// Home Content Files
import StocksGrid from "../Settings/Stock Settings/StocksGrid";
import UserProfile from "../Settings/User Profile/UserProfile";
import Stocks from "../Stock Tracker/Stocks";
import Settings from "../Settings/Settings";
import Dashboard from "../Dashboard/Dashboard";
import Buyer from "../Recieving Product/Buyer";
import Seller from "../Sending Product/Seller"; 
import Inventory from "../Inventory Product/Inventory";
import History from "../History Product/History";
import Demo from "../Inventory Product/Demo";

const isMobile = () => window.innerWidth < 768;

const Navigation = () => {
  const { t, i18n } = useTranslation("Navigation");
  const [language, setLanguage] = useState("en");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<Dashboard />); // Default component
  const [activeMenu, setActiveMenu] = useState("Dashboard"); // Track active menu

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const btnRef = useRef(null);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to set UserProfile component
  const setUserProfile = () => {
    setCurrentComponent(<UserProfile theme={theme} />);
  };

  const handleMenuClick = (component) => {
    switch (component) {
      case "Stock Management":
        setCurrentComponent(<Stocks theme={theme} />);
        break;
      case "Expense Tracking":
        setCurrentComponent(<StocksGrid theme={theme} />);
        break;
      case "Purchase Orders":
        setCurrentComponent(<div>No Analytics Data</div>);
        break;
      case "Reports":
        setCurrentComponent(<div>No File Manager</div>);
        break;
      case "Invoice Generation":
        setCurrentComponent(<Demo theme={theme} />);
        break;
      case "Delivery Challan":
        setCurrentComponent(<div>No Saved Items</div>);
        break;
      case "Settings":
        setCurrentComponent(
          <Settings theme={theme} onUserProfileClick={setUserProfile} />
        );
        break;
      case "Purchasing":
        setCurrentComponent(<Buyer theme={theme} />);
        break;
      case "Selling":
        setCurrentComponent(<Seller theme={theme} />);
        break;
      case "Inventory":
        setCurrentComponent(<Inventory theme={theme} />);
        break;
      case "History":
        setCurrentComponent(<History theme={theme} />);
        break;
      default:
        setCurrentComponent(<Dashboard theme={theme} />);
    }
    setActiveMenu(component); 
    setIsSidebarOpen(false);

    // Save the current component to local storage
    localStorage.setItem("lastComponent", component);
  };

  useEffect(() => {
    const lastComponent = localStorage.getItem("lastComponent");
    if (lastComponent) {
      handleMenuClick(lastComponent); 
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile() &&
        isSidebarOpen &&
        sidebarRef.current &&
        btnRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Themes
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className =
      savedTheme === "dark" ? "dark-theme" : "light-theme";
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className =
      newTheme === "dark" ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", newTheme); 
  };

  // Logout User
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Product updated successfully!");
      }

      // Manually delete cookies
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      // Optionally clear session storage and local storage
      sessionStorage.clear();
      localStorage.clear();

      navigate("/");
    } catch (error) {
      // Handle errors and set error state
      if (error.response) {
        setError(error.response.data || "Error in Log outt.");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error details:", error);
    }
  };

  // Setting Logges username
  const [username, setUsername] = useState(""); // State to store username

  useEffect(() => {
    // Fetch username from the API
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products/username",
          { withCredentials: true }
        );

        console.log(response);

        if (response.status === 200) {
          setUsername(response.data); // Assuming the API returns { username: "Anisha" }
        } else {
          setError("Failed to fetch username.");
        }
      } catch (err) {
        // Handle error during the API request
        setError("An error occurred while fetching username.");
        console.error("Error fetching username:", err);
      }
    };

    fetchUsername(); // Call the fetch function when the component mounts
  }, []);

  //   alert(username)

  return (
    <div>
      <div
        className={`sidebar ${isSidebarOpen ? "active" : ""}`}
        ref={sidebarRef}
      >
        <div className="logo_content">
          <div className="logo">
            <img src={Company_logo} alt="Company Logo" />
          </div>
          <i
            className="bx bx-menu"
            id="btn"
            ref={btnRef}
            onClick={toggleSidebar}
          ></i>
        </div>
        <ul className="nav_list">
          {[
            "Dashboard",
            // "Stock Management",
            // "Expense Tracking",
            // "Purchase Orders",
            // "Reports",
            "Purchasing",
            "Selling",
            "Inventory",
            "History",
            // "Invoice Generation",
            // "Delivery Challan",
            // "Settings",
          ].map((menu) => (
            <li key={menu} onClick={() => handleMenuClick(menu)}>
              <a href="#" className={activeMenu === menu ? "active" : ""}>
                <i
                  className={`bx bx-${
                    menu === "Dashboard"
                      ? "grid-alt"
                      // : menu === "Stock Management"
                      // ? "user"
                      // : menu === "Expense Tracking"
                      // ? "chat"
                      // : menu === "Purchase Orders"
                      // ? "pie-chart-alt-2"
                      // : menu === "Reports"
                      // ? "folder"
                      : menu === "Purchasing"
                      ? "cart"
                      : menu === "Selling"
                      ? "rupee"
                      : menu === "Inventory"
                      ? "package"
                      : menu === "History"
                      ? "history"
                      : menu === "Invoice Generation"
                      ? "cart-alt"
                      : menu === "Delivery Challan"
                      ? "heart"
                      : "cog"
                  }`}
                ></i>
                <span className="links_name">{t(menu)}</span>
              </a>
              <span className="tooltip">{t(menu)}</span>
            </li>
          ))}
        </ul>

        <div className="profile_content">
          <div className="language">
            <ul className="nav_list">
              <li>
                <a
                  href="#"
                  onClick={toggleTheme}
                  className={`${isMobile() ? "mt-3" : ""}`}
                >
                  {theme === "light" ? (
                    <i className="bx bx-moon" />
                  ) : (
                    <i className="bx bx-sun" />
                  )}
                  <span className="links_name">
                    {theme === "light" ? "Dark" : "Light"}
                  </span>
                </a>
                <span className="tooltip">
                  {theme === "light" ? "Dark" : "Light"}
                </span>
              </li>

              <li>
                <a
                  href="#"
                  onClick={toggleLanguage}
                  className={`${isMobile() ? "mt-3" : ""}`}
                >
                  <img
                    src={Lang_icon}
                    alt="Language Icon"
                    className="language-icon"
                  />
                  <span className="links_name lang-text">
                    {language === "en" ? "हिन्दी" : "English"}
                  </span>
                </a>
                <span className="tooltip">
                  {language === "en" ? "हिन्दी" : "English"}
                </span>
              </li>
            </ul>
          </div>

          <div className="profile">
            <div className="profile_details">
              <img src={User_img} alt="User Profile" />
              <div className="name_job">
                {error ? (
                  <div className="error">{error}</div> // Display error message if any
                ) : (
                  <>
                    <div className="name">{username ? username : "Guest"}</div>{" "}
                    {/* Show username or default to "Guest" */}
                    <div className="job">Admin</div>
                  </>
                )}
              </div>
            </div>
            <i
              className="bx bx-log-out"
              id="log_out"
              onClick={handleLogout}
            ></i>
          </div>
        </div>
      </div>
      <div className="home_content">{currentComponent}</div>
    </div>
  );
};

export default Navigation;
