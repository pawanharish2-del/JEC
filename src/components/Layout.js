// src/components/Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Import your shared components
import Sidebar from './Sidebar';
import Header from './Header';
import Subheader from './Subheader';
import Footer from './Footer';
import LogoCarousel from './LogoCarousel'; // IMPORT THE CAROUSEL

function Layout() {
    const location = useLocation();

    // LOGIC: Check if the current path indicates a specific Album View.
    // The main gallery is "/Gallery", but an album view is "/Gallery/some-id".
    // We check if the path starts with "/Gallery/" to catch the album views.
    const isAlbumView = location.pathname.startsWith('/Gallery/');

    return (
        <>
            <Sidebar />

            {/* Conditionally render the sticky header.
                If we are in an Album View, this entire block is skipped. */}
            {!isAlbumView && (
                <div className="sticky-header">
                    <Header />
                    <Subheader />
                </div>
            )}

            <main>
                {/* This Outlet is the placeholder for your pages */}
                <Outlet />
            </main>

            {/* Added Just Above Footer */}
            <LogoCarousel />

            <Footer />
        </>
    );
}

export default Layout;