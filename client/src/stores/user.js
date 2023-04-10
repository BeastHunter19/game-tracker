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
            // this one will happen in the background
            gamesStore.fetchAll()
        }
    }
})
