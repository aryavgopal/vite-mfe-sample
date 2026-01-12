import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
const deps = require("./package.json").dependencies;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shared",
      filename: "remoteEntry.js",
      exposes: {
        "./widgets": "./src/widgets/index.ts",
      },
      shared: Object.keys(deps),
    }),
  ],
  server: {
    port: 4000,
    cors: true,
    origin: "http://localhost:4000",
  },
  build: {
    target: "esnext",
    modulePreload: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      loader: {
        ".js": "jsx",
      },
    },
    // avoid trying to prebundle federation virtual modules
    exclude: ["@module-federation/vite"],
  },
});
