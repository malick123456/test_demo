<template>
  <el-dialog v-model="visible" title="添加试题" width="600px" :show-close="false">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="年级" prop="grade_id">
        <el-select v-model="form.grade_id" placeholder="请选择年级">
          <el-option v-for="n in 6" :key="n" :label="`${n}年级`" :value="n" />
        </el-select>
      </el-form-item>
      <el-form-item label="学期" prop="semester">
        <el-select v-model="form.semester" placeholder="请选择">
          <el-option :value="1">{{ '上学期' }}</el-option>
          <el-option :value="2">{{ '下学期' }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-select v-model="form.type" placeholder="选择题型">
          <el-option 
            :label="item.label" 
            :value="item.value"  
            v-for="(item, index) in typeList"
            :key="index"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="单元" prop="unit_id">
        <el-input type="number" v-model="form.unit_id" placeholder="请输入单元" />
      </el-form-item>
      <el-form-item label="题干" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="请输入题干" />
      </el-form-item>

      <!-- 选择题：显示选项输入 -->
      <template v-if="form.type == 1 && get_subjects() == 'math'">
        <el-form-item label="选项 A" prop="options.A">
          <el-input v-model="form.options.A" />
        </el-form-item>
        <el-form-item label="选项 B" prop="options.B">
          <el-input v-model="form.options.B" />
        </el-form-item>
        <el-form-item label="选项 C" prop="options.C">
          <el-input v-model="form.options.C" />
        </el-form-item>
        <el-form-item label="选项 D" prop="options.D">
          <el-input v-model="form.options.D" />
        </el-form-item>
      </template>

      <el-form-item label="答案" prop="answer">
        <el-input v-model="form.answer" placeholder="请输入正确答案" />
      </el-form-item>

      <el-form-item label="解析">
        <el-input type="textarea" v-model="form.explanation" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="resetForm">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { api_question } from '../../api';
import { useHeaderStore } from "src/store/index.js"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object, 
    default: () => {}
  },
  type: {
    type: Object,
    default: () => {}
  },
});
const emit = defineEmits(['handleCloseDialog', 'success']);
const { get_subjects } = useHeaderStore()
const visible = defineModel();
const formRef = ref(null);
const subjects_obj = {
  chinese: 1,
  math: 2,
  en: 3,
}
// 题型
const typeList = ref([])
watch(() => props.editData, val => {
  if (val) {
    Object.assign(form.value, val);
  } else {
    resetForm()
  }
});
// 展示学科
watch(() => get_subjects().value, (val) => {
  typeList.value = props.type[val]
}, {deep: true, immediate: true})
const form = ref({
  grade_id: '',
  type: '',
  content: '',
  options: { A: '', B: '', C: '', D: '' },
  answer: '',
  unit_id: '',
  semester: '',
  subject_id: subjects_obj[get_subjects().value],
  explanation: ''
});

const rules = {
  grade_id: [{ required: true, message: '请选择年级', trigger: 'blur' }],
  type: [{ required: true, message: '请选择题型', trigger: 'blur' }],
  content: [{ required: true, message: '请输入题干', trigger: 'blur' }],
  answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
  semester: [{ required: true, message: '请选择学期', trigger: 'blur' }],
  options: {
    A: [{ required: true, message: '选项 A 不能为空', trigger: 'blur' }],
    B: [{ required: true, message: '选项 B 不能为空', trigger: 'blur' }],
    C: [{ required: true, message: '选项 C 不能为空', trigger: 'blur' }],
    D: [{ required: true, message: '选项 D 不能为空', trigger: 'blur' }]
  }
};

const resetForm = () => {
  form.value.grade_id = '';
  form.value.type = '';
  form.value.content = '';
  form.value.answer = '';
  form.value.explanation = '';
  form.value.semester = '';
  form.value.options = { A: '', B: '', C: '', D: '' };
  formRef.value?.clearValidate();
  emit('handleCloseDialog')
};

const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    if (form.value.id) {
      // await axios.put(`/api/questions/${form.value.id}`, payload);
      form.value.unit_id = Number(form.value.unit_id)
      try {
        let res = await api_question.update_question(form.value)
        const {code, msg, data} = res.data
        if (code == 200) {
          resetForm()
          emit('success')
        } else {
          ElMessage.error(msg);
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        let res = await api_question.add_question(form.value)
        const {code, msg, data} = res.data
        if (code == 200) {
          resetForm()
          emit('success')
        } else {
          ElMessage.error(msg);
        }
      } catch (err) {
        console.error(err)
      }
    }
  });
};
</script>
