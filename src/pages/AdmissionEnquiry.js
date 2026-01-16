// src/pages/AdmissionEnquiry.js
import React, { useEffect } from 'react';
import './AdmissionEnquiry.css';

const AdmissionEnquiry = () => {
  
  useEffect(() => {
    // 1. Define the script loading logic
    const loadNpfWidget = () => {
      // Check if the script is already present to avoid duplicates
      if (!document.querySelector('script[src*="emwgts.js"]')) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
        
        // 2. Deployment Fix: Re-trigger the widget initialization once the script loads
        script.onload = () => {
          if (window.npf_widget && typeof window.npf_widget.init === 'function') {
            window.npf_widget.init();
          }
        };

        document.body.appendChild(script);
      } else {
        // If script exists but widget is blank (common in SPA navigation), re-init
        if (window.npf_widget && typeof window.npf_widget.init === 'function') {
          window.npf_widget.init();
        }
      }
    };

    loadNpfWidget();

    return () => {
      // Cleanup logic if NPF provides specific unmount methods
    };
  }, []);

  return (
    <div className="enquiry-page-wrapper">
      {/* Header Section */}
      <section className="enquiry-header-section">
        <div className="max-width-container">
          <h1>Admission Enquiry 2026</h1>
          <p>Take the first step towards a bright future at JEC. Fill out the form below and our counselors will guide you through the process.</p>
        </div>
      </section>

      {/* Form Section */}
      <div className="enquiry-form-container">
        <div className="enquiry-card">
          <h3>Enquiry Form</h3>
          
          {/* FIX: Increased data-height to 950px to ensure the full form is visible 
              without internal scrolling on mobile and desktop views.
          */}
          <div 
            className="npf_wgts" 
            data-height="950px" 
            data-w="c1073fe2350d112d90b129addc24e9ff"
          ></div>

          {/* FIX: Set marginTop to 0.5rem to keep the text close to the form button */}
          <div className="privacy-note full-width" style={{ marginTop: '0.5rem' }}>
            By submitting this form, you consent to receive communication from JEC regarding your admission enquiry via Email/SMS/Call.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionEnquiry;