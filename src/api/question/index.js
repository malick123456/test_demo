import axios from "src/api/axios.js"

// 添加试题
export const add_question = (
  params,
  url ='/questions/addQuestion', 
) => axios.post(url, params)

// 添加试题
export const add_questions_batch = (
  params,
  url ='/questions/addQuestionsBatch', 
) => axios.post(url, params)

// 获取试题详情
export const get_question_by_id_details = (
  params,
  url ='/questions/getQuestionByIdDetails', 
) => axios.post(url, params)

// 获取所有试题
export const post_all_questions = (
  params,
  url ='/questions/getAllQuestions', 
) => axios.post(url, params)

// 获取试题
export const post_questions = (
  params,
  url ='/questions/postQuestions', 
) => axios.post(url, params)

// 编辑试题
export const update_question = (
  params,
  url ='/questions/updateQuestion', 
) => axios.post(url, params)

// 删除试题
export const delete_question = (
  params,
  url ='/questions/deleteQuestion', 
) => axios.post(url, params)