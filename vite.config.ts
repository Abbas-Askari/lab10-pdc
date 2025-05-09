import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    proxy: {
      "/solr": {
        target: "http://localhost:8983",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/solr/, "/solr"),
      },
    },
  },
});
