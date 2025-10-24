<script setup lang="ts">
import type { SectionLayoutCardArea } from '@/shared'
import { computed, reactive, ref } from 'vue'
import { SectionLayout } from '@/shared'

// 布局配置
const layoutConfig = reactive({
  height: '100%' as string | undefined,
  card: ['main'] as SectionLayoutCardArea[],
})

// 主内容区域尺寸
const mainContentSize = ref({ width: 0, height: 0 })

// 处理主内容区域尺寸变化
function handleMainContentResize(data: { width: number, height: number }) {
  mainContentSize.value = data
}

// 计算属性：卡片区域选项
const cardOptions = computed<{ label: string, value: SectionLayoutCardArea }[]>(
  () => [
    { label: 'Top', value: 'top' },
    { label: 'Main', value: 'main' },
    { label: 'Bottom', value: 'bottom' },
  ],
)
</script>

<template>
  <SectionLayout
    v-bind="layoutConfig"
    :top-style="{ border: '1px dashed var(--el-color-primary)' }"
    :main-style="{ border: '1px dashed var(--el-color-primary)' }"
    :bottom-style="{ border: '1px dashed var(--el-color-primary)' }"
    :on-main-content-resize="handleMainContentResize"
  >
    <!-- Top 区域 -->
    <template #top>
      <ElSpace
        direction="vertical"
        style="width: 100%"
      >
        <ElSpace>
          <ElText> 布局高度: </ElText>
          <ElInput
            v-model="layoutConfig.height"
            placeholder="示例：100%，1000px"
            style="flex: 1"
          />
        </ElSpace>

        <ElSpace>
          <ElText> 卡片区域: </ElText>
          <ElCheckboxGroup v-model="layoutConfig.card">
            <ElCheckbox
              v-for="option in cardOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </ElSpace>

        <!-- 尺寸信息 -->
        <ElAlert
          type="info"
          :closable="false"
          :title="`主内容区域尺寸: ${mainContentSize.width}px × ${mainContentSize.height}px`"
        />
      </ElSpace>
    </template>

    <!-- Main Head 区域 -->
    <template #main-head>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f5f7fa;
          border-radius: 4px;
        "
      >
        <div style="display: flex; align-items: center; gap: 12px">
          <ElText style="font-weight: 600; font-size: 16px">
            Main Head 区域
          </ElText>
        </div>
        <ElSpace>
          <ElButton
            type="primary"
            size="small"
          >
            新增
          </ElButton>
          <ElButton size="small">
            刷新
          </ElButton>
          <ElButton size="small">
            导出
          </ElButton>
        </ElSpace>
      </div>
    </template>

    <!-- Main Content 区域（默认插槽） -->
    <div>
      <ElText tag="b">
        SectionLayout
      </ElText>
      <ElText>
        是一个灵活的布局组件，提供了 Top、Main、Bottom 三个主要区域，其中 Main
        区域又细分为 Head、Content、Foot 三个子区域。
      </ElText>
    </div>

    <ElDivider />

    <div>
      <ElText tag="b">
        主要特性：
      </ElText>
      <ul style="margin: 8px 0; padding-left: 20px">
        <li>支持多层级布局结构（Top / Main(Head, Content, Foot) / Bottom）</li>
        <li>支持卡片样式包装（通过 card 属性）</li>
        <li>主内容区域自动填充剩余空间</li>
        <li>支持响应式尺寸监听（onMainContentResize）</li>
        <li>空插槽自动隐藏，不占用空间</li>
        <li>支持自定义样式和类名</li>
      </ul>
    </div>

    <ElDivider />

    <div>
      <ElText tag="b">
        插槽说明：
      </ElText>
      <ElTable
        :data="[
          { name: 'top', desc: '顶部区域', flex: '固定高度' },
          {
            name: 'main',
            desc: '主区域（可完全自定义）',
            flex: '自动填充',
          },
          { name: 'main-head', desc: '主区域头部', flex: '固定高度' },
          {
            name: 'main-content / default',
            desc: '主区域内容（支持尺寸参数）',
            flex: '自动填充',
          },
          { name: 'main-foot', desc: '主区域底部', flex: '固定高度' },
          { name: 'bottom', desc: '底部区域', flex: '固定高度' },
        ]"
        border
        size="small"
        style="margin-top: 8px"
      >
        <ElTableColumn
          prop="name"
          label="插槽名称"
          width="200"
        />
        <ElTableColumn
          prop="desc"
          label="说明"
        />
        <ElTableColumn
          prop="flex"
          label="布局特性"
          width="120"
        />
      </ElTable>
    </div>

    <ElDivider />

    <div>
      <ElText tag="b">
        高级功能：
      </ElText>

      <div style="margin-top: 12px">
        <ElText
          tag="b"
          style="font-size: 14px"
        >
          1. configure() - 全局配置
        </ElText>
        <ElText
          style="
            display: block;
            margin-top: 8px;
            color: var(--el-text-color-secondary);
          "
        >
          用于全局配置 SectionLayout 组件，所有实例都会继承这些配置。
        </ElText>
        <ElAlert
          type="warning"
          :closable="false"
          style="margin-top: 8px"
        >
          <template #title>
            <code style="font-size: 12px">
              SectionLayout.configure({ cardClass: 'el-card el-card__body' })
            </code>
          </template>
        </ElAlert>
        <ul
          style="
            margin: 8px 0;
            padding-left: 20px;
            color: var(--el-text-color-secondary);
          "
        >
          <li>适用场景：统一设置卡片样式类名</li>
          <li>影响范围：全局所有 SectionLayout 实例</li>
          <li>配置项：cardClass - 卡片区域的 CSS 类名</li>
        </ul>
      </div>

      <div style="margin-top: 16px">
        <ElText
          tag="b"
          style="font-size: 14px"
        >
          2. clone() - 克隆组件
        </ElText>
        <ElText
          style="
            display: block;
            margin-top: 8px;
            color: var(--el-text-color-secondary);
          "
        >
          创建一个独立的 SectionLayout 副本，可以有自己的配置而不影响原组件。
        </ElText>
        <ElAlert
          type="warning"
          :closable="false"
          style="margin-top: 8px"
        >
          <template #title>
            <code style="font-size: 12px">
              const CustomLayout = SectionLayout.clone({ cardClass:
              'custom-card' })
            </code>
          </template>
        </ElAlert>
        <ul
          style="
            margin: 8px 0;
            padding-left: 20px;
            color: var(--el-text-color-secondary);
          "
        >
          <li>适用场景：需要不同配置的多个布局实例</li>
          <li>影响范围：仅影响克隆出的新实例</li>
          <li>独立性：克隆实例与原组件配置互不影响</li>
        </ul>
      </div>

      <div style="margin-top: 16px">
        <ElText
          tag="b"
          style="font-size: 14px"
        >
          使用示例：
        </ElText>
        <ElAlert
          type="success"
          :closable="false"
          style="margin-top: 8px"
        >
          <pre style="margin: 0; font-size: 12px; line-height: 1.6">
// 全局配置
SectionLayout.configure({
  cardClass: 'el-card el-card__body'
})

// 克隆并自定义配置
const AdminLayout = SectionLayout.clone({
  cardClass: 'admin-card'
})

const UserLayout = SectionLayout.clone({
  cardClass: 'user-card'
})</pre>
        </ElAlert>
      </div>
    </div>

    <!-- Main Foot 区域 -->
    <template #main-foot>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #f5f7fa;
          border-radius: 4px;
        "
      >
        <ElText type="info">
          Main Foot 区域 - 通常用于放置分页器或底部操作栏
        </ElText>
        <ElSpace>
          <ElButton size="small">
            取消
          </ElButton>
          <ElButton
            type="primary"
            size="small"
          >
            确定
          </ElButton>
        </ElSpace>
      </div>
    </template>

    <!-- Bottom 区域 -->
    <template #bottom>
      <ElAlert
        type="info"
        :closable="false"
        show-icon
      >
        <template #title>
          <span>Bottom 区域 - 通常用于显示辅助信息或全局操作按钮</span>
        </template>
      </ElAlert>
    </template>
  </SectionLayout>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 16px;
}
</style>
