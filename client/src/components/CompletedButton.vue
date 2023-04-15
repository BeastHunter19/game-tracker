<script>
import { useGamesStore } from '@/stores/games'
import { mapStores } from 'pinia'

export default {
    computed: {
        ...mapStores(useGamesStore),
        inPlayed() {
            return this.gamesStore.played.findIndex((value) => value.id === this.gameID) > -1
        },
        completed() {
            let index = this.gamesStore.played.findIndex((value) => value.id === this.gameID)
            if (index > -1) {
                return this.gamesStore.played[index].completed
            }
            return false
        }
    },
    props: {
        gameID: {
            type: Number,
            required: true
        }
    },
    methods: {
        toggleCompleted() {
            this.gamesStore.toggleCompleted(this.gameID)
        }
    }
}
</script>

<template>
    <button
        v-if="inPlayed"
        @click="toggleCompleted"
        class="btn btn-dark rounded-circle"
        :class="{
            'active-list': completed
        }"
    >
        <i class="bi bi-check-lg"></i>
    </button>
</template>

<style scoped>
.active-list {
    background-color: darkgreen;
}

button {
    background-color: rgba(0, 0, 0, 0.5);
    aspect-ratio: 1/1;
}
</style>
