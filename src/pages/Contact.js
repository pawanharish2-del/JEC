// src/pages/Contact.js
import React from 'react';
import '../styles/Contact.css';

function Contact() {
  return (
    // This wrapper scopes all the new CSS
    <div className="contact-page-v4">

      <section className="contact-header-section">
        <div className="max-width-container">
          <h1>Get In Touch with JEC</h1>
          <p>Thank you for exploring Jaipur Engineering College, Kukas. We would love to answer any questions you have, and be of service in any way we can.</p>
        </div>
      </section>
      
      <section className="address-bar">
        Jaipur Engineering College (JEC) Main Campus: SP - 43, RIICO Industrial Area, Delhi Road, Kukas, Jaipur - 302028, India
      </section>

      <div className="max-width-container main-contact-grid">
        
        <div className="info-card-container">
          
          <div className="location-box main-campus">
            <h3><i className="fas fa-map-marker-alt"></i> JEC Main Campus, Kukas</h3>
            <p className="address-line">SP - 43, RIICO Industrial Area, Delhi Road, Kukas, Jaipur - 302028, India</p>

            <div className="contact-detail"><i className="fas fa-phone"></i> <p>+91-8875071333 (30 lines)</p></div>
            <div className="contact-detail"><i className="fas fa-phone"></i> <p>+91-8875041333</p></div>
            <div className="contact-detail"><i className="fas fa-phone"></i> <p>+91-9694098821 / +91-9694098823</p></div>
            
            <div className="contact-detail"><i className="fas fa-envelope"></i> <a href="mailto:jeckukas@yahoo.com">jeckukas@yahoo.com</a> (General Inquiry)</div>
            <div className="contact-detail"><i className="fas fa-envelope"></i> <a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a> (Admissions)</div>
            <div className="contact-detail"><i className="fas fa-envelope"></i> <a href="mailto:training.placementsjec@gmail.com">training.placementsjec@gmail.com</a> (T&P)</div>
          </div>

          <div className="location-box delhi-office">
            <h3><i className="fas fa-building"></i> Delhi Liaison Office</h3>
            <p className="address-line">401, Akashdeep, Barakhamba road, New Delhi</p>
            
            <div className="contact-detail"><i className="fas fa-phone"></i> <p>+91-8058799011</p></div>
            <div className="contact-detail"><i className="fas fa-envelope"></i> <a href="mailto:directorjecjiet@gmail.com">directorjecjiet@gmail.com</a></div>
          </div>
        </div>

        <div className="form-card">
          <form action="#" method="POST">
            <h3>Send Your Inquiry</h3>
            <div className="form-group">
              <input type="text" id="name" name="Name" required placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="Email" required placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="tel" id="contact" name="Contact Number" required placeholder="Contact Number" />
            </div>
            <div className="form-group">
              <textarea id="message" name="Message" rows="5" required placeholder="Message"></textarea>
            </div>
            <button type="submit" className="send-btn">SEND</button>
          </form>
          <p className="disclaimer">By submitting this data to Jaipur Engineering College you are authorising us to hold your details for us to respond to your submission. Jaipur Engineering College will not pass this information onto any third parties.</p>
        </div>
      </div>

     <section className="map-section">
      <div className="max-width-container">
        <h2>Find Us on the Map</h2>
        <div className="google-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.068551259951!2d75.8948747!3d27.027999699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396daff9724b0af1%3A0x5c4f01d43902fe9a!2sJaipur%20Engineering%20College!5e0!3m2!1sen!2sin!4v1763027051599!5m2!1sen!2sin" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Location of Jaipur Engineering College">
          </iframe>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Contact;