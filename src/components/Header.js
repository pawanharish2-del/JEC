import React from 'react';
import '../styles/Navigation.css';

function Header() {
    return (
        <div className="jec-top-bar">
            <div className="jec-top-container">

                {/* LEFT SIDE: Single Line Contact Info */}
                <div className="jec-top-left">
                    <div className="jec-contact-column">
                        <a href="tel:+918875071333">
                            <i className="fas fa-phone-alt"></i> +91-88750 71333 (30 lines)
                        </a>
                        <a href="mailto:admission@jeckukas.org.in">
                            <i className="fas fa-envelope"></i> admission@jeckukas.org.in
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE: Action Links */}
                <div className="jec-top-right">
                    {/* UPDATED LINK */}
                    <a
                        href="https://jeckukas.in4.nopaperforms.com/application-form-2025-2026"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-edit"></i> Admission Enquiry 2026
                    </a>

                    <a href="#!">
                        <i className="fas fa-map-marked-alt"></i> Virtual Tour
                    </a>
                    <a href="/grievance">
                        <i className="fas fa-clipboard-list"></i> Grievance Form
                    </a>

                    <a href="/blog" className="jec-nav-link">
                        <i className="fas fa-blog"></i> Blog
                    </a>

                    <a href="/contact-us" className="jec-top-cta">
                        Contact Us
                    </a>
                </div>

            </div>
        </div>
    );
}

export default Header;