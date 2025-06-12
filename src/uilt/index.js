import { getCurrentInstance } from 'vue'
import dayjs from 'dayjs'

export const lodash = () => {
  const { proxy } = getCurrentInstance()
  return proxy.lodash
}

// 时间转换
export const format_data = (val) => {
  const num_val = Number.isFinite(val) ? val : Number(val)
  const data = dayjs(num_val).format('YYYY-MM-DD HH:mm:ss')
  return data
}