import React, { useState, useEffect, useMemo } from 'react';
import { db, storage } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import ImageUpload from '../components/ImageUpload';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BlotFormatter from 'quill-blot-formatter';
import htmlEditButton from "quill-html-edit-button";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// ==========================================================================
// 1. BULLETPROOF REGISTRATION
// ==========================================================================
// We wrap this in a global check to prevent multiple registrations during hot-reloads
if (!Quill.imports['modules/blotFormatter']) {
    Quill.register('modules/blotFormatter', BlotFormatter);
}
if (!Quill.imports['modules/htmlEditButton']) {
    Quill.register("modules/htmlEditButton", htmlEditButton);
}

// Force Quill to use Inline Styles (crucial for preserving alignment)
const AlignStyle = Quill.import('attributors/style/align');
const SizeStyle = Quill.import('attributors/style/size');
const ColorStyle = Quill.import('attributors/style/color');
const BackgroundStyle = Quill.import('attributors/style/background');

Quill.register(AlignStyle, true);
Quill.register(SizeStyle, true);
Quill.register(ColorStyle, true);
Quill.register(BackgroundStyle, true);

const EditDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // FORM STATES - Initialized as empty strings
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [bannerImage, setBannerImage] = useState('');
    const [content, setContent] = useState('');
    const [hodName, setHodName] = useState('');
    const [hodMessage, setHodMessage] = useState('');
    const [hodImage, setHodImage] = useState('');
    const [eligibility, setEligibility] = useState('');

    const DEFAULT_ELIGIBILITY = `<table style="width: 100%; border-collapse: collapse; border: 1px solid #ccc;"><tr style="background: #f3f4f6;"><th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Program</th><th style="border: 1px solid #ccc; padding: 10px; text-align: left;">Eligibility Criteria</th></tr><tr><td style="border: 1px solid #ccc; padding: 10px;">B.Tech</td><td style="border: 1px solid #ccc; padding: 10px;">10+2 with Physics, Maths and 45% Marks</td></tr></table>`;

    useEffect(() => { fetchDepartments(); }, []);

    const fetchDepartments = async () => {
        try {
            const q = query(collection(db, "departments"), orderBy("name"));
            const querySnapshot = await getDocs(q);
            setDepartments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) { console.error("Fetch Error:", error); }
        setLoading(false);
    };

    // ==========================================================================
    // 2. TOOLBAR HANDLERS
    // ==========================================================================
    const insertTable = () => {
        const tableHtml = `<table style="width: 100%; border-collapse: collapse; margin: 15px 0; border: 1px solid #cbd5e1;"><tbody><tr><td style="border: 1px solid #cbd5e1; padding: 12px; background: #f8fafc;"><strong>Header 1</strong></td><td style="border: 1px solid #cbd5e1; padding: 12px; background: #f8fafc;"><strong>Header 2</strong></td></tr><tr><td style="border: 1px solid #cbd5e1; padding: 12px;">Data</td><td style="border: 1px solid #cbd5e1; padding: 12px;">Data</td></tr></tbody></table><p><br></p>`;
        const quill = document.querySelector('.ql-editor:focus')?.parentElement?.__quill;
        if (quill) {
            const range = quill.getSelection(true);
            quill.clipboard.dangerouslyPasteHTML(range.index, tableHtml);
        } else { toast.warn("Click inside the editor first!"); }
    };

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                try {
                    const toastId = toast.loading("Uploading image...");
                    const storageRef = ref(storage, `departments/content-${uuidv4()}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);
                    uploadTask.on('state_changed', null, null, async () => {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        toast.dismiss(toastId);
                        const quill = document.querySelector('.ql-editor:focus')?.parentElement?.__quill;
                        if (quill) {
                            const range = quill.getSelection(true);
                            quill.insertEmbed(range.index, 'image', url);
                        }
                    });
                } catch (e) { toast.error("Upload failed"); }
            }
        };
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['table'],
                ['clean']
            ],
            handlers: { image: imageHandler, table: insertTable }
        },
        blotFormatter: {},
        htmlEditButton: { msg: "Edit HTML", okText: "Update", buttonHTML: "&lt;&gt;" }
    }), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name, slug: slug || name.toLowerCase().replace(/ /g, '-'),
            title, subtitle, bannerImage, content,
            hodName, hodMessage, hodImage, eligibility, updatedAt: new Date()
        };
        try {
            if (isEditing) { await updateDoc(doc(db, "departments", editId), data); toast.success("Updated!"); }
            else { await addDoc(collection(db, "departments"), data); toast.success("Created!"); }
            resetForm(); fetchDepartments();
        } catch (error) { toast.error("Save failed."); }
    };

    const handleEdit = (dept) => {
        setName(dept.name || ''); setSlug(dept.slug || ''); setTitle(dept.title || '');
        setSubtitle(dept.subtitle || ''); setBannerImage(dept.bannerImage || '');
        setContent(dept.content || ''); setHodName(dept.hodName || '');
        setHodMessage(dept.hodMessage || ''); setHodImage(dept.hodImage || '');
        setEligibility(dept.eligibility || '');
        setEditId(dept.id); setIsEditing(true); window.scrollTo(0, 0);
    };

    const resetForm = () => {
        setIsEditing(false); setEditId(null);
        setName(''); setSlug(''); setTitle(''); setSubtitle('');
        setBannerImage(''); setContent(''); setHodName('');
        setHodMessage(''); setHodImage(''); setEligibility('');
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this page?")) {
            await deleteDoc(doc(db, "departments", id));
            toast.success("Deleted!");
            fetchDepartments();
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* AGGRESSIVE CSS FIX FOR BLANK EDITOR */}
            <style>{`
                .quill-wrapper { background: white; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; }
                .ql-toolbar.ql-snow { border: none !important; border-bottom: 1px solid #cbd5e1 !important; background: #f8fafc; }
                .ql-container.ql-snow { border: none !important; min-height: 350px !important; height: auto !important; }
                .ql-editor { min-height: 350px !important; font-size: 16px; line-height: 1.6; }
                .ql-editor table { border-collapse: collapse; width: 100%; margin: 10px 0; border: 1px solid #ccc; }
                .ql-editor td, .ql-editor th { border: 1px solid #ccc !important; padding: 12px; }
                .ql-snow.ql-toolbar button.ql-table::after {
                    content: "Table"; font-size: 10px; font-weight: bold; position: absolute; top: 5px; left: 4px; color: #444;
                }
            `}</style>

            <ToastContainer />
            <h2 style={{ marginBottom: '20px' }}>{isEditing ? `Editing: ${name}` : "Create Department"}</h2>

            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 15px rgba(0,0,0,0.1)' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <h3 style={styles.head}>1. Settings</h3>
                            <label style={styles.label}>Department Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} style={styles.input} required />
                            <label style={styles.label}>URL Slug</label>
                            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} style={styles.input} />
                        </div>
                        <div>
                            <h3 style={styles.head}>2. Banner</h3>
                            <ImageUpload label="Banner Image" onUploadComplete={setBannerImage} />
                            {bannerImage && <img src={bannerImage} alt="Preview" style={{ width: '100%', height: '80px', objectFit: 'cover', marginTop: '10px', borderRadius: '4px' }} />}
                        </div>
                    </div>

                    <div>
                        <h3 style={styles.head}>3. Main Content</h3>
                        <div className="quill-wrapper">
                            <ReactQuill
                                key={isEditing ? 'edit-mode' : 'new-mode'}
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                            />
                        </div>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '25px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                        <h3 style={styles.head}>4. HOD Section</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                            <div>
                                <ImageUpload label="HOD Photo" onUploadComplete={setHodImage} />
                                {hodImage && <img src={hodImage} alt="HOD" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginTop: '10px' }} />}
                            </div>
                            <div>
                                <label style={styles.label}>HOD Name</label>
                                <input type="text" value={hodName} onChange={e => setHodName(e.target.value)} style={styles.input} />
                                <label style={styles.label}>HOD Message</label>
                                <textarea value={hodMessage} onChange={e => setHodMessage(e.target.value)} style={{ ...styles.input, height: '100px' }} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 style={styles.head}>5. Eligibility</h3>
                        <button type="button" onClick={() => setEligibility(DEFAULT_ELIGIBILITY)} style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}>Use Table Template</button>
                        <div className="quill-wrapper">
                            <ReactQuill
                                key={isEditing ? 'edit-elig' : 'new-elig'}
                                theme="snow"
                                value={eligibility}
                                onChange={setEligibility}
                                modules={modules}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="submit" style={styles.saveBtn}>{isEditing ? "Update Page" : "Publish Page"}</button>
                        {isEditing && <button type="button" onClick={resetForm} style={styles.cancelBtn}>Cancel Edit</button>}
                    </div>
                </form>
            </div>

            <div style={{ marginTop: '50px' }}>
                <h3 style={styles.head}>Existing Departments</h3>
                {loading ? <p>Loading...</p> : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {departments.map(d => (
                            <div key={d.id} style={styles.listItem}>
                                <span style={{ fontWeight: '600' }}>{d.name}</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEdit(d)} style={styles.editBtn}>Edit</button>
                                    <button onClick={() => handleDelete(d.id)} style={styles.deleteBtn}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    input: { width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' },
    label: { display: 'block', marginBottom: '5px', fontWeight: '600', color: '#334155' },
    head: { borderBottom: '2px solid #e2e8f0', color: '#0072C6', marginBottom: '15px', paddingBottom: '5px', fontWeight: '700' },
    saveBtn: { padding: '15px 30px', background: '#0072C6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    cancelBtn: { padding: '15px 30px', background: '#94a3b8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    listItem: { padding: '15px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    editBtn: { padding: '6px 15px', background: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    deleteBtn: { padding: '6px 15px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default EditDepartment;