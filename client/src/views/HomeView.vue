<script>
import HomePageHero from '@/components/HomePageHero.vue'
import HomePageFeatures from '@/components/HomePageFeatures.vue'
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useGamesStore } from '@/stores/games'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

export default {
    computed: {
        ...mapStores(useUserStore, useGamesStore)
    },
    components: { HomePageHero, HomePageFeatures, MainGamesPanel, LoadingSpinner }
}
</script>

<template>
    <main class="pt-4 h-100">
        <div v-if="!userStore.loggedIn">
            <HomePageHero></HomePageHero>
            <HomePageFeatures></HomePageFeatures>
        </div>
        <LoadingSpinner v-else-if="gamesStore.loading"></LoadingSpinner>
        <MainGamesPanel v-else></MainGamesPanel>
    </main>
</template>
