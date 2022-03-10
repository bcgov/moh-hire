/** @type {import('next').NextConfig} */

const { createSecureHeaders } = require("next-secure-headers");

module.exports = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  swcMinify: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/submission/1',
        permanent: true
      },
    ];
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source:'/(.*)',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: ["'self'"],
              imgSrc: ["'self'"],
              styleSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-eval'"],
              formAction: "'self'",
              frameAncestors: ["'self'"],
            }
          },
          frameGuard: "deny",
          noopen: "noopen",
          nosniff: "nosniff",
          xssProtection: "block-rendering",
          forceHTTPSRedirect: [
            true,
            { maxAge: 60 * 60 * 24 * 360, includeSubDomains: true },
          ],
          referrerPolicy: "same-origin",
        })
      }
    ]
  }
};
