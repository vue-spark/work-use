<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SectionItem, SectionLayout, SectionMain, useSelection } from '@/shared'

interface User {
  id: number
  name: string
  role: string
  disabled?: boolean
}

const config = reactive({
  singleSelect: false,
  ignoreSelectable: false,
})

const users = ref<User[]>([
  { id: 1, name: '张三', role: 'Admin' },
  { id: 2, name: '李四', role: 'Editor' },
  { id: 3, name: '王五', role: 'User', disabled: true },
  { id: 4, name: '赵六', role: 'User' },
  { id: 5, name: '孙七', role: 'Editor', disabled: true },
  { id: 6, name: '周八', role: 'Admin' },
])

const selection = useSelection<User, number>({
  singleSelect: computed(() => config.singleSelect),
  toKey: (row) => row.id,
  selectable: (row) => !row.disabled,
})

const selectedNames = computed(() =>
  selection.selection.value.map((r) => r.name),
)

const selectableRows = computed(() =>
  users.value.filter(
    (r) => config.ignoreSelectable || selection.isSelectable(r),
  ),
)
const selectedSelectableCount = computed(
  () => selectableRows.value.filter((r) => selection.isSelected(r)).length,
)
const allSelected = computed(
  () =>
    selectableRows.value.length > 0 &&
    selectedSelectableCount.value === selectableRows.value.length,
)
const isIndeterminate = computed(
  () =>
    selectedSelectableCount.value > 0 &&
    selectedSelectableCount.value < selectableRows.value.length,
)

function handleToggleAll(val: any) {
  const checked = !!val
  selectableRows.value.forEach((row) =>
    selection.toggleSelection(row, checked, config.ignoreSelectable),
  )
}

function selectAllowed() {
  if (config.singleSelect) {
    const row = users.value.find((r) => selection.isSelectable(r))
    if (row) {
      selection.toggleSelection(row, true)
    }
  }
  else {
    users.value.forEach((row) => {
      if (selection.isSelectable(row)) {
        selection.toggleSelection(row, true)
      }
    })
  }
}

function toggleThird() {
  const row = users.value[2]
  if (row) {
    selection.toggleSelection(row, undefined, config.ignoreSelectable)
  }
}
</script>

<template>
  <SectionLayout height="100%">
    <SectionItem card>
      <div style="padding: 12px">
        <ElSpace
          wrap
          :size="12"
          alignment="center"
        >
          <ElSwitch
            v-model="config.singleSelect"
            active-text="单选模式"
            @change="() => selection.clearSelection()"
          />
          <ElSwitch
            v-model="config.ignoreSelectable"
            active-text="忽略 selectable（编程操作）"
          />
          <ElDivider direction="vertical" />
          <ElButton @click="selectAllowed">
            选择可选项
          </ElButton>
          <ElButton @click="toggleThird">
            切换第 3 行
          </ElButton>
          <ElButton
            type="danger"
            @click="selection.clearSelection()"
          >
            清空选择
          </ElButton>
        </ElSpace>
      </div>
    </SectionItem>

    <SectionMain card>
      <div style="padding: 16px">
        <ElSpace
          direction="vertical"
          fill
          style="width: 100%"
        >
          <ElText tag="b">
            1. 基础用法
          </ElText>

          <ElTable
            :data="users"
            border
            style="width: 100%"
          >
            <ElTableColumn
              label="选择"
              width="80"
              align="center"
            >
              <template #header>
                <ElCheckbox
                  v-if="!config.singleSelect"
                  :model-value="allSelected"
                  :indeterminate="isIndeterminate"
                  @change="handleToggleAll"
                />
                <ElText v-else>
                  单选
                </ElText>
              </template>
              <template #default="{ row }">
                <ElCheckbox
                  :model-value="selection.isSelected(row)"
                  :disabled="!selection.isSelectable(row)"
                  @change="(val) => selection.toggleSelection(row, !!val)"
                />
              </template>
            </ElTableColumn>
            <ElTableColumn
              prop="id"
              label="ID"
              width="80"
              align="center"
            />
            <ElTableColumn
              prop="name"
              label="姓名"
            />
            <ElTableColumn
              prop="role"
              label="角色"
              width="120"
              align="center"
            />
            <ElTableColumn
              label="可选"
              width="100"
              align="center"
            >
              <template #default="{ row }">
                <ElTag :type="row.disabled ? 'danger' : 'success'">
                  {{ row.disabled ? '不可选' : '可选' }}
                </ElTag>
              </template>
            </ElTableColumn>
          </ElTable>

          <ElAlert
            type="info"
            :closable="false"
          >
            <template #title>
              当前选择
            </template>
            <div>
              <div>
                选中键（ids）:
                {{ selection.selectedKeys.value.join(', ') || '无' }}
              </div>
              <div>选中项: {{ selectedNames.join(', ') || '无' }}</div>
            </div>
          </ElAlert>

          <ElAlert
            type="success"
            :closable="false"
          >
            <template #title>
              说明
            </template>
            <ul style="margin: 4px 0; padding-left: 18px">
              <li>singleSelect 为真时，每次选择前会清空已有选择</li>
              <li>
                selectable 控制行是否可选；示例中标记为“不可选”的行将禁用勾选
              </li>
              <li>
                toggleSelection(row, selected?, ignoreSelectable?)
                支持忽略可选逻辑进行编程式切换
              </li>
            </ul>
          </ElAlert>
        </ElSpace>
      </div>
    </SectionMain>
  </SectionLayout>
</template>
