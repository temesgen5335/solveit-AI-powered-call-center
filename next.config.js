const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin({
  // Define the supported locales
  locales: ['en', 'ar'],

  // Set the default locale
  defaultLocale: 'en',

  // Enable automatic locale detection based on the Accept-Language header
  localeDetection: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Optional: Enable React strict mode
  swcMinify: true,       // Optional: Enable SWC minification for faster builds
};

module.exports = withNextIntl(nextConfig);