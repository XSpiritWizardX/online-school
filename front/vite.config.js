import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

const backendPath = path.resolve(__dirname, "../back");

dotenv.config({ path: path.join(backendPath, ".env.local") });
dotenv.config({ path: path.join(backendPath, ".env.development") });
dotenv.config({ path: path.join(backendPath, ".env.production") });

const getBackendPort = (mode) => {
  return "FLASK_RUN_PORT" in process.env
    ? Number(process.env.FLASK_RUN_PORT)
    : mode === "production"
      ? 8000
      : 5000;
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    eslintPlugin({
      lintOnStart: true,
      failOnError: mode === "production",
    }),
  ],
  server: {
    // opens browser after starting server
    open: true,

    proxy: {
      "/api": `http://127.0.0.1:${getBackendPort(mode)}`,
    },
  },
}));
