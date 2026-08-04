import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// If deploying to GitHub Pages WITHOUT a custom domain, set base to your repo
// name, e.g.: base: '/OG-Customs-Website-/'
// With a custom domain (e.g. ogcustoms.in) keep it as '/'.
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
