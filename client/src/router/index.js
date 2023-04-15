import { createRouter, createWebHistory } from 'vue-router'
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
                mainNavigation: true
            }
        },
        {
            path: '/popular',
            name: 'popular',
            component: PopularView,
            meta: {
                mainNavigation: true
            }
        },
        {
            path: '/categories',
            name: 'categories',
            component: CategoriesView,
            meta: {
                mainNavigation: true
            }
        },
        {
            path: '/categories/:id',
            name: 'category',
            component: CategoryView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/search',
            name: 'search',
            component: SearchResultsView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/profile/:userID?',
            name: 'profile',
            component: ProfileView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/profile/:userID?/backlog',
            name: 'backlog',
            component: BacklogView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/profile/:userID?/watchlist',
            name: 'watchlist',
            component: WatchlistView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/profile/:userID?/played',
            name: 'played',
            component: PlayedView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/verify/email',
            name: 'verify',
            component: VerifyEmailView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/password/update',
            name: 'update',
            component: ResetPasswordView,
            meta: {
                mainNavigation: false
            }
        },
        {
            path: '/games/:gameID',
            name: 'game',
            component: GameDetailsView,
            meta: {
                mainNavigation: false
            }
        }
    ]
})

export default router
