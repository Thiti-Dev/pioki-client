/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {hostname:'static.vecteezy.com'},
            {hostname:'pngfre.com'}
        ]
    }
};

export default nextConfig;
