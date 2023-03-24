<script>
import GameCard from '@/components/GameCard.vue'
import HomePageHero from '@/components/HomePageHero.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

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
    computed: {
        ...mapStores(useUserStore)
    },
    components: { GameCard, HomePageHero }
}
</script>

<template>
    <main>
        <HomePageHero v-if="!userStore.loggedIn"></HomePageHero>
        <div v-else>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
            <GameCard :gameInfo="testInfo"></GameCard>
        </div>
    </main>
</template>
