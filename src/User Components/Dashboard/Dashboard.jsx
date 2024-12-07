import React, { useState, useEffect } from "react";
import ProductChart from "./ProductChart";
import ProductDonutChart from "./ProductDonutChart";
import ProductDashboard from "./Products Charts/ProductLineChart";
import SendingProductChart from "./Products Charts/SendingProductChart";
import "./Dashboard.css";
import CategoryPieChart from "./Products Charts/CategoryPieChart";
import SendRecieveCompairChart from "./Products Charts/SendRecieveCompairChart";
import axios from "axios";
import CompareBarChart from "./Products Charts/CompareBarChart";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  // State for profile image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile image removal
  const handleRemoveImage = () => {
    setImagePreview(null); // Clear profile image preview
  };

  // State for signature image preview
  const [signImagePreview, setSignImagePreview] = useState(null);

  // Handle signature image upload
  const handleSignImageUpload = (e) => {
    const file_sign = e.target.files[0];
    if (file_sign) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignImagePreview(reader.result); // Set signature image preview
      };
      reader.readAsDataURL(file_sign);
    }
  };

  // Handle signature image removal
  const handleRemoveSignImage = () => {
    setSignImagePreview(null); // Clear signature image preview
  };

  // State for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "John Doe", // initial values
    email: "john.doe@example.com",
    phone: "123-456-7890",
  });

  // Handle input change when editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle edit mode and save the data
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
    setTimeout(() => setShowEditPopup(false), 3000);

    setIsEditing(!isEditing);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleSaveClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);

    console.log("Updated Data: ", formData);
    setIsEditing(false);
  };

  const [greetingMessage, setGreetingMessage] = useState(""); // State to store greeting message
  const [username, setUsername] = useState(""); // State to store username
  const [error, setError] = useState(""); // State for error handling

  // Fetch username on component mount
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products/username",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUsername(response.data); // Assuming response.data contains the username
        } else {
          setError("Failed to fetch username.");
        }
      } catch (err) {
        setError("An error occurred while fetching username.");
        console.error("Error fetching username:", err);
      }
    };

    fetchUsername();
  }, []); // Empty dependency array to run this effect only once (on mount)

  // Generate a random greeting message when username is fetched
  useEffect(() => {
    if (username) {
      const greetings = [
        `Hello ${username}! Let's get started with tracking product types for today.`,
        `Hey ${username}! Ready to track the product types and make informed decisions.`,
        `Hello ${username}! It's a great day to track and analyze product types for our dashboard.`,
        `Hey ${username}! Let's dive into the product types and see how they're performing.`,
        `Hi ${username}! Time to track product types and gain insights for a better overview.`,
      ];

      const randomIndex = Math.floor(Math.random() * greetings.length);
      setGreetingMessage(greetings[randomIndex]);
    }
  }, [username]); // Runs only when the username is updated

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Function to fetch data using axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/receiving/all', { withCredentials: true }); // Replace with your API URL
        const data = response.data;

        // Calculate sums
        let quantitySum = 0;
        let amountSum = 0;
        data.forEach((item) => {
          quantitySum += item.quantity;
          amountSum += item.totalAmount;
        });

        // Set the totals in state
        setTotalQuantity(quantitySum);
        setTotalAmount(amountSum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [totalQuantity1, setTotalQuantity1] = useState(0);
  const [totalAmount1, setTotalAmount1] = useState(0);

  useEffect(() => {
    // Function to fetch data using axios
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sending/all', { withCredentials: true }); // Replace with your API URL
        const data = response.data;

        // Calculate sums
        let quantitySum = 0;
        let amountSum = 0;
        data.forEach((item) => {
          quantitySum += item.quantity;
          amountSum += item.totalAmount;
        });

        // Set the totals in state
        setTotalQuantity1(quantitySum);
        setTotalAmount1(amountSum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const { t, i18n } = useTranslation("Navigation");
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div className="profile">
      {/* <ProductChart /> */}
      {/* <ProductDonutChart /> */}
      {/* <ProductDashboard/> */}

      <div className="profile-top-page-heading">
        <span>{t("Dashboard")}</span>
        {/* <button
          className="profile-edit-btn"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {isEditing ? (
            <i className="bx bx-save" />
          ) : (
            <i className="bx bx-edit" />
          )}
        </button> */}
      </div>
      <form action="#">
        {/* <div className=" forms"> */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {greetingMessage ? (
          <h5 className="welcome">{greetingMessage}</h5>
        ) : (
          <p>Loading greeting...</p> // Loading state until the greeting is set
        )}
        {/* </div> */}

        <div className="chart top">
          {/* User Information Form */}
          <div className=" forms top-1">
            <h5 className="form-heading">{t("Products Purchased (per month)")}</h5>
            <hr className="divider-line" />

            <div className="graph" style={{ width: "100%" }}>
              <ProductDashboard />
            </div>
          </div>

          <div className="chart textboxflex ">
            <div className="textbox forms">
              <h5 className="form-heading">{t("Purchased")}</h5>
              <hr className="divider-line" />
              {/* <span className="items">100000</span> */}
              <ul className="list">
                <li className="text">{t("Item Purchased")}</li>
                <li className="items">{totalQuantity}</li>
                <li className="text">{t("Total Amount")}</li>
                <li className="items">{totalAmount}</li>
              </ul>
            </div>
            <div className="textbox forms">
              <h5 className="form-heading">{t("Sold")}</h5>
              <hr className="divider-line" />
              <ul className="list">
                <li className="text">{t("Items Sold")}</li>
                <li className="items">{totalQuantity1}</li>
                <li className="text">{t("Total Amount")}</li>
                <li className="items">{totalAmount1}</li>
              </ul>
            </div>
          </div>

          <div className=" forms top-1">
            <h5 className="form-heading">{t("Products Selled (per month)")}</h5>
            <hr className="divider-line" />

            <div className="graph" style={{ width: "100%" }}>
              <SendingProductChart />
            </div>
          </div>
        </div>

        <div className="chart top">
          {/* User Information Form */}
          <div className=" forms top-1">
            <h5 className="form-heading">{t("Products Categories")}</h5>
            <hr className="divider-line" />

            <div className="graph" style={{ width: "600px", height: "100%" }}>
              <CategoryPieChart />
            </div>
          </div>

          <div className=" forms top-1">
            <h5 className="form-heading">{t("Products Selled (per month)")}</h5>
            <hr className="divider-line" />

            <div className="graph" style={{ width: "100%" }}>
              <CompareBarChart />
            </div>
          </div>
        </div>
        <div className="forms top copyright">
          <p>© StockFusion ERP, 2024. All rights reserved.</p>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
