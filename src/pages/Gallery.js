// src/pages/Gallery.js
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Gallery.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ALBUM_ORDER = [
    "Classrooms", "Labs", "Library", "Seminar Hall", "Auditorium",
    "Skill Development Centre (SDC)", "All Sports Grounds", "Hostel",
    "Mess", "Canteen", "Counseling Room", "Events"
];

function Gallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumImages, setAlbumImages] = useState([]);

    // Viewer States
    const [viewerIndex, setViewerIndex] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isFading, setIsFading] = useState(false); // For fade effect

    // Touch Swipe Refs
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const { albumId } = useParams();
    const navigate = useNavigate();

    // --- 1. FETCH DATA ---
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "albums"));
                let albums = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        count: Array.isArray(data.images) ? data.images.length : 0
                    };
                });

                albums.sort((a, b) => {
                    let indexA = ALBUM_ORDER.indexOf(a.title);
                    let indexB = ALBUM_ORDER.indexOf(b.title);
                    if (indexA === -1) indexA = 999;
                    if (indexB === -1) indexB = 999;
                    return indexA - indexB;
                });

                setGalleryData(albums);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    // --- 2. HANDLE URL PARAMS ---
    useEffect(() => {
        if (albumId && galleryData.length > 0) {
            const album = galleryData.find(a => a.id === albumId);
            if (album) {
                const sourceImages = album.images || [];
                const normalizedImages = sourceImages.map(img => {
                    return typeof img === 'string' ? { url: img, alt: album.title + " Photo" } : img;
                });
                setAlbumImages(normalizedImages);
                setSelectedAlbum(album);
                document.body.style.overflow = 'hidden';
            }
        } else if (!albumId) {
            setSelectedAlbum(null);
            setAlbumImages([]);
            document.body.style.overflow = 'auto';
        }
    }, [albumId, galleryData]);

    const handleAlbumClick = (album) => navigate(`/Gallery/${album.id}`);
    const closeModal = () => navigate('/Gallery');

    // --- 3. VIEWER LOGIC ---
    const openImageViewer = (index) => {
        setViewerIndex(index);
        setIsViewerOpen(true);
        setIsFading(false);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setViewerIndex(null);
    };

    const changeImage = useCallback((direction) => {
        if (!isViewerOpen || viewerIndex === null) return;

        // Trigger fade out
        setIsFading(true);

        setTimeout(() => {
            let newIndex = viewerIndex + direction;
            if (newIndex >= albumImages.length) newIndex = 0;
            else if (newIndex < 0) newIndex = albumImages.length - 1;

            setViewerIndex(newIndex);
            // Trigger fade in
            setIsFading(false);
        }, 150); // Match CSS transition time
    }, [isViewerOpen, viewerIndex, albumImages.length]);

    // Keyboard Support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isViewerOpen) return;
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') closeImageViewer();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewerOpen, changeImage]);

    // Swipe Logic
    const handleTouchStart = (e) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        if (touchEndX.current < touchStartX.current - 50) changeImage(1); // Swipe Left -> Next
        if (touchEndX.current > touchStartX.current + 50) changeImage(-1); // Swipe Right -> Prev
    };

    return (
        <div className="gallery-page">
            {/* HERO SECTION */}
            <header className="modern-hero">
                <div className="hero-content">
                    <div className="hero-badge"><i class="fas fa-camera"></i> JEC MEMORIES</div>
                    <h1>Capturing<br /><span>Excellence</span> & Life</h1>
                    <p>Explore our visual journey. From vibrant cultural fests to state-of-the-art labs, experience the JEC spirit through our lens.</p>
                    <div className="scroll-indicator">
                        <i className="fas fa-arrow-down"></i> Scroll to Albums
                    </div>
                </div>

                <div className="hero-collage">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg1.JPG?alt=media" className="collage-img img-main" alt="Campus Life" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg2.JPG?alt=media" className="collage-img img-sub-1" alt="Labs" />
                    <img src="https://firebasestorage.googleapis.com/v0/b/jec-website-55397.firebasestorage.app/o/images%2FBimg3.jpg?alt=media" className="collage-img img-sub-2" alt="Culture" />
                </div>
            </header>

            {/* ALBUM GRID */}
            <div className="container">
                <div className="section-header">
                    <div>
                        <h2>Event <span>Albums</span></h2>
                        <p>Select a category to view the full gallery.</p>
                    </div>
                </div>

                <div className="album-grid">
                    {galleryData.map((item) => (
                        <div className="album-card" key={item.id} onClick={() => handleAlbumClick(item)}>
                            <div className="album-cover">
                                <img src={item.cover} alt={item.title} />
                                <div className="album-overlay">
                                    <div className="view-btn">View Album</div>
                                </div>
                            </div>
                            <div className="album-info">
                                <div className="album-meta">
                                    <span className="album-count">{item.count} Photos</span>
                                </div>
                                <div className="album-title">{item.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL (ALBUM VIEW) */}
            {selectedAlbum && (
                <div className="modal">
                    <div className="modal-header">
                        <h2 className="modal-title">{selectedAlbum.title}</h2>
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                    </div>
                    <div className="modal-grid">
                        {albumImages.map((imgObj, index) => (
                            <div className="modal-img-wrapper" key={index} onClick={() => openImageViewer(index)}>
                                <img src={imgObj.url} alt={imgObj.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FULL SCREEN VIEWER */}
            {isViewerOpen && (
                <div
                    className="image-viewer"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* BACK BUTTON (Added Feature) */}
                    <div className="viewer-back" onClick={closeImageViewer}>
                        <i className="fas fa-arrow-left"></i> Back
                    </div>

                    <span className="viewer-close" onClick={closeImageViewer}>&times;</span>

                    <div className="viewer-nav viewer-prev" onClick={() => changeImage(-1)}>&#10094;</div>

                    <img
                        className="viewer-img"
                        src={albumImages[viewerIndex].url}
                        alt="Full View"
                        style={{ opacity: isFading ? 0.5 : 1 }}
                    />

                    <div className="viewer-nav viewer-next" onClick={() => changeImage(1)}>&#10095;</div>

                    <div className="image-counter">{viewerIndex + 1} / {albumImages.length}</div>
                    <div className="viewer-caption">Use Arrow Keys or Swipe to Navigate</div>
                </div>
            )}
        </div>
    );
}

export default Gallery;