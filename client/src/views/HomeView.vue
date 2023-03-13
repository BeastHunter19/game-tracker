<script>
import GameCard from '@/components/GameCard.vue'

export default {
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
    },
    components: { GameCard }
}
</script>

<template>
    <main>
        <GameCard :gameInfo="testInfo"></GameCard>
    </main>
</template>
