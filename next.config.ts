import type { NextConfig } from "next";
import '@/config/env.validation';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/du15wcsjr/**')]
  }
};

export default nextConfig;
