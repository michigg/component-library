const path = require("path");
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "ComponentLibrary",
      fileName: (format) => `component-library.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
      	globals: {
      	  vue: "Vue"
      	}
      }
    }
  }
})
