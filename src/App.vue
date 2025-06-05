<template>
  <!-- <lay-out /> -->
  <router-view />
</template>

<script setup>
import layOut from 'src/pages/layout/layout.vue'
</script>

<style lang="scss" scoped>
.common-layout {
  width: 100%;
  height: 100%;

  :deep(.el-container) {
    width: 100%;
    height: 100%;
  }
  .el-container  {
    width: calc(100% - 150px);
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
