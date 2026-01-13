// src/components/AdmissionPopup.js
import React, { useState, useEffect } from 'react';
import './AdmissionPopup.css';

const AdmissionPopup = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // This loads the NoPaperForms script automatically when the popup opens
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widgets.in4.nopaperforms.com/emwgts.js";
        document.body.appendChild(s);

        // Cleanup function to remove script if needed (optional, keeps DOM clean)
        return () => {
            if (document.body.contains(s)) {
                document.body.removeChild(s);
            }
        };
    }, []);

    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={() => setShow(false)}>
                    &times;
                </button>
                {/* Your NoPaperForms Widget Div */}
                <div className="npf_wgts" data-height="400px" data-w="c1073fe2350d112d90b129addc24e9ff"></div>
            </div>
        </div>
    );
};

export default AdmissionPopup;