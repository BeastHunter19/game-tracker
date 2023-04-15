<script>
import GamesPanel from '@/components/GamesPanel.vue'
import { mapStores } from 'pinia'
import { useGamesStore } from '@/stores/games'
import { useUserStore } from '@/stores/user'

export default {
    components: { GamesPanel },
    inheritAttrs: false,
    computed: {
        ...mapStores(useGamesStore, useUserStore),
        backlog() {
            return this.gamesStore.backlog.slice(0, 10)
        },
        watchlist() {
            return this.gamesStore.watchlist.slice(0, 10)
        },
        played() {
            return this.gamesStore.played.slice(0, 10)
        },
        userID() {
            if (!this.userStore.isOwner && this.$route.params?.userID) {
                return this.$route.params.userID
            }
            return this.userStore.user.id
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
            :extendedRoute="{ name: 'backlog', params: { userID: userID } }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
    <div>
        <GamesPanel
            title="Watchlist"
            icon="binoculars"
            :gameList="watchlist"
            :extendedRoute="{ name: 'watchlist', params: { userID: userID } }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
    <div>
        <GamesPanel
            title="Played"
            icon="controller"
            :gameList="played"
            :extendedRoute="{ name: 'played', params: { userID: userID } }"
            v-bind="$attrs"
        ></GamesPanel>
    </div>
</template>

<style scoped>
div {
    max-width: 100%;
}
</style>
