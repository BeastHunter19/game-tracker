<script>
import GamesPanel from '@/components/GamesPanel.vue'
import { mapStores } from 'pinia'
import { useGamesStore } from '@/stores/games'

export default {
    components: { GamesPanel },
    inheritAttrs: false,
    computed: {
        ...mapStores(useGamesStore),
        backlog() {
            return this.gamesStore.backlog.slice(0, 10)
        },
        watchlist() {
            return this.gamesStore.watchlist.slice(0, 10)
        },
        played() {
            return this.gamesStore.played.slice(0, 10)
        }
    }
}
</script>

<template>
    <div>
        <GamesPanel
            title="Backlog"
            icon="clock-history"
            :gameList="backlog"
            :extendedRoute="{ name: 'backlog' }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
    <div>
        <GamesPanel
            title="Watchlist"
            icon="binoculars"
            :gameList="watchlist"
            :extendedRoute="{ name: 'watchlist' }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
    <div>
        <GamesPanel
            title="Played"
            icon="controller"
            :gameList="played"
            :extendedRoute="{ name: 'played' }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
</template>

<style scoped>
div {
    max-width: 100%;
}
</style>
