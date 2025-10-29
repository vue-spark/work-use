import { defineConfig } from 'tsdown'
import raw from 'unplugin-raw/rolldown'
import vueJsx from 'unplugin-vue-jsx/rolldown'
import vue from 'unplugin-vue/rolldown'

export default defineConfig([
  {
    target: 'chrome100',
    entry: ['src/**/*', '!**/_*'],
    platform: 'neutral',
    dts: {
      tsconfig: 'tsconfig.lib.json',
      vue: true,
      resolve: ['@antfu/utils', '@vueuse/core', 'type-fest'],
    },
    plugins: [vue(), vueJsx(), raw()],
  },
])
