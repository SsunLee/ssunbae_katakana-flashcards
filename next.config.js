// next.config.js

/** @type {import('next').NextConfig} */
const isStaticExportBuild = process.env.BUILD_FOR_MOBILE === "true";
const distDir = process.env.NEXT_DIST_DIR?.trim();

const nextConfig = {
  images: { unoptimized: true }, // next/image 쓰면 권장
};

if (distDir) {
  nextConfig.distDir = distDir;
}

if (isStaticExportBuild) {
  nextConfig.output = "export";
}

export default nextConfig;
