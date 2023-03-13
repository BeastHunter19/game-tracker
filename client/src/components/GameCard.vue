<script>
export default {
    props: {
        gameInfo: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div class="card m-4 text-bg-light" style="width: 18rem">
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
            <div class="d-flex flex-wrap">
                <span
                    v-for="(platform, index) in gameInfo.platforms"
                    :key="index"
                    class="badge rounded-pill text-bg-primary m-1"
                    >{{ platform }}</span
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: none;
}
</style>
