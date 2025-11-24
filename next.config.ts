import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    'crs-data-storage-bucket.s3.ap-southeast-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'crsbuck.s3.us-east-2.amazonaws.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
