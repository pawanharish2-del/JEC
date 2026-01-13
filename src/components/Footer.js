/* src/components/Footer.js */
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="brand-line"></div>

            <div className="association-bar">
                <div className="association-container">
                    <span className="association-label">JEC Activities Associated With</span>
                    <span className="assoc-badge">AICTE Approved</span>
                    <span className="assoc-badge">RTU Kota Affiliated</span>
                    <span className="assoc-badge">NBA Accredited*</span>
                </div>
            </div>

            <div className="footer-container">
                {/* Brand and About Section */}
                <div className="footer-section">
                    <h2 className="brand-name">Jaipur Engineering College</h2>
                    <div className="about-text">
                        JEC is a place of fertile interactions, a best college where people and ideas come together in new ways.
                        Illuminating turnarounds, igniting sparks that fuel new ventures, and fostering intellectual breakthroughs.
                        We are committed to advance knowledge and educate students in engineering to serve the nation in the 21st century.
                    </div>
                    <div className="social-links">
                        <a href="https://www.facebook.com/jaipurengineeringcollege/" className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://in.linkedin.com/school/jec-kukas/" className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/jec_kukas/?hl=en" className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                        <a href="https://www.youtube.com/@JECKukasOfficial" className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {/* Academic & Org Links */}
                <div className="footer-section">
                    <h3 className="widget-title">Academic & Org</h3>
                    <ul className="footer-list">
                        <li><a href="/admission/Courses-Offered">Courses Offered</a></li>
                        <li><a href="/jec/About-JEC">Our College</a></li>
                        <li><a href="/Our-Society/Key-Teams-Functions">Our Society</a></li>
                        <li><a href="/jec/Alumni">JEC: Proud Alumni</a></li>
                        <li><a href="/jec/Employment-JEC">Career at JEC</a></li>
                        <li><a href="/blog">Blog & News</a></li>
                        <li><a href="/campus-life/engineering-projects">Engineering Projects</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="widget-title">Quick Links</h3>
                    <ul className="footer-list">
                        <li><a href="/admission/btech-admissions" style={{ color: 'var(--jec-gold)', fontWeight: '600' }}>Apply Now</a></li>
                        <li><a href="/Gallery">Campus Life</a></li>
                        <li><a href="/Infrastructure/Learning-By-Doing">Infrastructure</a></li>
                        <li><a href="/placement">Training & Placements</a></li>
                        <li><a href="/virtual-tour">JEC 360 Virtual Campus</a></li>
                        <li><a href="/grievance">Grievance Redressal</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Contact Us Section */}
                <div className="footer-section">
                    <h3 className="widget-title">Contact Us</h3>

                    <div className="contact-card">
                        <div className="contact-header">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Campus Address</span>
                        </div>
                        {/* ADDRESS LINK EMBEDDED HERE */}
                        <a 
                            href="https://www.google.com/maps/place/Jaipur+Engineering+College/@27.0279997,75.8951122,19.75z/data=!4m14!1m7!3m6!1s0x396daff9724b0af1:0x5c4f01d43902fe9a!2sJaipur+Engineering+College!8m2!3d27.0279997!4d75.8948747!16s%2Fm%2F0134w8xs!3m5!1s0x396daff9724b0af1:0x5c4f01d43902fe9a!8m2!3d27.0279997!4d75.8948747!16s%2Fm%2F0134w8xs?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="contact-row"
                            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                        >
                            SP-43, RIICO Industrial Area, Delhi Road,<br />Kukas, Jaipur - 302028, India
                        </a>
                    </div>

                    <div className="contact-card contact-card-depts">
                        {/* Admission Cell */}
                        <div className="dept-contact-row">
                            <span className="dept-title">Admission Cell</span>
                            <div className="dept-flex-info">
                                <a href="tel:+918875071333" className="contact-link"><i className="fas fa-phone-alt"></i> +91-88750 71333</a>
                                <a href="mailto:admission@jeckukas.org.in" className="contact-link">admission@jeckukas.org.in</a>
                            </div>
                        </div>

                        {/* General Enquiry */}
                        <div className="dept-contact-row">
                            <span className="dept-title">General Enquiry</span>
                            <div className="dept-flex-info">
                                <a href="tel:+919694098821" className="contact-link"><i className="fas fa-phone-alt"></i> +91-96940 98821</a>
                                <a href="mailto:info@jeckukas.org.in" className="contact-link">info@jeckukas.org.in</a>
                            </div>
                        </div>

                        {/* Training & Placement */}
                        <div className="dept-contact-row">
                            <span className="dept-title">Training & Placement</span>
                            <div className="dept-flex-info">
                                <a href="tel:+918058799027" className="contact-link"><i className="fas fa-phone-alt"></i> +91-80587 99027</a>
                                <a href="mailto:trainingandplacement@jeckukas.org.in" className="contact-link">trainingandplacement@jeckukas.org.in</a>
                            </div>
                        </div>

                        {/* Exam & Verification */}
                        <div className="dept-contact-row">
                            <span className="dept-title">Exam & Verification</span>
                            <div className="dept-flex-info">
                                <a href="tel:+918058799002" className="contact-link"><i className="fas fa-phone-alt"></i> +91-80587 99002</a>
                                <a href="mailto:examinations.jec@gmail.com" className="contact-link">examinations.jec@gmail.com</a>
                            </div>
                        </div>

                        {/* Director's Office */}
                        <div className="dept-contact-row highlight-dept">
                            <span className="dept-title">Director's Office</span>
                            <div className="dept-flex-info">
                                <a href="tel:+918058799013" className="contact-link"><i className="fas fa-phone-alt"></i> +91-80587 99013</a>
                                <a href="mailto:principal@jeckukas.org.in" className="contact-link">principal@jeckukas.org.in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="bottom-content">
                    <div className="copyright">
                        © 2025 Jaipur Engineering College. All Rights Reserved.
                        Designed by Amazing IT Solutions.
                    </div>
                    <div className="bottom-links">
                        <a href="/privacy-policy">Privacy Policy</a>
                        <a href="/disclaimer">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;