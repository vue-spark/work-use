<script setup lang="ts">
import type { ColumnProps, SectionLayoutCardArea } from '@/element-plus'
import { sleep } from '@antfu/utils'
import { useAsyncState } from '@vueuse/core'
import { reactive } from 'vue'
import {
  ColumnsRender,
  PaginationRender,
  SectionLayout,
  Toolbar,
  usePagination,
} from '@/element-plus'

interface DataItem {
  date: string
  name: string
  state: string
  city: string
  address: string
  zip: string
}

// #region Layout
SectionLayout.configure({
  cardClass: 'el-card el-card__body',
})

const layoutProps = reactive({
  gap: '',
  card: [] as SectionLayoutCardArea[],
})
// #endregion

// #region Table
PaginationRender.defaultProps = {
  background: true,
  layout: 'slot, prev, pager, next, jumper, sizes, total',
  pagerCount: 5,
  pageSizes: [10, 20, 30, 40, 50, 100],
}

const columns: ColumnProps<DataItem>[] = [
  {
    prop: 'date',
    label: 'Date',
    slots: {
      default({ row }) {
        return `${row.date} - ${Date.now()}`
      },
      header: 'date-header',
    },
  },
  {
    label: 'Delivery Info',
    children: [
      {
        prop: 'name',
        label: 'Name',
      },
      {
        label: 'Address Info',
        children: [
          {
            prop: 'state',
            label: 'State',
          },
          {
            prop: 'city',
            label: 'City',
          },
          {
            prop: 'address',
            label: 'Address',
          },
          {
            prop: 'zip',
            label: 'Zip',
          },
        ],
      },
    ],
  },
]

const { state, isLoading } = useAsyncState(
  async () => {
    await sleep(1e3)
    const rows = [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
      },
    ]
    return { total: rows.length, rows }
  },
  { rows: [], total: 0 },
)

const pagination = usePagination({
  total: () => state.value.total,
})
// #endregion
</script>

<template>
  <ElContainer class="layout">
    <ElMain>
      <SectionLayout
        v-loading="isLoading"
        v-bind="layoutProps"
      >
        <template #top>
          <ElAlert
            type="success"
            title="Top"
            description="This is top area."
            center
            :closable="false"
          />
        </template>

        <template #main-head>
          <Toolbar title="Test Table">
            <div :style="{ display: 'flex', gap: '0.5em' }">
              <ElText>Card Areas:</ElText>
              <ElCheckboxGroup v-model="layoutProps.card">
                <ElCheckbox value="top">
                  Top
                </ElCheckbox>
                <ElCheckbox value="main">
                  Main
                </ElCheckbox>
                <ElCheckbox value="bottom">
                  Bottom
                </ElCheckbox>
              </ElCheckboxGroup>
            </div>

            <div :style="{ display: 'flex', gap: '0.5em' }">
              <ElText>Gap:</ElText>
              <ElInput
                v-model="layoutProps.gap"
                placeholder="calc(1em * 0.8)"
              />
            </div>

            <template #extra>
              <ElButton>设置</ElButton>
              <ElButton>尺寸</ElButton>
            </template>
          </Toolbar>
        </template>

        <ElTable
          border
          :data="state.rows"
        >
          <ColumnsRender :columns />
        </ElTable>

        <template #main-foot>
          <PaginationRender :pagination>
            <div style="flex: 1">
              <ElButton
                type="danger"
                tag="div"
              >
                批量删除
              </ElButton>
            </div>
          </PaginationRender>
        </template>

        <template #bottom>
          <ElAlert
            type="info"
            title="Bottom"
            description="This is bottom area."
            center
            :closable="false"
          />
        </template>
      </SectionLayout>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
