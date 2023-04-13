<script>
import { mapState, mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import AddButtons from './AddButtons.vue'

export default {
    components: { AddButtons },
    props: {
        gameInfo: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(useUserStore, ['loggedIn', 'isOwner']),
        ...mapStores(useGamesStore),
        showButtons() {
            return this.loggedIn
        },
        gameCover() {
            return this.gameInfo.image ?? 'https://placehold.co/264x352?text=Cover'
        },
        release() {
            return this.gameInfo.release ?? 'N/A'
        },
        developer() {
            return this.gameInfo.developer ?? 'N/A'
        }
    },
    methods: {
        openDetails(event) {
            if (!event.target.classList.contains('btn') && !event.target.classList.contains('bi')) {
                this.$router.push({
                    name: 'game',
                    params: {
                        gameID: this.gameInfo.id
                    }
                })
            }
        },
        addToList(listName) {
            if (listName === 'backlog') {
                this.gamesStore.addToBacklog(this.gameInfo)
            } else if (listName === 'watchlist') {
                this.gamesStore.addToWatchlist(this.gameInfo)
            } else if (listName === 'played') {
                this.gamesStore.addToPlayed(this.gameInfo)
            }
        },
        removeFromList(listName) {
            if (listName === 'backlog') {
                this.gamesStore.removeFromBacklog(this.gameInfo)
            } else if (listName === 'watchlist') {
                this.gamesStore.removeFromWatchlist(this.gameInfo)
            } else if (listName === 'played') {
                this.gamesStore.removeFromPlayed(this.gameInfo)
            }
        }
    }
}
</script>

<template>
    <div @click="openDetails" class="card text-bg-dark">
        <img :src="gameCover" class="card-img" alt="Cover image for the game" />
        <div class="card-img-overlay d-flex flex-column justify-content-end">
            <div class="game-info">
                <h5 class="card-title">{{ gameInfo.title + ' (' + release + ')' }}</h5>
                <h6 class="card-subtitle mb-2">{{ developer }}</h6>
            </div>
        </div>
        <!-- Logged in only buttons -->
        <AddButtons
            v-if="isOwner"
            :gameID="gameInfo.id"
            class="position-absolute top-0 end-0 m-2"
            @addToList="addToList"
            @removeFromList="removeFromList"
        ></AddButtons>
    </div>
</template>

<style scoped>
.card {
    min-width: 12rem;
    min-height: 16rem;
    width: 12rem;
    height: 16rem;
    border: none;
    cursor: pointer;
    box-shadow: 0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15), -0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card:hover .card-img-overlay {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%);
}

.card-img {
    object-fit: cover;
    height: 100%;
}

.card-img-overlay {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
}

.game-info > h5,
h6 {
    line-height: 1.4rem;
    max-height: 2.8rem;
    overflow: hidden;
}
</style>
