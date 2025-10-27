<script setup lang="ts">
import type { ColumnProps } from '@/element-plus'
import { sleep } from '@antfu/utils'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import {
  ColumnsRender,
  PaginationRender,
  SectionItem,
  SectionLayout,
  SectionMain,
  Toolbar,
  usePagination,
} from '@/element-plus'

// 配置选项
const config = reactive({
  showBasic: true,
  showNested: true,
  showSlots: true,
  showRenderFunction: true,
  showPagination: true,
  showSelection: true,
})

// #region 基础示例
interface BasicDataItem {
  id: number
  name: string
  email: string
  age: number
  status: 'active' | 'inactive' | 'pending'
}

const basicData = ref<BasicDataItem[]>([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    age: 28,
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    age: 32,
    status: 'inactive',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    age: 25,
    status: 'pending',
  },
  {
    id: 4,
    name: '赵六',
    email: 'zhaoliu@example.com',
    age: 35,
    status: 'active',
  },
  {
    id: 5,
    name: '孙七',
    email: 'sunqi@example.com',
    age: 29,
    status: 'active',
  },
])

const basicColumns: ColumnProps<BasicDataItem>[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
  },
  {
    prop: 'name',
    label: '姓名',
    width: 120,
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: 200,
  },
  {
    prop: 'age',
    label: '年龄',
    width: 100,
    align: 'center',
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    align: 'center',
  },
]
// #endregion

// #region 嵌套列示例
interface NestedDataItem {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
  phone: string
}

const nestedData = ref<NestedDataItem[]>([
  {
    date: '2024-01-15',
    name: 'Tom Smith',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St',
    zip: 'CA 90036',
    phone: '555-0123',
  },
  {
    date: '2024-01-16',
    name: 'Jane Doe',
    state: 'New York',
    city: 'New York City',
    address: 'No. 456, Broadway',
    zip: 'NY 10013',
    phone: '555-0456',
  },
  {
    date: '2024-01-17',
    name: 'Bob Johnson',
    state: 'Texas',
    city: 'Houston',
    address: 'No. 789, Main St',
    zip: 'TX 77002',
    phone: '555-0789',
  },
])

const nestedColumns: ColumnProps<NestedDataItem>[] = [
  {
    prop: 'date',
    label: '日期',
    width: 120,
  },
  {
    label: '配送信息',
    children: [
      {
        prop: 'name',
        label: '姓名',
        width: 120,
      },
      {
        prop: 'phone',
        label: '电话',
        width: 120,
      },
      {
        label: '地址信息',
        children: [
          {
            prop: 'state',
            label: '州',
            width: 100,
          },
          {
            prop: 'city',
            label: '城市',
            width: 120,
          },
          {
            prop: 'address',
            label: '详细地址',
            minWidth: 150,
          },
          {
            prop: 'zip',
            label: '邮编',
            width: 100,
          },
        ],
      },
    ],
  },
]
// #endregion

// #region 插槽示例
interface SlotDataItem {
  id: number
  product: string
  price: number
  stock: number
  category: string
}

const slotData = ref<SlotDataItem[]>([
  { id: 1, product: 'MacBook Pro', price: 12999, stock: 15, category: '电脑' },
  { id: 2, product: 'iPhone 15', price: 5999, stock: 32, category: '手机' },
  { id: 3, product: 'iPad Air', price: 4799, stock: 8, category: '平板' },
  { id: 4, product: 'AirPods Pro', price: 1899, stock: 50, category: '配件' },
])

const slotColumns: ColumnProps<SlotDataItem>[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
  },
  {
    prop: 'product',
    label: '产品名称',
    minWidth: 150,
    slots: {
      // 使用模板插槽
      default: 'product-cell',
    },
  },
  {
    prop: 'price',
    label: '价格',
    width: 120,
    align: 'right',
    slots: {
      // 使用模板插槽
      default: 'price-cell',
    },
  },
  {
    prop: 'stock',
    label: '库存',
    width: 100,
    align: 'center',
    slots: {
      // 使用模板插槽
      default: 'stock-cell',
    },
  },
  {
    prop: 'category',
    label: '分类',
    width: 100,
    align: 'center',
    slots: {
      // 使用自定义 header 插槽
      header: 'category-header',
    },
  },
]
// #endregion

// #region 渲染函数示例
interface RenderDataItem {
  id: number
  title: string
  author: string
  views: number
  likes: number
  publishDate: string
  featured: boolean
}

const renderData = ref<RenderDataItem[]>([
  {
    id: 1,
    title: 'Vue 3 组合式 API 最佳实践',
    author: '张三',
    views: 1234,
    likes: 89,
    publishDate: '2024-01-15',
    featured: true,
  },
  {
    id: 2,
    title: 'TypeScript 高级类型详解',
    author: '李四',
    views: 2345,
    likes: 156,
    publishDate: '2024-01-16',
    featured: false,
  },
  {
    id: 3,
    title: 'Vite 构建优化技巧',
    author: '王五',
    views: 3456,
    likes: 234,
    publishDate: '2024-01-17',
    featured: true,
  },
])

const renderColumns: ColumnProps<RenderDataItem>[] = [
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    minWidth: 200,
    slots: {
      // 使用模板插槽
      default: 'render-title',
    },
  },
  {
    prop: 'author',
    label: '作者',
    width: 120,
    slots: {
      // 使用模板插槽
      default: 'render-author',
    },
  },
  {
    prop: 'views',
    label: '浏览量',
    width: 120,
    align: 'right',
    sortable: true,
    slots: {
      // 使用模板插槽
      default: 'render-views',
    },
  },
  {
    prop: 'likes',
    label: '点赞数',
    width: 120,
    align: 'right',
    sortable: true,
    slots: {
      // 使用模板插槽
      default: 'render-likes',
    },
  },
  {
    prop: 'publishDate',
    label: '发布日期',
    width: 120,
    align: 'center',
  },
  {
    label: '操作',
    width: 150,
    align: 'center',
    fixed: 'right',
    slots: {
      // 使用模板插槽
      default: 'render-actions',
    },
  },
]

function handleEdit(row: RenderDataItem) {
  ElMessage.success(`编辑文章: ${row.title}`)
}

function handleDelete(row: RenderDataItem) {
  ElMessage.error(`删除文章: ${row.title}`)
}
// #endregion

// #region 分页表格示例
interface PaginationDataItem {
  id: number
  username: string
  email: string
  role: string
  department: string
  joinDate: string
  status: 'active' | 'inactive' | 'pending'
}

const paginationData = ref<PaginationDataItem[]>([])
const paginationLoading = ref(false)
const totalItems = ref(156)

const pagination = usePagination({
  total: () => totalItems.value,
  pageSize: 10,
  onChange: async ({ page, pageSize }) => {
    await loadPaginationData(page, pageSize)
  },
})

async function loadPaginationData(page: number, pageSize: number) {
  paginationLoading.value = true
  try {
    await sleep(500)
    const start = (page - 1) * pageSize
    const roles = ['管理员', '编辑', '用户'] as const
    const departments = ['技术部', '产品部', '运营部', '市场部'] as const
    const statuses = ['active', 'inactive', 'pending'] as const

    paginationData.value = Array.from(
      { length: Math.min(pageSize, totalItems.value - start) },
      (_, i) => {
        const roleIndex = Math.floor(Math.random() * 3) as 0 | 1 | 2
        const deptIndex = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3
        const statusIndex = Math.floor(Math.random() * 3) as 0 | 1 | 2
        return {
          id: start + i + 1,
          username: `user${start + i + 1}`,
          email: `user${start + i + 1}@example.com`,
          role: roles[roleIndex],
          department: departments[deptIndex],
          joinDate: new Date(
            Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
          ).toLocaleDateString(),
          status: statuses[statusIndex],
        }
      },
    )
  }
  finally {
    paginationLoading.value = false
  }
}

// 初始加载
loadPaginationData(1, 10)

const paginationColumns: ColumnProps<PaginationDataItem>[] = [
  {
    type: 'selection',
    width: 55,
    align: 'center',
  },
  {
    prop: 'id',
    label: 'ID',
    width: 80,
    align: 'center',
  },
  {
    prop: 'username',
    label: '用户名',
    width: 120,
  },
  {
    prop: 'email',
    label: '邮箱',
    minWidth: 180,
  },
  {
    prop: 'role',
    label: '角色',
    width: 100,
    align: 'center',
    slots: {
      default: 'pagination-role',
    },
  },
  {
    prop: 'department',
    label: '部门',
    width: 120,
    align: 'center',
  },
  {
    prop: 'joinDate',
    label: '加入日期',
    width: 120,
    align: 'center',
  },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    align: 'center',
    slots: {
      default: 'pagination-status',
    },
  },
  {
    label: '操作',
    width: 150,
    align: 'center',
    fixed: 'right',
    slots: {
      default: 'pagination-actions',
    },
  },
]

// 选中的行
const selectedRows = ref<PaginationDataItem[]>([])

function handleSelectionChange(selection: PaginationDataItem[]) {
  selectedRows.value = selection
}

function handleBatchDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先选择要删除的数据')
    return
  }
  ElMessage.success(`批量删除 ${selectedRows.value.length} 条数据`)
}
// #endregion

// 获取状态类型
function getStatusType(status: string) {
  const map: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success',
    inactive: 'danger',
    pending: 'warning',
  }
  return map[status] || 'info'
}

// 获取状态文本
function getStatusText(status: string) {
  const map: Record<string, string> = {
    active: '活跃',
    inactive: '停用',
    pending: '待审核',
  }
  return map[status] || status
}

// 格式化价格
function formatPrice(price: number) {
  return `¥${price.toLocaleString()}`
}

// 获取库存状态
function getStockStatus(stock: number) {
  if (stock === 0) {
    return { type: 'danger' as const, text: '缺货' }
  }
  if (stock < 10) {
    return { type: 'warning' as const, text: '库存紧张' }
  }
  return { type: 'success' as const, text: '充足' }
}
</script>

<template>
  <SectionLayout height="100%">
    <!-- 配置区域 -->
    <SectionItem card>
      <ElSpace
        direction="vertical"
        style="width: 100%"
        fill
      >
        <ElText tag="b">
          ColumnsRender 组件配置
        </ElText>

        <ElSpace wrap>
          <ElCheckbox v-model="config.showBasic">
            显示基础示例
          </ElCheckbox>
          <ElCheckbox v-model="config.showNested">
            显示嵌套列示例
          </ElCheckbox>
          <ElCheckbox v-model="config.showSlots">
            显示插槽示例
          </ElCheckbox>
          <ElCheckbox v-model="config.showRenderFunction">
            显示渲染函数示例
          </ElCheckbox>
          <ElCheckbox v-model="config.showPagination">
            显示分页表格示例
          </ElCheckbox>
        </ElSpace>
      </ElSpace>
    </SectionItem>

    <!-- 示例区域 -->
    <SectionMain card>
      <ElSpace
        direction="vertical"
        style="width: 100%"
        :size="24"
        fill
      >
        <!-- 基础示例 -->
        <div v-if="config.showBasic">
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
                <code>ColumnsRender</code> 是对 Element Plus 的
                <code>ElTableColumn</code> 组件的封装，
                通过配置化的方式定义表格列，支持嵌套列、自定义插槽和渲染函数。
              </ElText>

              <ElTable
                :data="basicData"
                border
                stripe
                style="width: 100%"
              >
                <ColumnsRender :columns="basicColumns">
                  <!-- 使用模板插槽自定义状态列 -->
                  <template #default:status="{ row }">
                    <ElTag :type="getStatusType(row.status)">
                      {{ getStatusText(row.status) }}
                    </ElTag>
                  </template>
                </ColumnsRender>
              </ElTable>

              <ElAlert
                type="info"
                :closable="false"
              >
                <template #title>
                  说明
                </template>
                <div>
                  这是一个基础的表格示例，通过
                  <code>columns</code> 数组配置列定义。
                  状态列使用了模板插槽进行自定义渲染。
                </div>
              </ElAlert>
            </ElSpace>
          </div>
        </div>

        <!-- 嵌套列示例 -->
        <div v-if="config.showNested">
          <ElText
            tag="b"
            size="large"
          >
            2. 嵌套列（多级表头）
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
                <code>children</code> 属性可以定义嵌套列，实现多级表头效果。
              </ElText>

              <ElTable
                :data="nestedData"
                border
                style="width: 100%"
              >
                <ColumnsRender :columns="nestedColumns" />
              </ElTable>

              <ElAlert
                type="info"
                :closable="false"
              >
                <template #title>
                  说明
                </template>
                <div>
                  嵌套列支持多层嵌套，适用于需要对列进行分组展示的场景。
                  本示例展示了两层嵌套：配送信息 → 地址信息。
                </div>
              </ElAlert>
            </ElSpace>
          </div>
        </div>

        <!-- 插槽示例 -->
        <div v-if="config.showSlots">
          <ElText
            tag="b"
            size="large"
          >
            3. 模板插槽
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
                <code>slots</code>
                属性可以引用模板中定义的插槽，实现自定义渲染。 插槽名称格式为
                <code>#[slotType]:[slotName]</code>。
              </ElText>

              <ElTable
                :data="slotData"
                border
                stripe
                style="width: 100%"
              >
                <ColumnsRender :columns="slotColumns">
                  <!-- 产品名称插槽 -->
                  <template #default:product-cell="{ row }">
                    <ElText
                      tag="b"
                      type="primary"
                    >
                      {{ row.product }}
                    </ElText>
                  </template>

                  <!-- 价格插槽 -->
                  <template #default:price-cell="{ row }">
                    <ElText type="danger">
                      {{ formatPrice(row.price) }}
                    </ElText>
                  </template>

                  <!-- 库存插槽 -->
                  <template #default:stock-cell="{ row }">
                    <ElTag :type="getStockStatus(row.stock).type">
                      {{ row.stock }} ({{ getStockStatus(row.stock).text }})
                    </ElTag>
                  </template>

                  <!-- 分类 header 插槽 -->
                  <template #header:category-header="{ column }">
                    <ElSpace>
                      <ElIcon><i class="el-icon-collection-tag" /></ElIcon>
                      <span>{{ column.label }}</span>
                    </ElSpace>
                  </template>
                </ColumnsRender>
              </ElTable>

              <ElAlert
                type="info"
                :closable="false"
              >
                <template #title>
                  说明
                </template>
                <div>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      <code>default</code> 插槽：自定义单元格内容，接收
                      <code>{ row, column, $index }</code> 参数
                    </li>
                    <li>
                      <code>header</code> 插槽：自定义表头内容，接收
                      <code>{ column, $index }</code> 参数
                    </li>
                    <li>
                      在 <code>columns</code> 中通过
                      <code>slots.default: 'slot-name'</code> 引用模板插槽
                    </li>
                  </ul>
                </div>
              </ElAlert>
            </ElSpace>
          </div>
        </div>

        <!-- 渲染函数示例 -->
        <div v-if="config.showRenderFunction">
          <ElText
            tag="b"
            size="large"
          >
            4. 复杂自定义渲染
          </ElText>
          <ElDivider style="margin: 12px 0" />
          <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
            <ElSpace
              direction="vertical"
              style="width: 100%"
              fill
            >
              <ElText>
                通过模板插槽可以实现复杂的自定义渲染，包括条件渲染、事件处理等。
              </ElText>

              <ElTable
                :data="renderData"
                border
                stripe
                style="width: 100%"
              >
                <ColumnsRender :columns="renderColumns">
                  <!-- 标题列 -->
                  <template #default:render-title="{ row }">
                    <div style="display: flex; align-items: center; gap: 8px">
                      <ElTag
                        v-if="row.featured"
                        type="danger"
                        size="small"
                      >
                        精选
                      </ElTag>
                      <span>{{ row.title }}</span>
                    </div>
                  </template>

                  <!-- 作者列 -->
                  <template #default:render-author="{ row }">
                    <ElText
                      type="primary"
                      style="cursor: pointer"
                    >
                      {{ row.author }}
                    </ElText>
                  </template>

                  <!-- 浏览量列 -->
                  <template #default:render-views="{ row }">
                    <ElText type="info">
                      {{ row.views.toLocaleString() }}
                    </ElText>
                  </template>

                  <!-- 点赞数列 -->
                  <template #default:render-likes="{ row }">
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        gap: 4px;
                      "
                    >
                      <ElIcon color="#f56c6c">
                        <i class="el-icon-star-filled" />
                      </ElIcon>
                      <span>{{ row.likes }}</span>
                    </div>
                  </template>

                  <!-- 操作列 -->
                  <template #default:render-actions="{ row }">
                    <ElSpace>
                      <ElButton
                        type="primary"
                        size="small"
                        link
                        @click="handleEdit(row)"
                      >
                        编辑
                      </ElButton>
                      <ElButton
                        type="danger"
                        size="small"
                        link
                        @click="handleDelete(row)"
                      >
                        删除
                      </ElButton>
                    </ElSpace>
                  </template>
                </ColumnsRender>
              </ElTable>

              <ElAlert
                type="info"
                :closable="false"
              >
                <template #title>
                  说明
                </template>
                <div>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>通过模板插槽可以实现复杂的自定义渲染</li>
                    <li>支持条件渲染、循环渲染等 Vue 模板语法</li>
                    <li>可以在插槽中使用 Element Plus 组件和事件处理</li>
                    <li>本示例展示了标签、图标、按钮等多种组件的组合使用</li>
                  </ul>
                </div>
              </ElAlert>
            </ElSpace>
          </div>
        </div>

        <!-- 分页表格示例 -->
        <div v-if="config.showPagination">
          <ElText
            tag="b"
            size="large"
          >
            5. 完整应用 - 分页表格
          </ElText>
          <ElDivider style="margin: 12px 0" />
          <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
            <ElSpace
              direction="vertical"
              style="width: 100%"
              fill
            >
              <ElText>
                结合 <code>PaginationRender</code> 和
                <code>usePagination</code>， 实现完整的分页表格功能。
              </ElText>

              <Toolbar title="用户管理">
                <template #extra>
                  <ElSpace>
                    <ElButton
                      type="primary"
                      size="small"
                    >
                      新增用户
                    </ElButton>
                    <ElButton
                      size="small"
                      @click="
                        loadPaginationData(
                          pagination.currentPage.value,
                          pagination.currentPageSize.value,
                        )
                      "
                    >
                      刷新
                    </ElButton>
                  </ElSpace>
                </template>
              </Toolbar>

              <ElTable
                v-loading="paginationLoading"
                :data="paginationData"
                border
                stripe
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <ColumnsRender :columns="paginationColumns">
                  <!-- 角色列 -->
                  <template #default:pagination-role="{ row }">
                    <ElTag
                      :type="
                        row.role === '管理员'
                          ? 'success'
                          : row.role === '编辑'
                            ? 'warning'
                            : 'info'
                      "
                    >
                      {{ row.role }}
                    </ElTag>
                  </template>

                  <!-- 状态列 -->
                  <template #default:pagination-status="{ row }">
                    <ElTag
                      :type="
                        row.status === 'active'
                          ? 'success'
                          : row.status === 'inactive'
                            ? 'danger'
                            : 'warning'
                      "
                    >
                      {{
                        row.status === 'active'
                          ? '活跃'
                          : row.status === 'inactive'
                            ? '停用'
                            : '待审核'
                      }}
                    </ElTag>
                  </template>

                  <!-- 操作列 -->
                  <template #default:pagination-actions>
                    <ElSpace>
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
                    </ElSpace>
                  </template>
                </ColumnsRender>
              </ElTable>

              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                <PaginationRender
                  :pagination="pagination"
                  background
                  layout="prev, pager, next, jumper, sizes, total"
                  :page-sizes="[10, 20, 30, 50]"
                >
                  <div style="margin-right: 16px">
                    <ElButton
                      type="danger"
                      size="small"
                      :disabled="selectedRows.length === 0"
                      @click="handleBatchDelete"
                    >
                      批量删除 ({{ selectedRows.length }})
                    </ElButton>
                  </div>
                </PaginationRender>
              </div>

              <ElAlert
                type="success"
                :closable="false"
              >
                <template #title>
                  说明
                </template>
                <div>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      支持多选功能，通过
                      <code>type: 'selection'</code> 配置选择列
                    </li>
                    <li>支持固定列，通过 <code>fixed</code> 属性配置</li>
                    <li>支持排序功能，通过 <code>sortable</code> 属性配置</li>
                    <li>结合分页组件实现数据的分页加载</li>
                  </ul>
                </div>
              </ElAlert>
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
                  属性 (ColumnsRenderProps):
                </ElText>
                <ul style="margin: 8px 0; padding-left: 20px">
                  <li>
                    <code>columns</code>: ColumnProps[]（必填）- 列定义数组
                  </li>
                </ul>
              </div>

              <div>
                <ElText tag="b">
                  列配置 (ColumnProps):
                </ElText>
                <ul style="margin: 8px 0; padding-left: 20px">
                  <li><code>prop</code>: string - 对应列内容的字段名</li>
                  <li><code>label</code>: string - 显示的标题</li>
                  <li><code>width</code>: string | number - 列的宽度</li>
                  <li><code>minWidth</code>: string | number - 列的最小宽度</li>
                  <li>
                    <code>align</code>: 'left' | 'center' | 'right' - 对齐方式
                  </li>
                  <li>
                    <code>fixed</code>: boolean | 'left' | 'right' - 列是否固定
                  </li>
                  <li>
                    <code>sortable</code>: boolean | 'custom' - 是否可排序
                  </li>
                  <li>
                    <code>type</code>: 'selection' | 'index' | 'expand' -
                    列的类型
                  </li>
                  <li>
                    <code>children</code>: ColumnProps[] -
                    子列定义（用于多级表头）
                  </li>
                  <li>
                    <code>slots</code>: object - 插槽配置
                    <ul style="margin: 4px 0; padding-left: 20px">
                      <li>
                        <code>default</code>: string | function -
                        自定义单元格内容
                      </li>
                      <li>
                        <code>header</code>: string | function - 自定义表头内容
                      </li>
                    </ul>
                  </li>
                  <li>其他 Element Plus ElTableColumn 支持的属性</li>
                </ul>
              </div>

              <div>
                <ElText tag="b">
                  插槽 (ColumnsRenderSlots):
                </ElText>
                <ul style="margin: 8px 0; padding-left: 20px">
                  <li>
                    <code>#default:[slotName]</code>: 自定义单元格内容，接收
                    <code>{ row, column, $index }</code>
                  </li>
                  <li>
                    <code>#header:[slotName]</code>: 自定义表头内容，接收
                    <code>{ column, $index }</code>
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
                    <li>支持配置化定义表格列，减少模板代码</li>
                    <li>
                      支持嵌套列（多级表头），通过
                      <code>children</code> 属性定义
                    </li>
                    <li>
                      支持两种自定义渲染方式：
                      <ul style="margin: 4px 0; padding-left: 20px">
                        <li>
                          模板插槽：在
                          <code>columns</code> 中引用，在模板中定义
                        </li>
                        <li>
                          渲染函数：直接在 <code>columns</code> 中使用 JSX 定义
                        </li>
                      </ul>
                    </li>
                    <li>
                      完全兼容 Element Plus ElTableColumn 的所有属性和功能
                    </li>
                    <li>支持 TypeScript 泛型，提供完整的类型提示</li>
                  </ul>
                </div>
              </ElAlert>
            </ElSpace>
          </div>
        </div>
      </ElSpace>
    </SectionMain>
  </SectionLayout>
</template>
