<template>
  <div class=''>
    <!-- Your template goes here -->
    <p>{{ text }}</p>
    <button @click="speak">🔊 播放文字</button>
    <select v-model="rate">
      <option v-for="(item, index) in 10" :value="item/10" :key="item">{{ item/10 }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const text = ref('Hello, welcome to the text-to-speech function')
const rate = ref(0.7)
const speak = () => {
  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance(text.value)
  // utter.lang = 'zh-CN' // 设置为中文
  utter.lang = 'en-US' // 设置为英文
  utter.rate = rate.value
  synth.speak(utter)
}
</script>

<style lang="scss" scoped>
 
</style>