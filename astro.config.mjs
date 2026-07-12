// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const SITE_URL = process.env.PUBLIC_SITE_URL || "https://uppercumberlandwellpump.com";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: "always",
  output: "static",
  build: {
    format: "directory",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/thank-you/") &&
        !page.includes("/404"),
    }),
  ],
});
