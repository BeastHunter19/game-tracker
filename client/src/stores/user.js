import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: undefined,
            name: undefined,
            email: undefined
        }
    }),
    getters: {
        loggedIn: (state) =>
            state.user.id !== undefined &&
            state.user.email !== undefined &&
            state.user.name !== undefined
    },
    actions: {
        setUser(userDetails) {
            this.user.email = userDetails.email
            this.user.name = userDetails.name
            this.user.id = userDetails.id
        }
    }
})
