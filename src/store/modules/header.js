import { ref } from "vue"
import { defineStore } from 'pinia'
export const useHeaderStore = defineStore('header', () => {
  const isCollapse = ref(false)
  const subjects = ref('chinese')
  // 获取左侧是否展开
  const get_is_collapse = () => {
    return isCollapse
  }
  // 获取是那个学科
  const get_subjects = () => {
    return subjects
  }
  // 设置当前学科
  const set_subjects = (type) => {
    subjects.value = type
  }
  // 设置左侧是否展开
  const set_is_collapse = (bool) => {
    isCollapse.value = bool
  }
  return {
    get_is_collapse,
    set_is_collapse,
    get_subjects,
    set_subjects,
    subjects,
  }
})
