import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";

const Demo = () => {
  const [rowData, setRowData] = useState([]); // State to store API data
  const [selectedRows, setSelectedRows] = useState([]); // State to store selected row IDs

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products/my",
          { withCredentials: true }); // Replace with your API URL
        setRowData(response.data); // Set API data to rowData state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle row selection
  const onSelectionChanged = (params) => {
    const selectedData = params.api.getSelectedRows(); // Get selected rows' data
    const selectedIds = selectedData.map((row) => row.id); // Extract only IDs
    setSelectedRows(selectedIds); // Update state with IDs
  };

  console.log("Selected IDs:", selectedRows); // Log only the IDs

  return (
    <div>
      <h1>AG-Grid with API Data</h1>
      <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
        <AgGridReact
          rowData={rowData} // Bind API data to the grid
          columnDefs={[
            { headerName: "ID", field: "id", checkboxSelection: true },
            { headerName: "Quantity", field: "quantity" },
            { headerName: "Total Amount", field: "total_amount" },
          ]} // Column definitions
          rowSelection="multiple" // Allow multiple row selections
          onSelectionChanged={onSelectionChanged} // Handle selection change
        />
      </div>

      <h2>Selected IDs:</h2>
      <pre>{JSON.stringify(selectedRows, null, 2)}</pre> {/* Display selected IDs */}
    </div>
  );
};

export default Demo;
