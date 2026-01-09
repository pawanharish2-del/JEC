import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonical }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph / Facebook (Good for SEO) */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
};

export default SEO;