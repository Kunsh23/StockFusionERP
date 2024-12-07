import React, { useState, useMemo } from 'react';
import './Grid.css';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Grid = () => {
  // Row Data
  const [rowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64900, electric: true },
    { make: "Ford", model: "Mustang", price: 70900, electric: false },
    { make: "Toyota", model: "Land Cruiser", price: 44900, electric: false },
    { make: "Chevrolet", model: "Bolt EV", price: 31995, electric: true },
    { make: "BMW", model: "i3", price: 44450, electric: true },
    { make: "Nissan", model: "Leaf", price: 27990, electric: true },
    { make: "Audi", model: "e-tron", price: 65900, electric: true },
    { make: "Hyundai", model: "Kona Electric", price: 37990, electric: true },
    { make: "Volkswagen", model: "ID.4", price: 39990, electric: true },
    { make: "Mercedes-Benz", model: "EQC", price: 69900, electric: true },
    { make: "Ford", model: "F-150", price: 29995, electric: false },
    { make: "Honda", model: "Civic", price: 23900, electric: false },
    { make: "Subaru", model: "Crosstrek", price: 22995, electric: false },
    { make: "Kia", model: "Niro EV", price: 39990, electric: true },
    { make: "Porsche", model: "Taycan", price: 79900, electric: true },
    { make: "Volvo", model: "XC40 Recharge", price: 53900, electric: true },
    { make: "Mazda", model: "CX-5", price: 25900, electric: false },
    { make: "Dodge", model: "Ram 1500", price: 28995, electric: false },
    { make: "Fiat", model: "500e", price: 29999, electric: true },
    { make: "Jaguar", model: "I-PACE", price: 69900, electric: true },
    { make: "Land Rover", model: "Range Rover", price: 89900, electric: false },
  ]);

  const defaultColDef = useMemo(() => {
    return {
    //   flex: 1,
    //   filter: true,
    //   floatingFilter: true,
    //   editable: true
    };
  }, []);

  // Column Data
  const colDefs = useMemo(() => [
    { 
        field: "make",
        // cellEditor: "agSelectCellEditor",
        // cellEditorParams: { values: ['Tesla','Ford','Toyota']},
        // checkboxSelection: true
    },
    { field: "model" },
    {
      field: "price",
      valueFormatter: p => "₹ " + p.value.toLocaleString(), 
    },
    { field: "electric" },
  ], []); 

  return (
    // For theme - Change class name : 
    // ag-theme-quartz, ag-theme-material, ag-theme-balham, ag-theme-alpine
    <div className='ag-theme-alpine-auto-dark' style={{ height: 500 }}>
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        
        // defaultColDef={defaultColDef} 
        // rowSelection={'multiple'}
        // pagination={true}
        // paginationPageSize={5}
      />
    </div>
  );
}

export default Grid;
