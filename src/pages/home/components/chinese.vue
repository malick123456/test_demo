<template>
  <div class='chinese'>
    <!-- Your template goes here -->
     语文
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {loadQuestions} from "src/api/http.js"
import axios from 'axios'


onMounted(() => {
  get_test_data()
  // axios.get('https://v2.jinrishici.com/sentence')
  // .then(res => {
  //   console.error(res.data.data.content) // 诗词正文
  // }).catch((err) => {
  //   console.error(err)
  // })
})
const get_test_data = async() => {
  let params = {
        subject: 'math',
        grade: 3,
        type: 'fill-in-the-blank',
        page: 1,
        pageSize: 10
      }
  try {
    let res = await loadQuestions()
    console.error(res, 'res')
  } catch (err) {
    console.error(err)
  }
}
</script>
<style lang="scss" scoped>
 
</style>