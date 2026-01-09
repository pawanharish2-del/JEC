import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import ImageUpload from '../components/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditHero = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState(''); // 1. Add Alt Text State
  const [editingId, setEditingId] = useState(null);

  // 1. Fetch Existing Banners
  const fetchBanners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "home_banners"));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBanners(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error("Failed to load banners.");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 2. Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !imageUrl || !altText) { // 2. Validate Alt Text
      toast.warn("Please provide Heading, Image, and Alt Text.");
      return;
    }

    try {
      const bannerData = {
        heading,
        subheading,
        imageUrl,
        altText, // 3. Save Alt Text
        order: Date.now()
      };

      if (editingId) {
        const bannerRef = doc(db, "home_banners", editingId);
        await updateDoc(bannerRef, bannerData);
        toast.success("Banner updated successfully!");
      } else {
        await addDoc(collection(db, "home_banners"), bannerData);
        toast.success("New banner added!");
      }

      // Reset Form & Refresh List
      setHeading('');
      setSubheading('');
      setImageUrl('');
      setAltText(''); // Reset Alt Text
      setEditingId(null);
      fetchBanners();

    } catch (error) {
      console.error("Error saving banner:", error);
      toast.error("Error saving banner.");
    }
  };

  // 3. Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this slide?")) {
      try {
        await deleteDoc(doc(db, "home_banners", id));
        toast.success("Banner deleted.");
        fetchBanners();
      } catch (error) {
        toast.error("Error deleting banner.");
      }
    }
  };

  // 4. Handle Edit Click
  const handleEdit = (banner) => {
    setHeading(banner.heading);
    setSubheading(banner.subheading);
    setImageUrl(banner.imageUrl);
    setAltText(banner.altText || ''); // Load Alt Text
    setEditingId(banner.id);
    window.scrollTo(0,0);
  };

  // 5. Cancel Edit
  const resetForm = () => {
    setHeading('');
    setSubheading('');
    setImageUrl('');
    setAltText('');
    setEditingId(null);
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <ToastContainer />
      <h2>Manage Home Page Slider</h2>

      {/* --- THE EDITOR FORM --- */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <h3>{editingId ? "Edit Slide" : "Add New Slide"}</h3>
        
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <ImageUpload 
            label="1. Upload Banner Image"
            onUploadComplete={(url) => setImageUrl(url)} 
          />
          
          {imageUrl && (
            <div style={{ margin: '10px 0' }}>
              <p style={{ fontSize: '12px', color: 'green' }}>✓ Image Ready</p>
              <img src={imageUrl} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius:'4px' }} />
            </div>
          )}

          {/* Text Fields */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>2. Image Alt Text (SEO)</label>
            <input 
              type="text" 
              value={altText} 
              onChange={(e) => setAltText(e.target.value)} 
              style={{ width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="Describe the image (e.g. Students working in robotics lab)"
              required
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>3. Main Heading</label>
            <input 
              type="text" 
              value={heading} 
              onChange={(e) => setHeading(e.target.value)} 
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              placeholder="e.g. Welcome to JEC"
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>4. Subheading (Optional)</label>
            <input 
              type="text" 
              value={subheading} 
              onChange={(e) => setSubheading(e.target.value)} 
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              placeholder="e.g. Empowering Future Engineers"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              style={{ padding: '10px 20px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {editingId ? "Update Slide" : "Add Slide"}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                style={{ padding: '10px 20px', backgroundColor: '#718096', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- THE LIST OF EXISTING SLIDES --- */}
      <h3>Existing Slides</h3>
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {banners.map(banner => (
            <div key={banner.id} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #eee' }}>
              <img 
                src={banner.imageUrl} 
                alt={banner.altText || "banner"} 
                style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px' }} 
              />
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{banner.heading}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{banner.subheading}</p>
                <small style={{ color: '#888' }}>Alt: {banner.altText}</small>
              </div>
              <div>
                <button 
                  onClick={() => handleEdit(banner)}
                  style={{ marginRight: '10px', padding: '5px 10px', background: '#ecf0f1', border: '1px solid #ccc', borderRadius: '4px', cursor:'pointer' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(banner.id)}
                  style={{ padding: '5px 10px', background: '#fee2e2', color: '#c53030', border: '1px solid #fecaca', borderRadius: '4px', cursor:'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditHero;