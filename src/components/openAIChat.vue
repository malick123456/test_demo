<script setup>
import { ref } from "vue";
import OpenAI from "openai";

const apiKey = 'Bearer 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';

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

const prompt = ref("");
const result = ref("");
const loading = ref(false);

const generateResponse = async () => {
  if (!prompt.value) return;
  loading.value = true;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: "返回最佳中文答案" + prompt.value }
        ]
      })
    });
    const data = await response.json(); // ✅ 解析为 JSON

    if (!data.choices || !data.choices[0]) {
      result.value = "AI 没有返回内容。请稍后再试。";
      console.error("OpenRouter 响应异常：", data);
    } else {
      result.value = data.choices[0].message.content;
    }
    console.error('response', data)
  } catch (error) {
    result.value = "请求出错：" + error.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div>
    <h2>OpenAI Chat 示例</h2>
    <textarea v-model="prompt" placeholder="输入你的问题或请求" rows="4"></textarea>
    <br />
    <button @click="generateResponse" :disabled="loading">
      {{ loading ? "生成中..." : "生成回答" }}
    </button>
    <p v-if="result"><strong>回答:</strong> {{ result }}</p>
  </div>
</template>
