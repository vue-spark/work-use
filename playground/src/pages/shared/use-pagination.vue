<script setup lang="ts">
import { sleep } from '@antfu/utils'
import { ElMessage } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import {
  SectionItem,
  SectionLayout,
  SectionMain,
  usePagination,
} from '@/shared'

// 配置选项
const config = reactive({
  showOnChange: true,
  showJumpTo: true,
  showPageSizeControl: true,
})

// 基础示例
const basicPagination = usePagination({
  total: 100,
  pageSize: 10,
})

// 带回调的示例
const changeLog = ref<string[]>([])
const callbackPagination = usePagination({
  total: 200,
  pageSize: 20,
  onChange: (data) => {
    const timestamp = new Date().toLocaleTimeString()
    changeLog.value.unshift(
      `[${timestamp}] 页码: ${data.page}, 每页数量: ${data.pageSize}`,
    )
    if (changeLog.value.length > 10) {
      changeLog.value = changeLog.value.slice(0, 10)
    }
  },
})

// 动态总数示例
const dynamicTotal = ref(50)
const dynamicPagination = usePagination({
  total: () => dynamicTotal.value,
  pageSize: 10,
})

// 模拟数据加载
interface DataItem {
  id: number
  name: string
  email: string
  status: string
}

const tableData = ref<DataItem[]>([])
const loading = ref(false)
const totalItems = ref(156)

const tablePagination = usePagination({
  total: () => totalItems.value,
  pageSize: 10,
  onChange: async ({ page, pageSize }) => {
    await loadTableData(page, pageSize)
  },
})

async function loadTableData(page: number, pageSize: number) {
  loading.value = true
  try {
    await sleep(500)
    const start = (page - 1) * pageSize
    const statuses = ['active', 'inactive', 'pending']
    tableData.value = Array.from({ length: pageSize }, (_, i) => {
      const randomIndex = Math.floor(Math.random() * 3)
      return {
        id: start + i + 1,
        name: `用户 ${start + i + 1}`,
        email: `user${start + i + 1}@example.com`,
        status: statuses[randomIndex]!,
      }
    })
  }
  finally {
    loading.value = false
  }
}

// 初始加载
loadTableData(1, 10)

// 跳转页码
const jumpToPage = ref(1)
function handleJumpTo(pagination: ReturnType<typeof usePagination>) {
  const page = Number(jumpToPage.value)
  if (page >= 1 && page <= pagination.pageCount.value) {
    pagination.jumpTo(page)
  }
  else {
    ElMessage.warning(`请输入 1-${pagination.pageCount.value} 之间的页码`)
  }
}

// 监听基础分页变化（可选）
watch([basicPagination.currentPage, basicPagination.currentPageSize], () => {
  // 这里可以执行一些副作用，比如数据加载等
})
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
            usePagination 组合式函数配置
          </ElText>

          <ElSpace wrap>
            <ElCheckbox v-model="config.showOnChange">
              显示 onChange 回调示例
            </ElCheckbox>
            <ElCheckbox v-model="config.showJumpTo">
              显示 jumpTo 方法示例
            </ElCheckbox>
            <ElCheckbox v-model="config.showPageSizeControl">
              显示每页数量控制
            </ElCheckbox>
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
                  <code>usePagination</code> 是基于
                  <code>useOffsetPagination</code> 的增强版本，
                  提供了更便捷的分页功能。
                </ElText>

                <ElDescriptions
                  :column="2"
                  border
                >
                  <ElDescriptionsItem label="当前页码">
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
                  <ElDescriptionsItem label="是否第一页">
                    {{ basicPagination.isFirstPage.value ? '是' : '否' }}
                  </ElDescriptionsItem>
                  <ElDescriptionsItem label="是否最后一页">
                    {{ basicPagination.isLastPage.value ? '是' : '否' }}
                  </ElDescriptionsItem>
                </ElDescriptions>

                <ElSpace>
                  <ElButton
                    :disabled="basicPagination.isFirstPage.value"
                    @click="basicPagination.prev()"
                  >
                    上一页
                  </ElButton>
                  <ElButton
                    :disabled="basicPagination.isLastPage.value"
                    @click="basicPagination.next()"
                  >
                    下一页
                  </ElButton>
                  <ElButton @click="basicPagination.currentPage.value = 1">
                    回到首页
                  </ElButton>
                </ElSpace>

                <ElSpace v-if="config.showPageSizeControl">
                  <ElText>每页数量:</ElText>
                  <ElRadioGroup v-model="basicPagination.currentPageSize.value">
                    <ElRadioButton :value="10">
                      10
                    </ElRadioButton>
                    <ElRadioButton :value="20">
                      20
                    </ElRadioButton>
                    <ElRadioButton :value="50">
                      50
                    </ElRadioButton>
                  </ElRadioGroup>
                </ElSpace>
              </ElSpace>
            </div>
          </div>

          <!-- onChange 回调示例 -->
          <div v-if="config.showOnChange">
            <ElText
              tag="b"
              size="large"
            >
              2. onChange 回调
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  通过 <code>onChange</code> 选项可以监听页码或每页数量的变化。
                </ElText>

                <ElSpace>
                  <ElButton @click="callbackPagination.prev()">
                    上一页
                  </ElButton>
                  <ElText>
                    第 {{ callbackPagination.currentPage.value }} /
                    {{ callbackPagination.pageCount.value }} 页
                  </ElText>
                  <ElButton @click="callbackPagination.next()">
                    下一页
                  </ElButton>
                  <ElSelect
                    v-model="callbackPagination.currentPageSize.value"
                    style="width: 100px"
                  >
                    <ElOption
                      :value="10"
                      label="10 条/页"
                    />
                    <ElOption
                      :value="20"
                      label="20 条/页"
                    />
                    <ElOption
                      :value="50"
                      label="50 条/页"
                    />
                  </ElSelect>
                </ElSpace>

                <ElCard header="变化日志">
                  <div
                    v-if="changeLog.length === 0"
                    style="color: #909399; text-align: center; padding: 20px"
                  >
                    暂无变化记录
                  </div>
                  <div
                    v-else
                    style="max-height: 200px; overflow-y: auto"
                  >
                    <div
                      v-for="(log, index) in changeLog"
                      :key="index"
                      style="
                        padding: 4px 0;
                        font-family: monospace;
                        font-size: 12px;
                      "
                    >
                      {{ log }}
                    </div>
                  </div>
                </ElCard>
              </ElSpace>
            </div>
          </div>

          <!-- jumpTo 方法示例 -->
          <div v-if="config.showJumpTo">
            <ElText
              tag="b"
              size="large"
            >
              3. jumpTo 方法
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  使用 <code>jumpTo</code> 方法可以快速跳转到指定页码。
                </ElText>

                <ElSpace>
                  <ElText>
                    当前页码: {{ dynamicPagination.currentPage.value }}
                  </ElText>
                  <ElInputNumber
                    v-model="jumpToPage"
                    :min="1"
                    :max="dynamicPagination.pageCount.value"
                    style="width: 120px"
                  />
                  <ElButton
                    type="primary"
                    @click="handleJumpTo(dynamicPagination)"
                  >
                    跳转
                  </ElButton>
                </ElSpace>

                <ElSpace>
                  <ElText>快速跳转:</ElText>
                  <ElButton
                    size="small"
                    @click="dynamicPagination.jumpTo(1)"
                  >
                    第 1 页
                  </ElButton>
                  <ElButton
                    size="small"
                    @click="dynamicPagination.jumpTo(3)"
                  >
                    第 3 页
                  </ElButton>
                  <ElButton
                    size="small"
                    @click="
                      dynamicPagination.jumpTo(
                        dynamicPagination.pageCount.value,
                      )
                    "
                  >
                    最后一页
                  </ElButton>
                </ElSpace>
              </ElSpace>
            </div>
          </div>

          <!-- 动态总数示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              4. 动态总数
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText>
                  <code>total</code> 选项支持响应式值或函数，可以动态更新总数。
                </ElText>

                <ElSpace>
                  <ElText>总数:</ElText>
                  <ElInputNumber
                    v-model="dynamicTotal"
                    :min="0"
                    :max="1000"
                    :step="10"
                  />
                  <ElText type="info">
                    (当前总页数: {{ dynamicPagination.pageCount.value }})
                  </ElText>
                </ElSpace>

                <ElProgress
                  :percentage="
                    (dynamicPagination.currentPage.value
                      / dynamicPagination.pageCount.value)
                      * 100
                  "
                  :format="
                    () =>
                      `${dynamicPagination.currentPage.value}/${dynamicPagination.pageCount.value}`
                  "
                />

                <ElSpace>
                  <ElButton
                    :disabled="dynamicPagination.isFirstPage.value"
                    @click="dynamicPagination.prev()"
                  >
                    上一页
                  </ElButton>
                  <ElButton
                    :disabled="dynamicPagination.isLastPage.value"
                    @click="dynamicPagination.next()"
                  >
                    下一页
                  </ElButton>
                </ElSpace>
              </ElSpace>
            </div>
          </div>

          <!-- 实际应用示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              5. 实际应用 - 表格分页
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <ElSpace
                direction="vertical"
                style="width: 100%"
                fill
              >
                <ElText> 结合表格组件使用，实现数据分页加载。 </ElText>

                <ElTable
                  v-loading="loading"
                  :data="tableData"
                  border
                  style="width: 100%"
                >
                  <ElTableColumn
                    prop="id"
                    label="ID"
                    width="80"
                  />
                  <ElTableColumn
                    prop="name"
                    label="姓名"
                  />
                  <ElTableColumn
                    prop="email"
                    label="邮箱"
                  />
                  <ElTableColumn
                    prop="status"
                    label="状态"
                    width="100"
                  >
                    <template #default="{ row }">
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
                  </ElTableColumn>
                </ElTable>

                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <ElText type="info">
                    共 {{ totalItems }} 条数据
                  </ElText>
                  <ElSpace>
                    <ElButton
                      size="small"
                      :disabled="tablePagination.isFirstPage.value"
                      @click="tablePagination.prev()"
                    >
                      上一页
                    </ElButton>
                    <ElText>
                      {{ tablePagination.currentPage.value }} /
                      {{ tablePagination.pageCount.value }}
                    </ElText>
                    <ElButton
                      size="small"
                      :disabled="tablePagination.isLastPage.value"
                      @click="tablePagination.next()"
                    >
                      下一页
                    </ElButton>
                    <ElSelect
                      v-model="tablePagination.currentPageSize.value"
                      size="small"
                      style="width: 100px"
                    >
                      <ElOption
                        :value="10"
                        label="10 条/页"
                      />
                      <ElOption
                        :value="20"
                        label="20 条/页"
                      />
                      <ElOption
                        :value="50"
                        label="50 条/页"
                      />
                    </ElSelect>
                  </ElSpace>
                </div>
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
                    选项 (UsePaginationOptions):
                  </ElText>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li>
                      <code>total</code>: 总数（必填，支持响应式值或函数）
                    </li>
                    <li><code>pageSize</code>: 每页数量（默认 10）</li>
                    <li><code>page</code>: 初始页码（默认 1）</li>
                    <li><code>onChange</code>: 页码或每页数量变化时的回调</li>
                  </ul>
                </div>

                <div>
                  <ElText tag="b">
                    返回值 (UsePaginationReturn):
                  </ElText>
                  <ul style="margin: 8px 0; padding-left: 20px">
                    <li><code>currentPage</code>: 当前页码（响应式）</li>
                    <li>
                      <code>currentPageSize</code>: 当前每页数量（响应式）
                    </li>
                    <li><code>pageCount</code>: 总页数（计算属性）</li>
                    <li><code>total</code>: 总数（计算属性）</li>
                    <li><code>isFirstPage</code>: 是否第一页（计算属性）</li>
                    <li><code>isLastPage</code>: 是否最后一页（计算属性）</li>
                    <li><code>prev()</code>: 上一页方法</li>
                    <li><code>next()</code>: 下一页方法</li>
                    <li><code>jumpTo(page)</code>: 跳转到指定页码</li>
                  </ul>
                </div>

                <ElAlert
                  type="info"
                  :closable="false"
                >
                  <template #title>
                    <ElText tag="b">
                      提示
                    </ElText>
                  </template>
                  <div>
                    <code>usePagination</code> 基于 VueUse 的
                    <code>useOffsetPagination</code>， 增强了
                    <code>total</code> 的访问性和 <code>jumpTo</code> 方法，
                    并提供了 <code>onChange</code> 回调用于监听变化。
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
