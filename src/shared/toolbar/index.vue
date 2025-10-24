<script setup lang="ts">
import type { ToolbarProps, ToolbarSlots } from './interface'
import { loadCSS } from '@/internal/load-css'
import css from './index.css?raw'

defineOptions({
  __cKitStaticCSS: css,
})

defineProps<ToolbarProps>()

defineSlots<ToolbarSlots>()

loadCSS()

const ns = 'kit-toolbar'
</script>

<template>
  <div :class="ns">
    <div :class="[`${ns}__left`]">
      <div
        :style="titleStyle"
        :class="[`${ns}__title`, titleClass]"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div :class="[`${ns}__divider`]" />

      <div
        :class="[`${ns}__content`, contentClass]"
        :style="contentStyle"
      >
        <slot />
      </div>
    </div>

    <div
      :class="[`${ns}__extra`, extraClass]"
      :style="extraStyle"
    >
      <slot name="extra" />
    </div>
  </div>
</template>
