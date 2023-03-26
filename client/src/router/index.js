import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import UserSettingsView from '@/views/UserSettingsView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import BacklogView from '@/views/BacklogView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: false,
                mainNavigation: true
            }
        },
        {
            path: '/popular',
            name: 'popular',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
            meta: {
                requiresAuth: false,
                mainNavigation: true
            }
        },
        {
            path: '/categories',
            name: 'categories',
            component: HomeView,
            meta: {
                requiresAuth: false,
                mainNavigation: true
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: HomeView,
            meta: {
                requiresAuth: true,
                mainNavigation: false
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: UserSettingsView,
            meta: {
                requiresAuth: true,
                mainNavigation: false
            }
        },
        {
            path: '/verify/email',
            name: 'verify',
            component: VerifyEmailView,
            meta: {
                requiresAuth: false,
                mainNavigation: false
            }
        },
        {
            path: '/password/update',
            name: 'update',
            component: ResetPasswordView,
            meta: {
                requiresAuth: false,
                mainNavigation: false
            }
        },
        {
            path: '/profile/backlog',
            name: 'backlog',
            component: BacklogView,
            meta: {
                requiresAuth: true,
                mainNavigation: false
            }
        }
    ]
})

router.beforeEach((to) => {
    const userStore = useUserStore()
    if (to.meta.requiresAuth && !userStore.loggedIn) {
        return {
            path: '/'
        }
    }
})

export default router
