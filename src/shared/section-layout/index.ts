import type { SectionLayoutConfig } from './interface'
import SectionLayoutImpl from './index.vue'

export { default as SectionItem } from './components/item.vue'
export { default as SectionMain } from './components/main.vue'

export type * from './interface'

export const SectionLayout = SectionLayoutImpl as typeof SectionLayoutImpl & {
  /**
   * 全局配置
   */
  config?: SectionLayoutConfig
}
