import { defineStore } from 'pinia'
import { useGamesStore } from '@/stores/games'
import { useGlobals } from '@/main'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        accessToken: ''
    }),
    getters: {
        loggedIn: (state) => Object.keys(state.user).length !== 0,
        isOwner() {
            const { $route } = useGlobals()
            if (this.loggedIn && $route.name === 'home') {
                return true
            }
            if (this.loggedIn && $route.params?.userID == this.user.id) {
                return true
            }
            return false
        }
    },
    actions: {
        async setUser(userDetails) {
            this.user = userDetails.user
            this.accessToken = userDetails.accessToken
            const gamesStore = useGamesStore()
            // this one will happen in the background
            gamesStore.fetchAll()
        }
    }
})
