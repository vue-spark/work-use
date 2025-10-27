<script lang="ts" setup>
import type { SectionLayoutConfig, SectionLayoutProps } from './interface'
import { computed, getCurrentInstance, provide } from 'vue'
import { createBEM } from '@/internal'
import { loadCSS } from '@/internal/load-css'
import css from './index.css?raw'
import { SectionLayoutInjectionKey } from './injection-keys'

defineOptions({
  name: 'SectionLayout',
  __cKitStaticCSS: css,
})

const props = defineProps<SectionLayoutProps>()

loadCSS()

const { config } = getCurrentInstance()!.proxy!.$options as {
  config?: SectionLayoutConfig
}

const bem = createBEM('section')

provide(SectionLayoutInjectionKey, {
  bem,
  config,
})

const direction = computed(() => props.direction || 'vertical')
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.m(direction),
      card && [bem.m('card'), config?.cardClass],
    ]"
  >
    <slot />
  </div>
</template>
