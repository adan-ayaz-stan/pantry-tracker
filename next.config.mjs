/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.iconify.design",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        }
    }
};

export default nextConfig;
