/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',
  rewrites: () => [
    {
      source: '/api/blog/:path*',
      destination: 'http://localhost:3000/api/blog/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/blog', // This will handle /blog as an SSR route
    },
  ],
  output: 'standalone',
  rewrites: () => [
    {
      source: '/api/blog/:path*',
      destination: 'http://alfudhexinc.app/api/blog/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/blog',
    },
  ],
  output: 'standalone',
  rewrites: () => [
    {
      source: '/api/blog/:path*',
      destination: 'http://alfudhexinc.app/api/api/jobs/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/blog',
    },
  ],
  output: 'standalone',
  rewrites: () => [
    {
      source: '/api/blog/:path*',
      destination: 'http://alfudhexinc.app/api/api/jobs/my-jobs/:path*',
    },
    {
      source: '/blog/:path*',
      destination: '/blog',
    },
  ],

  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: "images.pexels.com"
      }
    ]
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
}

module.exports = nextConfig
