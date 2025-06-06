<template>
  <div class='home-page'>
    Your template goes here
    <!-- <router-view /> -->
    {{subjects_type}}
    <!-- <component :is="subjects_obj[get_subjects()]" /> -->
    <chinese v-if="subjects_type == 'chinese'"></chinese>
    <math-page v-if="subjects_type == 'math'"></math-page>
    <en v-if="subjects_type == 'en'"></en>
    
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from "src/store/index.js"
import chinese from "src/pages/home/components/chinese.vue"
import en from "src/pages/home/components/en.vue"
import mathPage from "src/pages/home/components/math_page.vue"

const router = useRouter()
const route = useRoute()
const { set_subjects, get_subjects, subjects } = useHeaderStore()
const subjects_type = ref(get_subjects().value)

// 展示学科
watch(() => get_subjects().value, (bl) => {
  subjects_type.value = get_subjects().value
})
// const subjects_obj = { chinese, en, math }
</script>

<style lang="scss" scoped>
.home-page {
  font-size: 12px;
}
</style>