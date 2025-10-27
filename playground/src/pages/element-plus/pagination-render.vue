<script setup lang="ts">
import { sleep } from '@antfu/utils'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import {
  PaginationRender,
  SectionItem,
  SectionLayout,
  SectionMain,
  usePagination,
} from '@/element-plus'

// 配置选项
const config = reactive({
  background: true,
  layout: 'prev, pager, next, jumper, sizes, total',
  pagerCount: 7,
  pageSizes: [10, 20, 30, 50, 100],
  small: false,
  disabled: false,
  hideOnSinglePage: false,
  showSlot: true,
})

// 布局选项
const layoutOptions = [
  { label: '完整布局', value: 'prev, pager, next, jumper, sizes, total' },
  { label: '简洁布局', value: 'prev, pager, next' },
  { label: '带跳转', value: 'prev, pager, next, jumper' },
  { label: '带总数', value: 'prev, pager, next, total' },
  { label: '带尺寸选择', value: 'prev, pager, next, sizes' },
  {
    label: '自定义插槽',
    value: 'slot, prev, pager, next, jumper, sizes, total',
  },
]

// 基础示例
const basicPagination = usePagination({
  total: 100,
  pageSize: 10,
})

// 大数据量示例
const largePagination = usePagination({
  total: 10000,
  pageSize: 50,
})

// 动态数据示例
interface DataItem {
  id: number
  title: string
  author: string
  date: string
  status: 'published' | 'draft' | 'archived'
}

const tableData = ref<DataItem[]>([])
const loading = ref(false)
const totalItems = ref(256)

const tablePagination = usePagination({
  total: () => totalItems.value,
  pageSize: 15,
  onChange: async ({ page, pageSize }) => {
    await loadTableData(page, pageSize)
  },
})

async function loadTableData(page: number, pageSize: number) {
  loading.value = true
  try {
    await sleep(800)
    const start = (page - 1) * pageSize
    const statuses = ['published', 'draft', 'archived'] as const
    tableData.value = Array.from(
      { length: Math.min(pageSize, totalItems.value - start) },
      (_, i) => {
        const randomIndex = Math.floor(Math.random() * 3) as 0 | 1 | 2
        return {
          id: start + i + 1,
          title: `文章标题 ${start + i + 1}`,
          author: `作者 ${Math.floor(Math.random() * 10) + 1}`,
          date: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString(),
          status: statuses[randomIndex]!,
        }
      },
    )
  }
  finally {
    loading.value = false
  }
}

// 初始加载
loadTableData(1, 15)

// 自定义默认属性示例
const customDefaultPagination = usePagination({
  total: 500,
  pageSize: 20,
})

// 配置全局默认属性
function applyGlobalDefaults() {
  PaginationRender.defaultProps = {
    background: config.background,
    layout: config.layout,
    pagerCount: config.pagerCount,
    pageSizes: config.pageSizes,
  }
  ElMessage.success('全局默认属性已更新')
}

// 重置全局默认属性
function resetGlobalDefaults() {
  PaginationRender.defaultProps = {
    background: true,
    layout: 'prev, pager, next, jumper, sizes, total',
    pagerCount: 7,
    pageSizes: [10, 20, 30, 50, 100],
  }
  config.background = true
  config.layout = 'prev, pager, next, jumper, sizes, total'
  config.pagerCount = 7
  config.pageSizes = [10, 20, 30, 50, 100]
  ElMessage.success('全局默认属性已重置')
}

// 获取状态标签类型
function getStatusType(status: string) {
  const map: Record<string, 'success' | 'info' | 'warning'> = {
    published: 'success',
    draft: 'info',
    archived: 'warning',
  }
  return map[status] || 'info'
}

// 获取状态文本
function getStatusText(status: string) {
  const map: Record<string, string> = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档',
  }
  return map[status] || status
}
</script>

<template>
  <SectionLayout height="100%">
    <!-- 配置区域 -->
    <SectionItem card>
      <div style="padding: 16px">
        <ElSpace
          direction="vertical"
          style="width: 100%"
          fill
        >
          <ElText tag="b">
            PaginationRender 组件配置
          </ElText>

          <ElSpace
            wrap
            :size="16"
          >
            <ElSpace>
              <ElText>背景色:</ElText>
              <ElSwitch v-model="config.background" />
            </ElSpace>

            <ElSpace>
              <ElText>小尺寸:</ElText>
              <ElSwitch v-model="config.small" />
            </ElSpace>

            <ElSpace>
              <ElText>禁用:</ElText>
              <ElSwitch v-model="config.disabled" />
            </ElSpace>

            <ElSpace>
              <ElText>单页隐藏:</ElText>
              <ElSwitch v-model="config.hideOnSinglePage" />
            </ElSpace>

            <ElSpace>
              <ElText>显示插槽:</ElText>
              <ElSwitch v-model="config.showSlot" />
            </ElSpace>
          </ElSpace>

          <ElSpace>
            <ElText>布局:</ElText>
            <ElSelect
              v-model="config.layout"
              style="width: 400px"
            >
              <ElOption
                v-for="option in layoutOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </ElSelect>
          </ElSpace>

          <ElSpace>
            <ElText>页码按钮数量:</ElText>
            <ElInputNumber
              v-model="config.pagerCount"
              :min="5"
              :max="21"
              :step="2"
            />
          </ElSpace>

          <ElSpace>
            <ElButton
              type="primary"
              @click="applyGlobalDefaults"
            >
              应用为全局默认属性
            </ElButton>
            <ElButton @click="resetGlobalDefaults">
              重置全局默认属性
            </ElButton>
          </ElSpace>
        </ElSpace>
      </div>
    </SectionItem>

    <!-- 示例区域 -->
    <SectionMain card>
      <div style="padding: 16px">
        <ElSpace
          direction="vertical"
          style="width: 100%"
          :size="24"
          fill
        >
          <!-- 基础示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              1. 基础用法
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  <code>PaginationRender</code> 是对 Element Plus 的
                  <code>ElPagination</code> 组件的封装， 通过
                  <code>usePagination</code> 返回的控制器自动管理分页状态。
                </ElText>

                <PaginationRender
                  :pagination="basicPagination"
                  :background="config.background"
                  :layout="config.layout"
                  :pager-count="config.pagerCount"
                  :page-sizes="config.pageSizes"
                  :small="config.small"
                  :disabled="config.disabled"
                  :hide-on-single-page="config.hideOnSinglePage"
                >
                  <div
                    v-if="config.showSlot && config.layout.includes('slot')"
                    style="margin-right: 16px"
                  >
                    <ElButton
                      type="primary"
                      size="small"
                    >
                      自定义操作
                    </ElButton>
                  </div>
                </PaginationRender>

                <ElDescriptions
                  :column="2"
                  border
                  size="small"
                >
                  <ElDescriptionsItem label="当前页">
                    {{ basicPagination.currentPage.value }}
                  </ElDescriptionsItem>
                  <ElDescriptionsItem label="每页数量">
                    {{ basicPagination.currentPageSize.value }}
                  </ElDescriptionsItem>
                  <ElDescriptionsItem label="总数">
                    {{ basicPagination.total.value }}
                  </ElDescriptionsItem>
                  <ElDescriptionsItem label="总页数">
                    {{ basicPagination.pageCount.value }}
                  </ElDescriptionsItem>
                </ElDescriptions>
              </ElSpace>
            </div>
          </div>

          <!-- 大数据量示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              2. 大数据量分页
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  处理大量数据时，分页组件会自动优化显示，只显示部分页码按钮。
                </ElText>

                <ElAlert
                  type="info"
                  :closable="false"
                  show-icon
                >
                  <template #title>
                    当前显示第 {{ largePagination.currentPage.value }} 页， 共
                    {{ largePagination.pageCount.value }} 页， 总计
                    {{ largePagination.total.value }} 条数据
                  </template>
                </ElAlert>

                <PaginationRender
                  :pagination="largePagination"
                  background
                  layout="prev, pager, next, jumper, total"
                />

                <ElSpace>
                  <ElButton
                    size="small"
                    @click="largePagination.jumpTo(1)"
                  >
                    跳转到首页
                  </ElButton>
                  <ElButton
                    size="small"
                    @click="largePagination.jumpTo(50)"
                  >
                    跳转到第 50 页
                  </ElButton>
                  <ElButton
                    size="small"
                    @click="largePagination.jumpTo(100)"
                  >
                    跳转到第 100 页
                  </ElButton>
                  <ElButton
                    size="small"
                    @click="
                      largePagination.jumpTo(largePagination.pageCount.value)
                    "
                  >
                    跳转到末页
                  </ElButton>
                </ElSpace>
              </ElSpace>
            </div>
          </div>

          <!-- 表格分页示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              3. 表格分页应用
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText> 结合表格组件使用，实现数据的分页加载和展示。 </ElText>

                <ElTable
                  v-loading="loading"
                  :data="tableData"
                  border
                  stripe
                  style="width: 100%"
                >
                  <ElTableColumn
                    prop="id"
                    label="ID"
                    width="80"
                    align="center"
                  />
                  <ElTableColumn
                    prop="title"
                    label="标题"
                    min-width="200"
                  />
                  <ElTableColumn
                    prop="author"
                    label="作者"
                    width="120"
                  />
                  <ElTableColumn
                    prop="date"
                    label="日期"
                    width="120"
                  />
                  <ElTableColumn
                    label="状态"
                    width="100"
                    align="center"
                  >
                    <template #default="{ row }">
                      <ElTag :type="getStatusType(row.status)">
                        {{ getStatusText(row.status) }}
                      </ElTag>
                    </template>
                  </ElTableColumn>
                  <ElTableColumn
                    label="操作"
                    width="150"
                    align="center"
                  >
                    <template #default>
                      <ElButton
                        type="primary"
                        size="small"
                        link
                      >
                        编辑
                      </ElButton>
                      <ElButton
                        type="danger"
                        size="small"
                        link
                      >
                        删除
                      </ElButton>
                    </template>
                  </ElTableColumn>
                </ElTable>

                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <PaginationRender
                    :pagination="tablePagination"
                    background
                    layout="prev, pager, next, jumper, sizes, total"
                    :page-sizes="[10, 15, 20, 30, 50]"
                  >
                    <div style="margin-right: 16px">
                      <ElButton
                        type="danger"
                        size="small"
                      >
                        批量删除
                      </ElButton>
                    </div>
                  </PaginationRender>
                </div>
              </ElSpace>
            </div>
          </div>

          <!-- 自定义插槽示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              4. 自定义插槽
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  通过默认插槽可以在分页组件中添加自定义内容，需要在
                  <code>layout</code> 中包含 <code>slot</code>。
                </ElText>

                <PaginationRender
                  :pagination="customDefaultPagination"
                  background
                  layout="slot, prev, pager, next, jumper, sizes, total"
                >
                  <div style="display: flex; gap: 8px; margin-right: 16px">
                    <ElButton
                      type="primary"
                      size="small"
                    >
                      导出数据
                    </ElButton>
                    <ElButton
                      type="success"
                      size="small"
                    >
                      刷新
                    </ElButton>
                  </div>
                </PaginationRender>

                <ElDivider />

                <PaginationRender
                  :pagination="customDefaultPagination"
                  background
                  layout="slot, prev, pager, next"
                >
                  <div style="margin-right: 16px">
                    <ElTag type="info">
                      共 {{ customDefaultPagination.total.value }} 条记录
                    </ElTag>
                  </div>
                </PaginationRender>
              </ElSpace>
            </div>
          </div>

          <!-- 全局默认属性示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              5. 全局默认属性
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  通过
                  <code>PaginationRender.defaultProps</code>
                  可以设置全局默认属性， 所有
                  <code>PaginationRender</code> 实例都会继承这些属性。
                </ElText>

                <ElAlert
                  type="warning"
                  :closable="false"
                  show-icon
                >
                  <template #title>
                    提示
                  </template>
                  <div>
                    在页面顶部的配置区域修改配置后，点击"应用为全局默认属性"按钮，
                    可以将当前配置应用到所有分页组件。
                  </div>
                </ElAlert>

                <ElDescriptions
                  :column="1"
                  border
                  size="small"
                >
                  <ElDescriptionsItem label="当前全局默认属性">
                    <pre style="margin: 0">{{
                      JSON.stringify(PaginationRender.defaultProps, null, 2)
                    }}</pre>
                  </ElDescriptionsItem>
                </ElDescriptions>
              </ElSpace>
            </div>
          </div>

          <!-- API 说明 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              6. API 说明
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <div>
                  <ElText tag="b">
                    属性 (PaginationRenderProps):
                  </ElText>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      <code>pagination</code>: UsePaginationReturn（必填）- 通过
                      <code>usePagination</code> 创建的控制器
                    </li>
                    <li><code>background</code>: boolean - 是否显示背景色</li>
                    <li>
                      <code>layout</code>: string - 组件布局，可选值：prev,
                      pager, next, jumper, sizes, total, slot
                    </li>
                    <li>
                      <code>pagerCount</code>: number -
                      页码按钮的数量（奇数，最小 5，最大 21）
                    </li>
                    <li>
                      <code>pageSizes</code>: number[] -
                      每页显示个数选择器的选项
                    </li>
                    <li><code>small</code>: boolean - 是否使用小型分页样式</li>
                    <li><code>disabled</code>: boolean - 是否禁用</li>
                    <li>
                      <code>hideOnSinglePage</code>: boolean -
                      只有一页时是否隐藏
                    </li>
                    <li>其他 Element Plus ElPagination 支持的属性</li>
                  </ul>
                </div>

                <div>
                  <ElText tag="b">
                    插槽 (PaginationRenderSlots):
                  </ElText>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      <code>default</code>: 自定义内容，需要在 layout 中包含
                      slot
                    </li>
                  </ul>
                </div>

                <div>
                  <ElText tag="b">
                    全局配置:
                  </ElText>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      <code>PaginationRender.defaultProps</code>:
                      设置全局默认属性，支持
                      background、layout、pagerCount、pageSizes
                    </li>
                  </ul>
                </div>

                <ElAlert
                  type="info"
                  :closable="false"
                >
                  <template #title>
                    <ElText tag="b">
                      特性说明
                    </ElText>
                  </template>
                  <div>
                    <ul style="margin: 8px 0; padding-left: 20px">
                      <li>
                        自动绑定
                        <code>usePagination</code>
                        返回的状态（currentPage、pageSize、total、pageCount）
                      </li>
                      <li>自动处理页码和每页数量的变化事件</li>
                      <li>
                        支持通过 <code>defaultProps</code> 设置全局默认属性
                      </li>
                      <li>
                        完全兼容 Element Plus ElPagination 的所有属性和事件
                      </li>
                    </ul>
                  </div>
                </ElAlert>
              </ElSpace>
            </div>
          </div>
        </ElSpace>
      </div>
    </SectionMain>
  </SectionLayout>
</template>
