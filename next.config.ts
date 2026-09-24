import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.5",
    "192.168.*",
    "192.168.1.*",
    "192.168.137.*",
    "10.*",
    "172.*",
    "localhost:3000",
    "localhost:3001",
  ],
};

export default nextConfig;
