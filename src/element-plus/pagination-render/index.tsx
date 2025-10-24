import type {
  PaginationEmits as ElPaginationEmits,
  PaginationProps as ElPaginationProps,
} from 'element-plus'
import type { FunctionalComponent } from 'vue'
import type { ComponentSlots } from 'vue-component-type-helpers'
import type { UsePaginationReturn } from '@/shared/use-pagination'
import { ElPagination } from 'element-plus'
import { mergeProps } from 'vue'

export interface PaginationRenderProps
  extends Partial<
    Omit<ElPaginationProps, 'currentPage' | 'pageSize' | 'pageCount' | 'total'>
  > {
  /**
   * 通过 `usePaginationReturn` 创建的控制器
   */
  pagination: UsePaginationReturn
}

export interface PaginationRenderEmits extends ElPaginationEmits {}

export interface PaginationRenderSlots
  extends ComponentSlots<typeof ElPagination> {}

export const PaginationRender: FunctionalComponent<
  PaginationRenderProps,
  PaginationRenderEmits,
  PaginationRenderSlots
> & {
  defaultProps?: Partial<
    Pick<
      ElPaginationProps,
      | 'background' |
      'layout' |
      'pagerCount' |
      'pageSizes' |
      'hideOnSinglePage' |
      'nextIcon' |
      'nextText' |
      'prevIcon' |
      'prevText'
    >
  >
} = ({ pagination, ...props }, { attrs, slots }) => {
  const { currentPage, currentPageSize, pageCount, total } = pagination

  const finalProps: Partial<ElPaginationProps> = mergeProps(
    PaginationRender.defaultProps || {},

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

PaginationRender.props = {
  pagination: {
    type: Object,
    required: true,
  },
}
