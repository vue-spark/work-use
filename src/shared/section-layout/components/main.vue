<script lang="ts" setup>
import type { SectionMainProps } from '../interface'
import { toArray } from '@antfu/utils'
import { useElementSize } from '@vueuse/core'
import { inject, shallowRef, watch } from 'vue'
import { createBEM } from '@/_internal'
import { SectionLayoutInjectionKey } from '../injection-keys'

defineOptions({
  name: 'SectionMain',
})

const { onResize } = defineProps<SectionMainProps>()

const { bem, config } = inject(SectionLayoutInjectionKey, {
  bem: createBEM('section'),
  config: undefined,
})

const elRef = shallowRef<HTMLDivElement>()
const { width: elWidth, height: elHeight } = useElementSize(elRef)

watch([elWidth, elHeight], () => {
  if (onResize) {
    onResize &&
    toArray(onResize).forEach((fn) =>
      fn({
        width: elWidth.value,
        height: elHeight.value,
      }),
    )
  }
})

defineExpose({
  width: elWidth,
  height: elHeight,
})
</script>

<template>
  <div
    ref="elRef"
    :class="[bem.e('main'), card && [bem.m('card'), config?.cardClass]]"
  >
    <slot
      :width="elWidth"
      :height="elHeight"
    />
  </div>
</template>
