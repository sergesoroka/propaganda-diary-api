/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  i18n: {
    locales: ["it", "de", "en", "ua", "ru", "pl", "cs", "sk", "hu"],
    defaultLocale: "ua",
    localeDetection: false,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
};

module.exports = nextConfig;