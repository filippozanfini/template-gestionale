/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withImageLoader = require("next-image-loader");

module.exports = withPlugins(
  [
    withImageLoader,
  ],
  {
    reactStrictMode: false,
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    images: {
      loader: "custom",
      domains: ["images.unsplash.com"],
    },
    env: {
      APP_ENV: process.env.APP_ENV,
    },
    optimizeFonts: true,
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  }
);
