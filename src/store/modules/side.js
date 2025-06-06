import { ref } from "vue"
import { defineStore } from 'pinia'
export const useHeaderStore = defineStore('auth', () => {
  const isCollapse = ref(false)
  const get_is_collapse = () => {
    return isCollapse
  }
  const set_is_collapse = (bool) => {
    isCollapse.value = bool
  }
  return {
    get_is_collapse,
    set_is_collapse
  }
})
