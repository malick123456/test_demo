import axios from "src/api/axios.js"


export const post_register = (
  params,
  url ='/users/register', 
) => axios.post(url, params)
// 获取用户注册信息
export const get_user_info = (
  params,
  url ='/users/get_userinfo', 
) => axios.post(url, params)
// 删除单个用户
export const del_user = (
  params,
  url ='/users/deleteUser', 
) => axios.delete(`${url}/${params}`)