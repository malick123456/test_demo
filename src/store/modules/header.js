import { ref } from "vue"
import { defineStore } from 'pinia'
export const useHeaderStore = defineStore('header', () => {
  const isCollapse = ref(false)
  const subjects = ref('chinese')
  const get_is_collapse = () => {
    return isCollapse
  }
  const get_subjects = () => {
    return subjects
  }
  const set_subjects = (type) => {
    subjects.value = type
  }
  const set_is_collapse = (bool) => {
    console.error('soter', bool)
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
