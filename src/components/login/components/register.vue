<template>
  <div class='register-page'>
    <!-- Your template goes here -->
    <el-form-item label="用户名" prop="username">
      <el-input 
        v-model="ruleForm.username" 
        style="width: 200px;"
        placeholder="请输入您的用户吗"
        />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input 
        v-model="ruleForm.password"
        style="width: 200px;"
        type="password"
        show-password
        placeholder="请输入您的密码"
        />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirm_password">
      <el-input 
        v-model="ruleForm.confirm_password"
        style="width: 200px;"
        type="password"
        show-password
        placeholder="请输入您的密码"
        />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input 
        v-model="ruleForm.phone"
        style="width: 200px;"
        type="phone"
        show-password
        placeholder="请输入您的密码"
        />
    </el-form-item>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  ruleForm: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
 .register-page {
  display: grid;
  justify-content: center;
 }
</style>