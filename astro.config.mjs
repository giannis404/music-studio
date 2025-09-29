// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [vue()],
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: {
      prefixDefaultLocale: true, // This makes /en/ explicit
    },
  },
});
