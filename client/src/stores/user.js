import { defineStore } from 'pinia'
import { useGamesStore } from '@/stores/games'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        accessToken: ''
    }),
    getters: {
        loggedIn: (state) => Object.keys(state.user).length !== 0
    },
    actions: {
        setUser(userDetails) {
            this.user = userDetails.user
            this.accessToken = userDetails.accessToken
            const gamesStore = useGamesStore()
            gamesStore.fetchBacklog()
            gamesStore.fetchWatchlist()
            gamesStore.fetchPlayed()
        },
        setEmailVerified() {
            this.user.verified = true
        }
    }
})
