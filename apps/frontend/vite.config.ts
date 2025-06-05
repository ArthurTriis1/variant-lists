/// <reference types="vitest" />
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		!process.env.VITEST && reactRouter(),
		tsconfigPaths(),
	],
	ssr: {
		noExternal: ["@phosphor-icons/react"],
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./test/setup.ts",
		css: true,
		exclude: ["**/node_modules/**", "**/dist/**", "**/stories/**"], // Added exclude pattern
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["app/components/**/*.{ts,tsx}"],
			exclude: [
				"app/components/**/*.stories.{ts,tsx}",
				"app/components/**/*.test.{ts,tsx}",
			],
		},
	},
} as UserConfig);
