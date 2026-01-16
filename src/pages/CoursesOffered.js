import React from 'react';

function CoursesOffered() {
  return (
    <div className="courses-page">
      
      {/* Hero Section */}
      <section className="courses-hero">
        <div className="max-width-container">
            <h1>Academic Programs</h1>
            <p>Stimulating, supportive, and playful. JEC offers an exceptional education environment that values who you are. Explore our range of 36+ courses across 8 departments.</p>
        </div>
      </section>

      {/* Stats Banner */}
      <div className="max-width-container">
        <div className="courses-stats-bar">
            <div className="courses-stat-item">
                <h3>36</h3>
                <p>Courses Offered</p>
            </div>
            <div className="courses-stat-item">
                <h3>8</h3>
                <p>Departments</p>
            </div>
            <div className="courses-stat-item">
                <h3>Value</h3>
                <p>Added Courses</p>
            </div>
            <div className="courses-stat-item">
                <h3>Expert</h3>
                <p>Faculty Members</p>
            </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-width-container courses-content-section">
        
        <div className="courses-text-block">
            <p>Intensely curious and driven to explore, JEC values rigorous analytical thinking, ingenuity, hands-on problem solving, and big new ideas. Globalization has beautifully integrated the world of technology. There is an ever-expanding requirement of quality human resources who can respond to the complex requirements of this sector.</p>
        </div>

        <h2 className="courses-section-title">1. Bachelor of Technology (B.Tech)</h2>
        <div className="courses-text-block">
            <p><strong>Duration:</strong> 4 Years / 8 Semesters (for 10+2 applicants)<br />
            <strong>Eligibility:</strong> 10+2 passed with min 45% marks (40% for reserved). Subjects: Physics & Math (Compulsory) + one optional subject.</p>
            <p>The exciting journey of B.Tech is for those willing to enrich themselves with the vastness of technology. JEC ensures purposeful environments through excellent faculty, motivated students, and modern infrastructure.</p>
        </div>

        <div className="courses-table-container">
            <table className="courses-data-table">
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Total Seats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Computer Science Engineering</td><td>90</td></tr>
                  
                    <tr><td>Computer Science Engineering (AI)</td><td>30</td></tr>
                    <tr><td>Electronics & Comm. Engineering</td><td>30</td></tr>
                    <tr><td>Electrical Engineering</td><td>60</td></tr>
                    <tr><td>Mechanical Engineering</td><td>90</td></tr>
                    <tr><td>Civil Engineering</td><td>120</td></tr>
                    <tr><td><strong>Total Intake</strong></td><td><strong>480</strong></td></tr>
                </tbody>
            </table>
        </div>

        <h2 className="courses-section-title" style={{ borderColor: 'var(--courses-logo-red)' }}>2. Lateral Entry (Direct 2nd Year)</h2>
        <div className="courses-highlight-box">
            <p><strong>Duration:</strong> 3 Years / 6 Semesters</p>
            <p>Intended for meritorious Diploma holders or B.Sc. graduates. 10% seats over total intake are reserved. Admission via centralized counseling or direct application based on AICTE norms.</p>
        </div>

        <h2 className="courses-section-title">3. Master of Technology (M.Tech)</h2>
        <div className="courses-text-block">
            <p><strong>Duration:</strong> 2 Years / 4 Semesters</p>
            <p>Approved by AICTE & Affiliated to RTU, Kota. Eligibility: B.Tech/BE with 50% marks (45% reserved).</p>
        </div>

        <div className="courses-grid">
            <div className="courses-card courses-mtech">
                <h3>Digital Communication</h3>
                <span className="courses-duration">18 Seats</span>
                <p>Advanced study in communication systems and signal processing.</p>
            </div>
            <div className="courses-card courses-mtech">
                <h3>Production Engineering</h3>
                <span className="courses-duration">18 Seats</span>
                <p>Focus on manufacturing technology and industrial management.</p>
            </div>
            <div className="courses-card courses-mtech">
                <h3>Computer Science</h3>
                <span className="courses-duration">18 Seats</span>
                <p>Specialization in algorithms, data science, and software architecture.</p>
            </div>
            <div className="courses-card courses-mtech">
                <h3>Power System</h3>
                <span className="courses-duration">18 Seats</span>
                <p>In-depth analysis of power generation, transmission, and distribution.</p>
            </div>

              <div className="courses-card courses-mtech">
                <h3>Environmental Engineering</h3>
                <span className="courses-duration">18 Seats</span>
                <p>Focuses on sustainable development and managing natural resources. Addresses water, air, and waste management challenges.</p>
            </div>
        </div>

        <h2 className="courses-section-title" style={{ borderColor: 'var(--courses-logo-gold)' }}>4. Bachelor of Vocation (B.Voc)</h2>
        <div className="courses-text-block">
            <p><strong>Duration:</strong> 3 Years / 6 Semesters</p>
            <p>Skill-development based higher education with multiple entry/exit options (Certificate, Diploma, Advanced Diploma). Aligned with National Skills Qualifications Framework (NSQF).</p>
        </div>
        <div className="courses-table-container">
            <table className="courses-data-table">
                <thead>
                    <tr>
                        <th>Discipline</th>
                        <th>Seats</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Software Development</td><td>25</td></tr>
                    <tr><td>Production Technology</td><td>25</td></tr>
                    <tr><td>Electronic Manufacturing Services</td><td>25</td></tr>
                    <tr><td>Automotive Manufacturing Technology</td><td>25</td></tr>
                    <tr><td><strong>Total Seats</strong></td><td><strong>100</strong></td></tr>
                </tbody>
            </table>
        </div>

        <div className="courses-karma-section">
            <h3>5. KARMA Skill Courses (AICTE)</h3>
            <p className="courses-text-block">AICTE's "Kaushal Augmentation and Restructuring Mission" (KARMA) integrates vocational education. JEC offers various skill courses under this scheme.</p>
            <ul className="courses-karma-list" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>Any 10th pass and above may join. No age bar.</li>
                <li>Preference to local community learners.</li>
                <li>5% seats offered to PwD students under fee waiver.</li>
                <li>Round-the-year admission based on course duration.</li>
            </ul>
            <a  style={{ color: 'var(--courses-logo-blue)', fontWeight: 'bold', marginTop: '15px', display: 'inline-block' }}>View 24 KARMA Courses &rarr;</a>
        </div>

        <h2 className="courses-section-title" style={{ marginTop: '60px' }}>Career Opportunities</h2>
        <div className="courses-text-block">
            <p>Students have a gamut of career options after B.Tech in MNCs (Software, Core Engineering), Startups, or Higher Studies (M.Tech, MBA). Opportunities in Government sectors (PSUs like BEL, BHEL, ONGC, NTPC) are also vast through GATE scores.</p>
        </div>

      </div>

      <section className="courses-contact-bar">
        <div className="max-width-container">
            <h3>Meet Your Admission Counselor</h3>
            <p>Don't miss out on your lifetime opportunity! We are here to assist you.</p>
            <p style={{ marginTop: '15px', fontSize: '18px' }}>
                <i className="fas fa-phone-alt"></i> 8875071333 (30 Lines) | 
                <i className="fas fa-envelope"></i> <a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a>
            </p>
        </div>
      </section>

    </div>
  );
}

export default CoursesOffered;