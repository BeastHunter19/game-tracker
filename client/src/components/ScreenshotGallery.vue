<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Game'
        },
        images: {
            type: Array,
            required: true
        }
    }
}
</script>

<template>
    <div
        class="gallery-panel text-center rounded-5 mx-2 mx-md-4 ms-lg-0 me-lg-4 p-0 h-100 overflow-hidden"
    >
        <div id="gameImagesCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button
                    v-for="(image, index) in images"
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
                    v-for="(image, index) in images"
                    :key="index"
                    class="carousel-item custom-item"
                    :class="{ active: index === 0 }"
                    data-bs-interval="5000"
                >
                    <img
                        :src="image"
                        class="d-block w-100 custom-img"
                        :alt="`${title} image ${index + 1}`"
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
