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
        async setUser(userDetails) {
            this.user = userDetails.user
            this.accessToken = userDetails.accessToken
            const gamesStore = useGamesStore()
            // these will have to finish before terminating login, so the home page can be populated
            await gamesStore.fetchBacklog(10, 0)
            await gamesStore.fetchWatchlist(10, 0)
            await gamesStore.fetchPlayed(10, 0)
            // this one will happen in the background
            gamesStore.fetchAll()
        },
        setEmailVerified() {
            this.user.verified = true
        }
    }
})
