<!-- 分析页 -->
<template>
  <div class='timu-page'>
    <!-- Your template goes here -->
    <div class="header-content">
      <div class="hander-item" :class="{ 'active-tab': active_tab == index + 1 }" @click="handle_tabs(index + 1)"
        v-for="(item, index) in 10" :key="index">
        {{ chineseNumbers[index] + '单元' }}
      </div>
    </div>
    <div class="exercise-content">
      <div v-if="basics.length > 0">
        <div class="basics-title">{{ '填空题' }}</div>
        <div 
          class="basics-content" 
          v-for="(item, index) in basics"
          :key="index"
          
        >{{ index + 1 + '.' }}<span v-html="item.content"></span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { api_question } from "src/api/index.js"
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from "src/store/index.js"
import {timu} from "src/mock/index.js"
// const text = ref('Hello, welcome to the text-to-speech function')
const router = useRouter()
const route = useRoute()
const subjectMap = {
  chinese: 1,
  math: 2,
  en: 3,
}
const {
  get_subjects
} = useHeaderStore()
const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
const active_tab = ref(1)
// 应用题
const application = ref([])
// 选择题
const fill = ref([])
// 填空题
const basics = ref([])

onMounted(() => {
  fetchData()
})
const fetchData = async () => {
  const {
    grade_id,
    semester,
  } = route.meta
  let params = {
    grade_id, 
    subject_id: subjectMap[get_subjects().value], 
    unit_id: active_tab.value, 
    semester
  }
  try {
    let res = await api_question.post_questions(params)
    const {code, msg, choice, fill, application} = res.data
    if (code == 200) {
      basics.value = choice
    } else {}
  } catch (err) {
    console.error(err)
  }
}
// 使用正则匹配并替换多个“多少”或“几”
const renderedContent = (content) => {
  let i = 1
  return content.replace(/(多少|几|什么)/g, () => {
    return `<input type="text" class="inline-input" data-index="${i++}" />`
  })
}
const pageData = ref(timu)

</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  height: 100%;
}

:deep(.input), :deep(.inline-input) {
  width: 60px;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .hander-item {
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 2px 4px;
      margin-right: 5px;
      font-size: 12px;
      cursor: pointer;
    }

    .active-tab {
      color: #ffffff;
      background-color: var(--el-color-primary);
    }
  }
.exercise-content {
  font-size: 12px;
  .basics-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    margin: 5px 0 ;
  }
  .basics-content {
    text-align: left;
    margin: 5px 0;
  }
}
.timu-page {
  .timu-item {
    text-align: left;
    margin-bottom: 20px;

    .questions {
      min-height: 50px;
      margin: 5px 0 ;
    }
  }
}
</style>