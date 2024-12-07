import React, { useState } from "react";
import "./UserProfile.css"; 

const UserProfile = () => {
  // State for profile image preview
  const [imagePreview, setImagePreview] = useState(null);

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set profile image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile image removal
  const handleRemoveImage = () => {
    setImagePreview(null);  // Clear profile image preview
  };

  // State for signature image preview
  const [signImagePreview, setSignImagePreview] = useState(null);

  // Handle signature image upload
  const handleSignImageUpload = (e) => {
    const file_sign = e.target.files[0];
    if (file_sign) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignImagePreview(reader.result);  // Set signature image preview
      };
      reader.readAsDataURL(file_sign);
    }
  };

  // Handle signature image removal
  const handleRemoveSignImage = () => {
    setSignImagePreview(null);  // Clear signature image preview
  };

  // State for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: 'John Doe', // initial values
    email: 'john.doe@example.com',
    phone: '123-456-7890',
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

    console.log('Updated Data: ', formData);
    setIsEditing(false);
  };



  return (
    <div className="profile">
      <div className="profile-top-page-heading">
        <span>My Profile</span>
        <button className="profile-edit-btn" onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? <i className="bx bx-save" /> : <i className="bx bx-edit" />}
        </button>
      </div>
      
      {showPopup && <div className="popup"><p>Your details are saved successfully !!!</p></div>}
      {showEditPopup && <div className="popup"><p>You can edit your profile !</p></div>}
      
      <form action="#">

        {/* User Information Form */}
        <div className=" forms top-1">
        <h5 className="form-heading">User Details</h5>
        <hr className="divider-line"/>
        
        <div className="d-flex">

          {/* Image Uploader */}
          <div className="image-uploader position-relative me-3">
            <label htmlFor="imageInput">
              <div className="image-preview" style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : "var(--default-user-icon)",}}>
                {/* Add/Edit Icon */}
                <div className="edit-icon align-items-center justify-content-center">
                  <i className={`bx ${imagePreview ? "bx-edit" : "bx-plus"} fs-5`}></i>
                </div>

                {/* Remove Button */}
                <button type="button" className="remove-icon" onClick={handleRemoveImage} disabled={!imagePreview}>
                  <i className="bx bx-trash fs-5"></i>
                </button>
              </div>
            </label>
            <input type="file" id="imageInput" className="d-none" onChange={handleImageUpload} accept="image/*"/>
          </div>

          {/* Row - 1 (Name & User Name) */}
          <div className="flex-grow-1">
            <div className="d-flex">
              <div className="input-group">
                <span className="heading">Name</span>
                <div className="input-group mb-3 me-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Full Name" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing}/>
                </div>
              </div>
              
              <div className="input-group">
                <span className="heading">Username</span>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input type="text" className="form-control form-control-lg input-font" placeholder="Username" />
                </div>
              </div>
            </div>

            {/* Row - 2 (Mobile & Email) */}
            <div className="d-flex">
              <div className="input-group">
                <span className="heading">Phone</span>
                <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i className="bx bx-phone-call"></i>
                </span>
                <input type="number" className="form-control form-control-lg input-font" placeholder="Phone"/>
                </div>
              </div>
              
              <div className="input-group">
                <span className="heading">Email</span>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-envelope"></i>
                  </span>
                  <input type="email" className="form-control form-control-lg input-font" placeholder="Email" />
                </div>
              </div>
            </div>

            {/* Row - 3 (Aadhar & Pan Card) */}
            <div className="d-flex">
              <div className="input-group">
                <span className="heading">Aadhar Number</span>
                <div className="input-group mb-3 me-3">
                  <span className="input-group-text">
                    <i className="bx bx-id-card"></i>
                  </span>
                  <input type="email" className="form-control form-control-lg input-font" placeholder="Aadhar Number" />
                </div>
              </div>
              
              <div className="input-group">
                <span className="heading">Pan Number</span>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="bx bx-id-card"></i>
                  </span>
                  <input type="email" className="form-control form-control-lg input-font" placeholder="Pan Number" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Business Details Form */}
        <div className="forms top-2">
          <h5 className="form-heading">Business Details</h5>
          <hr className="divider-line"/>

          {/* Row - 1 */}
          <div className="d-flex">
            <div className="input-group">
              <span className="heading">Business Name</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i className="bx bx-briefcase"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Business Name"/>
              </div>
            </div>

            <div className="input-group">
              <span className="heading">GST Number</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i className="bx bx-purchase-tag"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="GST Number"/>
              </div>
            </div>
              
            <div className="input-group">
              <span className="heading">Firm Name</span>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bx bx-package"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Firm Name" />
              </div>
            </div>
          </div>

          {/* Row - 2 */}
          <div className="d-flex">
            <div className="input-group">
              <span className="heading">City</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-buildings"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="City"/>
              </div>
            </div>

            <div className="input-group">
              <span className="heading">State</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-buildings"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="State"/>
              </div>
            </div>
              
            <div className="input-group">
              <span className="heading">Country</span>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="bx bx-buildings"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Country" />
              </div>
            </div>
          </div>

          {/* Row - 3 */}
          <div className="d-flex">
            <div className="input-group">
              <span className="heading">Zip Code</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-map-pin"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Zip Code"/>
              </div>
            </div>

            <div className="input-group hide-input" disabled>
              <span className="heading">IFSC Code</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-buildings"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="IFSC Code"/>
              </div>
            </div>
              
            <div className="input-group hide-input" disabled>
              <span className="heading">Bank Name</span>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="bx bx-map-pin"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Bank Name" />
              </div>
            </div>
          </div>

          {/* Row - 4 */}
          <div className="d-flex">
            <div className="input-group">
              <span className="heading">Account Number</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-credit-card"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Account Number"/>
              </div>
            </div>

            <div className="input-group">
              <span className="heading">IFSC Code</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-credit-card-front"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="IFSC Code"/>
              </div>
            </div>
              
            <div className="input-group">
              <span className="heading">Bank Name</span>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="bx bx-building"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="Bank Name" />
              </div>
            </div>
          </div>

          {/* Row - 5 */}
          <div className="d-flex">
            <div className="input-group">
              <span className="heading">UPI ID</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-qr"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="UPI ID"/>
              </div>
            </div>

            <div className="input-group hide-input" disabled>
              <span className="heading">IFSC Code</span>
              <div className="input-group mb-3 me-3">
                <span className="input-group-text">
                  <i class="bx bx-buildings"></i>
                </span>
                <input type="text" className="form-control form-control-lg input-font" placeholder="IFSC Code"/>
              </div>
            </div>
              
            <div className="input-group hide-input" disabled>
              <span className="heading">Bank Name</span>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i class="bx bx-map-pin"></i>
                </span>
                <input type="text" className="form-control form-covvntrol-lg input-font" placeholder="Bank Name" />
              </div>
            </div>
          </div>

        

        {/* Signatures Form */}
        <div className="d-flex">
        <div className="signature me-3">
          <span className="heading">Signatures</span>

          {/* Sign Image Uploader */}
          <div className="signature-uploader position-relative me-3">
            <label htmlFor="signImageInput">
              <div className="image-preview" style={{ backgroundImage: signImagePreview ? `url(${signImagePreview})` : "var(--default-sign-icon)",}}>
                {/* Add/Edit Icon */}
                <div className="edit-icon">
                  <i className={`bx ${signImagePreview ? "bx-edit" : "bx-plus"} fs-5`}></i>
                </div>
          
                {/* Remove Button */}
                <button type="button" className="remove-icon" onClick={handleRemoveSignImage} disabled={!signImagePreview}>
                  <i className="bx bx-trash fs-5"></i>
                </button>
              </div>
            </label>
            <input type="file" id="signImageInput" className="d-none" onChange={handleSignImageUpload} accept="image/*"/>
          </div>
          
        </div>
        <p className="note">Note : Your signatures will be used to generate digital challans and invoices. Without a valid signature, it will not be possible to generate either of these documents.</p>
        </div>
        </div>

      </form>
    </div>
  );
};

export default UserProfile;