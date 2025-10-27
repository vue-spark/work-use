import type { SectionLayoutConfig } from './interface'
import SectionLayoutImpl from './index.vue'

export { default as SectionItem } from './components/item.vue'
export { default as SectionMain } from './components/main.vue'

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

SectionLayout.configure = /* @__PURE__ */ configure.bind(SectionLayout)

SectionLayout.clone = /* @__PURE__ */ (config: SectionLayoutConfig = {}) => {
  // SFC 本质上是一个普通对象，这里可以通过浅拷贝进行克隆
  const cloned = { ...SectionLayout } as typeof SectionLayout
  cloned.configure = configure.bind(cloned)
  cloned.configure(config)
  return cloned
}

function configure(
  this: any,
  config: SectionLayoutConfig = {},
): SectionLayoutConfig {
  this.config = Object.assign(this.config || {}, config)
  return this.config
}
