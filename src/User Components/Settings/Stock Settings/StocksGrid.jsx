import React from 'react';
import './StocksGrid.css';

const StocksGrid = () => {
  return (
    <div>
      <div className="stock align-items-center">

        <nav className='breadcrumb' style={{'--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E")',}}>
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Settings</a></li>
            <li class="breadcrumb-item active" aria-current="page">Stock Tracker Editor</li>
          </ol>
        </nav>

        <div className="stock-top-page-heading">
          <span>Stock Editor</span>
        </div>

        {/* Form For Edit Stock Tracking Grid Header */}
        <form action="#">

          {/* Row - 1 */}
          <div className="flex-grow-1 forms">
            <div className="d-flex">
              <div className="input-group">
                <span className="heading">Column 1</span>
                <div className="input-group mb-3 me-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 1"/>
                </div>
              </div>
              
              <div className="input-group">
                <span className="heading">Column 2</span>
                <div className="input-group mb-3 me-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 2"/>
                </div>
              </div>

              <div className="input-group">
                <span className="heading">Column 3</span>
                <div className="input-group mb-3 me-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 3"/>
                </div>
              </div>

              <div className="input-group">
                <span className="heading">Column 4</span>
                <div className="input-group mb-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 4"/>
                </div>
              </div>
            </div>
          {/* </div> */}

          {/* Row - 2 */}
          {/* <div className="flex-grow-1 forms"> */}
            <div className="d-flex">
              <div className="input-group">
                <span className="heading">Column 5</span>
                <div className="input-group mb-3 me-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 5"/>
                </div>
              </div>
              
              <div className="input-group">
                <span className="heading">Column 6</span>
                <div className="input-group mb-3 me-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 6"/>
                </div>
              </div>

              <div className="input-group">
                <span className="heading">Column 7</span>
                <div className="input-group mb-3 me-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 7"/>
                </div>
              </div>

              <div className="input-group" style={{ opacity: '0'}}>
                <span className="heading">Column 8</span>
                <div className="input-group mb-3">
                   <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Column 8" disabled/>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
};

export default StocksGrid;