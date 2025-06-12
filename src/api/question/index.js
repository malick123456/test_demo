import axios from "src/api/axios.js"

// 添加试题
export const add_question = (
  params,
  url ='/users/addQuestion', 
) => axios.post(url, params)

// 获取试题详情
export const get_question_by_id_details = (params,
  url ='/users/getQuestionByIdDetails', 
) => axios.post(url, params)

// 获取试题
export const post_questions = (params,
  url ='/users/postQuestions', 
) => axios.post(url, params)

// 编辑试题
export const update_question = (params,
  url ='/users/updateQuestion', 
) => axios.post(url, params)

// 删除试题
export const delete_question = (params,
  url ='/users/deleteQuestion', 
) => axios.post(url, params)