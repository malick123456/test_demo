<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <side />
      </el-aside>
      <el-container>
        <el-header>
          <header-page />
        </el-header>
        <el-main>
          <login-page />
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import headerPage from "src/components/header.vue"
import side from "src/components/side.vue"
import loginPage from "src/components/login/login.vue"
</script>

<style lang="scss" scoped>
  .common-layout {
    color: var(--el-menu-text-color);
    .el-header {
      padding: 0;
      height: auto;
    }
  }
</style>