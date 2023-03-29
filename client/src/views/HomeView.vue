<script>
import HomePageHero from '@/components/HomePageHero.vue'
import HomePageFeatures from '@/components/HomePageFeatures.vue'
import MainGamesPanel from '@/components/MainGamesPanel.vue'
import { mapStores } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    computed: {
        ...mapStores(useUserStore)
    },
    components: { HomePageHero, HomePageFeatures, MainGamesPanel }
}
</script>

<template>
    <main class="pt-4">
        <div v-if="!userStore.loggedIn">
            <HomePageHero></HomePageHero>
            <HomePageFeatures></HomePageFeatures>
        </div>
        <div v-else>
            <MainGamesPanel></MainGamesPanel>
        </div>
    </main>
</template>
