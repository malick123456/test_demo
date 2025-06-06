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
                    <el-radio-group v-model="tabPosition">
                        <el-radio-button value="chinese">语文</el-radio-button>
                        <el-radio-button value="math">数学</el-radio-button>
                        <el-radio-button value="en">英语</el-radio-button>
                    </el-radio-group>
                    <el-dropdown :target="'hover'">
                        <span class="el-dropdown-link">
                            <img class="img" src="src/assets/png/login/user.png" alt="">
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="handle_logout">
                                 {{ islogin }} {{ islogin ? '退出登录' : '登录' }}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from "vue-router"
import { useHeaderStore, useLoginStore } from "src/store/index.js"

const route = useRoute()
const { set_is_collapse, get_is_collapse, set_subjects, get_subjects } = useHeaderStore()
const { get_is_login, set_show_login_dialog, set_is_login } = useLoginStore()
const isCollapse = ref(get_is_collapse().value)
const tabPosition = ref(get_subjects().value)
const islogin = ref(false)
watch(tabPosition, (type) => {
    console.error(get_is_login().value, 'type====', type)
    set_subjects(type)
})
watch(() => get_is_login().value, (bl) => {
    console.error('get_is_login', bl)
    islogin.value = bl
}, {deep: true, immediate: true})
const handle_is_collapse = (bool) => {
    console.error('=====', get_is_collapse().value)
    isCollapse.value = !get_is_collapse().value
    set_is_collapse(!get_is_collapse().value)
}
// 退出登录
const handle_logout = () => {
    if (!islogin.value) {
        console.error('handle_logout', islogin.value)
        set_show_login_dialog(true)
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        set_is_login(false)
        // window.location.href = '/login';
    }
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

        .el-dropdown-link {
            .img {
                margin-left: 10px;
                width: 32px;
                height: 32px;
                border-radius: 50px;
            }
        }
    }
}
</style>