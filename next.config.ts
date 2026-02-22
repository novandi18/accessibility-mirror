import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for puppeteer-core and @sparticuz/chromium in serverless
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
