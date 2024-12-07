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
      id="privacy-policy"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 heading" id="exampleModalLabel">
              {t('privacy-policy-heading')}
            </h1>
            <button
              type="button"
              class="btn-close close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body modal-scroll-body">
            <div className="terms-body-heading">{t('privacy-policy-content-1')}</div>
            {t('privacy-policy-content-1.1')} <br/><br/>
            <div className="terms-body-heading">{t('privacy-policy-content-2')}</div>
            {t('privacy-policy-content-2.1')} <br/>
            <ul className="list">
              <li>{t('privacy-policy-content-2.2')}</li>
              <li>{t('privacy-policy-content-2.3')}</li>
              <li>{t('privacy-policy-content-2.4')}</li>
            </ul>
            <div className="terms-body-heading">{t('privacy-policy-content-3')}</div>
            {t('privacy-policy-content-3.1')} <br/><br/>
            <div className="terms-body-heading">{t('privacy-policy-content-4')}</div>
            {t('privacy-policy-content-4.1')} <br/><br/>
            <div className="terms-body-heading">{t('privacy-policy-content-5')}</div>
            {t('privacy-policy-content-5.1')} <br/><br/>
            <div className="terms-body-heading">{t('privacy-policy-content-6')}</div>
            {t('privacy-policy-content-6.1')} <br/><br/>
            <div className="terms-body-heading">{t('privacy-policy-content-7')}</div>
            {t('privacy-policy-content-7.1')}
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
            {t('privacy-policy-agree-btn')}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalBox;