/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    lib: {
      entry: [resolve("src/content-script/delete-tweets.ts")],
      name: "delete-tweets.js",
      formats: ["iife"],
    },
    outDir: "dist/lib",
    emptyOutDir: false,
  },
});
