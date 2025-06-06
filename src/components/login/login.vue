<template>
  <el-dialog v-model="centerDialogVisible" width="500" center @close="close_btn">
    <div class="login-page">
      <div class="tabs">
        <el-radio-group v-model="active_tabs">
          <el-radio-button value="login">登录</el-radio-button>
          <el-radio-button value="register">注册</el-radio-button>
        </el-radio-group>
      </div>
      <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" :rules="rules" label-width="auto">
        <login-template :ruleForm="ruleForm" v-if="active_tabs == 'login'" />
        <register :ruleForm="ruleForm" v-if="active_tabs == 'register'" />
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useLoginStore } from "src/store/index.js"
const { set_is_login, set_show_login_dialog, get_show_login_dialog } = useLoginStore()
import loginTemplate from "src/components/login/components/login_component.vue"
import register from "src/components/login/components/register.vue"

const ruleFormRef = ref(null)
const ruleForm = ref({
  username: '',
  password: '',
  confirm_password: '',
})
const active_tabs = ref('login')
const centerDialogVisible = ref(false)
const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
  ],
  confirm_password: [
    { required: true, message: '确认密码不能为空！', trigger: 'blur' },
  ],
})
// 是否展示弹窗
watch(() => get_show_login_dialog().value, (bl) => {
  centerDialogVisible.value = bl
},{deep: true, immediate:true})
const close_btn = () => {
  set_show_login_dialog(false)
}
// 提交
const submitForm = (formEl) => {
  //
  if (!formEl) return
  formEl.validate((valid, fields) => {
    console.log(valid, 'error submit!', fields)
    if (valid) {
      console.log('submit!')
      set_is_login(true)
      set_show_login_dialog(false)
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 重置
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.login-page {
  .tabs {
    text-align: center;
    margin-bottom: 15px;
  }

  :deep(.el-form-item__content) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>