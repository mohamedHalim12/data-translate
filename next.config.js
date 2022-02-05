const { createSecureHeaders } = require('next-secure-headers');

const env = process.env.NODE_ENV;
const excludeConsole = env === 'production' ? ['error'] : ['error', 'log'];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: false,
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
  removeConsole: { exclude: excludeConsole },
  // experimental: {},
};
