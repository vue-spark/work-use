<script setup lang="ts">
import { reactive } from 'vue'
import { SectionItem, SectionLayout, SectionMain, Toolbar } from '@/shared'

// 配置选项
const config = reactive({
  showTitle: true,
  showContent: true,
  showExtra: true,
  useSlots: false,
  customStyle: false,
})

// 自定义样式
const customStyles = reactive({
  titleStyle: { color: '#409eff', fontWeight: 'bold' },
  contentStyle: { color: '#67c23a' },
  extraStyle: { color: '#e6a23c' },
})

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: '',
  date: '',
})

// 状态选项
const statusOptions = [
  { label: '全部', value: '' },
  { label: '进行中', value: 'active' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
]
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
            Toolbar 组件配置
          </ElText>

          <ElSpace wrap>
            <ElCheckbox v-model="config.showTitle">
              显示标题
            </ElCheckbox>
            <ElCheckbox v-model="config.showContent">
              显示内容
            </ElCheckbox>
            <ElCheckbox v-model="config.showExtra">
              显示额外区域
            </ElCheckbox>
            <ElCheckbox v-model="config.useSlots">
              使用插槽
            </ElCheckbox>
            <ElCheckbox v-model="config.customStyle">
              自定义样式
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
              <Toolbar
                :title="config.showTitle ? '页面标题' : undefined"
                :title-style="
                  config.customStyle ? customStyles.titleStyle : undefined
                "
                :content-style="
                  config.customStyle ? customStyles.contentStyle : undefined
                "
                :extra-style="
                  config.customStyle ? customStyles.extraStyle : undefined
                "
              >
                <template
                  v-if="config.useSlots && config.showTitle"
                  #title
                >
                  <span>📄 自定义标题插槽</span>
                </template>

                <template
                  v-if="config.showContent"
                  #default
                >
                  <ElButton size="small">
                    新增
                  </ElButton>
                  <ElButton size="small">
                    编辑
                  </ElButton>
                  <ElButton size="small">
                    删除
                  </ElButton>
                </template>

                <template
                  v-if="config.showExtra"
                  #extra
                >
                  <ElButton size="small">
                    刷新
                  </ElButton>
                  <ElButton size="small">
                    设置
                  </ElButton>
                </template>
              </Toolbar>
            </div>
          </div>

          <!-- 搜索工具栏示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              2. 搜索工具栏
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <Toolbar title="数据列表">
                <ElInput
                  v-model="searchForm.keyword"
                  placeholder="请输入关键词"
                  style="width: 200px"
                  size="small"
                  clearable
                />

                <ElSelect
                  v-model="searchForm.status"
                  placeholder="状态"
                  style="width: 120px"
                  size="small"
                  clearable
                >
                  <ElOption
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </ElSelect>

                <ElDatePicker
                  v-model="searchForm.date"
                  type="date"
                  placeholder="选择日期"
                  style="width: 160px"
                  size="small"
                />

                <ElButton
                  type="primary"
                  size="small"
                >
                  搜索
                </ElButton>

                <ElButton size="small">
                  重置
                </ElButton>

                <template #extra>
                  <ElButton
                    type="primary"
                    size="small"
                  >
                    新增
                  </ElButton>
                  <ElButton size="small">
                    导出
                  </ElButton>
                </template>
              </Toolbar>
            </div>
          </div>

          <!-- 仅标题和额外操作 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              3. 仅标题和额外操作
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <Toolbar title="用户管理">
                <template #extra>
                  <ElButton
                    type="primary"
                    size="small"
                  >
                    添加用户
                  </ElButton>
                  <ElButton
                    size="small"
                    circle
                  >
                    ⋯
                  </ElButton>
                </template>
              </Toolbar>
            </div>
          </div>

          <!-- 仅内容区域 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              4. 仅内容区域（无标题）
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <Toolbar>
                <ElRadioGroup
                  model-value="all"
                  size="small"
                >
                  <ElRadioButton value="all">
                    全部
                  </ElRadioButton>
                  <ElRadioButton value="pending">
                    待处理
                  </ElRadioButton>
                  <ElRadioButton value="processing">
                    处理中
                  </ElRadioButton>
                  <ElRadioButton value="completed">
                    已完成
                  </ElRadioButton>
                </ElRadioGroup>

                <template #extra>
                  <ElButton
                    size="small"
                    circle
                  >
                    ↻
                  </ElButton>
                </template>
              </Toolbar>
            </div>
          </div>

          <!-- 复杂示例 -->
          <div>
            <ElText
              tag="b"
              size="large"
            >
              5. 复杂工具栏
            </ElText>
            <ElDivider style="margin: 12px 0" />
            <div style="padding: 16px; background: #f5f7fa; border-radius: 4px">
              <Toolbar>
                <template #title>
                  <ElBreadcrumb separator="/">
                    <ElBreadcrumbItem :to="{ path: '/' }">
                      首页
                    </ElBreadcrumbItem>
                    <ElBreadcrumbItem>
                      <a href="/">活动管理</a>
                    </ElBreadcrumbItem>
                    <ElBreadcrumbItem>活动列表</ElBreadcrumbItem>
                  </ElBreadcrumb>
                </template>

                <ElButtonGroup size="small">
                  <ElButton>☰ 列表</ElButton>
                  <ElButton>⊞ 网格</ElButton>
                </ElButtonGroup>

                <ElInput
                  placeholder="快速搜索..."
                  style="width: 200px"
                  size="small"
                  clearable
                />

                <template #extra>
                  <ElDropdown size="small">
                    <ElButton size="small">
                      批量操作 ▼
                    </ElButton>
                    <template #dropdown>
                      <ElDropdownMenu>
                        <ElDropdownItem>批量删除</ElDropdownItem>
                        <ElDropdownItem>批量导出</ElDropdownItem>
                        <ElDropdownItem>批量审核</ElDropdownItem>
                      </ElDropdownMenu>
                    </template>
                  </ElDropdown>

                  <ElButton
                    type="primary"
                    size="small"
                  >
                    + 新建活动
                  </ElButton>
                </template>
              </Toolbar>
            </div>
          </div>

          <!-- 组件说明 -->
          <div>
            <ElAlert
              type="info"
              :closable="false"
              show-icon
            >
              <template #title>
                <ElText tag="b">
                  Toolbar 组件说明
                </ElText>
              </template>
              <div style="margin-top: 8px">
                <ul style="margin: 0; padding-left: 20px">
                  <li>
                    <ElText>
                      <b>title 插槽/属性：</b>左侧标题区域，支持字符串或自定义内容
                    </ElText>
                  </li>
                  <li>
                    <ElText>
                      <b>默认插槽：</b>中间内容区域，通常放置操作按钮、筛选条件等
                    </ElText>
                  </li>
                  <li>
                    <ElText>
                      <b>extra 插槽：</b>右侧额外操作区域，通常放置主要操作按钮
                    </ElText>
                  </li>
                  <li>
                    <ElText>
                      <b>样式定制：</b>支持通过
                      titleStyle、contentStyle、extraStyle 自定义样式
                    </ElText>
                  </li>
                  <li>
                    <ElText>
                      <b>自动分隔：</b>标题和内容之间会自动显示分隔线，当任一为空时自动隐藏
                    </ElText>
                  </li>
                </ul>
              </div>
            </ElAlert>
          </div>
        </ElSpace>
      </div>
    </SectionMain>
  </SectionLayout>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 16px;
}
</style>
