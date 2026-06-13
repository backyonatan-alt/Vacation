import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// NOTE: `base` is set for GitHub Pages project hosting (https://<user>.github.io/Vacation/).
// If you deploy to Netlify / a custom domain, change this to "/".
export default defineConfig({
  base: process.env.DEPLOY_BASE ?? "/Vacation/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "מטה הנופש הרציני",
        short_name: "נופש רציני",
        description: "כל מה שצריך לנופש בית אלפא 18-20.6 במקום אחד",
        lang: "he",
        dir: "rtl",
        theme_color: "#ff5f5f",
        background_color: "#22c9d2",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
});
