// src/components/Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Import your shared components
import Sidebar from './Sidebar';
import Header from './Header';
import Subheader from './Subheader';
import Footer from './Footer';
import LogoCarousel from './LogoCarousel';
import Chatbot from './Chatbot'; // <--- 1. IMPORT THE CHATBOT

function Layout() {
    const location = useLocation();

    // Logic to hide header on Album View
    const isAlbumView = location.pathname.startsWith('/Gallery/');

    return (
        <>
            {/* 2. RENDER IT HERE - It will float on top of everything */}
            <Chatbot />

            <Sidebar />

            {!isAlbumView && (
                <div className="sticky-header">
                    <Header />
                    <Subheader />
                </div>
            )}

            <main>
                <Outlet />
            </main>

            <LogoCarousel />

            <Footer />
        </>
    );
}

export default Layout;