import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), lit()],
  publicDir: "./public",
  output: "static", // this tells astro that the site will be built to static hosting, not a running server
});
