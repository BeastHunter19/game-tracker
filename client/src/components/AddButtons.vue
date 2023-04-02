<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'

export default {
    data() {
        return {
            showMore: false
        }
    },
    props: {
        gameID: {
            type: Number,
            required: true
        }
    },
    emits: ['addToList', 'removeFromList'],
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
        toggleButtons() {
            this.showMore = !this.showMore
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column align-items-start position-relative gap-1">
        <button
            v-if="inPlayed"
            @click.stop="togglePlayed"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inPlayed }"
        >
            <i class="bi bi-controller"></i>
        </button>
        <button
            v-else-if="inWatchlist"
            @click.stop="toggleWatchlist"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inWatchlist }"
        >
            <i class="bi bi-binoculars"></i>
        </button>
        <button
            v-else-if="inBacklog"
            @click.stop="toggleBacklog"
            class="btn btn-dark rounded-circle"
            :class="{ 'active-list': inBacklog }"
        >
            <i class="bi bi-clock-history"></i>
        </button>

        <button
            v-else
            @click.stop="toggleButtons"
            class="btn btn-dark rounded-circle btn-more"
            :class="{ rotated: showMore }"
        >
            <i class="bi bi-plus-lg"></i>
        </button>

        <Transition name="fold">
            <div v-show="showMore">
                <div class="d-flex flex-column gap-1">
                    <button
                        @click.stop="togglePlayed"
                        class="btn btn-dark rounded-circle"
                        :class="{ 'active-list': inPlayed }"
                    >
                        <i class="bi bi-controller"></i>
                    </button>
                    <button
                        @click.stop="toggleWatchlist"
                        class="btn btn-dark rounded-circle"
                        :class="{ 'active-list': inWatchlist }"
                    >
                        <i class="bi bi-binoculars"></i>
                    </button>
                    <button
                        @click.stop="toggleBacklog"
                        class="btn btn-dark rounded-circle"
                        :class="{ 'active-list': inBacklog }"
                    >
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.btn-more {
    transition: transform linear 0.2s;
}

.rotated {
    transform: rotate(45deg);
}

.fold-enter-active,
.fold-leave-active {
    transition: transform 0.2s ease;
}

.fold-enter-from,
.fold-leave-to {
    transform-origin: top;
    transform: scaleY(0);
}

.fold-enter-to,
.fold-leave-from {
    transform-origin: top;
    transform: scaleY(1);
}

.active-list {
    background-color: darkgreen;
}

button {
    background-color: rgba(0, 0, 0, 0.5);
    aspect-ratio: 1/1;
}
</style>
