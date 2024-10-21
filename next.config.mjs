/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xeyxpqmlaldjtftrtybw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
