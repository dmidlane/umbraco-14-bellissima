import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/welcome-dashboard.element.ts", // your web component source file
            formats: ["es"],
        },
        outDir: "../../BackofficeTutorials/App_Plugins/welcome-dashboard/dist", // your web component will be saved in this location
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
        },
    },
});