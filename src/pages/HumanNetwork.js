import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';

// IMPORT THE IMAGE HERE
import building from '../assets/jec-building.jpeg';
import '../styles/HumanNetwork.css';

// Helper to check if a member is HOD
const isHOD = (member) => {
    if (member.isHod === true) return true; // Check for explicit boolean from Admin
    if (!member.role) return false;
    const r = member.role.toLowerCase();
    return r.includes('hod') || r.includes('head of department') || r.includes('head of dept');
};

// Helper to extract numeric years from experience string (e.g. "12 Years" -> 12)
const getExperienceYears = (expString) => {
    if (!expString) return 0;
    const match = expString.toString().match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
};

// Helper Component for a single card
const FacultyCard = ({ member }) => {
    const isHead = isHOD(member);

    return (
        <div className={`faculty-card ${isHead ? 'hod-card' : ''}`}>
            {/* HOD BADGE */}
            {isHead && <div className="hod-badge">HOD</div>}

            <div className="card-header">
                <img
                    src={member.image || "https://www.w3schools.com/howto/img_avatar.png"}
                    alt={member.name}
                    className="avatar"
                />
                <div className="faculty-name">{member.name}</div>
                <div className="faculty-role">{member.role}</div>
            </div>
            <div className="card-body">
                <div className="info-row">
                    <i className="fas fa-graduation-cap"></i> <span>Qualification: {member.qualification}</span>
                </div>
                <div className="info-row">
                    <i className="fas fa-briefcase"></i> <span>Experience: {member.experience}</span>
                </div>
                <div className="research-area">
                    <i className="fas fa-microscope"></i> {member.researchArea}
                </div>
            </div>
            <div className="card-footer">
                <a href={`mailto:${member.email}`} className="email-btn">
                    <i className="fas fa-envelope"></i> Email Me
                </a>
            </div>
        </div>
    );
};

function HumanNetwork() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);

    // Definition of departments
    const departments = [
        { id: 'cse', title: 'Computer Science Engineering' },
        { id: 'ee', title: 'Electrical Engineering' },
        { id: 'ece', title: 'Electronics & Comm. Engg.' },
        { id: 'me', title: 'Mechanical Engineering' },
        { id: 'ash', title: 'Applied Sciences & Humanities' },
        { id: 'civil', title: 'Civil Engineering' }
    ];

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const facultyRef = collection(db, "faculty_members");
                const q = query(facultyRef, orderBy("order"));
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setFaculty(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching faculty:", error);
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);

    const filterFaculty = (dept) => {
        setActiveFilter(dept);
    };

    if (loading) {
        return (
            <div className="human-network-page">
                <section className="faculty-hero">
                    <img src={building} alt="Campus Building" className="hero-bg-img" />
                    <div className="hero-overlay">
                        <div className="max-width-container">
                            <h1>Loading Network...</h1>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="human-network-page">

            {/* HERO SECTION */}
            <section className="faculty-hero">
                <img src={building} alt="Campus Building" className="hero-bg-img" />
                <div className="hero-overlay">
                    <div className="max-width-container">
                        <h1>Human Network @ JEC</h1>
                        <p>Meet the dedicated minds shaping the future of engineering.</p>
                    </div>
                </div>
            </section>

            {/* Filter Buttons */}
            <div className="filter-container">
                <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => filterFaculty('all')}>All Departments</button>
                <button className={`filter-btn ${activeFilter === 'cse' ? 'active' : ''}`} onClick={() => filterFaculty('cse')}>Computer Science</button>
                <button className={`filter-btn ${activeFilter === 'ee' ? 'active' : ''}`} onClick={() => filterFaculty('ee')}>Electrical Engg.</button>
                <button className={`filter-btn ${activeFilter === 'ece' ? 'active' : ''}`} onClick={() => filterFaculty('ece')}>Electronics & Comm.</button>
                <button className={`filter-btn ${activeFilter === 'me' ? 'active' : ''}`} onClick={() => filterFaculty('me')}>Mechanical Engg.</button>
                <button className={`filter-btn ${activeFilter === 'ash' ? 'active' : ''}`} onClick={() => filterFaculty('ash')}>Applied Sciences</button>
                <button className={`filter-btn ${activeFilter === 'civil' ? 'active' : ''}`} onClick={() => filterFaculty('civil')}>Civil Engg.</button>
            </div>

            <div className="max-width-container faculty-section">

                {/* Loop through defined departments */}
                {departments.map((dept) => {
                    // 1. Check if we should show this department based on user click
                    if (activeFilter !== 'all' && activeFilter !== dept.id) return null;

                    // 2. Filter data for this department (UPDATED LOGIC HERE)
                    const rawMembers = faculty.filter(m => {
                        if (Array.isArray(m.department)) {
                            // New Format: Check if the list contains this department ID
                            return m.department.includes(dept.id);
                        } else {
                            // Old Format: Check if the string matches exactly
                            return m.department === dept.id;
                        }
                    });

                    // 3. SORTING LOGIC: HOD first -> Then Experience (High to Low)
                    const deptMembers = [...rawMembers].sort((a, b) => {
                        const aIsHod = isHOD(a);
                        const bIsHod = isHOD(b);

                        // If one is HOD and the other isn't, HOD wins (return -1)
                        if (aIsHod && !bIsHod) return -1;
                        if (!aIsHod && bIsHod) return 1;

                        // If both are HOD or neither is HOD, sort by Experience
                        const expA = getExperienceYears(a.experience);
                        const expB = getExperienceYears(b.experience);

                        return expB - expA;
                    });

                    // If no members found for this department, don't render the header
                    if (deptMembers.length === 0) return null;

                    return (
                        <div key={dept.id}>
                            <h2 className="dept-title show">{dept.title}</h2>
                            <div className="faculty-grid show">
                                {deptMembers.map(member => (
                                    <FacultyCard key={member.id} member={member} />
                                ))}
                            </div>
                        </div>
                    );
                })}

                {/* Fallback if no data found */}
                {faculty.length === 0 && (
                    <p style={{ textAlign: 'center' }}>No faculty members found. Please check your database connection.</p>
                )}

            </div>
        </div>
    );
}

export default HumanNetwork;