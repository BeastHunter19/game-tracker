<script>
import { Carousel } from 'bootstrap'

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
    },
    data() {
        return {
            carousel: null
        }
    },
    mounted() {
        // this is done manually because otherwise touch swipe would
        // not work until the first manual scroll with the arrows
        this.carousel = new Carousel(this.$refs.carousel)
    }
}
</script>

<template>
    <div
        class="text-center rounded-4 mx-2 mx-md-4 ms-lg-0 me-lg-4 p-0 h-100 overflow-hidden shadow-lg"
    >
        <div
            ref="carousel"
            id="gameImagesCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-touch="true"
        >
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
                        class="fluid-img custom-img"
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
.custom-img {
    width: 100%;
    object-fit: contain;
}
</style>
