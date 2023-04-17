<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'

export default {
    props: {
        gameID: {
            type: Number,
            required: true
        }
    },
    emits: ['add-to-list', 'addToList', 'remove-from-list', 'removeFromList'],
    computed: {
        ...mapStores(useGamesStore),
        inPlayed() {
            return this.gamesStore.played.findIndex((value) => value.id === this.gameID) > -1
        },
        inBacklog() {
            return this.gamesStore.backlog.findIndex((value) => value.id === this.gameID) > -1
        },
        inWatchlist() {
            return this.gamesStore.watchlist.findIndex((value) => value.id === this.gameID) > -1
        },
        completed() {
            let index = this.gamesStore.played.findIndex((value) => value.id === this.gameID)
            if (index > -1) {
                return this.gamesStore.played[index].completed
            }
            return false
        }
    },
    methods: {
        toggleBacklog() {
            if (!this.inBacklog) {
                this.$emit('addToList', 'backlog')
            } else {
                this.$emit('removeFromList', 'backlog')
            }
            this.showMore = false
        },
        togglePlayed() {
            if (!this.inPlayed) {
                this.$emit('addToList', 'played')
            } else {
                this.$emit('removeFromList', 'played')
            }
            this.showMore = false
        },
        toggleWatchlist() {
            if (!this.inWatchlist) {
                this.$emit('addToList', 'watchlist')
            } else {
                this.$emit('removeFromList', 'watchlist')
            }
            this.showMore = false
        },
        toggleCompleted() {
            this.gamesStore.toggleCompleted(this.gameID)
        }
    }
}
</script>

<template>
    <div class="d-flex flex-row justify-content-center align-items-center gap-1">
        <button
            v-if="inPlayed"
            @click="toggleCompleted"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': completed }"
        >
            <i class="bi bi-check-lg"></i>
        </button>
        <button
            @click="togglePlayed"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inPlayed }"
            title="Add to Played"
        >
            <i class="bi bi-controller"></i>
        </button>
        <button
            @click="toggleWatchlist"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inWatchlist }"
            title="Add to Watchlist"
        >
            <i class="bi bi-binoculars"></i>
        </button>
        <button
            @click="toggleBacklog"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inBacklog }"
            title="Add to Backlog"
        >
            <i class="bi bi-clock-history"></i>
        </button>
    </div>
</template>

<style scoped>
.active-list {
    background-color: var(--gt-color-secondary);
}

button {
    background-color: rgba(0, 0, 0, 0.5);
    aspect-ratio: 1/1;
}
</style>
