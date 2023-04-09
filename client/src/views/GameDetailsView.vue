<script>
import ContentPanel from '@/components/ContentPanel.vue'
import GamesPanel from '@/components/GamesPanel.vue'
import AddButtons from '@/components/AddButtons.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import { mapActions, mapState, mapStores } from 'pinia'

export default {
    components: { ContentPanel, GamesPanel, AddButtons },
    data() {
        return {
            gameInfo: {}
        }
    },
    computed: {
        ...mapState(useUserStore, ['loggedIn']),
        ...mapStores(useGamesStore),
        publisher() {
            return this.gameInfo.publisher ?? 'N/A'
        },
        developer() {
            return this.gameInfo.developer ?? 'N/A'
        }
    },
    watch: {
        '$route.params': {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.getDetails()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['createNotification']),
        async getDetails() {
            try {
                const response = await this.$axios.get(`/api/games/${this.$route.params.gameID}`)
                this.gameInfo = response.data
            } catch (err) {
                console.log(err)
                this.createNotification({
                    type: 'danger',
                    message: 'An error occurred while fetching game details.'
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
    <main class="w-100 mw-100" :key="gameInfo.id">
        <div class="container-fluid p-0 m-0 mt-4">
            <div class="row g-0 justify-content-around row-cols-1 mw-100 ms-lg-4">
                <div class="col mw-100 mb-4">
                    <div
                        class="gallery-panel text-center rounded-5 mx-2 mx-md-4 ms-lg-0 me-lg-4 p-0 h-100 overflow-hidden"
                    >
                        <div id="gameImagesCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button
                                    v-for="(image, index) in gameInfo.images"
                                    :key="index"
                                    type="button"
                                    data-bs-target="#gameImagesCarousel"
                                    :data-bs-slide-to="index"
                                    :class="{ active: index === 0 }"
                                    :aria-current="index === 0"
                                    :aria-label="`Image ${index + 1}`"
                                ></button>
                            </div>
                            <div class="carousel-inner">
                                <div
                                    v-for="(image, index) in gameInfo.images"
                                    :key="index"
                                    class="carousel-item custom-item"
                                    :class="{ active: index === 0 }"
                                    data-bs-interval="5000"
                                >
                                    <img
                                        :src="image"
                                        class="d-block w-100 custom-img"
                                        :alt="`${gameInfo.title} image ${index + 1}`"
                                    />
                                </div>
                            </div>
                            <button
                                class="carousel-control-prev"
                                type="button"
                                data-bs-target="#gameImagesCarousel"
                                data-bs-slide="prev"
                            >
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button
                                class="carousel-control-next"
                                type="button"
                                data-bs-target="#gameImagesCarousel"
                                data-bs-slide="next"
                            >
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-0 justify-content-around row-cols-1 row-cols-lg-2 mw-100 ms-lg-4">
                <div class="col mw-100 mb-4">
                    <ContentPanel
                        class="mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-4 h-100 position-relative"
                    >
                        <AddButtons
                            v-if="loggedIn && gameInfo.id"
                            :gameID="gameInfo.id"
                            class="position-absolute top-0 end-0 m-4"
                            @addToList="addToList"
                            @removeFromList="removeFromList"
                        ></AddButtons>
                        <h1 v-if="gameInfo.title" class="text-start">{{ gameInfo.title }}</h1>
                        <h2 v-if="gameInfo.release" class="text-start">
                            Released: {{ gameInfo.release }}
                        </h2>
                        <h3 class="text-start">
                            {{ `Developer: ${developer}, Publisher: ${publisher}` }}
                        </h3>
                        <p class="text-start fs-5">{{ gameInfo.description }}</p>
                    </ContentPanel>
                </div>
                <div class="col mw-100 mb-4">
                    <ContentPanel class="mb-4 mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-lg-2 h-100">
                        <div v-if="gameInfo.rating" class="row mb-4">
                            <div class="col fs-5">
                                Critics and users aggregate rating:
                                {{ gameInfo.rating?.toFixed(2) }}
                            </div>
                            <div v-if="gameInfo.ratingCount" class="col fs-5">
                                Total ratings:
                                {{ gameInfo.ratingCount }}
                            </div>
                        </div>
                        <div v-if="gameInfo.genres?.length > 0" class="row mb-4">
                            <span class="col col-sm-3 fs-5">Categories:</span>
                            <div class="col col-sm-9 d-flex flex-wrap align-items-center gap-2">
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
                        <div v-if="gameInfo.platforms?.length > 0" class="row mb-4">
                            <span class="col col-sm-3 fs-5">Platforms:</span>
                            <div class="col col-sm-9 d-flex flex-wrap align-items-center gap-2">
                                <span
                                    v-for="(platform, index) in gameInfo.platforms"
                                    :key="index"
                                    class="badge rounded-pill text-bg-secondary"
                                >
                                    {{ platform }}
                                </span>
                            </div>
                        </div>
                        <div v-if="gameInfo.websites?.length > 0" class="row mb-4">
                            <span class="col col-sm-3 fs-5">Websites:</span>
                            <div class="col col-sm-9 d-flex flex-wrap align-items-center gap-2">
                                <a
                                    v-for="(website, index) in gameInfo.websites"
                                    :key="index"
                                    :href="website.url"
                                    class="badge rounded-pill text-bg-primary text-decoration-none"
                                    >{{ website.type }}</a
                                >
                            </div>
                        </div>
                    </ContentPanel>
                </div>
            </div>

            <div
                v-if="gameInfo.similarGames?.length > 0"
                class="row g-0 justify-content-around row-cols-1 mw-100"
            >
                <div class="col mw-100 mb-4">
                    <GamesPanel
                        title="Similar Games"
                        icon="lightbulb"
                        :gameList="gameInfo.similarGames ?? []"
                    ></GamesPanel>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.gallery-panel {
    background-color: rgba(0, 0, 0, 0.3);
}

.custom-item {
    height: 70vh;
}

.custom-img {
    height: 100%;
    object-fit: contain;
}
</style>
