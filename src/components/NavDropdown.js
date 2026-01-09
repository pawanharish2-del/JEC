// src/components/NavDropdown.js
import React from 'react';

function NavDropdown({ title, items, baseLink = "#", align = "left", closeMenu, isOpen, onToggle }) {

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggle) onToggle();
    };

    const handleItemClick = () => {
        if (closeMenu) closeMenu();
    };

    return (
        <div className={`menu-item has-dropdown ${isOpen ? 'dropdown-active' : ''}`}>
            <a
                href={baseLink}
                className="menu-link"
                onClick={handleToggle}
            >
                {title}
                <i className={`fas fa-chevron-down menu-arrow-icon ${isOpen ? 'rotate' : ''}`}></i>
            </a>

            <div className={`submenu-container ${align === 'right' ? 'align-right' : align === 'center' ? 'align-center' : ''} ${isOpen ? 'show' : ''}`}>
                <div className="submenu-grid">
                    {items.map((item, index) => (
                        <a
                            key={index}
                            href={item.path}
                            className="submenu-link"
                            onClick={handleItemClick}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NavDropdown;