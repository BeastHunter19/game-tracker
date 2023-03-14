import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        email: 'ciccio-peppe@live.com',
        role: 'user'
    }),
    getters: {
        loggedIn: (state) => state.email != '' && state.role != '',
        isAdmin: (state) => state.role === 'admin'
    }
})
