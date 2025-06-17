<template>
  <div>
    <el-form :inline="true" @submit.prevent class="form-header">
      <el-form-item label="年级">
        <el-select clearable v-model="filters.grade_id" placeholder="请选择" style="width: 100px;">
          <el-option v-for="n in 6" :key="n" :label="`${n}年级`" :value="n" />
        </el-select>
      </el-form-item>
      <el-form-item label="学期">
        <el-select clearable v-model="filters.semester" placeholder="请选择" style="width: 100px;">
          <el-option :value="1" label="上学期" />
          <el-option :value="2" label="下学期" />
        </el-select>
      </el-form-item>
      <el-form-item label="单元">
        <el-select clearable v-model="filters.unit_id" placeholder="请选择" style="width: 100px;">
          <el-option :value="index + 1" v-for="(item, index) in 10" :key="index" :label="`${chineseNumbers[index] + '单元'}`"/>
        </el-select>
      </el-form-item>
      <el-form-item label="题型">
        <el-select clearable v-model="filters.type" placeholder="全部" style="width: 100px;">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in typeList" :key="index" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="fetchData">查询</el-button>
      <el-button type="primary" @click="add_questions_batch_fn">批量操作</el-button>
      <el-button @click="resetFilters">重置</el-button>
      <el-button type="success" @click="dialogVisible = true">添加题目</el-button>
    </el-form>
    <el-table :data="questionList" style="width: 100%;">
      <el-table-column label="序号" prop="index" width="60" align="center">
        <template #default="{ row, $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="年级" prop="grade_id" align="center">
        <template #default="{ row }">
          {{ row.grade_id + '年级' }}
        </template>
      </el-table-column>
      <el-table-column label="学期" prop="semester" align="center">
        <template #default="{ row }">
          {{ semesterMap[row.semester] }}
        </template>
      </el-table-column>
      <el-table-column label="题型" prop="type" align="center">
        <template #default="{ row }">
          {{ computed_type(row.type) }}
        </template>
      </el-table-column>
      <el-table-column label="题干" prop="content" align="center">
        <template #default="{ row }">
          <el-tooltip class="box-item" effect="dark" :content="row.content" placement="top-start">
            <span class="ellipsis">{{ row.content }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="答案" prop="answer" align="center" />
      <el-table-column label="创建时间" prop="created_at" align="center">
        <template #default="{ row }">
          {{ format_data(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="editQuestion(row)">编辑</el-button>
          <el-button type="danger" text size="small" @click="deleteQuestion(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 50, 100]"
      :total="pageTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" size="default"
      layout="total, sizes, prev, pager, next, jumper" />

    <!-- 添加题目 Dialog（可独立页面） -->
    <AddQuestionDialog v-model="dialogVisible" :editData="editingQuestion" :type='type' @success="fetchData"
      @handleCloseDialog="handleCloseDialog" />

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { api_question } from 'src/api/index.js';
import { format_data } from "src/uilt/index.js"
import { ElMessage } from 'element-plus'
import { useHeaderStore } from "src/store/index.js"
import AddQuestionDialog from 'src/components/dialog/AddQuestionDialog.vue';
import {demo_params} from "src/demo.js"

const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
const { get_subjects } = useHeaderStore()
const currentPage = ref(1);
const pageSize = ref(10);
const pageTotal = ref(0);
const questionList = ref([]);
// 题型
const typeList = ref([])
const subjectMap = {
  chinese: 1,
  math: 2,
  en: 3,
}
const filters = ref({
  grade_id: null,
  subject_id: subjectMap[get_subjects().value],
  unit_id: null,
  semester: null,
  type: null
});
const type = {
  chinese: [
    { label: '基础知识', value: 1 },
    { label: '阅读理解', value: 2 },
    { label: '写作表达', value: 3 },
    { label: '语法句式', value: 4 },
    { label: '古诗文积累', value: 5 },
  ],
  math: [
    { label: '填空题', value: 1 },
    { label: '选择题', value: 2 },
    { label: '应用题', value: 3 },
    { label: '判断题', value: 4 },
  ],
  en: [
    { label: '词汇拼写', value: 1 },
    { label: '语法句型', value: 2 },
    { label: '阅读理解', value: 3 },
    { label: '听力理解', value: 4 },
    { label: '写作表达', value: 5 },
  ]
}
const typeMap = {
  chinese: {
    1: '基础知识',
    2: '阅读理解',
    3: '写作表达',
    4: '语法句式',
    5: '古诗文积累',
  },
  math: {
    1: '填空题',
    2: '选择题',
    3: '应用题',
    4: '判断题',
  },
  en: {
    1: '词汇拼写',
    2: '语法句型',
    3: '阅读理解',
    4: '听力理解',
    5: '写作表达',
  }
};
const semesterMap = {
  1: '上学期',
  2: '下学期',
}
const dialogVisible = ref(false);
const editingQuestion = ref(null);
const subjects_type = ref(get_subjects().value)


// onMounted(() => {
//   fetchData();
// });
const computed_type = (id) => {
  return typeMap[get_subjects().value][id]
}
const editQuestion = (row) => {
  editingQuestion.value = { ...row }; // 深拷贝避免污染
  dialogVisible.value = true;
};

const handleCloseDialog = () => {
  editingQuestion.value = null;
  dialogVisible.value = false;
};


const fetchData = async () => {
  let params = {
    ...filters.value,
    page: currentPage.value,
    size: pageSize.value,
  }
  try {
    let res = await api_question.post_all_questions(params)
    const { code, msg, data, page, size, total } = res.data
    if (code == 200) {
      data.forEach(item => {
        item.options = JSON.parse(item.options)
      })
      console.error(data, 'data')
      questionList.value = data
      pageTotal.value = total;
    } else {
      console.error(msg)
    }
  } catch (err) {
    console.error(err)
  }
  // const { data } = await axios.get('/api/questions', {
  //   params: {
  //     page: page.value,
  //     size: size.value,
  //     ...filters.value
  //   }
  // });
  // questionList.value = data.data;
  // total.value = data.total;
};
// 批量增加
const add_questions_batch_fn = async() => {
  try {
    let res = await api_question.add_questions_batch({questions:demo_params})
  } catch (err) {
    console.error(err)
  }
  
}
const deleteQuestion = async (id) => {
  try {
    let res = await api_question.delete_question({ id })
    const { code, msg, data, page, size, total } = res.data
    if (code == 200) {
      questionList.value = data
      pageTotal.value = total;
      ElMessage.success(msg)
    } else {
      console.error(msg)
    }
  } catch (err) {
    console.error(err)
  }
}
// 选择页码
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchData()
}
// 选择条数
const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchData()
}
const resetFilters = () => {
  filters.value = { grade_id: null, subject_id: null, unit_id: null, type: null, semester: null };
  fetchData();
};
// 展示学科
watch(() => get_subjects().value, (val) => {
  filters.value.subject_id = get_subjects().value
  filters.value.subject_id = subjectMap[get_subjects().value]

  typeList.value = type[val]
  fetchData();
}, { deep: true, immediate: true })


</script>
<style lang="scss" scoped>
.form-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;

  .el-form-item {
    margin-bottom: 0;
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style>