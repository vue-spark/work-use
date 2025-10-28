import type { TableColumnCtx } from 'element-plus'
import type { FunctionalComponent, ObjectEmitsOptions, VNodeChild } from 'vue'
import type { ComponentProps } from 'vue-component-type-helpers'
import { isString, objectMap } from '@antfu/utils'
import { ElTableColumn } from 'element-plus'

/**
 * `ElTableColumn` 的插槽类型
 */
export interface TableColumnSlots<T extends { [K: PropertyKey]: any } = any> {
  'default'?: (data: {
    row: T
    column: TableColumnCtx<T>
    $index: number
  }) => VNodeChild

  'header'?: (data: { column: TableColumnCtx<T>, $index: number }) => VNodeChild

  'filter-icon'?: (data: { filterOpened: boolean }) => VNodeChild

  'expand'?: (data: { expanded: boolean }) => VNodeChild
}

export type ObjectTableColumnProps<T extends { [K: PropertyKey]: any } = any> =
  ComponentProps<typeof ElTableColumn> & {
    /**
     * 正常情况下应该是通过 `ComponentSlots<typeof ElTableColumn>` 提取出来，
     * 但是 `ElTableColumn` 类型定义存在缺失，这里根据官网进行补充并优化。
     *
     * 若想在 `<template>` 中使用，则需要使用 `<template #[slotType]:[slotName]>`，
     * 其中 `[slotName]` 为 `slots.[slotType]` 设置的名称（仅支持字符串），
     * 但是模板中会丢失 `TableColumnProps<T>` 的泛型提示！
     *
     * @example
     * ```ts
     * // script 部分
     * const columns: TableColumnProps[] = [
     *   {
     *     prop: 'name',
     *     label: 'Name',
     *     slots: {
     *       // 引用模板中的插槽
     *       default: 'name',
     *
     *       // 使用自定义渲染函数
     *       header({ column }) {
     *         return <h3>{ column.label } - { Date.now() }</h3>
     *       }
     *     },
     *   },
     * ]
     * ```
     *
     * ```html
     * <!-- template 部分 -->
     * <TableColumnsRender :columns="columns">
     *   <template #default:name="{ row }">
     *     {{ row.name }}
     *   </template>
     * </TableColumnsRender>
     * ```
     */
    slots?: {
      [K in keyof TableColumnSlots<T>]: string | TableColumnSlots<T>[K]
    } & {
      [K: string]: string | ((data: any) => VNodeChild)
    }

    /**
     * 子列定义
     */
    children?: TableColumnProps<T>[]
  }

type FalsyTableColumnProps = false | null | undefined

export type TableColumnProps<T extends { [K: PropertyKey]: any } = any> =
  | FalsyTableColumnProps |
  ObjectTableColumnProps<T>

export interface TableColumnsRenderProps {
  /**
   * 列定义，同 `ElTableColumn` 的属性，额外支持 `children` 用于定义子列，
   * 列的 `slots` 同 `ElTableColumn` 的 `slots`
   */
  columns: TableColumnProps<any>[]
}

/**
 * 由于 `ElTableColumn` 没有 `emit` 事件，这里只是为了类型占位
 */
interface TableColumnsRenderEmits extends ObjectEmitsOptions {}

export type TableColumnsRenderSlots = {
  [K in keyof TableColumnSlots<any> as `${K}:${string}`]: NonNullable<
    TableColumnSlots<any>[K]
  >
} & {
  [K: string]: (data: any) => VNodeChild
}

export const TableColumnsRender: FunctionalComponent<
  TableColumnsRenderProps,
  TableColumnsRenderEmits,
  TableColumnsRenderSlots
> = ({ columns }, { slots }) => {
  const vNodes: VNodeChild = []

  for (const column of columns) {
    if (!column) {
      continue
    }

    const { children, slots: userSlots = {}, ...columnProps } = column
    const finalSlots = objectMap(userSlots, (key, value) => [
      key,
      isString(value) ? slots[`${key}:${value}`] : value,
    ])

    vNodes.push(
      <ElTableColumn {...columnProps}>
        {{
          ...finalSlots,
          default:
            children && !finalSlots.default
              ? () => <TableColumnsRender columns={children} />
              : finalSlots.default,
        }}
      </ElTableColumn>,
    )
  }

  return vNodes
}

TableColumnsRender.props = {
  columns: {
    type: Array,
    required: true,
  },
}
