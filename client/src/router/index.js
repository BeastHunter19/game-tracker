import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import HomeView from '@/views/HomeView.vue'
import PopularView from '@/views/PopularView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import CategoryView from '@/views/CategoryView.vue'
import SearchResultsView from '@/views/SearchResultsView.vue'
import ProfileView from '@/views/ProfileView.vue'
import BacklogView from '@/views/BacklogView.vue'
import WatchlistView from '@/views/WatchlistView.vue'
import PlayedView from '@/views/PlayedView.vue'
import VerifyEmailView from '@/views/VerifyEmailView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import GameDetailsView from '@/views/GameDetailsView.vue'

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
            component: PopularView,
            meta: {
                requiresAuth: false,
                mainNavigation: true
            }
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesView,
            meta: {
                requiresAuth: false,
                mainNavigation: true
            }
        },
        {
            path: '/categories/:categoryName',
            name: 'category',
            component: CategoryView,
            meta: {
                requiresAuth: false,
                mainNavigation: false
            }
        },
        {
            path: '/search',
            name: 'search',
            component: SearchResultsView,
            meta: {
                requiresAuth: false,
                mainNavigation: false
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: {
                requiresAuth: true,
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
        },
        {
            path: '/profile/watchlist',
            name: 'watchlist',
            component: WatchlistView,
            meta: {
                requiresAuth: true,
                mainNavigation: false
            }
        },
        {
            path: '/profile/played',
            name: 'played',
            component: PlayedView,
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
            path: '/games/:gameID',
            name: 'game',
            component: GameDetailsView,
            meta: {
                requiresAuth: false,
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
