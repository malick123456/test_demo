import axios from "src/api/axios.js"


export const post_register = (
  params,
  url ='/users/register', 
) => axios.post(url, params)