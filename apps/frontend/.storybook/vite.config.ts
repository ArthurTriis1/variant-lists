import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Note: Deliberately NOT importing the React Router plugin

export default defineConfig({
  root: __dirname,
  plugins: [
    tailwindcss(),
    tsconfigPaths()
    // No React Router plugin here
  ],
  resolve: {
    alias: {
      "@": join(dirname(__dirname), "app"),
    },
  },
  build: {
    outDir: join(dirname(__dirname), "storybook-static"),
    emptyOutDir: true,
  },
  define: {
    // Disable React Router features
    "__STORYBOOK_REACT_ROUTER__": JSON.stringify(false),
  },
});
