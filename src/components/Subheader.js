import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

// Full list of menu items for the search logic
const menuData = [
    { name: "Home", link: "/" },
    { name: "About JEC", link: "/jec/About-JEC" },
    { name: "Employment @ JEC", link: "/jec/Employment-JEC" },
    { name: "Management", link: "/jec/Management" },
    { name: "Institution Innovation Council", link: "/jec/Institution-Innovation-Council-JEC" },
    { name: "Anti-Ragging Committee", link: "/jec/Anti-Ragging-Committee" },
    { name: "Human Network", link: "/jec/network" },
    { name: "Alumni", link: "/jec/Alumni" },
    { name: "Students Testimonials", link: "/jec/Students-Testimonials" },
    { name: "JEC FAQ", link: "/jec/JEC-FAQ" },
    { name: "Admission Open 2025", link: "/admission/btech-admissions" },
    { name: "Admission Procedure", link: "/admission/Admission-Procedure" },
    { name: "Courses Offered", link: "/admission/Courses-Offered" },
    { name: "Fee Structure", link: "/admission/Fee-Structure" },
    { name: "Documents Required", link: "/admission/Documents-Required" },
    { name: "REAP-2025", link: "/admission/REAP-2025" },
    { name: "Financial Aids & Loans", link: "/admission/Financial-Aids-Bank-Loans" },
    { name: "Mandatory Disclosure", link: "/admission/Mandatory-Disclosure" },
    { name: "Karma Courses @ JEC", link: "/admission/Karma-Courses-JEC" },
    { name: "Computer Science & Eng. (AI)", link: "/JEC-engineering/Computer-Science-Engineering-AI" },
    { name: "Computer Science Engineering", link: "/JEC-engineering/Computer-Science-Engineering" },
    { name: "Information Technology", link: "/JEC-engineering/Information-Technology" },
    { name: "Electronics & Communication", link: "/JEC-engineering/Electronics-Communication-Engineering" },
    { name: "Civil Engineering", link: "/JEC-engineering/Civil-Engineering" },
    { name: "Mechanical Engineering", link: "/JEC-engineering/Mechanical-Engineering" },
    { name: "Electrical Engineering", link: "/JEC-engineering/Electrical-Engineering" },
    { name: "Applied Sciences & Humanities", link: "/JEC-engineering/Applied-Sciences-Humanities" },
    { name: "Centre Of Excellence (COE)", link: "/JEC-engineering/Centre-Of-Excellence-COE" },
    { name: "JEC Research Cell", link: "/JEC-engineering/JEC-Research-Cell" },
    { name: "Engineering @ JEC", link: "/JEC-engineering/Engineering-JEC" },
    { name: "MOOCS: NPTEL SWAYAM", link: "/JEC-engineering/MOOCS-NPTEL-SWAYAM" },

    // M.Tech Link
    { name: "M.Tech Programs", link: "/JEC-engineering/MTech" },

    { name: "Placement", link: "/placement" },
    { name: "Learning By Doing", link: "/Infrastructure/Learning-By-Doing" },
    { name: "Prepare and Present", link: "/Infrastructure/Prepare-and-Present" },
    { name: "Refuel and Relax", link: "/Infrastructure/Refuel-and-Relax" },
    { name: "Convenience and Safety", link: "/Infrastructure/Convenience-and-Safety" },
    { name: "JEC: Vibrant India", link: "/campus-life/jec-vibrant-india" },
    { name: "Academic Achievers", link: "/campus-life/academic-achievers" },
    { name: "Engineering Projects", link: "/campus-life/engineering-projects" },
    { name: "Games and Sports", link: "/campus-life/games-and-sports" },
    { name: "Guts n Glory", link: "/campus-life/guts-n-glory" },
    { name: "Committees Zone", link: "/campus-life/committees-zone" },
    { name: "Student Mental Health", link: "/campus-life/mental-health" },
    { name: "JEC Students Corner", link: "/campus-life/students-corner" },
    { name: "Image Gallery", link: "/Gallery" },
    { name: "Video Gallery", link: "/campus-life/video-gallery" },
    { name: "Blog", link: "/blog" },
    { name: "Foundation for Better Tomorrow", link: "/Our-Society/Foundation-for-Better-Tomorrow" },
    { name: "Key Teams & Functions", link: "/Our-Society/Key-Teams-Functions" },
    { name: "Agrasen College", link: "/Our-Society/Other-Institutes-Agrasen-College" },
    { name: "Jaipur College of Ed & Sci", link: "/Our-Society/Other-Institutes-Jaipur-College-of-Education-and-Science" },
    { name: "Contact Us", link: "/contact-us" }
];

function Subheader() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle for desktop search
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const location = useLocation();
    const searchRef = useRef(null);

    // Filter logic
    useEffect(() => {
        if (searchQuery.length > 1) {
            const filtered = menuData.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
            setShowSuggestions(true);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    // Close on navigation
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setShowSuggestions(false);
        setIsSearchOpen(false);
    }, [location]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
                if (searchQuery === '') setIsSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [searchQuery]);

    const toggleDropdown = (e, menuName) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === menuName ? null : menuName);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            // Updated to use window.location.href instead of navigate
            window.location.href = searchResults[0].link;
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    return (
        <div className="jec-nav-wrapper">
            <header className="jec-header">
                <div className="jec-container">

                    {/* LOGO */}
                    <a href="/" className="jec-logo-link">
                        <img src="/JEC-LOGO.png" alt="Logo" className="jec-logo-img" />
                    </a>

                    {/* HAMBURGER */}
                    <div className="jec-hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>

                    {/* MENU LIST */}
                    <ul className={`jec-menu-list ${isMobileMenuOpen ? 'jec-active' : ''}`}>

                        <li className="jec-menu-item"><a href="/" className="jec-nav-link">Home</a></li>

                        {/* JEC DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'jec' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'jec')}>JEC <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'jec' ? 'jec-show' : ''}`}>
                                <li><a href="/jec/About-JEC" className="jec-dropdown-link">About JEC</a></li>
                                <li><a href="/jec/Management" className="jec-dropdown-link">Management</a></li>
                                <li><a href="/jec/network" className="jec-dropdown-link">Faculty</a></li>
                                <li><a href="/jec/Alumni" className="jec-dropdown-link">Alumni</a></li>
                                <li><a href="/jec/Students-Testimonials" className="jec-dropdown-link">Students Testimonials</a></li>
                                <li><a href="/jec/Anti-Ragging-Committee" className="jec-dropdown-link">Anti-Ragging Committee</a></li>
                                <li><a href="/jec/Institution-Innovation-Council-JEC" className="jec-dropdown-link">Institution Innovation Council</a></li>
                                <li><a href="/jec/JEC-FAQ" className="jec-dropdown-link">JEC FAQ</a></li>
                                <li><a href="/jec/Employment-JEC" className="jec-dropdown-link">Employment @JEC</a></li>
                            </ul>
                        </li>

                        {/* ADMISSION DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'admission' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'admission')}>Admission <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'admission' ? 'jec-show' : ''}`}>
                                <li><a href="/admission/btech-admissions" className="jec-dropdown-link jec-highlight">Admission Open 2026</a></li>
                                <li><a href="/admission/Admission-Procedure" className="jec-dropdown-link">Admission Procedure</a></li>
                                <li><a href="/admission/Fee-Structure" className="jec-dropdown-link">Fee Structure</a></li>
                                <li><a href="/admission/Documents-Required" className="jec-dropdown-link">Documents Required</a></li>
                                <li><a href="/admission/Courses-Offered" className="jec-dropdown-link">Courses Offered</a></li>
                                <li><a href="/admission/REAP-2025" className="jec-dropdown-link">REAP-2025</a></li>
                                <li><a href="/admission/Financial-Aids-Bank-Loans" className="jec-dropdown-link">Financial Aids & Loans</a></li>
                                <li><a href="/admission/Mandatory-Disclosure" className="jec-dropdown-link">Mandatory Disclosure</a></li>
                                <li><a href="/admission/Skill-Courses-JEC" className="jec-dropdown-link">Skill Courses @JEC</a></li>
                            </ul>
                        </li>

                        {/* DEPARTMENTS DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'dept' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'dept')}>Departments <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'dept' ? 'jec-show' : ''}`}>
                                <li><a href="/JEC-engineering/Computer-Science-Engineering-AI" className="jec-dropdown-link">Computer Science & Eng. (AI)</a></li>
                                <li><a href="/JEC-engineering/Computer-Science-Engineering" className="jec-dropdown-link">Computer Science Engineering</a></li>
                               
                                <li><a href="/JEC-engineering/Electronics-Communication-Engineering" className="jec-dropdown-link">Electronics & Communication</a></li>
                                <li><a href="/JEC-engineering/Civil-Engineering" className="jec-dropdown-link">Civil Engineering</a></li>
                                <li><a href="/JEC-engineering/Mechanical-Engineering" className="jec-dropdown-link">Mechanical Engineering</a></li>
                                <li><a href="/JEC-engineering/Electrical-Engineering" className="jec-dropdown-link">Electrical Engineering</a></li>
                                <li><a href="/JEC-engineering/Applied-Sciences-Humanities" className="jec-dropdown-link">Applied Sciences & Humanities</a></li>
                                <li><a href="/JEC-engineering/Centre-Of-Excellence-COE" className="jec-dropdown-link">Centre Of Excellence (COE)</a></li>
                                <li><a href="/JEC-engineering/JEC-Research-Cell" className="jec-dropdown-link">JEC Research Cell</a></li>
                                <li><a href="/JEC-engineering/Engineering-JEC" className="jec-dropdown-link">Engineering @ JEC</a></li>
                                <li><a href="/JEC-engineering/MOOCS-NPTEL-SWAYAM" className="jec-dropdown-link">MOOCS: NPTEL SWAYAM</a></li>

                                {/* M.Tech Programs */}
                                <li><a href="/JEC-engineering/MTech" className="jec-dropdown-link">M.Tech Programs</a></li>
                            </ul>
                        </li>

                        <li className="jec-menu-item"><a href="/placement" className="jec-nav-link">Placement</a></li>

                        {/* INFRASTRUCTURE DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'infra' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'infra')}>Infrastructure <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-2 ${activeDropdown === 'infra' ? 'jec-show' : ''}`}>
                                <li><a href="/Infrastructure/Learning-By-Doing" className="jec-dropdown-link">Learning By Doing</a></li>
                                <li><a href="/Infrastructure/Prepare-and-Present" className="jec-dropdown-link">Prepare and Present</a></li>
                                <li><a href="/Infrastructure/Refuel-and-Relax" className="jec-dropdown-link">Refuel and Relax</a></li>
                                <li><a href="/Infrastructure/Convenience-and-Safety" className="jec-dropdown-link">Convenience and Safety</a></li>
                            </ul>
                        </li>

                        {/* CAMPUS LIFE DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'campus' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'campus')}>Campus Life <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-3 ${activeDropdown === 'campus' ? 'jec-show' : ''}`}>
                                <li><a href="/campus-life/jec-vibrant-india" className="jec-dropdown-link">JEC: Vibrant India</a></li>
                                <li><a href="/campus-life/academic-achievers" className="jec-dropdown-link">Academic Achievers</a></li>
                                <li><a href="/campus-life/engineering-projects" className="jec-dropdown-link">Engineering Projects</a></li>
                                <li><a href="/campus-life/games-and-sports" className="jec-dropdown-link">Games and Sports</a></li>
                                <li><a href="/campus-life/guts-n-glory" className="jec-dropdown-link">Guts n Glory</a></li>
                                <li><a href="/campus-life/committees-zone" className="jec-dropdown-link">Committees Zone</a></li>
                                <li><a href="/campus-life/mental-health" className="jec-dropdown-link">Student Mental Health</a></li>
                                <li><a href="/campus-life/students-corner" className="jec-dropdown-link">JEC Students Corner</a></li>
                                <li><a href="/Gallery" className="jec-dropdown-link">Image Gallery</a></li>
                                <li><a href="/campus-life/video-gallery" className="jec-dropdown-link">Video Gallery</a></li>
                            </ul>
                        </li>

                        {/* SOCIETY DROPDOWN */}
                        <li className={`jec-menu-item ${activeDropdown === 'society' ? 'jec-open' : ''}`}>
                            <a href="#!" className="jec-nav-link jec-toggle-btn" onClick={(e) => toggleDropdown(e, 'society')}>Society <i className="fas fa-chevron-down"></i></a>
                            <ul className={`jec-dropdown jec-mega jec-cols-2 ${activeDropdown === 'society' ? 'jec-show' : ''}`}>
                                <li><a href="/Our-Society/Foundation-for-Better-Tomorrow" className="jec-dropdown-link">Foundation for Better Tomorrow</a></li>
                                <li><a href="/Our-Society/Key-Teams-Functions" className="jec-dropdown-link">Key Teams & Functions</a></li>
                                <li><a href="/Our-Society/Other-Institutes-Agrasen-College" className="jec-dropdown-link">Agrasen College</a></li>
                                <li><a href="/Our-Society/Other-Institutes-Jaipur-College-of-Education-and-Science" className="jec-dropdown-link">Jaipur College of Ed & Sci</a></li>
                            </ul>
                        </li>

                        {/* SEARCH ICON */}
                        <li className="jec-menu-item jec-desktop-search" ref={searchRef}>
                            <div className={`jec-search-inline ${isSearchOpen ? 'active' : ''}`}>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus={isSearchOpen}
                                />
                                <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                                    <i className="fas fa-search"></i>
                                </button>
                                {showSuggestions && searchResults.length > 0 && isSearchOpen && (
                                    <ul className="jec-search-suggestions">
                                        {searchResults.map((res, i) => (
                                            <li key={i}><a href={res.link} onClick={() => setSearchQuery('')}>{res.name}</a></li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>

                        {/* MOBILE CONTACT */}
                        <div className="jec-mobile-contact">
                            <h4>Get In Touch</h4>
                            <div className="jec-contact-row"><i className="fas fa-map-marker-alt"></i><span>SP-43, RIICO Ind. Area, Kukas,<br />Jaipur - 302028</span></div>
                            <div className="jec-contact-row"><i className="fas fa-phone-alt"></i><a href="tel:+918875071333">+91-88750 71333</a></div>
                            <div className="jec-contact-row"><i className="fas fa-envelope"></i><a href="mailto:admission@jeckukas.org.in">admission@jeckukas.org.in</a></div>
                        </div>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Subheader;
