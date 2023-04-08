<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useGamesStore } from '@/stores/games'
import { mapState, mapActions } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    computed: {
        ...mapState(useGamesStore, ['watchlist'])
    },
    methods: {
        ...mapActions(useGamesStore, ['fetchAllWatchlist'])
    },
    mounted() {
        this.fetchAllWatchlist()
    }
}
</script>

<template>
    <main class="p-4 px-2 px-md-4">
        <GamesPanelExpanded
            title="Watchlist"
            icon="binoculars"
            :gameList="watchlist"
        ></GamesPanelExpanded>
    </main>
</template>
