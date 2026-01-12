import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
const deps = require("./package.json").dependencies;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "helloWorld",
      filename: "remoteEntry.js",
      exposes: {
        "./remoteApp": "./src/App.jsx",
      },
      remotes: {
        shared: {
          type: "module",
          name: "shared",
          entry: "http://localhost:4000/remoteEntry.js",
        },
      },
      shared: Object.keys(deps),
    }),
  ],
  server: {
    port: 3002,
    cors: true,
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
