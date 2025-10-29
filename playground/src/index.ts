import { createApp } from 'vue'
import { ElPaginationAdapter, SectionLayout } from '@/index'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'

createApp(App)
  .use(router)
  .use(() => {
    SectionLayout.config = {
      cardClass: 'el-card el-card__body',
    }

    ElPaginationAdapter.defaultProps = {
      background: true,
      layout: 'slot, prev, pager, next, jumper, sizes, total',
      pagerCount: 5,
      pageSizes: [10, 20, 30, 40, 50, 100],
    }
  })
  .mount('#app')
