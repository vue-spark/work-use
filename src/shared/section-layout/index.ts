import type { SectionLayoutConfig } from './index.vue'
import SectionLayoutImpl from './index.vue'

export type * from './interface'

export const SectionLayout = SectionLayoutImpl as typeof SectionLayoutImpl & {
  /**
   * 全局配置
   */
  configure: (config?: SectionLayoutConfig) => SectionLayoutConfig

  /**
   * 克隆一个新的 SectionLayout 组件
   */
  clone: (config?: SectionLayoutConfig) => typeof SectionLayout
}

SectionLayout.configure = /* @__PURE__ */ function (
  config: SectionLayoutConfig = {},
) {
  this.config = Object.assign(this.config || {}, config)
  return this.config
}

SectionLayout.clone = /* @__PURE__ */ (config: SectionLayoutConfig = {}) => {
  // SFC 本质上是一个普通对象，这里可以通过浅拷贝进行克隆
  const cloned = { ...SectionLayout } as typeof SectionLayout
  cloned.configure(config)
  return cloned
}
