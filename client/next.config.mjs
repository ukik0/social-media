import {withContentlayer} from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['rare-gallery.com', 'localhost']
    }
};

export default withContentlayer(nextConfig);
