import { defineStore } from 'pinia'
import { useGlobals } from '@/main'
import { useUserStore } from '@/stores/user'

export const useGamesStore = defineStore('games', {
    state: () => ({
        backlog: [],
        watchlist: [],
        played: []
    }),
    actions: {
        async addToBacklog(gameInfo) {
            // this will update the ui instantly, but will be replaced after the requests
            this.backlog.push(gameInfo)
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.put(
                    `/api/user/${user.user.id}/backlog/${gameInfo.id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.fetchBacklog()
            } catch (err) {
                console.log(err)
            }
        },
        async addToWatchlist(gameInfo) {
            this.watchlist.push(gameInfo)
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.put(
                    `/api/user/${user.user.id}/watchlist/${gameInfo.id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.fetchWatchlist()
            } catch (err) {
                console.log(err)
            }
        },
        async addToPlayed(gameInfo) {
            this.played.push(gameInfo)
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.put(
                    `/api/user/${user.user.id}/played/${gameInfo.id}`,
                    {},
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.fetchPlayed()
            } catch (err) {
                console.log(err)
            }
        },
        async removeFromBacklog(gameInfo) {
            let index = this.backlog.findIndex((value) => value.id === gameInfo.id)
            if (index > -1) {
                this.backlog.splice(index, 1)
            }
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.delete(`/api/user/${user.user.id}/backlog/${gameInfo.id}`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.fetchBacklog()
            } catch (err) {
                console.log(err)
            }
        },
        async removeFromWatchlist(gameInfo) {
            let index = this.watchlist.findIndex((value) => value.id === gameInfo.id)
            if (index > -1) {
                this.watchlist.splice(index, 1)
            }
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.delete(`/api/user/${user.user.id}/watchlist/${gameInfo.id}`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.fetchWatchlist()
            } catch (err) {
                console.log(err)
            }
        },
        async removeFromPlayed(gameInfo) {
            let index = this.played.findIndex((value) => value.id === gameInfo.id)
            if (index > -1) {
                this.played.splice(index, 1)
            }
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                await $axios.delete(`/api/user/${user.user.id}/played/${gameInfo.id}`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.fetchPlayed()
            } catch (err) {
                console.log(err)
            }
        },
        async fetchPlayed() {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const played = await $axios.get(`/api/user/${user.user.id}/played`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.played = played.data
            } catch (err) {
                console.log(err)
            }
        },
        async fetchBacklog() {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const backlog = await $axios.get(`/api/user/${user.user.id}/backlog`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.backlog = backlog.data
            } catch (err) {
                console.log(err)
            }
        },
        async fetchWatchlist() {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const watchlist = await $axios.get(`/api/user/${user.user.id}/watchlist`, {
                    headers: { Authorization: `Bearer ${user.accessToken}` }
                })
                this.watchlist = watchlist.data
            } catch (err) {
                console.log(err)
            }
        }
    }
})
