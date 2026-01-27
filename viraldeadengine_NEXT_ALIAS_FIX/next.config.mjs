import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Allow imports like:
    //   @/src/components/Thing
    //   @/src/lib/foo
    // and also @/components/... if you ever use it.
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(process.cwd()),
      "@/src": path.resolve(process.cwd(), "src"),
    };
    return config;
  },
};

export default nextConfig;
