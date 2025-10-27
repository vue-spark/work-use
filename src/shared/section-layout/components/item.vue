<script lang="ts" setup>
import type { SectionItemProps } from '../interface'
import { inject } from 'vue'
import { createBEM } from '@/internal'
import { SectionLayoutInjectionKey } from '../injection-keys'

defineOptions({
  name: 'SectionItem',
})

defineProps<SectionItemProps>()

const { bem, config } = inject(SectionLayoutInjectionKey, {
  bem: createBEM('section'),
  config: undefined,
})
</script>

<template>
  <div :class="[bem.e('item'), card && [bem.m('card'), config?.cardClass]]">
    <slot />
  </div>
</template>
