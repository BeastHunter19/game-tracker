<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'

export default {
    props: {
        gameInfo: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapStores(useGamesStore),
        inPlayed() {
            return this.gamesStore.played.indexOf(this.gameInfo) > -1
        },
        inBacklog() {
            return this.gamesStore.backlog.indexOf(this.gameInfo) > -1
        },
        inWatchlist() {
            return this.gamesStore.watchlist.indexOf(this.gameInfo) > -1
        }
    },
    methods: {
        addToBacklog() {
            if (!this.inBacklog) {
                this.gamesStore.addToBacklog(this.gameInfo)
            }
        },
        addToPlayed() {
            if (!this.inPlayed) {
                this.gamesStore.addToPlayed(this.gameInfo)
            }
        },
        addToWatchlist() {
            if (!this.inWatchlist) {
                this.gamesStore.addToWatchlist(this.gameInfo)
            }
        }
    }
}
</script>

<template>
    <div class="d-flex justify-content-around">
        <button
            @click.stop="addToPlayed"
            class="btn btn-primary rounded-circle"
            :class="{ 'active-list': inPlayed }"
        >
            <i class="bi bi-controller"></i>
        </button>
        <button
            @click.stop="addToWatchlist"
            class="btn btn-primary rounded-circle"
            :class="{ 'active-list': inWatchlist }"
        >
            <i class="bi bi-binoculars"></i>
        </button>
        <button
            @click.stop="addToBacklog"
            class="btn btn-primary rounded-circle"
            :class="{ 'active-list': inBacklog }"
        >
            <i class="bi bi-clock-history"></i>
        </button>
    </div>
</template>

<style scoped>
.active-list {
    background-color: darkgreen;
}
</style>
