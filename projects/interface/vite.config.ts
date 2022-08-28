import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig } from "vite";

const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    !production &&
      (nodePolyfills({
        include: [
          "node_modules/**/*.js",
          new RegExp("node_modules/.vite/.*js"),
        ],
      }) as any),
  ],
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
      http: "http-browserify",
      https: "https-browserify",
    },
  },

  server: {
    watch: {
      usePolling: true, // for WSL
    },
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills() as any],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
