import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    outDir: './lib',
    format: ['esm'],
    sourcemap: true,
  },
])
