import type {
  PaginationEmits as ElPaginationEmits,
  PaginationProps as ElPaginationProps,
} from 'element-plus'
import type { Writable } from 'type-fest'
import type { FunctionalComponent } from 'vue'
import type { ComponentSlots } from 'vue-component-type-helpers'
import type { UsePaginationReturn } from '@/shared/use-pagination'
import { objectPick } from '@antfu/utils'
import { ElPagination } from 'element-plus'
import { mergeProps } from 'vue'
import { useSetupConfig } from '@/setup-config'
import { defaultPropKeys } from './default-prop-keys'

export interface ElPaginationAdapterProps
  extends Partial<
    Omit<ElPaginationProps, 'currentPage' | 'pageSize' | 'pageCount' | 'total'>
  > {
  /**
   * 通过 `usePagination` 创建的控制器
   */
  pagination: UsePaginationReturn
}

export interface ElPaginationAdapterEmits extends ElPaginationEmits {}

export interface ElPaginationAdapterSlots
  extends ComponentSlots<typeof ElPagination> {}

export const ElPaginationAdapter: FunctionalComponent<
  ElPaginationAdapterProps,
  ElPaginationAdapterEmits,
  ElPaginationAdapterSlots
> = ({ pagination, ...props }, { attrs, slots }) => {
  const config = useSetupConfig().ElementPlus?.ElPaginationAdapter
  const { currentPage, currentPageSize, pageCount, total } = pagination

  const finalProps: Partial<ElPaginationProps> = mergeProps(
    objectPick(
      config?.defaultProps || {},
      defaultPropKeys as Writable<typeof defaultPropKeys>,
    ),

    // 需要与 attrs 内的事件名保持一致
    {
      'onUpdate:currentPage': (v: number) => {
        currentPage.value = v
      },
      'onUpdate:pageSize': (v: number) => {
        currentPageSize.value = v
      },
    },

    attrs,
    props,

    {
      currentPage: currentPage.value,
      pageSize: currentPageSize.value,
      pageCount: pageCount.value,
      total: total.value,
    },
  )

  return <ElPagination {...finalProps}>{slots}</ElPagination>
}

ElPaginationAdapter.props = {
  pagination: {
    type: Object,
    required: true,
  },
}
