import type { Arrayable } from 'type-fest'
import type { StyleValue, VNodeChild } from 'vue'

interface ElementSize {
  width: number
  height: number
}

export type SectionLayoutCardArea = 'top' | 'main' | 'bottom'

export interface SectionLayoutProps {
  // Outer sections
  topStyle?: StyleValue
  topClass?: any

  mainStyle?: StyleValue
  mainClass?: any

  bottomStyle?: StyleValue
  bottomClass?: any

  // Inner sections within main
  mainHeadStyle?: StyleValue
  mainHeadClass?: any

  mainContentStyle?: StyleValue
  mainContentClass?: any

  mainFootStyle?: StyleValue
  mainFootClass?: any

  // Card-like wrappers by area
  card?: boolean | Arrayable<SectionLayoutCardArea>

  /**
   * 布局高度
   */
  height?: string

  /**
   * 主内容区域尺寸变化回调（main-content）
   */
  onMainContentResize?: Arrayable<(data: ElementSize) => void>
}

export interface SectionLayoutSlots {
  // Outer
  'top'?: () => VNodeChild
  'main'?: () => VNodeChild
  'bottom'?: () => VNodeChild

  // Inner within main
  'main-head'?: () => VNodeChild
  'main-content'?: (data: ElementSize) => VNodeChild
  'main-foot'?: () => VNodeChild

  /**
   * default 作为 main-content 的别名插槽
   */
  'default'?: (data: ElementSize) => VNodeChild
}
