<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'
import clickedOutside from '@/directives/clickedOutside'

export default {
    directives: {
        clickedOutside
    },
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
        },
        closeButtons(event) {
            if (!this.$el.contains(event.target)) {
                this.showMore = false
            }
        }
    }
}
</script>

<template>
    <div class="d-flex flex-column align-items-start position-relative gap-1">
        <button
            @click="toggleButtons"
            class="btn btn-dark rounded-circle btn-more"
            :class="{
                rotated: showMore,
                'active-list': (inPlayed || inBacklog || inWatchlist) && !showMore
            }"
        >
            <i
                v-show="showMore || !(inPlayed || inBacklog || inWatchlist)"
                class="bi bi-plus-lg"
            ></i>
            <i v-show="inPlayed && !showMore" class="bi bi-controller"></i>
            <i v-show="inWatchlist && !showMore" class="bi bi-binoculars"></i>
            <i v-show="inBacklog && !showMore" class="bi bi-clock-history"></i>
        </button>

        <Transition name="fold">
            <div v-show="showMore" v-clicked-outside="closeButtons">
                <div class="d-flex flex-column gap-1">
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
    background-color: var(--gt-color-secondary);
}

button {
    background-color: rgba(0, 0, 0, 0.5);
    aspect-ratio: 1/1;
}
</style>
