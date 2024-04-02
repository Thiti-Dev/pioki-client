/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns: [
            {hostname:'static.vecteezy.com'},
            {hostname:'pngfre.com'},
            {hostname:"lh3.googleusercontent.com"}
        ]
    }
};

export default nextConfig;
