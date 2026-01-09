import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import '../styles/Testimonials.css';
import building from '../assets/jec-building.jpeg';
// Sub-component for individual cards
const TestimonialCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150; // Character limit for uniform height

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Logic to truncate text
  const textToShow = isExpanded ? item.quote : item.quote.slice(0, maxLength);
  const shouldShowButton = item.quote.length > maxLength;

  return (
    <div className="t-card">
      <i className="fas fa-quote-left quote-icon"></i>
      
      {/* Wrapper allows text to grow and push info down */}
      <div className="quote-content-wrapper">
        <p className="quote-text">
          "{textToShow}{!isExpanded && shouldShowButton ? '...' : ''}"
        </p>
        
        {shouldShowButton && (
          <button onClick={toggleReadMore} className="read-more-btn">
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        )}
      </div>

      <div className="student-info">
        <div className="student-avatar">
          {item.imageUrl ? (
             <img src={item.imageUrl} alt={item.name} />
          ) : (
             <i className="fas fa-user"></i>
          )}
        </div>
        
        <div className="student-details">
          <h4>{item.name}</h4>
          <p className="course">{item.course}</p>
          
          {item.placement && (
             <div className="placement-badge">{item.placement}</div>
          )}
          
          {item.salary && (
             <div className="salary-badge"> {item.salary}</div>
          )}
        </div>
      </div>
    </div>
  );
};

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for controlling the number of visible items
  const [visibleCount, setVisibleCount] = useState(6); // Default for desktop

  useEffect(() => {
    // 1. Check screen size to set initial count for mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4); // Show only 4 on mobile
      } else {
        // Optional: Reset or keep as is for desktop. 
        // We typically leave it so if they resize, they see more, 
        // or strictly follow the rule. Setting to a high number ensures all are seen on desktop.
        setVisibleCount(100); 
      }
    };

    // Run once on mount
    handleResize();

    // 2. Fetch Data
    const fetchTestimonials = async () => {
      try {
        const testimonialsRef = collection(db, "student_testimonials");
        const q = query(testimonialsRef, orderBy("order")); 
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleShowMore = () => {
    // Increase count to show all or add more in batches
    setVisibleCount(prevCount => prevCount + 4);
  };

  if (loading) {
    return (
      <div className="testimonials-page">
        <section className="testimonial-hero">
          <div className="max-width-container">
            <h1>Loading Stories...</h1>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="testimonials-page">

  

       {/* 2. UPDATED HERO SECTION WITH IMAGE */}
            <section className="testimonial-hero">
              {/* Background Image */}
              <img src={building} alt="Campus Building" className="hero-bg-img" />
              
              {/* Overlay Content */}
              <div className="hero-overlay">
                  <div className="max-width-container">
                      <h1>Student Testimonials</h1>
                      <p>Hear from our students and alumni about their journey at JEC.</p>
                  </div>
              </div>
            </section>
      

      <section className="testimonial-grid-section">
        <div className="max-width-container">
          <div className="t-grid">

            {/* Slice the array based on visibleCount */}
            {testimonials.slice(0, visibleCount).map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}

            {!loading && testimonials.length === 0 && (
              <p style={{textAlign: 'center', width: '100%', gridColumn: '1/-1'}}>
                No testimonials found. Please add data to the 'student_testimonials' collection in Firebase.
              </p>
            )}

          </div>

          {/* Show "Show More" button only if there are more items to show */}
          {visibleCount < testimonials.length && (
            <div className="load-more-container">
              <button onClick={handleShowMore} className="load-more-main-btn">
                Show More Stories
              </button>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

export default Testimonials;