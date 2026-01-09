import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import ImageUpload from '../components/ImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';
import htmlEditButton from "quill-html-edit-button";

// --- QUILL REGISTRATION ---
const ColorStyle = Quill.import('attributors/style/color');
const BackgroundStyle = Quill.import('attributors/style/background');
const SizeStyle = Quill.import('attributors/style/size');
const AlignStyle = Quill.import('attributors/style/align');
const FontStyle = Quill.import('attributors/style/font');

Quill.register(ColorStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(SizeStyle, true);
Quill.register(AlignStyle, true);
Quill.register(FontStyle, true);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register("modules/htmlEditButton", htmlEditButton);

const EditBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Engineering');
    const [author, setAuthor] = useState('JEC Admin');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [image, setImage] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // SEO State
    const [slug, setSlug] = useState(''); // New: Custom Slug State
    const [imageAlt, setImageAlt] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDesc, setMetaDesc] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');

    const modules = useMemo(() => ({
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        blotFormatter: {},
        htmlEditButton: {
            debug: true, msg: "Edit HTML Source", okText: "Update", buttonHTML: "&lt;&gt;",
            buttonTitle: "Show HTML Source",
            styleWrapper: `
        .ql-html-editorContainer { background: #f0f0f0; padding: 20px; border: 1px solid #ccc; }
        .ql-html-textArea { background: #1e1e1e; color: #d4d4d4; font-family: monospace; font-size: 14px; }
      `
        }
    }), []);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, "blog_posts"), orderBy("date", "desc"));
            const querySnapshot = await getDocs(q);
            setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchPosts(); }, []);

    // Helper to format title to slug automatically
    const autoGenerateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !image) { toast.warn("Required: Title, Content, Image"); return; }

        const postData = {
            title, category, author, date, image, imageAlt, excerpt, content,
            slug: slug || autoGenerateSlug(title), // Use custom slug or generate from title
            isFeatured, metaTitle, metaDesc, metaKeywords, createdAt: new Date()
        };

        try {
            if (isEditing) { await updateDoc(doc(db, "blog_posts", editId), postData); toast.success("Updated!"); }
            else { await addDoc(collection(db, "blog_posts"), postData); toast.success("Published!"); }
            resetForm(); fetchPosts();
        } catch (error) { toast.error("Error saving post."); }
    };

    const handleEdit = (post) => {
        setTitle(post.title); setCategory(post.category); setAuthor(post.author);
        setDate(post.date); setImage(post.image); setExcerpt(post.excerpt);
        setContent(post.content); setIsFeatured(post.isFeatured || false);
        setSlug(post.slug || ''); // Load Slug
        setImageAlt(post.imageAlt || ''); setMetaTitle(post.metaTitle || '');
        setMetaDesc(post.metaDesc || ''); setMetaKeywords(post.metaKeywords || '');
        setEditId(post.id); setIsEditing(true); window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete?")) { await deleteDoc(doc(db, "blog_posts", id)); fetchPosts(); }
    };

    const resetForm = () => {
        setTitle(''); setCategory('Engineering'); setAuthor('JEC Admin');
        setDate(new Date().toISOString().split('T')[0]); setImage(''); setExcerpt('');
        setContent(''); setIsFeatured(false); setSlug(''); setImageAlt('');
        setMetaTitle(''); setMetaDesc(''); setMetaKeywords('');
        setIsEditing(false); setEditId(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>{isEditing ? "Edit Article" : "Write New Article"}</h2>
                {isEditing && <button onClick={resetForm} style={styles.cancelBtn}>Cancel Edit</button>}
            </div>

            <div style={styles.card}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px' }}>
                        <div>
                            <label style={styles.label}>Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} style={styles.input} placeholder="Enter article title..." />

                            <label style={styles.label}>Excerpt (Short summary for listing cards)</label>
                            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} style={{ ...styles.input, height: '80px' }} />

                            <label style={styles.label}>Main Content</label>
                            <div style={{ background: 'white', marginBottom: '20px' }}>
                                <ReactQuill theme="snow" value={content} onChange={setContent} modules={modules} style={{ height: '500px', marginBottom: '50px' }} />
                            </div>
                        </div>

                        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', height: 'fit-content' }}>
                            <ImageUpload label="Cover Image" onUploadComplete={setImage} />
                            {image && <img src={image} alt="Preview" style={{ width: '100%', borderRadius: '5px', marginTop: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />}

                            <label style={styles.label}>Image Alt Text</label>
                            <input type="text" value={imageAlt} onChange={e => setImageAlt(e.target.value)} style={styles.input} placeholder="Description for accessibility" />

                            <label style={styles.label}>Category</label>
                            <select value={category} onChange={e => setCategory(e.target.value)} style={styles.input}>
                                <option>Engineering</option>
                                <option>Campus Life</option>
                                <option>Placements</option>
                                <option>Events</option>
                                <option>Career</option>
                                <option>Why JEC</option>
                                <option>Business</option>
                                <option>Motivational</option>
                                <option>Admissions</option>
                                <option>Science & Technology</option>
                                <option>Others</option>

                            </select>

                            <label style={styles.label}>Author & Date</label>
                            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} style={{ ...styles.input, marginBottom: '5px' }} />
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} style={styles.input} />

                            <div style={{ margin: '15px 0' }}>
                                <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600' }}>
                                    <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
                                    Set as Featured Post
                                </label>
                            </div>

                            <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #cbd5e1' }} />

                            <h4 style={{ marginBottom: '10px' }}>SEO Settings</h4>

                            {/* --- NEW SLUG FIELD --- */}
                            <label style={styles.label}>URL Slug (Custom Path)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                style={styles.input}
                                placeholder="e.g. best-engineering-college-jaipur"
                            />
                            <small style={{ fontSize: '11px', color: '#64748B' }}>Leave empty to generate from title</small>

                            <label style={styles.label, { marginTop: '15px' }}>Meta Title</label>
                            <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} style={styles.input} placeholder="Title for Google" />

                            <label style={styles.label}>Meta Description</label>
                            <textarea
                                value={metaDesc}
                                onChange={e => setMetaDesc(e.target.value)}
                                style={{ ...styles.input, height: '70px', fontSize: '13px' }}
                                placeholder="Brief summary for Google results"
                            />

                            <label style={styles.label}>Keywords</label>
                            <input type="text" value={metaKeywords} onChange={e => setMetaKeywords(e.target.value)} style={styles.input} placeholder="engineering, JEC, placements..." />

                            {/* --- UPDATED GOOGLE PREVIEW --- */}
                            <div style={styles.previewBox}>
                                <span style={styles.previewLabel}>Google Preview</span>
                                <div style={styles.googleContainer}>
                                    <div style={styles.googleUrl}>
                                        https://jecjaipur.ac.in › blog › {slug || autoGenerateSlug(title) || 'url-slug'}
                                    </div>
                                    <div style={styles.googleTitle}>{metaTitle || title || 'Post Title Will Appear Here'}</div>
                                    <div style={styles.googleDesc}>
                                        {metaDesc || excerpt || 'Start writing a meta description or excerpt to see how it looks in search results...'}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" style={styles.saveBtn}>{isEditing ? "Update Post" : "Publish Post"}</button>
                        </div>
                    </div>
                </form>
            </div>

            <div style={styles.listContainer}>
                <h3>Recent Articles</h3>
                {posts.map(post => (
                    <div key={post.id} style={styles.listItem}>
                        <img src={post.image} alt="thumb" style={styles.thumb} />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 5px' }}>{post.title}</h4>
                            <small style={{ color: '#64748B' }}>{post.date} • {post.category}</small>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(post)} style={styles.editBtn}>Edit</button>
                            <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    card: { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    label: { display: 'block', fontWeight: '600', margin: '12px 0 6px', fontSize: '13px', color: '#475569' },
    input: { width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px', outline: 'none' },
    saveBtn: { width: '100%', padding: '14px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px', fontSize: '15px' },
    cancelBtn: { padding: '8px 15px', background: '#64748B', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
    listContainer: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '40px' },
    listItem: { display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    thumb: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' },
    editBtn: { padding: '6px 12px', background: '#E0F2FE', color: '#0284C7', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px', fontWeight: '600' },
    deleteBtn: { padding: '6px 12px', background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' },

    previewBox: { marginTop: '20px', padding: '15px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' },
    previewLabel: { fontSize: '11px', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', marginBottom: '8px', display: 'block' },
    googleContainer: { fontFamily: 'arial, sans-serif', textAlign: 'left' },
    googleUrl: { fontSize: '12px', color: '#202124', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    googleTitle: { fontSize: '18px', color: '#1a0dab', marginBottom: '3px', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    googleDesc: { fontSize: '14px', color: '#4d5156', lineHeight: '1.58', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }
};

export default EditBlog;