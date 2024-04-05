/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        remotePatterns: [
            {hostname:'static.vecteezy.com'},
            {hostname:'pngfre.com'},
            {hostname:"lh3.googleusercontent.com"},
            {hostname: "user-images.githubusercontent.com"}
        ]
    }
};

export default nextConfig;
