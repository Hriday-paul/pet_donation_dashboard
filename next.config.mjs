/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*',
                // hostname: '172.252.13.82',
            },
        ],
    }
};

export default nextConfig;
