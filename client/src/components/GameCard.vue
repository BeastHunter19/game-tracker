<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
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
        ...mapState(useUserStore, ['loggedIn']),
        showButtons() {
            return this.loggedIn
        },
        gameCover() {
            return this.gameInfo.image ?? 'https://placehold.co/264x374?text=Cover'
        },
        release() {
            return this.gameInfo.release ?? 'N/A'
        },
        developer() {
            return this.gameInfo.developer ?? 'N/A'
        }
    },
    methods: {
        openDetails() {
            this.$router.push({
                name: 'game',
                params: {
                    gameID: this.gameInfo.id
                }
            })
        }
    }
}
</script>

<template>
    <div @click="openDetails" class="card shadow" style="min-width: 12rem">
        <img :src="gameCover" class="card-img-top" alt="Cover image for the game" />
        <div class="card-body">
            <h5 class="card-title">{{ gameInfo.title + ' (' + release + ')' }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ developer }}</h6>

            <!-- Logged in only buttons -->
            <AddButtons v-if="showButtons" :gameInfo="gameInfo"></AddButtons>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: none;
    cursor: pointer;
    --bs-card-bg: var(--gt-color-card);
    box-shadow: 0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15), -0.75rem 0.75rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card:hover {
    background-color: var(--gt-color-card-hover);
}

.card:active {
    background-color: var(--gt-color-card-active);
}
</style>
