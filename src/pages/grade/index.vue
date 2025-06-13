<template>
  <div class='grade-page'>
    <!-- Your template goes here -->
    <chinese v-if="subjects_type == 'chinese'"></chinese>
    <math-page v-if="subjects_type == 'math'"></math-page>
    <en v-if="subjects_type == 'en'"></en>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import chinese from "src/pages/grade/component/chinese.vue"
import en from "src/pages/grade/component/en.vue"
import mathPage from "src/pages/grade/component/math_page.vue"
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from "src/store/index.js"

const router = useRouter()
const route = useRoute()
const { set_subjects, get_subjects, subjects } = useHeaderStore()
const subjects_type = ref(get_subjects().value)

// 展示学科
watch(() => get_subjects().value, (bl) => {
  subjects_type.value = get_subjects().value
})

</script>

<style lang="scss" scoped>
.grade-page {}
</style>