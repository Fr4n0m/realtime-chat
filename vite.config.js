import { defineConfig } from "vite";

export default defineConfig({
  root: "./",
  publicDir: "public",
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/socket.io": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
});
