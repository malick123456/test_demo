import { ref } from "vue"
import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', () => {
  const show_login_dialog = ref(false)
  const islogin = ref(false)
  const get_is_login = () => {
    return islogin
  }
  const get_show_login_dialog = () => {
    return show_login_dialog
  }
  const set_show_login_dialog = (bool) => {
    console.error('dakai', bool)
    return show_login_dialog.value = bool
  }
  const set_is_login = (bool) => {
    console.error('soter', bool)
    islogin.value = bool
  }
  return {
    get_is_login,
    set_is_login,
    get_show_login_dialog,
    set_show_login_dialog,
  }
})