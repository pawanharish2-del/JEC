import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import ImageUpload from '../components/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';

const EditGallery = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  // New Album Form State
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [newAlbumCover, setNewAlbumCover] = useState('');
  const [newAlbumAlt, setNewAlbumAlt] = useState(''); // 1. Cover Alt Text

  // New Photo Alt State
  const [photoAlt, setPhotoAlt] = useState(''); // 2. Photo Alt Text for Upload

  // --- 1. FETCH ALBUMS ---
  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "albums"));
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAlbums(list);
    } catch (error) {
      console.error("Error fetching albums:", error);
      toast.error("Failed to load albums.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // --- 2. CREATE ALBUM ---
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumTitle || !newAlbumCover || !newAlbumAlt) {
      return toast.warn("Title, Cover Image, and Cover Alt Text are required.");
    }

    try {
      await addDoc(collection(db, "albums"), {
        title: newAlbumTitle,
        cover: newAlbumCover,
        coverAlt: newAlbumAlt, // Save Cover Alt
        count: 0,
        images: [] 
      });
      toast.success("Album created!");
      setNewAlbumTitle('');
      setNewAlbumCover('');
      setNewAlbumAlt('');
      fetchAlbums();
    } catch (error) {
      toast.error("Error creating album.");
    }
  };

  // --- 3. DELETE ALBUM ---
  const handleDeleteAlbum = async (albumId) => {
    if (!window.confirm("Delete this entire album?")) return;
    try {
      await deleteDoc(doc(db, "albums", albumId));
      toast.success("Album deleted.");
      fetchAlbums();
      setSelectedAlbum(null);
    } catch (error) {
      toast.error("Error deleting album.");
    }
  };

  // --- 4. ADD PHOTO TO ALBUM ---
  const handleAddPhoto = async (url) => {
    if (!selectedAlbum) return;
    if (!photoAlt) {
        toast.warn("Alt text was missing! Saved with default."); 
    }
    const finalAlt = photoAlt || "Gallery Image";

    try {
      const albumRef = doc(db, "albums", selectedAlbum.id);
      
      const newPhotoObj = { url: url, alt: finalAlt }; // Save as Object

      await updateDoc(albumRef, {
        images: arrayUnion(newPhotoObj),
        count: (selectedAlbum.images?.length || 0) + 1 
      });

      toast.success("Photo added!");
      setPhotoAlt(''); // Reset input
      
      // Update local state
      setSelectedAlbum(prev => ({
        ...prev,
        images: [...(prev.images || []), newPhotoObj],
        count: (prev.count || 0) + 1
      }));
      
    } catch (error) {
      console.error(error);
      toast.error("Error adding photo.");
    }
  };

  // --- 5. DELETE PHOTO ---
  const handleDeletePhoto = async (photoObj) => {
    if (!window.confirm("Remove this photo?")) return;
    try {
      const albumRef = doc(db, "albums", selectedAlbum.id);
      
      await updateDoc(albumRef, {
        images: arrayRemove(photoObj),
        count: selectedAlbum.images.length - 1
      });

      toast.success("Photo removed.");

      setSelectedAlbum(prev => ({
        ...prev,
        images: prev.images.filter(img => img.url !== photoObj.url),
        count: prev.count - 1
      }));
    } catch (error) {
      toast.error("Error deleting photo.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <ToastContainer />
      
      {/* Header logic ... */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px', borderBottom:'2px solid #eee', paddingBottom:'10px'}}>
        <h2>{selectedAlbum ? `Editing: ${selectedAlbum.title}` : 'Manage Photo Albums'}</h2>
        {selectedAlbum && (
            <button onClick={() => setSelectedAlbum(null)} style={styles.backBtn}>← Back</button>
        )}
      </div>

      {!selectedAlbum ? (
        // --- ALBUM LIST ---
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            <div style={styles.card}>
                <h3>Create New Album</h3>
                <form onSubmit={handleCreateAlbum}>
                    <label style={styles.label}>Album Title</label>
                    <input type="text" value={newAlbumTitle} onChange={e => setNewAlbumTitle(e.target.value)} style={styles.input} />
                    
                    <label style={styles.label}>Cover Image</label>
                    <ImageUpload onUploadComplete={setNewAlbumCover} label="Upload Cover" />
                    {newAlbumCover && <img src={newAlbumCover} alt="Preview" style={{width:'100%', height:'150px', objectFit:'cover', margin:'10px 0'}} />}
                    
                    <label style={styles.label}>Cover Alt Text</label>
                    <input 
                        type="text" 
                        value={newAlbumAlt} 
                        onChange={e => setNewAlbumAlt(e.target.value)} 
                        style={styles.input} 
                        placeholder="e.g. Convocation Ceremony Hall"
                        required
                    />

                    <button type="submit" style={styles.saveBtn}>Create Album</button>
                </form>
            </div>
            {/* List ... */}
            <div style={styles.grid}>
                {albums.map(album => (
                    <div key={album.id} style={styles.albumCard}>
                         {/* Update Alt here too */}
                        <div style={{height:'150px', overflow:'hidden', position:'relative'}} onClick={() => setSelectedAlbum(album)}>
                            <img src={album.cover} alt={album.coverAlt || album.title} style={{width:'100%', height:'100%', objectFit:'cover', cursor:'pointer'}} />
                            <div style={styles.overlay}>Manage Photos</div>
                        </div>
                        <div style={{padding:'10px'}}>
                            <h4 style={{margin:'0 0 5px 0'}}>{album.title}</h4>
                            <p style={{fontSize:'12px', color:'#666', margin:0}}>{album.images?.length || 0} Photos</p>
                            <button onClick={() => handleDeleteAlbum(album.id)} style={styles.deleteBtn}>Delete Album</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      ) : (
        // --- MANAGE PHOTOS ---
        <div>
            <div style={{...styles.card, marginBottom:'30px'}}>
                <h3>Add Photos to {selectedAlbum.title}</h3>
                <div style={{ marginBottom: '15px' }}>
                    <label style={styles.label}>Step 1: Enter Alt Text for next photo</label>
                    <input 
                        type="text" 
                        value={photoAlt} 
                        onChange={e => setPhotoAlt(e.target.value)} 
                        style={styles.input} 
                        placeholder="e.g. Student receiving award"
                    />
                </div>
                {/* Disable upload if no alt text? Or just warn. Here we rely on user discipline + warning in handleAddPhoto */}
                <label style={styles.label}>Step 2: Upload Image</label>
                <ImageUpload onUploadComplete={handleAddPhoto} label="Upload Photo" />
            </div>

            <div style={styles.photoGrid}>
                {selectedAlbum.images?.map((imgObj, index) => {
                    // Handle legacy data (string) vs new data (object)
                    const url = typeof imgObj === 'string' ? imgObj : imgObj.url;
                    const alt = typeof imgObj === 'string' ? "Gallery Photo" : imgObj.alt;

                    return (
                        <div key={index} style={styles.photoCard}>
                            <img src={url} alt={alt} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                            <div style={{position:'absolute', bottom:0, background:'rgba(0,0,0,0.6)', color:'white', width:'100%', fontSize:'10px', padding:'5px'}}>
                                {alt}
                            </div>
                            <button onClick={() => handleDeletePhoto(imgObj)} style={styles.photoDeleteBtn}>&times;</button>
                        </div>
                    );
                })}
            </div>
        </div>
      )}
    </div>
  );
};

// Styles (same as before)
const styles = {
  card: { background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' },
  label: { display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize:'14px', color:'#444' },
  input: { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom:'15px' },
  saveBtn: { width: '100%', padding: '12px', background: '#0072C6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
  backBtn: { background: '#64748b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' },
  albumCard: { background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' },
  overlay: { position:'absolute', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', color:'white', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'0.2s', fontWeight:'bold', pointerEvents:'none' },
  deleteBtn: { marginTop:'10px', padding:'5px 10px', background:'#fee2e2', color:'#ef4444', border:'none', borderRadius:'4px', cursor:'pointer', fontSize:'12px', width:'100%' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  photoCard: { position: 'relative', height: '150px', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
  photoDeleteBtn: { position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }
};

export default EditGallery;