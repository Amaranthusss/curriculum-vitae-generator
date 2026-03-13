import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import packageJson from './package.json';

export default defineConfig({
	plugins: [react()],
	base: "/curriculum-vitae-generator/",
	define: { 'import.meta.env.VERSION': JSON.stringify(packageJson.version) }
});
