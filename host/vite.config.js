import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
const deps = require("./package.json").dependencies;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {
        shared: {
          type: "module",
          name: "shared",
          entry: "http://localhost:4000/remoteEntry.js",
        },
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:3001/remoteEntry.js",
        },
        helloWorld: {
          type: "module",
          name: "helloWorld",
          entry: "http://localhost:3002/remoteEntry.js",
        },
      },
      shared: Object.keys(deps),
    }),
  ],
  server: {
    port: 3000,
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
