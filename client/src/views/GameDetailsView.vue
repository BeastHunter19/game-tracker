<script>
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { ContentPanel },
    data() {
        return {
            gameInfo: {
                id: 1234,
                title: 'Bloodborne',
                release: 'March 24, 2015',
                developer: 'From Software',
                description: `Bloodborne è un videogioco souls-like dark fantasy sviluppato dalla software house giapponese FromSoftware, con la collaborazione di SCE Japan Studio e pubblicato da Sony Computer Entertainment in esclusiva per PlayStation 4. Diretto da Hidetaka Miyazaki, già ideatore di Demon's Souls e di Dark Souls.`,
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                cover: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                images: [
                    'https://www.lorebloodborne.it/wp-content/uploads/2021/09/Lady-Maria.jpg',
                    'https://assets.reedpopcdn.com/news-videogiochi-bloodborne-pc-tutti-rumor-sono-100-percent-fake-modder-lance-mcdonald-1618329215390.jpg/BROK/thumbnail/1200x630/news-videogiochi-bloodborne-pc-tutti-rumor-sono-100-percent-fake-modder-lance-mcdonald-1618329215390.jpg',
                    'https://images.everyeye.it/img-articoli/bloodborne-25340.jpg'
                ],
                rating: 99,
                added: true
            }
        }
    }
}
</script>

<template>
    <main class="w-100 mw-100">
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
            <div
                class="row g-0 justify-content-around row-cols-1 row-cols-lg-2 mw-100 ms-lg-4 mb-4"
            >
                <div class="col mw-100">
                    <ContentPanel class="mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-4 h-100 gap-4">
                        <h1 class="text-start">{{ gameInfo.title }}</h1>
                        <h2 class="text-start">{{ gameInfo.release }}</h2>
                        <h3 class="text-start">{{ gameInfo.developer }}</h3>
                        <p class="text-start fs-5">{{ gameInfo.description }}</p>
                    </ContentPanel>
                </div>
                <div class="col mw-100">
                    <ContentPanel class="mb-4 mx-2 mx-md-4 ms-lg-0 me-lg-4 py-lg-4 px-lg-2 h-100">
                        <div class="row mb-4">
                            <div class="col-6 fs-5">
                                Critics aggregate rating: {{ gameInfo.rating }}
                            </div>
                        </div>
                        <div class="row mb-4">
                            <span class="col-3 fs-5">Categories:</span>
                            <div class="col-9 d-flex flex-wrap align-items-center gap-2">
                                <span
                                    v-for="(genre, index) in gameInfo.genres"
                                    :key="index"
                                    class="badge rounded-pill text-bg-secondary"
                                    >{{ genre }}</span
                                >
                            </div>
                        </div>
                        <div class="row mb-4">
                            <span class="col-3 fs-5">Platforms:</span>
                            <div class="col-9 d-flex flex-wrap align-items-center gap-2">
                                <span
                                    v-for="(platform, index) in gameInfo.platforms"
                                    :key="index"
                                    class="badge rounded-pill text-bg-primary"
                                    >{{ platform }}</span
                                >
                            </div>
                        </div>
                    </ContentPanel>
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
    height: 50vh;
}

.custom-img {
    height: 100%;
    object-fit: contain;
}
</style>
