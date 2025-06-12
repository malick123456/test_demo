<template>
  <div class='user-info-page'>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" fixed prop="id" label="用户ID" width="80" />
      <el-table-column align="center" fixed prop="username" label="用户名" width="150" />
      <el-table-column align="center" fixed prop="phone" label="手机号" width="150" />
      <el-table-column align="center" fixed prop="created_at" label="创建时间" width="200">
        <template #default="{row}">
          {{ format_data(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120" align="center">
      <template #default="{row}">
        <el-button link type="danger" size="small" @click="handle_del(row)"> {{'删除'}} </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="pageTotal"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      size="default"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import {api_user} from "src/api/index.js"
import {format_data} from "src/uilt/index.js"
const tableData = ref([])
const pageTotal = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
onMounted(() => {
  init()
})
// 获取页面数据
const init = async() => {
  try {
    let res = await api_user.get_user_info({
      size: pageSize.value,
      page: currentPage.value,
    })
    const {code, msg, data, page, size, total} = res.data
    if (code == 200) {
      tableData.value = data
      pageSize.value = size
      pageTotal.value = total
      currentPage.value = page
    } else {
      ElMessage(msg)
    }
  } catch(err) {
    console.error(err)
  }
}
// 删除
const handle_del = async(row) => {
  try {
    let res = await api_user.del_user(row.id)
    const {code, message} = res.data
    if (code == 200) {
      init()
      ElMessage.success(message)
    } else {
      ElMessage.error(message)
    }
  } catch (err) {
    console.error(err)
  }
  
}
// 选择页码
const handleSizeChange = (val) => {
  pageSize.value = val
  init()
}
// 选择条数
const handleCurrentChange = (val) => {
  currentPage.value = val
  init()
}
</script>

<style lang="scss" scoped>
 .user-info-page {

 }
</style>