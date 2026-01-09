import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc, // Added for editing
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";
import ImageUpload from '../components/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageCampusLife = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null); // Tracks if we are editing an existing item

    // Form State
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [overlayText, setOverlayText] = useState('');
    const [alt, setAlt] = useState('');
    const [order, setOrder] = useState(0);
    const [isLarge, setIsLarge] = useState(false);
    const [showPlayButton, setShowPlayButton] = useState(false);
    const [linkedAlbumId, setLinkedAlbumId] = useState('');

    const galleryRef = collection(db, "campus_gallery");

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const q = query(galleryRef, orderBy("order", "asc"));
            const querySnapshot = await getDocs(q);
            setGalleryItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        } catch (error) {
            toast.error("Error fetching gallery");
            setLoading(false);
        }
    };

    // Populates the form with existing data for editing
    const startEdit = (item) => {
        setEditingId(item.id);
        setImageUrl(item.imageUrl);
        setCategory(item.category || '');
        setOverlayText(item.overlayText || '');
        setAlt(item.alt || '');
        setOrder(item.order || 0);
        setIsLarge(item.isLarge || false);
        setShowPlayButton(item.showPlayButton || false);
        setLinkedAlbumId(item.linkedAlbumId || '');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl) return toast.error("Please upload an image first");

        const entryData = {
            imageUrl,
            category,
            overlayText,
            alt,
            order: parseInt(order),
            isLarge,
            showPlayButton,
            linkedAlbumId,
            updatedAt: new Date()
        };

        try {
            if (editingId) {
                // UPDATE EXISTING DOCUMENT
                const docRef = doc(db, "campus_gallery", editingId);
                await updateDoc(docRef, entryData);
                toast.success("Entry updated successfully!");
            } else {
                // ADD NEW DOCUMENT
                await addDoc(galleryRef, { ...entryData, createdAt: new Date() });
                toast.success("Image added to Campus Life!");
            }
            resetForm();
            fetchGallery();
        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Remove this image from the gallery?")) {
            try {
                await deleteDoc(doc(db, "campus_gallery", id));
                toast.success("Removed successfully");
                fetchGallery();
            } catch (error) {
                toast.error("Delete failed");
            }
        }
    };

    const resetForm = () => {
        setEditingId(null); // Reset editing state
        setImageUrl('');
        setCategory('');
        setOverlayText('');
        setAlt('');
        setOrder(galleryItems.length + 1);
        setIsLarge(false);
        setShowPlayButton(false);
        setLinkedAlbumId('');
    };

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading Gallery Manager...</div>;

    return (
        <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
            <ToastContainer />
            <h2 style={{ color: '#0072C6', marginBottom: '30px', fontWeight: '700' }}>
                {editingId ? "Edit Gallery Item" : "Manage Campus Life Gallery"}
            </h2>

            {/* --- FORM SECTION --- */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '50px', border: '1px solid #e2e8f0' }}>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

                    <div style={{ gridColumn: 'span 2', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
                        <ImageUpload label="Select Gallery Image" onUploadComplete={setImageUrl} />
                        {imageUrl && (
                            <div style={{ marginTop: '15px' }}>
                                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '5px' }}>Image Preview:</p>
                                <img src={imageUrl} alt="Preview" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '8px', background: '#fff' }} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label style={styles.label}>Category</label>
                        <input type="text" value={category} onChange={e => setCategory(e.target.value)} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.label}>Overlay Title</label>
                        <input type="text" value={overlayText} onChange={e => setOverlayText(e.target.value)} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.label}>Display Order</label>
                        <input type="number" value={order} onChange={e => setOrder(e.target.value)} style={styles.input} />
                    </div>

                    <div>
                        <label style={styles.label}>Linked Album ID</label>
                        <input type="text" value={linkedAlbumId} onChange={e => setLinkedAlbumId(e.target.value)} style={styles.input} />
                    </div>

                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center', gridColumn: 'span 2', background: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
                        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                            <input type="checkbox" checked={isLarge} onChange={e => setIsLarge(e.target.checked)} />
                            <span>Bento Box: Wide Image</span>
                        </label>
                        <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}>
                            <input type="checkbox" checked={showPlayButton} onChange={e => setShowPlayButton(e.target.checked)} />
                            <span>Show Play Icon</span>
                        </label>
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', gap: '15px' }}>
                        <button type="submit" style={styles.submitBtn}>
                            {editingId ? "Update Entry" : "Add Image to Gallery"}
                        </button>
                        {editingId && (
                            <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* --- GALLERY LIST --- */}
            <h3 style={{ marginBottom: '25px', color: '#1e293b', borderLeft: '5px solid #0072C6', paddingLeft: '15px' }}>Current Live Gallery</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                {galleryItems.map(item => (
                    <div key={item.id} style={styles.gridCard}>
                        <img src={item.imageUrl} alt={item.alt} style={styles.cardImg} />
                        <div style={{ padding: '15px' }}>
                            <span style={{ fontSize: '11px', color: '#0072C6', fontWeight: '800' }}>{item.category || 'General'}</span>
                            <h4 style={{ margin: '5px 0', fontSize: '16px' }}>{item.overlayText || 'JEC Campus'}</h4>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                <button onClick={() => startEdit(item)} style={styles.editBtn}>Edit</button>
                                <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    label: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#475569' },
    input: { width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px' },
    submitBtn: { flex: 1, padding: '16px', background: '#0072C6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' },
    cancelBtn: { padding: '16px', background: '#64748b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' },
    gridCard: { background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' },
    cardImg: { width: '100%', height: '180px', objectFit: 'cover' },
    editBtn: { flex: 1, padding: '8px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' },
    deleteBtn: { flex: 1, padding: '8px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }
};

export default ManageCampusLife;