import { createApp } from 'vue'
import 'src/style.css'
import App from 'src/App.vue'
import router from 'src/router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
import * as Icons from '@element-plus/icons-vue'
pinia.use(piniaPluginPersistedstate)
const vue = createApp(App)
vue.use(pinia)
vue.use(router)
vue.use(ElementPlus)
for (const [key, component] of Object.entries(Icons)) {
  vue.component(key, component)
}
vue.mount('#app')
