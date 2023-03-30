import { defineStore } from 'pinia'

export const useGamesStore = defineStore('games', {
    state: () => ({
        backlog: [],
        watchlist: [],
        played: []
    }),
    actions: {
        addToBacklog(gameInfo) {
            let index = this.watchlist.indexOf(gameInfo)
            if (index > -1) {
                this.watchlist.splice(index, 1)
            }
            index = this.played.indexOf(gameInfo)
            if (index > -1) {
                this.played.splice(index, 1)
            }
            this.backlog.push(gameInfo)
        },
        addToWatchlist(gameInfo) {
            let index = this.played.indexOf(gameInfo)
            if (index > -1) {
                this.played.splice(index, 1)
            }
            index = this.backlog.indexOf(gameInfo)
            if (index > -1) {
                this.backlog.splice(index, 1)
            }
            this.watchlist.push(gameInfo)
        },
        addToPlayed(gameInfo) {
            let index = this.watchlist.indexOf(gameInfo)
            if (index > -1) {
                this.watchlist.splice(index, 1)
            }
            index = this.backlog.indexOf(gameInfo)
            if (index > -1) {
                this.backlog.splice(index, 1)
            }
            this.played.push(gameInfo)
        }
    }
})
