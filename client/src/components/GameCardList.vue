<script>
import GameCard from '@/components/GameCard.vue'

export default {
    components: { GameCard },
    data() {
        return {
            testInfo: {
                title: 'Bloodborne',
                release: '2015',
                developer: 'From Software',
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg'
            }
        }
    }
}
</script>

<template>
    <GameCard v-for="(card, index) in 20" :key="index" :gameInfo="testInfo"></GameCard>
</template>
