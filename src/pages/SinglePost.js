import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
// IMPORT both query/where (for slugs) AND doc/getDoc (for IDs)
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Helmet } from 'react-helmet-async';
import './Blog.css';

const SinglePost = () => {
    // 'slug' here captures whatever is after /blog/, whether it's a real slug or an ID
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    const contentRef = useRef(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                // STRATEGY 1: Try to find by "slug" field first (The Pretty URL way)
                const q = query(collection(db, "blog_posts"), where("slug", "==", slug));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0];
                    setPost({ id: docData.id, ...docData.data() });
                } else {
                    // STRATEGY 2: If no slug matched, try to find by Document ID (The Old way)
                    // This fixes the "Not Found" error for posts that still have ID URLs
                    const docRef = doc(db, "blog_posts", slug);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setPost({ id: docSnap.id, ...docSnap.data() });
                    } else {
                        setPost(null);
                    }
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    // Fix links automatically
    useEffect(() => {
        if (post && contentRef.current) {
            const links = contentRef.current.querySelectorAll('a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href) {
                    if (!href.startsWith('http') && !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                        link.setAttribute('href', `https://${href}`);
                    }
                    if (!href.startsWith('/')) {
                        link.setAttribute('target', '_blank');
                        link.setAttribute('rel', 'noopener noreferrer');
                    }
                }
            });
        }
    }, [post]);

    if (loading) {
        return (
            <div className="blog-page-wrapper" style={{ padding: '100px', textAlign: 'center' }}>
                <Helmet>
                    <title>Loading Article... | JEC Jaipur</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="blog-page-wrapper" style={{ padding: '100px', textAlign: 'center' }}>
                <Helmet>
                    <title>Article Not Found | JEC Jaipur</title>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div>Article not found.</div>
            </div>
        );
    }

    const pageTitle = post.metaTitle || post.title || "Blog Post";
    const pageDesc = post.metaDesc || post.excerpt || "Read this article on JEC Blog";
    const currentUrl = window.location.href;
    const pageImage = post.image || "https://your-domain.com/default-image.jpg";

    return (
        <div className="blog-page-wrapper">

            <Helmet>
                <title>{pageTitle} | JEC Jaipur</title>
                <meta name="description" content={pageDesc} />
                <link rel="canonical" href={currentUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDesc} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:url" content={currentUrl} />
            </Helmet>

            {/* Navigation */}
            <div style={{ background: '#1E293B', color: '#fff', padding: '10px 2rem', fontSize: '0.9rem' }}>
                <Link to="/blog" style={{ color: '#FCA311' }}> <i className="fas fa-arrow-left"></i> Back to Blog</Link>
            </div>

            <header className="article-hero" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url('${post.image}')` }}>
                <div className="hero-content">
                    <span className="post-badge">{post.category}</span>
                    <h1 className="article-title">{post.title}</h1>
                    <div className="post-meta">
                        <span><i className="fas fa-user-circle"></i> {post.author}</span>
                        <span><i className="fas fa-calendar-alt"></i> {post.date}</span>
                    </div>
                </div>
            </header>

            <div className="single-post-container">
                <article className="article-body">
                    <img
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            marginBottom: '30px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                        }}
                    />
                    <div
                        ref={contentRef}
                        className="dynamic-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </div>
        </div>
    );
};

export default SinglePost;