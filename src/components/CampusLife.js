import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import '../styles/CampusLife.css';

function CampusLife() {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize the navigate hook

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const galleryRef = collection(db, "campus_gallery");
                const q = query(galleryRef, orderBy("order"));
                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setGalleryItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching campus gallery:", error);
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Function to handle clicking a specific category card
    const handleCardClick = (item) => {
        if (item.linkedAlbumId) {
            // Navigates to /Gallery/album-id (e.g., /Gallery/library)
            navigate(`/Gallery/${item.linkedAlbumId}`);
        } else {
            // Fallback to general gallery if no specific ID is linked
            navigate('/Gallery');
        }
    };

    return (
        <section className="campus-life">
            <div className="campus-life-content">
                <div className="header-group">
                    <h2 className="campus-life-title">Campus Life at JEC</h2>
                    <p className="campus-life-desc">
                        Experience the vibrant life at JEC, from our cozy hostels and hygienic mess
                        to electrifying fests and academic infrastructure.
                    </p>
                </div>

                {loading ? (
                    <div className="loader-container"><p>Loading Vibrant Gallery...</p></div>
                ) : (
                    <div className="campus-gallery">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                className={`gallery-card ${item.isLarge ? 'card-wide' : ''}`}
                                onClick={() => handleCardClick(item)} // Trigger navigation on click
                                style={{ cursor: 'pointer' }} // Visual cue that card is clickable
                            >
                                <div className="image-wrapper">
                                    <img src={item.imageUrl} alt={item.alt || "Campus Life"} loading="lazy" />

                                    <div className="gallery-overlay">
                                        <div className="overlay-content">
                                            {item.category && <span className="item-category">{item.category}</span>}
                                            <h3>{item.overlayText || "Experience JEC"}</h3>
                                        </div>
                                    </div>

                                    {item.showPlayButton && (
                                        <div className="play-button-overlay">
                                            <span className="pulse-icon">▶</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="button-container">
                    <button
                        onClick={() => navigate('/Gallery')}
                        className="view-more-btn"
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        View More
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CampusLife;