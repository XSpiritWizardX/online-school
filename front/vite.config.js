import { defineConfig, loadEnv } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

const getBackendEnvironment = () => {
  const backendPath = path.resolve(__dirname, "../back");
  const flaskenvPath = path.join(backendPath, ".flaskenv");
  const envPath = path.join(backendPath, ".env");

  const flaskenv = fs.existsSync(flaskenvPath)
    ? dotenv.config({ path: flaskenvPath }).parsed || {}
    : {};

  const env = fs.existsSync(envPath)
    ? dotenv.config({ path: envPath }).parsed || {}
    : {};

  const backendEnvironment = { ...flaskenv, ...env };

  if (!("FLASK_RUN_PORT" in backendEnvironment)) {
    console.error("unable to determine backend port");
    process.exit(1);
  }

  const FLASK_RUN_PORT = backendEnvironment["FLASK_RUN_PORT"];
  const flaskRunPort = parseInt(FLASK_RUN_PORT);

  const result = {
    ...backendEnvironment,
    FLASK_RUN_PORT: flaskRunPort,
  };
  return result;
};

const getBackendPort = () => {
  return getBackendEnvironment()["FLASK_RUN_PORT"];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), "");
  if (!("PORT" in environment)) {
    console.error("unable to determine PORT");
    console.error("should be set in one of the following files:");
    console.error(`.env, .env.${mode}, .env.${mode}.local`);
    process.exit(1);
  }
  const port = parseInt(environment.PORT, 10);
  const api = `http://localhost:${getBackendPort()}`;
  return {
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

      watch: {
        usePolling: true,
      },

      port,

      proxy: {
        "/api": api,
      },
    },
  };
});
