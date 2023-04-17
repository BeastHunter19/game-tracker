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
    <div v-if="gameInfo.genres?.length > 0" class="mb-2">
        <div class="fs-5 text-start mb-1">Categories:</div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <RouterLink
                v-for="(genre, index) in gameInfo.genres"
                :key="index"
                :to="{
                    name: 'category',
                    params: { id: genre.id },
                    query: { name: genre.name }
                }"
                class="badge rounded-pill text-bg-primary text-decoration-none"
                >{{ genre.name }}</RouterLink
            >
        </div>
    </div>
    <div v-if="gameInfo.platforms?.length > 0" class="mb-2">
        <div class="fs-5 text-start mb-1">Platforms:</div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <span
                v-for="(platform, index) in gameInfo.platforms"
                :key="index"
                class="badge rounded-pill text-bg-secondary"
            >
                {{ platform }}
            </span>
        </div>
    </div>
    <div v-if="gameInfo.websites?.length > 0" class="mb-2">
        <div class="fs-5 text-start mb-1">Websites:</div>
        <div class="d-flex flex-wrap align-items-center gap-2">
            <a
                v-for="(website, index) in gameInfo.websites"
                :key="index"
                :href="website.url"
                class="badge rounded-pill text-bg-primary text-decoration-none"
                >{{ website.type }}</a
            >
        </div>
    </div>
    <div v-if="gameInfo.rating" class="fs-5 text-start mb-2">
        Critics and users aggregate rating:
        {{ gameInfo.rating?.toFixed(2) }}
    </div>
    <div v-if="gameInfo.ratingCount" class="fs-5 text-start mb-2">
        Total ratings:
        {{ gameInfo.ratingCount }}
    </div>
</template>

<style scoped>
.text-bg-primary {
    background-color: var(--gt-color-main-lighter) !important;
}

.text-bg-secondary {
    background-color: var(--gt-color-secondary-disabled) !important;
}
</style>
