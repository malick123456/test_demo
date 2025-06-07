import { getCurrentInstance } from 'vue'

export const lodash = () => {
  const { proxy } = getCurrentInstance()
  return proxy.lodash
}