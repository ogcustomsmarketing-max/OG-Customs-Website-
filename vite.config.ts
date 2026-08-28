import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// GitHub Pages serves this repo from https://<org>.github.io/OG-Customs-Website-/
// — a subpath, not root. Override via VITE_BASE_PATH (e.g. "/" for a custom
// domain) if that ever changes.
const base = process.env.VITE_BASE_PATH ?? "/OG-Customs-Website-/";

export default defineConfig({
  base,
  plugins: [
    tsconfigPaths(),
    tanstackRouter({ target: "react" }),
    react(),
    tailwindcss(),
  ],
});
