<script>
import GameCard from '@/components/GameCard.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { GameCard, ContentPanel },
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        gameList: {
            type: Array,
            required: true
        },
        allowClose: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        iconClass() {
            return `bi-${this.icon}`
        }
    },
    methods: {
        closePanel() {
            this.$router.back()
        }
    }
}
</script>

<template>
    <ContentPanel class="my-4 mx-2 mx-md-4">
        <div class="d-flex flex-row justify-content-between align-items-center mb-4">
            <h2 class="ms-4 mb-0 fs-3 text-start text-nowrap">
                <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
            </h2>
            <span
                v-if="allowClose"
                @click="closePanel"
                class="fs-4 me-4 link-primary"
                role="button"
            >
                Close
                <i class="bi bi-x-lg"></i>
            </span>
        </div>
        <div ref="cardsContainer" class="cards-container w-100">
            <GameCard v-for="(game, index) in gameList" :key="index" :gameInfo="game"></GameCard>
        </div>
    </ContentPanel>
</template>

<style scoped>
.cards-container {
    display: grid;
    column-gap: 10px;
    row-gap: 30px;
    grid-template-columns: repeat(auto-fill, 12rem);
    justify-content: space-evenly;
}
</style>
