// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

// Import your shared components
import Sidebar from './Sidebar';
import Header from './Header';
import Subheader from './Subheader';
import Footer from './Footer';
import LogoCarousel from './LogoCarousel'; // IMPORT THE CAROUSEL

function Layout() {
    return (
        <>
            <Sidebar />
            {/* This wrapper container allows both bars to be sticky together */}
            <div className="sticky-header">
                <Header />
                <Subheader />
            </div>

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