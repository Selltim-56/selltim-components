import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import dtsPlugin from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    dtsPlugin()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'SelltimComponents',
      fileName: 'main',
    },
  },
})
