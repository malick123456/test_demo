<template>
  <div class='chinese'>
    <!-- Your template goes here -->
    <div class="header-content">
      <div class="hander-item" :class="{ 'active-tab': active_tab == index + 1 }" @click="handle_tabs(index + 1)"
        v-for="(item, index) in 10" :key="index">
        {{ chineseNumbers[index] + '单元' }}
      </div>
    </div>
    <div class="exercise-content">
      <!-- 1: ‘基础知识’ -->
      <div class="basics">
        <div class="basics-title">{{ '一、基础知识' }}</div>
        <div class="item" :key="index" v-for="(item, index) in basics">
          <div>{{`${index + 1}、` + item.content }} <span>{{ item.answer }}</span></div>
          <!-- <div>
            <el-input type="textarea" style="width: 80px;" v-model="item.answer" />
          </div> -->
        </div>
      </div>
      <!-- 2: '阅读理解', -->
      <div class="reading">
        <div>{{ '二、阅读理解' }}</div>
      </div>
      <!-- 3: '写作表达', -->
      <div class="writing">
        <div>{{ '三、写作表达' }}</div>
      </div>
      <!-- 4: '语法句式', -->
      <div class="grammar">
        <div>{{ '四、语法句式' }}</div>
      </div>
      <!-- 5: '古诗文积累', -->
      <div class="ancient-poetry">
        <div>{{ '五、古诗文积累' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api_question } from "src/api/index.js"
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from "src/store/index.js"

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
const handle_tabs = (val) => {
  active_tab.value = val
}
</script>
<style lang="scss" scoped>
.chinese {
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
    margin-top: 10px;
    text-align: left;
    .basics {
      .basics-title {
        font-weight: bold;
      }
      .item {
        font-size: 12px;
      }
    }
  }
}
</style>