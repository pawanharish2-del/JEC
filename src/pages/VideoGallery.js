// src/pages/VideoGallery.js
import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './VideoGallery.css';

const VideoGallery = () => {
  // --- State ---
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // --- 1. FETCH DATA FROM FIREBASE ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Fetch videos ordered by newest first (assuming you saved 'createdAt')
        const q = query(collection(db, "video_gallery"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const videoList = querySnapshot.docs.map(doc => ({
          id: doc.id,       // Firebase Document ID
          ...doc.data()     // Contains: title, videoId, category, url
        }));

        setVideos(videoList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video gallery:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // --- 2. GROUPING LOGIC ---
  const albums = useMemo(() => {
    const grouped = {};
    videos.forEach(vid => {
      // Create category array if it doesn't exist
      if (!grouped[vid.category]) grouped[vid.category] = [];
      grouped[vid.category].push(vid);
    });
    return grouped;
  }, [videos]);

  // --- Handlers ---
  
  // Level 1: Open Category
  const openCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeCategoryModal = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'auto'; // Unlock scroll
  };

  // Level 2: Play Video
  const playVideo = (videoId) => {
    setPlayingVideoId(videoId); // Ensure we pass the YouTube ID, not Doc ID
  };

  const closePlayer = () => {
    setPlayingVideoId(null);
  };

  // Escape Key Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (playingVideoId) {
          closePlayer();
        } else if (selectedCategory) {
          closeCategoryModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingVideoId, selectedCategory]);

  if (loading) {
    return <div className="video-gallery-wrapper" style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', color:'#fff', background:'#0F172A'}}>
        <h2>Loading Gallery...</h2>
    </div>;
  }

  // Helper to get a cover image for the collage (First 3 videos or placeholders)
  const cover1 = videos[0]?.videoId || 'dQw4w9WgXcQ';
  const cover2 = videos[1]?.videoId || 'dQw4w9WgXcQ';
  const cover3 = videos[2]?.videoId || 'dQw4w9WgXcQ';

  return (
    <div className="video-gallery-wrapper">
      
      {/* --- HERO SECTION --- */}
      <header className="modern-hero">
        <div className="hero-content">
          <div className="hero-badge"><i className="fas fa-film"></i> JEC VIDEO ARCHIVE</div>
          <h1>JEC in <br /><span>Motion</span> & Sound</h1>
          <p>Relive the energy of campus life, cultural fests, and academic milestones through our curated video collections.</p>
          <div className="scroll-indicator">
            <i className="fas fa-arrow-down"></i> Scroll to Video Albums
          </div>
        </div>
        
        <div className="hero-collage">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <img src={`https://img.youtube.com/vi/${cover1}/hqdefault.jpg`} className="collage-img img-main" alt="Main Video" />
          <img src={`https://img.youtube.com/vi/${cover2}/hqdefault.jpg`} className="collage-img img-sub-1" alt="Event Video" />
          <img src={`https://img.youtube.com/vi/${cover3}/hqdefault.jpg`} className="collage-img img-sub-2" alt="Campus Video" />
        </div>
      </header>

      {/* --- ALBUM GRID (MAIN PAGE) --- */}
      <div className="container">
        <div className="section-header">
          <div>
            <h2>Video <span>Albums</span></h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Select a category to view the playlist.</p>
          </div>
        </div>
        
        {Object.keys(albums).length === 0 ? (
            <div style={{textAlign:'center', color:'#666', padding:'40px'}}>No video albums found.</div>
        ) : (
            <div id="album-root" className="album-grid">
            {Object.entries(albums).map(([category, catVideos]) => {
                // Use the first video in the category as the cover
                const coverImg = `https://img.youtube.com/vi/${catVideos[0].videoId}/hqdefault.jpg`;
                const count = catVideos.length;
                
                return (
                <div key={category} className="album-card" onClick={() => openCategory(category)}>
                    <div className="album-cover">
                    <img src={coverImg} alt={category} />
                    <div className="folder-overlay">
                        <div className="view-btn">View Playlist</div>
                    </div>
                    </div>
                    <div className="album-info">
                    <span className="album-count">{count} Videos</span>
                    <div className="album-title">{category}</div>
                    </div>
                </div>
                );
            })}
            </div>
        )}
      </div>

      {/* --- CATEGORY MODAL (THE LIST) --- */}
      {selectedCategory && (
        <div id="categoryModal" className="category-modal">
          <div className="cat-header">
            <h2 id="modalTitle" className="cat-title">{selectedCategory}</h2>
            <button className="back-btn" onClick={closeCategoryModal}>
              <i className="fas fa-arrow-left"></i> Back to Albums
            </button>
          </div>
          <div id="videoListRoot" className="cat-grid">
            {albums[selectedCategory]?.map((vid) => {
              const thumb = `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`;
              return (
                <div key={vid.id} className="video-item" onClick={() => playVideo(vid.videoId)}>
                  <div className="vid-thumb">
                    <img src={thumb} loading="lazy" alt={vid.title} />
                    <div className="play-icon"><i className="fas fa-play-circle"></i></div>
                  </div>
                  <div className="vid-info">
                    <div className="vid-title">{vid.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- PLAYER OVERLAY (CINEMA MODE) --- */}
      {playingVideoId && (
        <div id="playerModal" className="player-overlay" onClick={closePlayer}>
          <span className="close-player" onClick={closePlayer}><i className="fas fa-times"></i></span>
          <div className="player-wrapper" onClick={(e) => e.stopPropagation()}>
            <iframe 
              id="youtubeFrame" 
              src={`https://www.youtube.com/embed/${playingVideoId}?autoplay=1&rel=0`} 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title="Video Player"
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default VideoGallery;