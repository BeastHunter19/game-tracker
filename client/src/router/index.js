import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import UserSettingsView from '@/views/UserSettingsView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/popular',
            name: 'popular',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            component: HomeView
        },
        {
            path: '/profile',
            name: 'profile',
            component: HomeView
        },
        {
            path: '/settings',
            name: 'settings',
            component: UserSettingsView
        },
        {
            path: '/verify/email',
            name: 'verify',
            component: VerifyEmailView
        },
        {
            path: '/password/update',
            name: 'update',
            component: ResetPasswordView
        }
    ]
})

export default router
