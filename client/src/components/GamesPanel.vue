<script>
import GameCard from '@/components/GameCard.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { GameCard, ContentPanel },
    data() {
        return {
            testInfo: {
                title: 'Bloodborne',
                release: '2015',
                developer: 'From Software',
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                added: true
            }
        }
    },
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
            <span class="fs-4 link-primary cursor" role="button">
                View all
                <i class="bi bi-chevron-expand"></i>
            </span>
        </div>
        <div class="d-flex flex-row justify-content-start overflow-auto">
            <GameCard v-for="(card, index) in 20" :key="index" :gameInfo="testInfo"></GameCard>
        </div>
    </ContentPanel>
</template>

<style scoped>
.link-primary {
    cursor: pointer;
}
</style>
