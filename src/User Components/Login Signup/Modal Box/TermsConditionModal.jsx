import React, {useState} from "react";
import "./Modal.css";

import "../../../i18n";
import { useTranslation } from "react-i18next";

const ModalBox = () => {
  // Language Toggle
  const { t, i18n } = useTranslation("LoginSignup");
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hn" : "en";
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div
      class="modal fade modal-lg"
      id="terms-conditions"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 heading" id="exampleModalLabel">
              {t('terms-condition-heading')}
            </h1>
            <button
              type="button"
              class="btn-close close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {t('terms-condition-content-1')} <br/><br/>
            <div className="terms-body-heading">{t('terms-condition-content-2')}</div>
            {t('terms-condition-content-2.1')} <br/><br/>
            <div className="terms-body-heading">{t('terms-condition-content-3')}</div>
            {t('terms-condition-content-3.1')} <br/><br/>
            <div className="terms-body-heading">{t('terms-condition-content-4')}</div>
            {t('terms-condition-content-4.1')} <br/>
            <ul className="list">
              <li>{t('terms-condition-content-4.2')}</li>
              <li>{t('terms-condition-content-4.3')}</li>
              <li>{t('terms-condition-content-4.4')}</li>
            </ul>
            <div className="terms-body-heading">{t('terms-condition-content-5')}</div>
            {t('terms-condition-content-5.1')}
          </div>
          
          {/* <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> 
            <button type="button" class="btn btn-primary">
            {t('terms-condition-agree-btn')}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalBox;