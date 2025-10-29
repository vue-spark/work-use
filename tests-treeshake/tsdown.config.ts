import { resolve } from 'node:path'
import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: [resolve(import.meta.dirname, 'index.ts')],
    platform: 'neutral',
    dts: false,
    outDir: resolve(import.meta.dirname, 'dist'),
  },
])
