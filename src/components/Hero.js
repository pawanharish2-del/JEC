// src/components/Hero.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import '../styles/HeroSlider.css';

// --- IMPORT LOCAL ASSET ---
import heroBannerImg from '../assets/jec-banner-home.png';

const DEFAULT_BANNER = {
    imageUrl: heroBannerImg,
    heading: "Jaipur’s best engineering college for your bright future.",
    subheading: "Empowering young minds through innovation.",
    altText: "Jaipur Engineering College (JEC) Main Campus Building"
};

function Hero() {
    const [banners, setBanners] = useState([DEFAULT_BANNER]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannersRef = collection(db, "home_banners");
                const q = query(bannersRef, orderBy("order"));
                const querySnapshot = await getDocs(q);

                const bannerList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (bannerList.length > 0) {
                    bannerList[0].imageUrl = DEFAULT_BANNER.imageUrl;
                    setBanners(bannerList);
                }
            } catch (error) {
                console.error("Error fetching banners:", error);
            }
        };

        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === banners.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const nextSlide = () => {
        setCurrentIndex(currentIndex === banners.length - 1 ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? banners.length - 1 : currentIndex - 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section className="hero-slider" style={{ position: 'relative', overflow: 'hidden' }}>
            {banners.map((banner, index) => (
                <div
                    key={index}
                    className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
                >
                    <img
                        src={banner.imageUrl}
                        alt={banner.altText || "Jaipur Engineering College (JEC)"}
                        className="hero-bg-image"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: -1
                        }}
                    />

                    <div className="hero-overlay"></div>

                    <div className="hero-content">
                        <h1>{banner.heading}</h1>
                        <div className="hero-underline"></div>
                        {banner.subheading && <p>{banner.subheading}</p>}
                        <a href="/admission-enquiry" className="apply-btn">
                            Apply for Admission
                        </a>
                    </div>
                </div>
            ))}

            {banners.length > 1 && (
                <>
                    <button className="slider-arrow prev" onClick={prevSlide}>❮</button>
                    <button className="slider-arrow next" onClick={nextSlide}>❯</button>

                    <div className="slider-dots">
                        {banners.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            ></span>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

export default Hero;