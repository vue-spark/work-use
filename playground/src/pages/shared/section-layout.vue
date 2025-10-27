<script setup lang="ts">
import type { ElementSize, SectionLayoutDirection } from '@/shared'
import { reactive, ref } from 'vue'
import { SectionItem, SectionLayout, SectionMain } from '@/shared'

// 布局配置
const layoutConfig = reactive({
  direction: 'vertical' as SectionLayoutDirection,
  useNested: false,
})

// 主内容区域尺寸
const mainSize = ref({ width: 0, height: 0 })

// 处理主内容区域尺寸变化
function handleMainResize(data: ElementSize) {
  mainSize.value = data
}
</script>

<template>
  <SectionLayout v-bind="layoutConfig">
    <!-- 顶部配置区域 -->
    <SectionItem card>
      <ElSpace
        direction="vertical"
        style="width: 100%"
      >
        <ElSpace>
          <ElText> 布局方向: </ElText>
          <ElRadioGroup v-model="layoutConfig.direction">
            <ElRadio value="vertical">
              纵向
            </ElRadio>
            <ElRadio value="horizontal">
              横向
            </ElRadio>
          </ElRadioGroup>
        </ElSpace>

        <ElSpace>
          <ElText> 使用嵌套布局: </ElText>
          <ElSwitch v-model="layoutConfig.useNested" />
        </ElSpace>
      </ElSpace>
    </SectionItem>

    <!-- 主内容区域 -->
    <SectionMain
      v-if="!layoutConfig.useNested"
      card
      :on-resize="handleMainResize"
    >
      <template #default="{ width, height }">
        <div style="padding: 16px">
          <ElText tag="b">
            SectionLayout 组件
          </ElText>
          <ElText>
            是一个灵活的布局组件，通过组合 SectionItem 和 SectionMain
            子组件实现自由布局。
          </ElText>

          <ElDivider />

          <div>
            <ElText tag="b">
              主要特性：
            </ElText>
            <ul style="margin: 8px 0; padding-left: 20px">
              <li>支持纵向和横向两种布局模式</li>
              <li>通过子组件自由组合布局结构</li>
              <li>SectionItem：固定尺寸的次要分区</li>
              <li>SectionMain：自动填充的主要分区，支持尺寸监听</li>
              <li>支持嵌套 SectionLayout 作为主分区</li>
              <li>支持卡片样式包装</li>
            </ul>
          </div>

          <ElDivider />

          <div>
            <ElText tag="b">
              当前尺寸：
            </ElText>
            <ElText> 宽度: {{ width }}px，高度: {{ height }}px </ElText>
          </div>
        </div>
      </template>
    </SectionMain>

    <!-- 嵌套布局示例 -->
    <SectionLayout
      v-else
      :direction="
        layoutConfig.direction === 'vertical' ? 'horizontal' : 'vertical'
      "
    >
      <SectionItem
        card
        style="padding: 16px"
      >
        <ElText tag="b">
          {{ layoutConfig.direction === 'vertical' ? '左侧' : '顶部' }}次分区
        </ElText>
      </SectionItem>

      <SectionMain
        card
        :on-resize="handleMainResize"
      >
        <div style="padding: 16px">
          <ElText tag="b">
            嵌套布局的主分区
          </ElText>
          <ElText>
            这是一个嵌套的 SectionLayout，它会自动作为主分区填充剩余空间。
          </ElText>
        </div>
      </SectionMain>

      <SectionItem
        card
        style="padding: 16px"
      >
        <ElText tag="b">
          {{ layoutConfig.direction === 'vertical' ? '右侧' : '底部' }}次分区
        </ElText>
      </SectionItem>
    </SectionLayout>

    <!-- 底部信息区域 -->
    <SectionItem card>
      <ElAlert
        type="success"
        :closable="false"
        show-icon
      >
        <template #title>
          <span>底部信息 - 这是一个 SectionItem，可以放置任意内容</span>
        </template>
      </ElAlert>
    </SectionItem>
  </SectionLayout>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 16px;
}
</style>
