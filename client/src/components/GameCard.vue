<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
export default {
    props: {
        gameInfo: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapState(useUserStore, ['loggedIn'])
    }
}
</script>

<template>
    <div class="card m-4 text shadow" style="min-width: 18rem">
        <img :src="gameInfo.image" class="card-img-top" alt="Cover image for the game" />
        <div class="card-body">
            <h5 class="card-title">{{ gameInfo.title + ' (' + gameInfo.release + ')' }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ gameInfo.developer }}</h6>

            <div class="d-flex flex-wrap mb-1">
                <span
                    v-for="(genre, index) in gameInfo.genres"
                    :key="index"
                    class="badge rounded-pill text-bg-secondary m-1"
                    >{{ genre }}</span
                >
            </div>
            <div class="d-flex flex-wrap mb-2">
                <span
                    v-for="(platform, index) in gameInfo.platforms"
                    :key="index"
                    class="badge rounded-pill text-bg-primary m-1"
                    >{{ platform }}</span
                >
            </div>

            <!-- Logged in only buttons -->
            <div v-if="loggedIn" class="d-flex justify-content-around">
                <button class="btn btn-primary rounded-5">Played</button>
                <button class="btn btn-primary rounded-5">Watch</button>
                <button class="btn btn-primary rounded-5">Backlog</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: none;
    cursor: pointer;
    --bs-card-bg: var(--gt-color-card);
}

.card:hover {
    background-color: var(--gt-color-card-hover);
}

.card:active {
    background-color: var(--gt-color-card-active);
}
</style>
