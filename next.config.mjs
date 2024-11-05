// /** @type {import('next').NextConfig} */
// const nextConfig = {};


// export default nextConfig;

// next.config.mjs
import withPWA from 'next-pwa';

const nextConfig = withPWA({
    dest: 'public', // folder tempat service worker disimpan
    register: true,
    skipWaiting: true,
});

export default nextConfig;
