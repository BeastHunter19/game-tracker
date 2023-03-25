<script>
import GamesPanel from '@/components/GamesPanel.vue'
import { mapStores } from 'pinia'
import { useGamesStore } from '@/stores/games'

export default {
    components: { GamesPanel },
    computed: {
        ...mapStores(useGamesStore)
    }
}
</script>

<template>
    <GamesPanel title="Backlog" icon="clock-history" :gameList="gamesStore.backlog"></GamesPanel>
    <GamesPanel title="Watch List" icon="binoculars" :gameList="gamesStore.watchlist"></GamesPanel>
    <GamesPanel title="Already Played" icon="controller" :gameList="gamesStore.played"></GamesPanel>
</template>
