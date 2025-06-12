<template>
  <div class="ocr-wrapper">
    <h2>📸 图片文字识别</h2>

    <!-- 拖拽上传区域 -->
    <div
      class="upload-area"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <span>点击或拖拽图片到此区域</span>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="onFileChange"
        hidden
      />
    </div>

    <!-- 加载状态 -->
    <p v-if="loading">🔍 正在识别中，请稍候...</p>

    <!-- 错误提示 -->
    <p v-if="error" class="error-msg">{{ error }}</p>

    <!-- 识别结果 -->
    <div v-if="text" class="result">
      <h3>识别结果：</h3>
      <pre>{{ text }}</pre>
      <button @click="copyText">📋 复制结果</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tesseract from 'tesseract.js'

const text = ref('')
const error = ref('')
const loading = ref(false)
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    processImage(file)
  }
}

const handleDrop = (e) => {
  const file = e.dataTransfer.files[0]
  if (file) {
    processImage(file)
  }
}

const processImage = async (file) => {
  const imageUrl = URL.createObjectURL(file)
  loading.value = true
  error.value = ''
  text.value = ''

  try {
    const result = await Tesseract.recognize(imageUrl, 'chi_sim+eng', {
      logger: m => console.log(m),
    })
    text.value = result.data.text
  } catch (err) {
    console.error('识别错误:', err)
    error.value = '❌ 图片识别失败，请重试或更换图片'
  } finally {
    loading.value = false
  }
}

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(text.value)
    alert('已复制到剪贴板！')
  } catch (err) {
    alert('复制失败，请手动选择文本复制')
  }
}
</script>

<style scoped>
.ocr-wrapper {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
.upload-area {
  border: 2px dashed #999;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  color: #666;
  margin-bottom: 1em;
}
.upload-area:hover {
  background-color: #f9f9f9;
}
.result {
  margin-top: 1em;
}
pre {
  background: #f0f0f0;
  padding: 1em;
  white-space: pre-wrap;
  word-break: break-word;
}
button {
  margin-top: 10px;
  padding: 5px 12px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #66b1ff;
}
.error-msg {
  color: red;
  margin-top: 0.5em;
}
</style>
