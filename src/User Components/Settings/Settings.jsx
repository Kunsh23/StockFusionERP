import React, { useState } from 'react';
import './Settings.css';
import { useNavigate } from "react-router-dom";
import UserProfile from './User Profile/UserProfile';

const Settings = ({ onUserProfileClick }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="stock align-items-center">
        <div className="stock-top-page-heading">
          <span>Settings</span>
        </div>

        <div className='setting-content'>

          <div className="settings-forms top-1" onClick={onUserProfileClick}>
            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-user'></i>
                <span className='option-heading'>My Profile</span>
              </div>
              <div className='right'>
                <span className='option-text'>Manage your personal details, business information, and update your profile picture for a more personalized experience.</span>
              </div>
            </div>
          </div>

          <div className="settings-forms top-1 many-forms">
            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-line-chart'></i>
                <span className='option-heading'>Stocks</span>
              </div>
              <div className='right'>
                <span className='option-text'>Easily track and manage stock levels to ensure efficient inventory control.</span>
              </div>
            </div>
            <hr classname='divider-line'/>

            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-wallet'></i>
                <span className='option-heading'>Expences</span>
              </div>
              <div className='right'>
                <span className='option-text'>Monitor and record all business expenses for accurate financial insights.</span>
              </div>
            </div>
            <hr classname='divider-line-2'/>

            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-bar-chart-alt'></i>
                <span className='option-heading'>Reports</span>
              </div>
              <div className='right'>
                <span className='option-text'>Generate detailed reports to analyze business performance and make informed decisions.</span>
              </div>
            </div>
            <hr classname='divider-line-2'/>

            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-cart'></i>
                <span className='option-heading'>Purchases</span>
              </div>
              <div className='right'>
                <span className='option-text'>Manage and create purchase orders to streamline the procurement process.</span>
              </div>
            </div>
            <hr classname='divider-line-2'/>

            <div className='option-1'>
              <div className='left'>
              <i class="bx bx-file"></i>
                <span className='option-heading'>Invoice</span>
              </div>
              <div className='right'>
                <span className='option-text'>Create and send professional invoices to ensure timely payments.</span>
              </div>
            </div>
            <hr classname='divider-line-2'/>

            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-package'></i>
                <span className='option-heading'>Delivery Challan</span>
              </div>
              <div className='right'>
                <span className='option-text'>Manage delivery challans efficiently to track the movement of goods.</span>
              </div>
            </div>
          </div>

          <div className="settings-forms top-1">
            <div className='option-1'>
              <div className='left'>
                <i className='bx bx-palette'></i>
                <span className='option-heading'>Themes</span>
              </div>
              <div className='right theme-colors'>
                <ul>
                  <li>
                    <span className='option-text'>Personalize the appearance by adjusting colors within the light theme, allowing you to tailor the interface to your style.</span>
                    {/* <hr className='divider-line-3'/> */}
                  </li>
                  {/* <li className='colors'>
                    <span className='option-text'>Navigation Bar : </span>
                    <button style={{ background:'red' }}/>
                    <button style={{ background:'orange' }}/>
                    <button style={{ background:'yellow' }}/>
                    <button style={{ background:'green' }}/>
                    <button style={{ background:'blue' }}/>
                    <button style={{ background:'indigo' }}/>
                    <button style={{ background:'purple' }}/>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Settings;
