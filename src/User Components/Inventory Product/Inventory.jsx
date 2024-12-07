import React, { useState, useEffect, useMemo, useRef } from "react";
import "./Inventory.css";

// Used to import AG Grid
import { AgGridReact } from "ag-grid-react";

// Used to give AG Grid theme
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Import JSON data directly
// import Grid_Data from "./Grid data/Stocks.json";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Inventory = ({ theme }) => {
  // State to store fetched row data and search query
  const [rowData, setRowData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [updateItemModalVisible, setUpdateItemModalVisible] = useState(false);
  const [deleteItemModalVisible, setDeleteItemModalVisible] = useState(false);
  const [error, setError] = useState("");

  const { t, i18n } = useTranslation("Navigation");
  const [language, setLanguage] = useState("en");
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  // Handle search query input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredRows = rowData.filter((row) =>
      Object.values(row).some(
        (value) => value && value.toString().toLowerCase().includes(query)
      )
    );

    setFilteredData(filteredRows);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredData(rowData); // Reset filtered data to full rowData
  };

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      filter: true,
    }),
    []
  );

  // Column Data
  const colDefs = useMemo(
    () => [
      {
        flex: 0.3,
        filter: false,
        field: "",
        checkboxSelection: true,
      },
      // {
      //   field: "id",
      //   headerName: "S. No.",
      //   flex: 0.6,
      // },
      {
        headerName: "S.No.", // Title for Serial Number column
        valueGetter: (params) => params.node.rowIndex + 1, // Dynamically generate serial numbers
        flex: 0.6,
        sortable: true,
        filter: true,
      },
      { field: "productName", headerName: "Product Name" },
      { field: "category", headerName: "Category" },
      { field: "quantity", headerName: "Quantity" },
      {
        field: "pricePerUnit",
        headerName: "Price (Per Item)",
        valueFormatter: (params) =>
          params.value ? "₹ " + params.value.toLocaleString() : "",
      },
      //   {
      //     field: "totalAmount",
      //     headerName: "Total Amount",
      //     valueFormatter: (params) =>
      //       params.value ? "₹ " + params.value.toLocaleString() : "",
      //   },
    ],
    []
  );

  // Custom message when no rows are available
  const noRowsOverlay = `<div style="padding: 20px; font-size: 16px; text-align: center;">No results found</div>`;

  // Function to handle modal export (you can implement your logic here)
  const handleExport = () => {
    // Implement your export logic here (e.g., exporting to CSV)
    console.log("Exporting data:", filteredData);
    setModalVisible(false); // Close modal after export
  };

  const gridRef = useRef(null);

  const onExportCSVClick = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.exportDataAsCsv({ fileName: "Stocks_data.csv" });
    } else {
      console.log("Grid API not ready");
    }
  };

  const [selectedRowCount, setSelectedRowCount] = useState(0); // State to keep track of selected rows

  const onSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows(); // Get the selected rows
    setSelectedRowCount(selectedRows.length); // Update the state with the count of selected rows
  };

  const [productname, setProductname] = useState("");
  const [productnameValid, setProductnameValid] = useState(true);

  const [category, setCategory] = useState("");
  const [categoryValid, setCategoryValid] = useState(true);

  const [quantity, setQuantity] = useState("");
  const [quantityValid, setQuantityValid] = useState(true);

  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState(true);

  const [vendor, setVendor] = useState("Yourself");
  const [vendorValid, setVendorValid] = useState(true);

  const [productId, setProductId] = useState("");

  // Validate Productname
  const validateProductname = (productname) => {
    if (productname.trim() && productname.length >= 3) {
      setProductnameValid(true);
    } else {
      setProductnameValid(false);
    }
  };

  // Validate Category
  const validateCategory = (category) => {
    if (category.trim() && category.length >= 3) {
      setCategoryValid(true);
    } else {
      setCategoryValid(false);
    }
  };

  // Validate Quantity
  const validateQuantity = (quantity) => {
    if (quantity.trim() && quantity >= 0) {
      setQuantityValid(true);
    } else {
      setQuantityValid(false);
    }
  };

  // Validate Price
  const validatePrice = (price) => {
    if (price.trim() && price >= 0) {
      setPriceValid(true);
    } else {
      setPriceValid(false);
    }
  };

  // Validate Vendor
  const validateVendor = (vendor) => {
    if (vendor.trim() && vendor.length >= 3) {
      setVendorValid(true);
    } else {
      setVendorValid(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "productname") {
      setProductname(value);
      validateProductname(value);
    } else if (name === "category") {
      setCategory(value);
      validateCategory(value);
    } else if (name === "quantity") {
      setQuantity(value);
      validateQuantity(value);
    } else if (name === "price") {
      setPrice(value);
      validatePrice(value);
    } else if (name === "vendor") {
      setVendor(value);
      validateVendor(value);
    }
  };

  // Handle Add Items
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Input validation
    if (!productname.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (!vendor.trim()) {
      setError("Product name is required.");
      return;
    }

    console.log("Data to send:", {
      product_name: productname, // Match with backend field name
      category,
      quantity,
      price_per_unit: price, // Match with backend field name
      vendor,
    });

    // Proceed with API call if all validations pass
    try {
      //   alert(productname, category, quantity, price, vendor); // Debugging line

      const name = productname;
      const response = await axios.post(
        "http://localhost:8080/api/products/add",
        {
          productName: name, // Field name must match backend
          category,
          quantity,
          pricePerUnit: price, // Field name must match backend
          vendor,
        },
        { withCredentials: true } // Include cookies
      );

      if (response.status === 200 || response.status === 201) {
        alert("Product added successfully!");

        // Reset form fields after successful submission
        setProductname("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setVendor("");
      }

      fetchData();
        setAddItemModalVisible("");
    } catch (error) {
      // Handle errors and set error state
      if (error.response) {
        setError(error.response.data || "Error adding product.");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error details:", error);
    }
  };

  // Handle Update Items
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Input validation
    if (!productname.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
      setError("Quantity must be a positive number.");
      return;
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError("Price must be a positive number.");
      return;
    }

    if (!vendor.trim()) {
      setError("Product name is required.");
      return;
    }

    console.log("Data to send:", {
      product_name: productname, // Match with backend field name
      category,
      quantity,
      price_per_unit: price, // Match with backend field name
      vendor,
    });

    // Proceed with API call if all validations pass
    try {
      //   alert(productname, category, quantity, price, vendor); // Debugging line

      const name = productname;
      const response = await axios.put(
        `http://localhost:8080/api/products/update/${selectedRows}`,
        {
          productName: name, // Field name must match backend
          category,
          quantity,
          pricePerUnit: price, // Field name must match backend
          vendor,
        },
        { withCredentials: true } // Include cookies
      );

      if (response.status === 200 || response.status === 201) {
        alert("Product Updated successfully!");

        // Reset form fields after successful submission
        setProductname("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setVendor("");
      }

      fetchData();
      setUpdateItemModalVisible("");
    } catch (error) {
      // Handle errors and set error state
      if (error.response) {
        setError(error.response.data || "Error adding product.");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error details:", error);
    }
  };

  // // Handle Delete Items
  // const handleDeleteProduct = async (e) => {
  //   e.preventDefault();

  //   // Reset error state
  //   setError("");

  //   // Proceed with API call if all validations pass
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:8080/api/products/delete/${selectedRows}`,
  //       { withCredentials: true } // Include cookies
  //     );

  //     if (response.status === 204) {
  //       alert("Product deleted successfully!");
  //     }

  //     window.location.reload();
  //   } catch (error) {
  //     // Handle errors and set error state
  //     if (error.response) {
  //       setError(error.response.data || "Error adding product.");
  //     } else if (error.request) {
  //       setError("No response from server. Please try again later.");
  //     } else {
  //       setError("An unexpected error occurred.");
  //     }
  //     console.error("Error details:", error);
  //   }
  // };

  // // Fetch data from API on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/api/products/my",
  //         { withCredentials: true }
  //       );
  //       setRowData(response.data); // Assuming API returns an array of objects
  //       setFilteredData(response.data); // Set initial filtered data
  //     } catch (error) {
  //       console.error("Error fetching data from API:", error);
  //       setError("Failed to load data. Please try again later.");
  //       setRowData([]); // Set to empty array if fetch fails
  //       setFilteredData([]);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(filteredData);

  // Handle Delete Items
  const handleDeleteProduct = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");

    // Proceed with API call if all validations pass
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/products/delete/${selectedRows}`,
        { withCredentials: true } // Include cookies
      );

      if (response.status === 204) {
        alert("Product deleted successfully!");

        // Fetch updated data after deletion
        fetchData(); // This will refresh the data
      }
    } catch (error) {
      // Handle errors and set error state
      if (error.response) {
        setError(error.response.data || "Error deleting product.");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error details:", error);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row IDs

  // Fetch data from API on component mount and after delete
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/products/my",
        { withCredentials: true }
      );
      setRowData(response.data); // Assuming API returns an array of objects
      setFilteredData(response.data); // Set initial filtered data
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setError("Failed to load data. Please try again later.");
      setRowData([]); // Set to empty array if fetch fails
      setFilteredData([]);
    }
  };

  useEffect(() => {
    fetchData(); // Initial data load
  }, []); // This runs only once when the component mounts

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products/my",
          { withCredentials: true }
        ); // Replace with your API URL
        setRowData(response.data); // Set API data to rowData state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle row selection
  const onSelectionedChanged = (params) => {
    const selectedData = params.api.getSelectedRows(); // Get selected rows' data
    const selectedIds = selectedData.map((row) => row.id); // Extract only IDs
    setSelectedRows(selectedIds); // Update state with IDs
  };

  console.log("Selected IDs:", selectedRows);

  return (
    <div
      className={`stock align-items-center stocks-container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="stock-top-page-heading">
        <span>{t("Inventory")}</span>

        <div className="stock-input-group input-group">
          <input
            type="text"
            className="form-control form-control-lg input-font"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />

          {/* Show the clear button only if there is text in the search input */}
          {searchQuery && (
            <span
              className="input-group-text stock-edit-btn"
              onClick={clearSearch}
            >
              <i className="bx bx-x" />
            </span>
          )}

          <span className="input-group-text stock-edit-btn search-btn">
            <i className="bx bx-search"></i>
          </span>
        </div>

        <div className="btns">
          {/* <button className="stock-edit-btn">{selectedRowCount}</button> */}
          <button className="stock-edit-btn">
            <i
              className="bx bx-plus"
              onClick={() => setAddItemModalVisible(true)}
            />
          </button>
          {/* <button className="stock-edit-btn">{selectedRowCount}</button> */}
          <button className="stock-edit-btn">
            <i
              className="bx bx-edit-alt"
              onClick={() => setUpdateItemModalVisible(true)}
            />
          </button>
          {/* <button className="stock-edit-btn">{selectedRowCount}</button> */}
          <button className="stock-edit-btn">
            <i
              className="bx bx-trash"
              // onClick={() => setDeleteItemModalVisible(true)}
              onClick={handleDeleteProduct}
            />
          </button>
          {/* <button className="stock-edit-btn"><i className="bx bx-show" /></button> */}
          <button
            className="stock-edit-btn"
            onClick={() => setModalVisible(true)}
          >
            <i className="bx bx-export" />
          </button>
        </div>
      </div>

      <div className="grid">
        <div
          className={
            theme === "dark"
              ? "ag-theme-alpine-dark stock-grid-listing"
              : "ag-theme-alpine stock-grid-listing"
          }
        >
          <AgGridReact
            rowData={filteredData} // Display filtered data
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            rowSelection={"single"}
            onSelectionChanged={onSelectionedChanged}
            pagination={true}
            paginationPageSize={20}
            overlayNoRowsTemplate={noRowsOverlay}
            // noRowsOverlayComponentFramework={() => (
            //   <div dangerouslySetInnerHTML={{ __html: noRowsOverlay }} />
            // )}
            ref={gridRef}
          />
        </div>
      </div>

      {/* Modal for Exporting Data */}
      {modalVisible && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-box">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <span className="modal-title">{t("Export Stock Data")}</span>
                <button
                  type="button"
                  className="btn close-btn"
                  onClick={() => setModalVisible(false)}
                >
                  <i className="bx bx-x" />
                </button>
              </div>
              <div className="modal-body modal-export-body">
                <p>{t("Choose a file type to export data ?")}</p>
                <div className="btns">
                  <button
                    className="stock-edit-btn csv"
                    onClick={onExportCSVClick}
                  >
                    <i class="fas fa-file-csv"></i>csv
                  </button>
                  {/* <button className="stock-edit-btn excel"><i class="fas fa-file-excel"></i>excel</button>
                  <button className="stock-edit-btn pdf"><i class="fas fa-file-pdf"></i>pdf</button>
                  <button className="stock-edit-btn word"><i class="fas fa-file-word"></i>word</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Data */}
      {addItemModalVisible && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-box">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <span className="modal-title">
                  {t("Add an item to your inventory")}
                </span>
                <button
                  type="button"
                  className="btn close-btn"
                  onClick={() => setAddItemModalVisible(false)}
                >
                  <i className="bx bx-x" />
                </button>
              </div>

              <div className="modal-body modal-export-body">
                {/* <p>Choose a file type to export data ?</p>
                <div className="btns">
                  <button className="stock-edit-btn csv" onClick={onExportCSVClick}><i class="fas fa-file-csv"></i>csv</button>
                </div> */}

                <form className="add-item-form">
                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-package"></i>
                    </span>
                    <input
                      type="text"
                      name="productname"
                      className={`form-control form-control-lg input-font ${
                        !productnameValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Product Name")}
                      value={productname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-package"></i>
                    </span>
                    <input
                      type="text"
                      name="vendor"
                      className={`form-control form-control-lg input-font ${
                        !vendorValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Product Vendor")}
                      value="StockFusion ERP"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-collection"></i>
                    </span>
                    <input
                      type="text"
                      name="category"
                      className={`form-control form-control-lg input-font ${
                        !categoryValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Category")}
                      value={category}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-coin-stack"></i>
                    </span>
                    <input
                      type="number"
                      name="quantity"
                      className={`form-control form-control-lg input-font ${
                        !quantityValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Quantity")}
                      value={quantity}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-rupee"></i>
                    </span>
                    <input
                      type="number"
                      name="price"
                      className={`form-control form-control-lg input-font ${
                        !priceValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Price")}
                      value={price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleAddProduct}
                  >
                    {t("Add Item")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Updating Data */}
      {updateItemModalVisible && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-box">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <span className="modal-title">
                  {t("Update an existing item from your inventory")}
                </span>
                <button
                  type="button"
                  className="btn close-btn"
                  onClick={() => setUpdateItemModalVisible(false)}
                >
                  <i className="bx bx-x" />
                </button>
              </div>

              <div className="modal-body modal-export-body">
                {/* <p>Choose a file type to export data ?</p>
                <div className="btns">
                  <button className="stock-edit-btn csv" onClick={onExportCSVClick}><i class="fas fa-file-csv"></i>csv</button>
                </div> */}

                <form className="add-item-form">
                  {/* <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-card"></i>
                    </span>
                    <input
                      type="text"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="Product ID"
                      className={`form-control form-control-lg input-font`}
                    />
                  </div> */}

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-package"></i>
                    </span>
                    <input
                      type="text"
                      name="productname"
                      className={`form-control form-control-lg input-font ${
                        !productnameValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Product Name")}
                      value={productname}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-collection"></i>
                    </span>
                    <input
                      type="text"
                      name="category"
                      className={`form-control form-control-lg input-font ${
                        !categoryValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Category")}
                      value={category}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-coin-stack"></i>
                    </span>
                    <input
                      type="number"
                      name="quantity"
                      className={`form-control form-control-lg input-font ${
                        !quantityValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Quantity")}
                      value={quantity}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-rupee"></i>
                    </span>
                    <input
                      type="number"
                      name="price"
                      className={`form-control form-control-lg input-font ${
                        !priceValid ? "border-danger" : ""
                      }`}
                      placeholder={t("Price")}
                      value={price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleUpdateProduct}
                  >
                    {t("Update Item")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Deleting Data */}
      {deleteItemModalVisible && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-box">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <span className="modal-title">
                  Delete an existing item from your inventory
                </span>
                <button
                  type="button"
                  className="btn close-btn"
                  onClick={() => setDeleteItemModalVisible(false)}
                >
                  <i className="bx bx-x" />
                </button>
              </div>

              <div className="modal-body modal-export-body">
                {/* <p>Choose a file type to export data ?</p>
                <div className="btns">
                  <button className="stock-edit-btn csv" onClick={onExportCSVClick}><i class="fas fa-file-csv"></i>csv</button>
                </div> */}

                <form className="add-item-form">
                  <div className="input-group my-3">
                    <span className="input-group-text">
                      <i className="bx bx-card"></i>
                    </span>
                    <input
                      type="text"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      placeholder="Product ID"
                      className={`form-control form-control-lg input-font`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 mb-3"
                    onClick={handleDeleteProduct}
                  >
                    Delete Item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
