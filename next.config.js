/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // next/image 쓰면 권장
};
export default nextConfig;
