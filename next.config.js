const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api=totalsupply', destination: '/totalsupplyapi' },
     
      { source: '/api=circulatingsupply', destination: '/circulatingsupplyapi' },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: (isDev
              ? `
                default-src 'self';
                script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                img-src 'self' data: https://cdn.jsdelivr.net;
                font-src 'self' https://fonts.gstatic.com;
                connect-src 'self' ws:;
                object-src 'none';
                base-uri 'self';
                frame-ancestors 'none';
              `
              : `
                default-src 'self';
                script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                img-src 'self' data: https://cdn.jsdelivr.net;
                font-src 'self' https://fonts.gstatic.com;
                connect-src 'self';
                object-src 'none';
                base-uri 'self';
                frame-ancestors 'none';
              `
            ).replace(/\s{2,}/g, ' ').trim(),
          },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
