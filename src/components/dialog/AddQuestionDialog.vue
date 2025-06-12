<template>
  <el-dialog v-model="visible" title="添加试题" width="600px" @close="resetForm">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="年级" prop="grade_id">
        <el-select v-model="form.grade_id" placeholder="请选择年级">
          <el-option v-for="n in 6" :key="n" :label="`${n}年级`" :value="n" />
        </el-select>
      </el-form-item>

      <el-form-item label="题型" prop="type">
        <el-select v-model="form.type" placeholder="选择题型">
          <el-option label="选择题" :value="1" />
          <el-option label="填空题" :value="2" />
          <el-option label="应用题" :value="3" />
        </el-select>
      </el-form-item>

      <el-form-item label="单元" prop="unit_id">
        <el-input type="number" v-model="form.unit_id" placeholder="请输入单元" />
      </el-form-item>
      <el-form-item label="题干" prop="content">
        <el-input type="textarea" v-model="form.content" placeholder="请输入题干" />
      </el-form-item>

      <!-- 选择题：显示选项输入 -->
      <template v-if="form.type === 1">
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
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { api_question } from '../../api';
import { useHeaderStore } from "src/store/index.js"

const emit = defineEmits(['update:modelValue', 'success']);
const { get_subjects } = useHeaderStore()
const visible = defineModel();
const formRef = ref(null);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object, 
    default: () => {}
  },
});
const subjects_obj = {
  chinese: 1,
  math: 2,
  en: 3,
}
watch(() => props.editData, val => {
  if (val) Object.assign(form, val);
});
console.error('visible', visible)
// 双向绑定 dialog 可见性
// watch(() => props.modelValue, (val) => {
//   console.error('++++++')
//   visible.value = val
// });
// watch(visible, val => emit('update:modelValue', val));

const form = ref({
  grade_id: null,
  type: null,
  content: '',
  options: { A: '', B: '', C: '', D: '' },
  answer: '',
  unit_id: '',
  subject_id: subjects_obj[get_subjects().value],
  explanation: ''
});

const rules = {
  grade_id: [{ required: true, message: '请选择年级', trigger: 'change' }],
  type: [{ required: true, message: '请选择题型', trigger: 'change' }],
  content: [{ required: true, message: '请输入题干', trigger: 'blur' }],
  answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
  options: {
    A: [{ required: true, message: '选项 A 不能为空', trigger: 'blur' }],
    B: [{ required: true, message: '选项 B 不能为空', trigger: 'blur' }],
    C: [{ required: true, message: '选项 C 不能为空', trigger: 'blur' }],
    D: [{ required: true, message: '选项 D 不能为空', trigger: 'blur' }]
  }
};

const resetForm = () => {
  form.grade_id = null;
  form.type = null;
  form.content = '';
  form.answer = '';
  form.explanation = '';
  form.options = { A: '', B: '', C: '', D: '' };
  formRef.value?.clearValidate();
};

const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    if (form.id) {
      // await axios.put(`/api/questions/${form.id}`, payload);
      
      ElMessage.success('编辑成功');
    } else {
      // await axios.post('/api/questions', payload);
      console.log(form.value, 'form.value');
      
      try {
        let res = await api_question.add_question(form.value)
        console.error('res', res)
      } catch (err) {
        console.error(err)
      }
      ElMessage.success('添加成功');
    }

    // try {
    //   const payload = {
    //     ...form,
    //     options: form.type === 1 ? form.options : null
    //   };

    //   // await axios.post('/api/questions', payload);

    //   ElMessage.success('添加成功');
    //   emit('success');
    //   visible.value = false;
    // } catch (err) {
    //   ElMessage.error('提交失败，请检查填写内容');
    //   console.error(err);
    // }
  });
};
</script>
