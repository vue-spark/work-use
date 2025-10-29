<script setup lang="ts">
import type { ToolbarProps, ToolbarSlots } from './interface'
import { createBEM } from '@/_internal'
import { loadCSS } from '@/_internal/load-css'
import css from './index.css?raw'

defineOptions({
  __cKitStaticCSS: css,
})

defineProps<ToolbarProps>()

defineSlots<ToolbarSlots>()

loadCSS()

const bem = createBEM('toolbar')
</script>

<template>
  <div :class="bem.b()">
    <div :class="bem.e('left')">
      <div
        :style="titleStyle"
        :class="[bem.e('title'), titleClass]"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <div :class="bem.e('divider')" />

      <div
        :class="[bem.e('content'), contentClass]"
        :style="contentStyle"
      >
        <slot />
      </div>
    </div>

    <div
      :class="[bem.e('extra'), extraClass]"
      :style="extraStyle"
    >
      <slot name="extra" />
    </div>
  </div>
</template>
