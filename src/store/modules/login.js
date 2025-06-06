import { ref } from "vue"
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', () => {
  const show_login_dialog = ref(false)
  const islogin = ref(false)
  // 获取是否登录
  const get_is_login = () => {
    return islogin
  }
  // 获取是否展示登录弹窗
  const get_show_login_dialog = () => {
    return show_login_dialog
  }
  // 设置弹窗状态
  const set_show_login_dialog = (bool) => {
    return show_login_dialog.value = bool
  }
  // 设置登录状态
  const set_is_login = (bool) => {
    islogin.value = bool
  }
  return {
    get_is_login,
    set_is_login,
    get_show_login_dialog,
    set_show_login_dialog,
  }
})