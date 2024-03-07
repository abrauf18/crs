/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'crs-data-storage-bucket.s3.ap-southeast-2.amazonaws.com',
              pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
