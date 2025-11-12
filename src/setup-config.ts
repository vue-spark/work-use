import type { paginationProps as ElPaginationProps } from 'element-plus'
import type { Simplify } from 'type-fest'
import type { ExtractPublicPropTypes, Reactive } from 'vue'
import type { defaultPropKeys as ElPaginationAdapterDefaultPropKeys } from './element-plus/pagination-adapter/default-prop-keys'
import { reactive } from 'vue'

export interface SetupConfig {
  SectionLayout?: {
    /**
     * 内置卡片样式类名，方便统一设置卡片样式
     */
    cardClass?: any
  }

  ElementPlus?: {
    ElPaginationAdapter?: {
      /**
       * 默认属性
       */
      defaultProps?: Simplify<
        Pick<
          ExtractPublicPropTypes<typeof ElPaginationProps>,
          (typeof ElPaginationAdapterDefaultPropKeys)[number]
        >
      >
    }
  }
}

const config = reactive<SetupConfig>({})

/**
 * 获取全局配置
 */
export function useSetupConfig(): Reactive<SetupConfig> {
  return config
}

/**
 * 设置全局配置
 */
export function setupConfig(userConfig: SetupConfig): void {
  Object.assign(config, userConfig)
}
