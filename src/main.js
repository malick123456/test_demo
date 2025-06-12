import { createApp } from 'vue'
import 'src/style.css'
import App from 'src/App.vue'
import router from 'src/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import zhCn from 'element-plus/es/locale/lang/zh-cn'; // 中文语言包
import * as Icons from '@element-plus/icons-vue'
import lodash from 'lodash'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const vue = createApp(App)
vue.use(ElementPlus, {
  locale: zhCn  // 👈 设置语言为中文
});
vue.use(pinia)
vue.use(router)
vue.config.globalProperties.lodash = lodash
for (const [key, component] of Object.entries(Icons)) {
  vue.component(key, component)
}
vue.mount('#app')
