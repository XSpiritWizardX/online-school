import { defineConfig, loadEnv } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

const getBackendEnvironment = () => {
  const backendPath = path.resolve(__dirname, "../back");
  const flaskenvPath = path.join(backendPath, ".flaskenv");
  const flaskEnv = dotenv.config({ path: flaskenvPath });

  const envPath = path.join(backendPath, ".env");
  const env = dotenv.config({ path: envPath });

  const backendEnvironment = { ...(flaskEnv || {}), ...(env || {}) };

  if (!("FLASK_RUN_PORT" in backendEnvironment)) {
    console.error("unable to determine backend port");
    process.exit(1);
  }

  return {
    ...backendEnvironment,
    FLASK_RUN_PORT: parseInt(backendEnvironment[FLASK_RUN_PORT], 10),
  };
};

const getBackendPort = () => {
  return getBackendEnvironment["FLASK_RUN_PORT"];
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), "");
  if (!("PORT" in environment)) {
    console.error(`specify PORT in .env.${mode}`);
    process.exit(1);
  }
  const port = parseInt(environment.PORT, 10);
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

      port,

      proxy: {
        "/api": `http://127.0.0.1:${getBackendPort()}`,
      },
    },
  };
});
