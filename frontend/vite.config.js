import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const EXPRESS_PORT = 4000;
const BACKEND_URL = "https://study-notion-backend-ngon.onrender.com";
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: BACKEND_URL || "http://localhost:" + EXPRESS_PORT,
      },
      "/api/v1": {
        target: BACKEND_URL || "http://localhost:" + EXPRESS_PORT,
      },
    },
  },
  plugins: [react()],
});
