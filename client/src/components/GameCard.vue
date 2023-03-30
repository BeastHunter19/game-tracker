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
    <div @click="openDetails" class="card shadow">
        <img :src="gameInfo.image" class="card-img-top" alt="Cover image for the game" />
        <div class="card-body">
            <h5 class="card-title">{{ gameInfo.title + ' (' + gameInfo.release + ')' }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ gameInfo.developer }}</h6>

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
