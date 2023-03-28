<script>
import GamesPanel from '@/components/GamesPanel.vue'
import { mapStores } from 'pinia'
import { useGamesStore } from '@/stores/games'

export default {
    components: { GamesPanel },
    inheritAttrs: false,
    data() {
        return {
            testArray: Array(20).fill({
                title: 'Bloodborne',
                release: '2015',
                developer: 'From Software',
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                added: true
            })
        }
    },
    computed: {
        ...mapStores(useGamesStore)
    }
}
</script>

<template>
    <GamesPanel
        title="Backlog"
        icon="clock-history"
        :gameList="testArray"
        :extendedRoute="{ name: 'backlog' }"
        v-bind="$attrs"
    ></GamesPanel>
    <GamesPanel
        title="Watch List"
        icon="binoculars"
        :gameList="testArray"
        :extendedRoute="{ name: 'watchlist' }"
        v-bind="$attrs"
    ></GamesPanel>
    <GamesPanel
        title="Already Played"
        icon="controller"
        :gameList="testArray"
        :extendedRoute="{ name: 'played' }"
        v-bind="$attrs"
    ></GamesPanel>
</template>
