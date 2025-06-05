<!-- 分析页 -->
<template>
  <div class='timu-page'>
    <!-- Your template goes here -->
    <div v-for="(item, index) in pageData" :key="index" class="timu-item">
      <div class="title">{{ `${item.id}、` }} {{ item.title }}</div>
      <div class="questions">
        <el-input v-model="item.textarea" style="min-height: 50px; 
          width: 80%;" :rows="2" type="textarea" placeholder="请填写你的计算过程" />
      </div>
      <div>
        {{ '答：' }}
        <span v-html="item.da.replace(/多少|几/g,
          '<input placeholder=&quot;答案&quot; class=&quot;input&quot; type=&quot;text&quot; />'
        )"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {timu} from "src/mock/index.js"
// const text = ref('Hello, welcome to the text-to-speech function')

const pageData = ref(timu)

</script>

<style lang="scss" scoped>
:deep(.el-textarea__inner) {
  height: 100%;
}

:deep(.input) {
  width: 60px;
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