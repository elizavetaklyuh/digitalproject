/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || ""

const nextConfig = {
  output: "export",
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
