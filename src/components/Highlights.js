// src/components/Highlights.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Highlights.css';

function Highlights() {
  const navigate = useNavigate();

  return (
    <section className="highlights">
      <div className="highlights-content">
        <div className="highlight-cards">
          
          {/* Card 1: Flexible Learning -> Fallback to '/' */}
          <div 
            className="highlight-card" 
                      onClick={() => navigate('/admission/btech-admissions')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-graphic-top-blue"></div>
            <h3>360° Flexible Learning</h3>
            <p>Explore multiple disciplines with our flexible learning framework, allowing you to focus on your
              chosen branch of engineering.</p>
            {/* Changed 'a' to 'span' to avoid nested interactive behaviors while keeping styles */}
            <span className="card-arrow">→</span>
          </div>

          {/* Card 2: Placement Cell -> Navigates to '/placement' */}
          <div 
            className="highlight-card"
            onClick={() => navigate('/placement')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-graphic-top-yellow"></div>
            <h3>Proactive Placement Cell</h3>
            <p>Benefit from our proactive placement cell, which ensures holistic student development and career
              success.</p>
            <span className="card-arrow">→</span>
          </div>

          {/* Card 3: Virtual Tour -> Fallback to '/' */}
          <div 
            className="highlight-card"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-graphic-top-pink"></div>
            <h3>360° Virtual Campus Tour</h3>
            <p>Experience our vibrant campus life from anywhere with the JEC 360° Virtual Campus Tour.</p>
            <span className="card-arrow">→</span>
          </div>

        </div>
        
          <span className="nav-dot active"></span>
          <span className="nav-dot"></span>
       
      </div>
    </section>
  );
}

export default Highlights;