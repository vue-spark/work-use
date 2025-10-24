import type { SectionLayoutConfig } from './index.vue'
import SectionLayoutImpl from './index.vue'

export type * from './interface'

export const SectionLayout = SectionLayoutImpl as typeof SectionLayoutImpl & {
  /**
   * 全局配置
   */
  configure: (config?: SectionLayoutConfig) => SectionLayoutConfig
}

SectionLayout.configure = /* @__PURE__ */ (
  config: SectionLayoutConfig = {},
) => {
  SectionLayout.config = Object.assign(SectionLayout.config || {}, config)
  return SectionLayout.config
}
