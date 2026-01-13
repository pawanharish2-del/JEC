// src/pages/Home.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

// Import existing components
import Hero from '../components/Hero';
import Highlights from '../components/Highlights';
import Stats from '../components/Stats';
import Programs from '../components/Programs';
import Team from '../components/Team';
import WhyJEC from '../components/WhyJEC';
import Outcomes from '../components/Outcomes';
import VideoTestimonials from '../components/VideoTestimonials'; // NEW IMPORT
import CampusLife from '../components/CampusLife';
import VirtualTour from '../components/VirtualTour';
import AdmissionPopup from '../components/AdmissionPopup';

function Home() {
    return (
        <>
            <AdmissionPopup />
            <Helmet>
                <title>Jaipur Engineering College (JEC) | Top Engineering College in Jaipur, Rajasthan</title>
                <meta
                    name="description"
                    content="JEC Jaipur is a premier AICTE-approved engineering institute affiliated with RTU. Offering B.Tech in CSE, AI, Civil, Electrical & Mechanical. Highest package ₹69 Lakh. Apply for 2025 Admissions!"
                />
                <meta name="keywords" content="JEC Jaipur, Best Engineering College in Jaipur, B.Tech Admission 2025, RTU Affiliated Colleges, Top Placement Engineering College Rajasthan" />
                <link rel="canonical" href="https://jeckukas.org.in/" />
            </Helmet>

            <Hero />
            <Highlights />
            <Stats />
            <Programs />
            <Team />
            <WhyJEC />
            <Outcomes />
            <VideoTestimonials /> {/* NEW SECTION ADDED HERE */}
            <CampusLife />
           
            <VirtualTour />
        </>
    );
}

export default Home;