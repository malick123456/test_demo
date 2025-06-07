// src/api/axios.js
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:3000/api', // 根据需要设置
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 示例：添加 token
    const token = localStorage.getItem('token')
    // config.headers["content-type"] = "application/json"
    console.error('请求拦截器', config)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 设置默认 content-type 只对有 body 的请求生效
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response
    console.error(res, '响应拦截器')
    const {status, data} = response
    if (res.status !== 200) {
      console.warn('请求异常:', res)
      return Promise.reject(res)
    }
    return data
  },
  (err) => {
    const {response} = err
    const {data} = response
    console.error(data,'网络错误:', err)
    return {
      code: data.statusCode,
      msg: data.errMessage,
    }
  }
)
// post通过params传参
axios.postOfParams = (url, params) => {
  return axios({
    url:url,
    method: 'post',
    params: params
  })
}
export default service
