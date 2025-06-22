/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  },
};

export default nextConfig;
