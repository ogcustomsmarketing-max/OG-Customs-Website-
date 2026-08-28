import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Custom domain (ogcustoms.in) serves this from the root. Override via
// VITE_BASE_PATH (e.g. "/OG-Customs-Website-/") only if you ever go back to
// the plain <org>.github.io/<repo>/ project-pages URL instead.
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ target: "react" }),
    react(),
    tailwindcss(),
  ],
});
