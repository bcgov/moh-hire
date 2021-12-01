/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/submission/1',
        permanent: true,
      },
    ];
  },
};
