import { createRouter, createWebHistory } from "vue-router"
// 动态路由
const generateGradeRoutes = (gradeNum, icon = 'Avatar') => {
    const gradeName = ['一', '二', '三', '四', '五', '六'][gradeNum - 1] + '年级'
    return {
        path: `${gradeNum}_grade`,
        name: `${gradeNum}_grade`,
        meta: {
            icon,
            title: gradeName,
            grade_id: gradeNum,
            side: true,
        },
        component: () => import("src/pages/grade/index.vue"),
        children: [
            {
                path: `/${gradeNum}_grade_last_issue`,
                name: `${gradeNum}_grade_last_issue`,
                meta: {
                    title: '上学期',
                    semester: 1,
                    superior: gradeName,
                },
                component: () => import("src/pages/grade/index.vue")
            },
            {
                path: `/${gradeNum}_grade_next_issue`,
                name: `${gradeNum}_grade_next_issue`,
                meta: {
                    title: '下学期',
                    semester: 2,
                    superior: gradeName,
                },
                component: () => import("src/pages/grade/index.vue")
            }
        ]
    }
}
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import("src/components/login/login.vue")
    },
    {
        path: '/',
        name: 'main',
        meta: {},
        redirect: '/home_page',
        component: () => import("src/pages/layout/layout.vue"),
        children: [
            // home页面
            {
                path: 'home_page',
                name: 'home_page',
                meta: {
                    icon: 'HomeFilled',
                    title: '首页',
                    side: true,
                },
                component: () => import("src/pages/home/index.vue"),
            },
            // 动态添加 1~6 年级
            ...[1, 2, 3, 4, 5, 6].map(num => generateGradeRoutes(num)),
            {
                path: 'ocrimage',
                name: 'ocrimage',
                meta: {
                    icon: "UploadFilled",
                    title: '识别图片文字',
                    side: true,
                },
                component: () => import("src/components/ocrImage.vue"),
            },
            {
                path: 'open_AIChat',
                name: 'open_AIChat',
                meta: {
                    icon: "UploadFilled",
                    title: 'AI自动问答',
                    side: true,
                },
                component: () => import("src/components/openAIChat.vue"),
            },
            {
                path: 'user_info',
                name: 'user_info',
                meta: {
                    icon: "UploadFilled",
                    title: '所有用户注册信息',
                    side: true,
                },
                component: () => import("src/components/all_user_info.vue"),
            },
            {
                path: 'add_question',
                name: 'add_question',
                meta: {
                    icon: "UploadFilled",
                    title: '添加试题',
                    side: true,
                },
                component: () => import("src/components/questionList.vue"),
            }
        ]
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})
// router.beforeEach((to, from, next) => {
//     console.error('befor', to, from, next)
//     const isAuthenticated = !!localStorage.getItem('token')
//     if (to.path === '/') {
//         next('/home_page')
//     } else if (to.path === '/login' && isAuthenticated) {
//       next('/home')
//     } else if (to.meta.requiresAuth && !isAuthenticated) {
//       next('/login')
//     } else {
//       next()
//     }
//   })
export default router