<template>
  <div class='side-page' :style="{width: width}">
    <div class="side-top-img">
      <img src="src/assets/png/side/logo-CRQ9AZN7.png" alt="">
      <span v-if="!isCollapse">小学练习题系统</span>
    </div>
    <div class="side-menu">
      <el-menu 
        :default-active="first_active_tab" 
        :collapse="isCollapse" 
        @open="handleOpen" 
        @close="handleClose"
        @select="handle_menu_select"
        class="el-menu-vertical-demo">
        <template v-for="(item, index) in tabs" :index="`${index + 1}`" :key="index">
          <el-sub-menu v-if="item.children && item.children.length > 0" :index="`${index}`">
            <template #title>
              <el-icon><component :is="item.meta.icon" /></el-icon>
              <span v-if="!isCollapse">{{ item.meta.title }}</span>
            </template>
            <el-menu-item v-for="(child_item, child_index) in item.children"
              :key="child_index"
              @click="handle_child_item(item, child_item, index, child_index)" 
              :index="`${index + 1}-${child_index + 1}`">
              <span>{{ child_item.meta.title }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="`${index}`">
            <el-icon><component :is="item.meta.icon" /></el-icon>
            <span v-if="!isCollapse">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import {useHeaderStore} from "src/store/index.js"

const router = useRouter()
const route = useRoute()
const {get_is_collapse, set_is_collapse} = useHeaderStore()
const tabs = ref([])
const first_active_tab = ref('0')
const isCollapse = ref(get_is_collapse().value)
const width = ref('200px')

// 是否为展开
watch(() => get_is_collapse().value, (bl) => {
  isCollapse.value = get_is_collapse().value
  width.value = get_is_collapse().value ? '60px' : '200px'
})
onMounted(() => {
  tabs.value = router.getRoutes().filter(item => item.path != '/' && item.meta.side)
})
const handle_tabs = (item) => {
  router.push(item.value)
}
const handle_child_item = (item, child_item, index, child_index) => {
  first_active_tab.value = String(index)
  router.push(child_item.name)
}
const handleOpen = (key, keyPath) => {
  // first_active_tab.value = keyPath[0]
}
const handleClose = (key, keyPath) => {
  console.error(key, keyPath)
}
const handle_menu_select = (val) => {
  if (!(val.indexOf('-') > -1)) {
    console.error('handle_menu_select', val)
    first_active_tab.value = val
  }
}
</script>

<style lang="scss" scoped>
.side-page {
  width: 200px;
  height: calc(100vh - 20px);
  padding: 10px;
  background-color: var(--el-menu-bg-color);
  border-right: 1px solid var(--el-menu-border-color);

  .side-top-img {
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
      height: 40px;
    }

    span {
      color: #0000EE;
    }
  }

  .is-active {
    :deep(.el-sub-menu__title) {
      color: #409eff
    }

    ;
  }

  .side-menu ul {
    height: calc(100vh - 60px);
    border-right: none;
  }
}
</style>