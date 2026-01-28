import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

function LearningByDoing() {
    const navigate = useNavigate(); // 2. Initialize navigate

    // Helper function to handle click
    const handleLabClick = () => {
        navigate('/Gallery/7rnhHY8OdFkRMMXXOBoM');
    };

    // Lab Data List
    const labData = [
        { icon: "fas fa-atom", name: "Physics" },
        { icon: "fas fa-flask", name: "Chemistry" },
        { icon: "fas fa-keyboard", name: "Computer Programming" },
        { icon: "fas fa-laptop-code", name: "Computer Aided System Design" },
        { icon: "fas fa-database", name: "Database Management System" },
        { icon: "fas fa-paint-brush", name: "Computer Graphics & Multimedia" },
        { icon: "fas fa-terminal", name: "Shell Programming" },
        { icon: "fas fa-brain", name: "Artificial Intelligence" },
        { icon: "fas fa-code-branch", name: "Advanced OOPs" },
        { icon: "fa fa-bar-chart", name: "Data Science" },
        { icon: "fas fa-bolt", name: "Industrial Electronics" },
        { icon: "fas fa-microchip", name: "Microprocessor" },
        { icon: "fas fa-robot", name: "Electronics Workshop" },
        { icon: "fas fa-satellite-dish", name: "Communication Lab" },
        { icon: "fas fa-square-root-alt", name: "MATLAB" },
        { icon: "fas fa-cogs", name: "Dynamics of Machine" },
        { icon: "fas fa-water", name: "Fluid Mechanics" },
        { icon: "fas fa-temperature-high", name: "Heat Transfer" },
        { icon: "fas fa-wave-square", name: "Mechanical Vibrations" },
        { icon: "fas fa-dumbbell", name: "Strength of Material" },
        { icon: "fas fa-fire", name: "Thermal Engineering" },
        { icon: "fas fa-building", name: "Building, Planning & Design" },
        { icon: "fas fa-gem", name: "Material and Geology" },
    ];

    return (
        <div className="learning-page">

            {/* Hero Section */}
            <header className="learning-hero">
                <h1>Learning By Doing</h1>
                <p>Where Theory Meets Practice: Innovation in Action</p>
            </header>

            {/* Stats Floating Container */}
            <div className="learning-stats-container">
                <div className="learning-stats-grid">
                    <div className="learning-stat-card">
                        <div className="learning-stat-icon"><i className="fas fa-tasks"></i></div>
                        <div className="learning-stat-content">
                            <h3>Aptitude & Mock Tests</h3>
                            <p>Rigorous preparation for real-world scenarios.</p>
                        </div>
                    </div>
                    <div className="learning-stat-card">
                        <div className="learning-stat-icon"><i className="fas fa-users"></i></div>
                        <div className="learning-stat-content">
                            <h3>Group Discussions</h3>
                            <p>Forums for debating ideas and situational conversations.</p>
                        </div>
                    </div>
                    <div className="learning-stat-card">
                        <div className="learning-stat-icon"><i className="fas fa-project-diagram"></i></div>
                        <div className="learning-stat-content">
                            <h3>Live Projects</h3>
                            <p>UG / PG level projects integrated with industry needs.</p>
                        </div>
                    </div>
                    <div className="learning-stat-card">
                        <div className="learning-stat-icon"><i className="fas fa-vial"></i></div>
                        <div className="learning-stat-content">
                            <h3>Advanced Labs</h3>
                            <p>Experiments that impose designs on theoretical concepts.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="learning-container">

                {/* Engineering Section Split */}
                <div className="learning-section-split">
                    <div className="learning-text-block">
                        <h2>Engineering is incomplete without DOING.</h2>
                        <p>Engineering is incomplete without DOING what is being taught in the classrooms. Our well-equipped laboratory sessions enable each student to write codes, mend wires, work with machines, impose designs and do experiment with the theoretical concepts.</p>
                        <p>Jaipur Engineering College (JEC) has some of the finest workshops for Mechanical, Electronics and Communication, Civil and Electrical Engineering. The Computer Science and Information Technology labs are provided with latest soft wares for students. Labs help students learn and develop a healthy thought process.</p>
                    </div>
                    <div className="learning-img-block">
                        <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2Flab.jpg?alt=media&token=c44886fe-3fef-42ed-b19c-8de68445e5fe" alt="Engineering Workshop" />
                    </div>
                </div>

                {/* NetLab Section Split */}
                <div className="learning-section-split">
                    <div className="learning-img-block">
                        <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FCivil%20Engineering%20(1).png?alt=media&token=1d2cfc4e-669b-480c-8f19-1464116cd0f2" alt="NetLab Computers" />
                    </div>
                    <div className="learning-text-block">
                        <h2>The High-Tech NetLab</h2>
                        <p>Equipped with high-tech computer technology our NetLab has a collection of core processors with latest software and high speed internet access. There are experts around for any kind of assistance.</p>
                        <p>These integrated connectivity systems help students to stay connected with the buoyant world of internet, enabling research and global collaboration.</p>
                    </div>
                </div>

                {/* Lab Ecosystem Grid */}
                <div className="learning-lab-section">
                    <div className="learning-lab-header">
                        <h2>Explore Our Labs</h2>
                        <p>Click on any lab to view the gallery.</p>
                    </div>

                    <div className="learning-lab-grid">
                        {/* Mapped the lab data to make them all clickable links */}
                        {labData.map((lab, index) => (
                            <div
                                key={index}
                                className="learning-lab-card"
                                onClick={handleLabClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={lab.icon}></i>
                                <span className="learning-lab-name">{lab.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Case Study (FUSE) */}
                <div className="learning-story-wrapper">
                    <div className="learning-story-header">
                        <span>A Case in Point</span>
                        <h3>Learning By Doing at JEC</h3>
                    </div>

                    <div className="learning-story-content">
                        <div className="learning-story-text">
                            <p>Students in the <strong>Introduction to Engineering</strong> class take hands on learning to a whole new level of commitment – and they love doing it, despite the hours and hours it takes to complete the service learning projects. Called <strong>FUSE</strong>, an acronym for First Undergraduate Service Learning Experience, the program solicits projects from the public that let students apply the engineering design process to meet the unique needs of their customer.</p>

                            <p>“In almost every case, the students have to create a customized solution to solve the problem,” said <strong>Deepti Arora</strong>, who coordinates the Introduction to Engineering classes at Jaipur Engineering College. “Through service learning, students are able to contribute to the community in a meaningful way by working with a client to design, develop and deliver a solution to a real-world problem.”</p>

                            <p>One such success story comes from Rahul Kumar, an Ambuja Cement employee who is looking after the services as maintenance engineer there taking the extra plant knowledge to qualify for a promotion.</p>

                            <p>The project the students are talking about—the <strong>pyramid shaped rolling box</strong>—includes a small stereo, stick on letters, handles, and a white board. It’s on wheels that accommodate his standing walker but retract to be able to go through doorways, and the whole thing comes apart so it can go in a car trunk.</p>
                        </div>

                        <div className="learning-story-sidebar">
                            <div className="learning-quote-block">
                                "It took us five iterations and two prototypes to get this right."
                                <span className="learning-quote-author">— Rahul Kumar, Maintenance Engineer (Ambuja Cement)</span>
                            </div>

                            <div className="learning-project-details">
                                <h4>Project Breakdown</h4>
                                <div className="learning-detail-item"><i className="fas fa-check"></i> <span>Pyramid shaped rolling design</span></div>
                                <div className="learning-detail-item"><i className="fas fa-check"></i> <span>Retractable wheels for doorways</span></div>
                                <div className="learning-detail-item"><i className="fas fa-check"></i> <span>Modular disassembly for car trunks</span></div>
                                <div className="learning-detail-item"><i className="fas fa-check"></i> <span>Integrated stereo & whiteboard</span></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LearningByDoing;