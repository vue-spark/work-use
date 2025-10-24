<script lang="ts" setup>
import type {
  SectionLayoutCardArea,
  SectionLayoutProps,
  SectionLayoutSlots,
} from './interface'
import { toArray, useElementSize } from '@vueuse/core'
import { computed, getCurrentInstance, shallowRef, watch } from 'vue'
import { loadCSS } from '@/internal/load-css'
import css from './index.css?raw'

defineOptions({
  name: 'SectionLayout',
  __cKitStaticCSS: css,
})

const { card, height, onMainContentResize } = defineProps<SectionLayoutProps>()

defineSlots<SectionLayoutSlots>()

loadCSS()

export interface SectionLayoutConfig {
  cardClass?: any
}

const { config } = getCurrentInstance()!.proxy!.$options as {
  config?: SectionLayoutConfig
}

const ns = 'kit-section-layout'

const cardAreas = computed(() => {
  const set = new Set(toArray(card))
  return {
    has(area: SectionLayoutCardArea) {
      return card === true || set.has(area)
    },
  }
})

const mainContentRef = shallowRef<HTMLDivElement>()
const mainContentSize = useElementSize(mainContentRef)
watch([mainContentSize.width, mainContentSize.height], () => {
  onMainContentResize &&
  toArray(onMainContentResize).forEach((fn) =>
    fn({
      width: mainContentSize.width.value,
      height: mainContentSize.height.value,
    }),
  )
})

defineExpose({
  mainContentRef,
  mainContentSize: {
    width: mainContentSize.width,
    height: mainContentSize.height,
  },
})
</script>

<template>
  <div
    :class="ns"
    :style="{ height }"
  >
    <div
      :style="topStyle"
      :class="[
        `${ns}__top`,
        cardAreas.has('top') && ['is-card', config?.cardClass],
        topClass,
      ]"
    >
      <slot name="top" />
    </div>

    <div
      :style="mainStyle"
      :class="[
        `${ns}__main`,
        cardAreas.has('main') && ['is-card', config?.cardClass],
        mainClass,
      ]"
    >
      <slot name="main">
        <div
          :style="mainHeadStyle"
          :class="[`${ns}__main-head`, mainHeadClass]"
        >
          <slot name="main-head" />
        </div>

        <div
          ref="mainContentRef"
          :style="mainContentStyle"
          :class="[`${ns}__main-content`, mainContentClass]"
        >
          <component
            :is="$slots['main-content'] || $slots.default"
            v-if="$slots['main-content'] || $slots.default"
            :width="mainContentSize.width.value"
            :height="mainContentSize.height.value"
          />
        </div>

        <div
          :style="mainFootStyle"
          :class="[`${ns}__main-foot`, mainFootClass]"
        >
          <slot name="main-foot" />
        </div>
      </slot>
    </div>

    <div
      :style="bottomStyle"
      :class="[
        `${ns}__bottom`,
        cardAreas.has('bottom') && ['is-card', config?.cardClass],
        bottomClass,
      ]"
    >
      <slot name="bottom" />
    </div>
  </div>
</template>
