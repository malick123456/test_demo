<template>
    <div class='header-page'>
        <div class="fisrt-item">
            <div class="first-item-left">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <el-icon size="20" v-if="!isCollapse" @click="handle_is_collapse">
                        <Fold />
                    </el-icon>
                    <el-icon size="20" v-else @click="handle_is_collapse">
                        <Expand />
                    </el-icon>
                    <div class="breadcrumb">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item>
                                <el-icon>
                                    <component :is="route.meta.icon" />
                                </el-icon>
                                <span>{{ route.meta.superior }}</span>
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                </div>
                <div class="seconed-item">
                    <el-radio-group v-model="tabPosition" style="margin-bottom: 10px">
                        <el-radio-button value="chinese">语文</el-radio-button>
                        <el-radio-button value="math">数学</el-radio-button>
                        <el-radio-button value="en">英语</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from "vue-router"
import { useHeaderStore } from "src/store/index.js"

const route = useRoute()
const { set_is_collapse, get_is_collapse, set_subjects, get_subjects } = useHeaderStore()
const isCollapse = ref(get_is_collapse().value)
const tabPosition = ref(get_subjects().value)
watch(tabPosition, (type) => {
    console.error('type', type)
    set_subjects(type)
})
const handle_is_collapse = (bool) => {
    console.error('=====', get_is_collapse().value)
    isCollapse.value = !get_is_collapse().value
    set_is_collapse(!get_is_collapse().value)
}
</script>

<style lang="scss" scoped>
.header-page {
    background-color: var(--el-menu-bg-color);
    border-bottom: 1px solid var(--el-menu-border-color);

    .fisrt-item {
        padding: 20px 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-icon {
            cursor: pointer;
        }

        .first-item-left {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .breadcrumb {
                margin-left: 10px;
            }
        }
    }

    .seconed-item {
        padding-left: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
}
</style>