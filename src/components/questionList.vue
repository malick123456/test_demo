<template>
  <div>
    <el-form :inline="true" @submit.prevent class="form-header">
      <el-form-item label="年级">
        <el-select v-model="filters.grade_id" placeholder="请选择" style="width: 100px;">
          <el-option v-for="n in 6" :key="n" :label="`${n}年级`" :value="n" />
        </el-select>
      </el-form-item>
      <el-form-item label="题型">
        <el-select v-model="filters.type" placeholder="全部" style="width: 100px;">
          <el-option label="选择题" :value="1" />
          <el-option label="填空题" :value="2" />
          <el-option label="应用题" :value="3" />
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="fetchData">查询</el-button>
      <el-button @click="resetFilters">重置</el-button>
      <el-button type="success" @click="dialogVisible = true">添加题目</el-button>
    </el-form>
    <el-table :data="questionList" style="width: 100%;">
      <el-table-column label="ID" prop="id" width="60" align="center" />
      <el-table-column label="题型" prop="type" align="center">
        <template #default="{ row }">
          {{ typeMap[row.type] }}
        </template>
      </el-table-column>
      <el-table-column label="题干" prop="content" />
      <el-table-column label="答案" prop="answer" />
      <el-table-column label="创建时间" prop="created_at">
        <template #default="{ row }">
          {{ dayjs(row.created_at).format('YYYY-MM-DD HH:mm') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="{ row }">
          <el-button type="primary" text size="small" @click="editQuestion(row)">编辑</el-button>
          <el-button type="danger" text size="small" @click="deleteQuestion(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
      v-model:current-page="currentPage" 
      v-model:page-size="pageSize" 
      :total="pageTotal"
      layout="total, sizes, prev, pager, next, jumper" 
      :page-sizes="[5, 10, 20, 50]" 
      @current-change="fetchData"
      @size-change="fetchData" 
      background class="mt-4" />

    <!-- 添加题目 Dialog（可独立页面） -->
    <AddQuestionDialog v-model="dialogVisible" :editData="editingQuestion" @success="fetchData"
      @update:modelValue="handleCloseDialog" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {api_question} from 'src/api/index.js';
import dayjs from 'dayjs';
import AddQuestionDialog from 'src/components/dialog/AddQuestionDialog.vue';

const currentPage = ref(1);
const pageSize = ref(10);
const pageTotal = ref(0);
const questionList = ref([]);

const filters = ref({
  grade_id: null,
  subject_id: null,
  unit_id: null,
  type: null
});

const typeMap = {
  1: '选择题',
  2: '填空题',
  3: '应用题'
};

const dialogVisible = ref(false);
const editingQuestion = ref(null);

onMounted(() => {
  fetchData();
});

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
    let res = await api_question.post_questions(params)
    console.error('fetchData', res)
    const {code, msg, data, page, size, total} = res.data
    if (code == 200) {
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

const resetFilters = () => {
  filters.value = { grade_id: null, subject_id: null, unit_id: null, type: null };
  fetchData();
};


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
</style>