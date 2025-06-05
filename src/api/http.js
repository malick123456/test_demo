import axios from "src/api/axios.js"


export const get = (url, params = {}, config = {}) =>
  axios.get(url, { params, ...config })

export const post = (url, data = {}, config = {}) =>
  axios.post(url, data, config)

// export const loadQuestions = (params) => axios.get('https://v2.jinrishici.com/one.json?client=browser-sdk/1.2&X-User-Token=2%2BlvMXz0CcsD3bhbZHQfvMt0XL%2FRUTT7',{params})
export const loadQuestions = (params) => axios.get('https://v2.jinrishici.com/sentence',{params})