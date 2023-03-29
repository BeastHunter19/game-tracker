import { defineStore } from 'pinia'

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
        },
        setEmailVerified() {
            this.user.verified = true
        }
    }
})
