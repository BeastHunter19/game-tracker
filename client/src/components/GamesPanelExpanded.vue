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
        // TODO: start using this to get the games
        gameList: {
            type: Array,
            required: true
        }
    },
    computed: {
        iconClass() {
            return `bi-${this.icon}`
        }
    }
}
</script>

<template>
    <ContentPanel>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <h2 class="ms-4 text-start">
                <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
            </h2>
            <div
                ref="cardsContainer"
                class="cards-container d-flex flex-row justify-content-start overflow-auto w-100"
            >
                <GameCard
                    v-for="(game, index) in gameList"
                    :key="index"
                    :gameInfo="game"
                ></GameCard>
            </div>
        </div>
    </ContentPanel>
</template>
