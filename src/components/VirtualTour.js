// src/components/VirtualTour.js
import React, { useState, useEffect, useRef } from 'react';
import '../styles/VirtualTour.css';

function VirtualTour() {
    const [isMuted, setIsMuted] = useState(true);
    const playerRef = useRef(null);

    // The specific Campus Tour Video ID from your link
    const videoId = '3JjaFQSvtZU';

    useEffect(() => {
        // 1. Load the YouTube IFrame API script if it doesn't exist
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.head.appendChild(tag);
        }

        // 2. Use an interval to safely check for API readiness
        // This prevents 'onYouTubeIframeAPIReady' conflicts with other components.
        const checkYTReady = setInterval(() => {
            if (window.YT && window.YT.Player && !playerRef.current) {
                playerRef.current = new window.YT.Player('virtual-tour-player', {
                    videoId: videoId,
                    host: 'https://www.youtube.com', // Explicitly set for Vercel security
                    playerVars: {
                        autoplay: 1,
                        mute: 1,
                        loop: 1,
                        playlist: videoId, // Required for the loop to function
                        controls: 0,
                        modestbranding: 1,
                        playsinline: 1, // Crucial for mobile autoplay
                        rel: 0,
                        enablejsapi: 1,
                        origin: window.location.origin // Fixes the 'postMessage' error
                    },
                    events: {
                        onReady: (event) => {
                            event.target.mute();
                            event.target.playVideo();
                        },
                        onStateChange: (event) => {
                            // Instant restart when the 1:25 video ends
                            if (event.data === window.YT.PlayerState.ENDED) {
                                event.target.playVideo();
                            }
                        }
                    },
                });

                // Once initialized, stop checking
                clearInterval(checkYTReady);
            }
        }, 500); // Check every 0.5 seconds

        return () => clearInterval(checkYTReady);
    }, [videoId]);

    const handleToggleMute = (e) => {
        // Stop events to prevent mobile taps from being swallowed
        e.preventDefault();
        e.stopPropagation();

        if (playerRef.current && typeof playerRef.current.unMute === 'function') {
            if (isMuted) {
                playerRef.current.unMute();
                playerRef.current.setVolume(100); // Ensure audible sound
                setIsMuted(false);
            } else {
                playerRef.current.mute();
                setIsMuted(true);
            }
        }
    };

    return (
        <section className="take-a-tour">
            {/* Background Video Layer */}
            <div className="tour-video-container">
                <div id="virtual-tour-player"></div>
                <div className="tour-overlay"></div>
            </div>

            <div className="take-a-tour-content">
                <h2 className="take-a-tour-title">JEC Campus Experience</h2>
                <p className="take-a-tour-subtitle">Experience our world-class infrastructure and vibrant campus life in this immersive tour.</p>

                <div className="tour-actions">
                    <button
                        className={`tour-mute-btn ${!isMuted ? 'active' : ''}`}
                        onPointerDown={handleToggleMute}
                        type="button"
                    >
                        <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                        {isMuted ? ' Unmute Tour' : ' Mute Tour'}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default VirtualTour;