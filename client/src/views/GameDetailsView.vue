<script>
import ContentPanel from '@/components/ContentPanel.vue'
import GamesPanel from '@/components/GamesPanel.vue'
import AddButtonsExpanded from '@/components/AddButtonsExpanded.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ScreenshotGallery from '@/components/ScreenshotGallery.vue'
import GameDetailsPills from '../components/GameDetailsPills.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import { mapActions, mapState, mapStores } from 'pinia'

export default {
    name: 'GameDetailsView',
    components: {
        ContentPanel,
        GamesPanel,
        AddButtonsExpanded,
        LoadingSpinner,
        ScreenshotGallery,
        GameDetailsPills
    },
    data() {
        return {
            gameInfo: {},
            loading: true
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
        },
        gameCover() {
            return this.gameInfo.cover ?? 'https://placehold.co/264x352?text=Cover'
        }
    },
    watch: {
        '$route.params': {
            handler(newValue, oldValue) {
                if (newValue !== oldValue && this.$route.name === 'game') {
                    this.loading = true
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
            } finally {
                this.loading = false
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
    <main class="w-100 mw-100 h-100" :key="gameInfo.id">
        <LoadingSpinner v-if="loading"></LoadingSpinner>
        <div v-else class="container-fluid p-0 m-0 mt-4">
            <div class="row g-0 justify-content-around mw-100 ms-lg-4">
                <div class="col-12 col-lg-8 col-xl-9 mw-100 mb-4 order-last order-lg-first">
                    <ContentPanel class="mx-2 mx-lg-4 ms-lg-0 me-lg-4 py-lg-4 px-4">
                        <h1 v-if="gameInfo.title" class="text-start">{{ gameInfo.title }}</h1>
                        <h2 v-if="gameInfo.release" class="text-start">
                            Released: {{ gameInfo.release }}
                        </h2>
                        <h3 class="text-start">
                            {{ `Developer: ${developer}, Publisher: ${publisher}` }}
                        </h3>
                        <p class="text-start fs-5">{{ gameInfo.description }}</p>
                    </ContentPanel>

                    <!-- Only shown in mobile view -->
                    <ContentPanel class="mb-4 mx-2 mx-lg-4 py-lg-4 px-lg-2 px-4 d-block d-lg-none">
                        <GameDetailsPills :gameInfo="gameInfo"></GameDetailsPills>
                    </ContentPanel>

                    <div class="mw-100 mx-lg-4 mb-4">
                        <ScreenshotGallery
                            :title="gameInfo.title"
                            :images="gameInfo.images"
                        ></ScreenshotGallery>
                    </div>

                    <div
                        v-if="gameInfo.similarGames?.length > 0"
                        class="mw-100 mb-4 similar-games-panel"
                    >
                        <GamesPanel
                            title="Similar Games"
                            icon="lightbulb"
                            :gameList="gameInfo.similarGames ?? []"
                        ></GamesPanel>
                    </div>
                </div>
                <div class="col-12 col-lg-4 col-xl-3 mw-100 mb-4 order-first order-lg-last">
                    <div class="position-sticky w-100" style="top: 1rem">
                        <ContentPanel
                            class="mx-2 mx-lg-4 px-lg-2 d-flex justify-content-center justify-content-lg-start"
                        >
                            <span class="d-inline-flex flex-column align-items-center gap-4">
                                <img :src="gameCover" class="game-cover rounded-3 d-block mt-2" />
                                <AddButtonsExpanded
                                    v-if="loggedIn && gameInfo.id"
                                    :gameID="gameInfo.id"
                                    @addToList="addToList"
                                    @removeFromList="removeFromList"
                                ></AddButtonsExpanded>
                            </span>
                        </ContentPanel>

                        <!-- Only shown in desktop view -->
                        <ContentPanel class="mb-4 mx-2 mx-lg-4 py-lg-4 px-lg-2 d-none d-lg-block">
                            <GameDetailsPills :gameInfo="gameInfo"></GameDetailsPills>
                        </ContentPanel>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.game-cover {
    height: 20rem;
}
</style>
