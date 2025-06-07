import { createRouter, createWebHistory } from "vue-router"

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
            {
                path: 'first_grade',
                name: 'first_grade',
                meta: {
                    icon: 'HomeFilled',
                    title: '一年级',
                    side: true,
                },
                component: () => import("src/pages/home/index.vue"),
                children: [
                    // 一年级上期
                    {
                        path: '/first_grade_last_issue',
                        name: 'first_grade_last_issue',
                        meta: {
                            title: '一年级上期',
                            superior: '一年级',
                        },
                        component: () => import("src/pages/home/components/math_page.vue")
                    },
                    // 一年级下期
                    {
                        path: '/first_grade_next_issue',
                        name: 'first_grade_next_issue',
                        meta: {
                            title: '一年级下期',
                            superior: '一年级',
                        },
                        component: () => import("src/pages/home/components/workplace.vue")
                    },
                ],
            },
            {
                path: 'second_grade',
                name: 'second_grade',
                meta: {
                    icon: "Document",
                    title: '二年级',
                    side: true,
                },
                component: () => import("src/pages/test/index.vue"),
                children: [
                    // 一年级上期
                    {
                        path: '/second_grade_last_issue',
                        name: 'second_grade_last_issue',
                        meta: {
                            title: '二年级上期',
                            superior: '二年级',
                        },
                        component: () => import("src/pages/home/components/math_page.vue")
                    },
                    // 一年级下期
                    {
                        path: '/second_grade_next_issue',
                        name: 'second_grade_next_issue',
                        meta: {
                            title: '二年级下期',
                            superior: '二年级',
                        },
                        component: () => import("src/pages/home/components/workplace.vue")
                    },
                ],
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