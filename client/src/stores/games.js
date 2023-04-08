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
        async fetchPlayed(limit, offset) {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const query = new URLSearchParams()
                query.set('limit', limit)
                query.set('offset', offset)
                const played = await $axios.get(
                    `/api/user/${user.user.id}/played?${query.toString()}`,
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.played = this.played.concat(played.data)
                return played.data.length
            } catch (err) {
                console.log(err)
            }
        },
        async fetchBacklog(limit, offset) {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const query = new URLSearchParams()
                query.set('limit', limit)
                query.set('offset', offset)
                const backlog = await $axios.get(
                    `/api/user/${user.user.id}/backlog?${query.toString()}`,
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.backlog = this.backlog.concat(backlog.data)
                return backlog.data.length
            } catch (err) {
                console.log(err)
            }
        },
        async fetchWatchlist(limit, offset) {
            try {
                const { $axios } = useGlobals()
                const user = useUserStore()
                const query = new URLSearchParams()
                query.set('limit', limit)
                query.set('offset', offset)
                const watchlist = await $axios.get(
                    `/api/user/${user.user.id}/watchlist?${query.toString()}`,
                    {
                        headers: { Authorization: `Bearer ${user.accessToken}` }
                    }
                )
                this.watchlist = this.watchlist.concat(watchlist.data)
                return watchlist.data.length
            } catch (err) {
                console.log(err)
            }
        },
        async fetchAll() {
            this.fetchAllBacklog()
            this.fetchAllWatchlist()
            this.fetchAllPlayed()
        },
        async fetchAllBacklog() {
            let fetchCount,
                totalFetched = 0
            this.backlog = []
            do {
                fetchCount = await this.fetchBacklog(500, totalFetched)
                totalFetched += fetchCount
            } while (fetchCount === 500)
        },
        async fetchAllWatchlist() {
            let fetchCount,
                totalFetched = 0
            this.watchlist = []
            do {
                fetchCount = await this.fetchWatchlist(500, totalFetched)
                totalFetched += fetchCount
            } while (fetchCount === 500)
        },
        async fetchAllPlayed() {
            let fetchCount,
                totalFetched = 0
            this.played = []
            do {
                fetchCount = await this.fetchPlayed(500, totalFetched)
                totalFetched += fetchCount
            } while (fetchCount === 500)
        }
    }
})
