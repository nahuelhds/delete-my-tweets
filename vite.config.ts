/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // Test configuration options
    globals: true, // Makes test APIs globally available
    environment: "happy-dom", // Simulates DOM environment for testing
    // setupFiles: ['./src/setup.ts'],   // Optional: setup file for test environment
    coverage: {
      provider: "v8", // or 'istanbul'
      reporter: ["text", "json", "html"],
    },
  },
});
