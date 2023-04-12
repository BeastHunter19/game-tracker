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
                this.fetchAllBacklog()
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
                this.fetchAllWatchlist()
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
                this.fetchAllPlayed()
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
                this.fetchAllBacklog()
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
                this.fetchAllWatchlist()
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
                this.fetchAllPlayed()
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
                return played.data
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
                return backlog.data
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
                return watchlist.data
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
            let fetchedData,
                totalFetched = 0
            let backlog = []
            do {
                fetchedData = await this.fetchBacklog(500, totalFetched)
                backlog = backlog.concat(fetchedData)
                totalFetched += fetchedData.length
            } while (fetchedData.length === 500)
            this.backlog = backlog
        },
        async fetchAllWatchlist() {
            let fetchedData,
                totalFetched = 0
            let watchlist = []
            do {
                fetchedData = await this.fetchWatchlist(500, totalFetched)
                watchlist = watchlist.concat(fetchedData)
                totalFetched += fetchedData
            } while (fetchedData === 500)
            this.watchlist = watchlist
        },
        async fetchAllPlayed() {
            let fetchedData,
                totalFetched = 0
            let played = []
            do {
                fetchedData = await this.fetchPlayed(500, totalFetched)
                played = played.concat(fetchedData)
                totalFetched += fetchedData
            } while (fetchedData === 500)
            this.played = played
        }
    }
})
