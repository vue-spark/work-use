<script lang="ts" setup>
import type { SectionLayoutProps } from './interface'
import { computed, provide } from 'vue'
import { createBEM } from '@/_internal'
import { loadCSS } from '@/_internal/load-css'
import { useSetupConfig } from '@/setup-config'
import css from './index.css?raw'
import { SectionLayoutInjectionKey } from './injection-keys'

defineOptions({
  name: 'SectionLayout',
  __cKitStaticCSS: css,
})

const props = defineProps<SectionLayoutProps>()

loadCSS()

const config = useSetupConfig().SectionLayout
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
