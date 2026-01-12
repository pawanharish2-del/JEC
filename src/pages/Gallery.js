import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Gallery.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Gallery() {
    const [galleryData, setGalleryData] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumImages, setAlbumImages] = useState([]);
    const [viewerIndex, setViewerIndex] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    // Routing hooks
    const { albumId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "albums"));
                const albums = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setGalleryData(albums);
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };
        fetchGallery();
    }, []);

    // Effect to sync the modal state with the URL parameter
    useEffect(() => {
        if (albumId && galleryData.length > 0) {
            // Find the album matching the ID in the URL
            const album = galleryData.find(a => a.id === albumId);

            if (album) {
                const sourceImages = album.images || [];
                const normalizedImages = sourceImages.map(img => {
                    if (typeof img === 'string') {
                        return { url: img, alt: album.title + " Photo" };
                    }
                    return img;
                });

                setAlbumImages(normalizedImages);
                setSelectedAlbum(album);
                document.body.style.overflow = 'hidden';
            }
        } else if (!albumId) {
            // Close modal if no ID is present in the URL
            setSelectedAlbum(null);
            setAlbumImages([]);
            document.body.style.overflow = 'auto';
        }
    }, [albumId, galleryData]);

    // Navigate to the new URL instead of manually setting state
    const handleAlbumClick = (album) => {
        navigate(`/Gallery/${album.id}`);
    };

    // Return to main gallery path to close the modal
    const closeModal = () => {
        navigate('/Gallery');
    };

    const openImageViewer = (index) => {
        setViewerIndex(index);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setIsViewerOpen(false);
        setViewerIndex(null);
    };

    const changeImage = useCallback((direction) => {
        if (!isViewerOpen || viewerIndex === null) return;
        let newIndex = viewerIndex + direction;
        if (newIndex >= albumImages.length) newIndex = 0;
        else if (newIndex < 0) newIndex = albumImages.length - 1;
        setViewerIndex(newIndex);
    }, [isViewerOpen, viewerIndex, albumImages.length]);

    return (
        <div className="gallery-page">
            {/* --- HERO SECTION --- */}
            <header className="modern-hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <i className="fas fa-camera"></i> JEC MEMORIES
                    </div>
                    <h1>Capturing<br /><span>Excellence</span> & Life</h1>
                    <p>Explore our visual journey. From vibrant cultural fests to state-of-the-art labs, experience the JEC spirit through our lens.</p>
                </div>
                 {/* Hero Collage / Blob elements (Assuming CSS handles the visuals) */}
                 <div className="hero-collage">
                    <div className="blob blob-1"></div>
                    <div className="blob blob-2"></div>
                    {/* Add your hero images here if they aren't purely CSS background */}
                 </div>
            </header>

            <div className="container">
                <div className="section-header">
                    <div><h2>Event <span>Albums</span></h2></div>
                </div>

                <div className="album-grid">
                    {galleryData.map((item) => (
                        <div className="album-card" key={item.id} onClick={() => handleAlbumClick(item)}>
                            <div className="album-cover">
                                <img src={item.cover} alt={item.coverAlt || item.title} />
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

            {selectedAlbum && (
                <div className="modal">
                    <div className="modal-header">
                        {/* --- NEW BACK BUTTON ADDED HERE --- */}
                        <button className="back-btn" onClick={closeModal}>
                            Back to Albums
                        </button>
                        {/* ---------------------------------- */}

                        <h2 className="modal-title">{selectedAlbum.title}</h2>
                        <span className="close-btn" onClick={closeModal}>&times;</span>
                    </div>
                    
                    <div className="modal-grid">
                        {albumImages.map((imgObj, index) => (
                            <div className="modal-img-wrapper" key={index} onClick={() => openImageViewer(index)}>
                                <img src={imgObj.url} alt={imgObj.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isViewerOpen && (
                <div className="image-viewer">
                    <span className="viewer-close" onClick={closeImageViewer}>&times;</span>
                    <div className="viewer-nav viewer-prev" onClick={() => changeImage(-1)}>&#10094;</div>
                    <img className="viewer-img" src={albumImages[viewerIndex].url} alt={albumImages[viewerIndex].alt} />
                    <div className="viewer-nav viewer-next" onClick={() => changeImage(1)}>&#10095;</div>
                    <div className="image-counter">{viewerIndex + 1} / {albumImages.length}</div>
                </div>
            )}
        </div>
    );
}

export default Gallery;
