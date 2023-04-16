<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useGamesStore } from '@/stores/games'
import { mapState } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    computed: {
        ...mapState(useGamesStore, ['watchlist'])
    }
}
</script>

<template>
    <main class="pt-2 px-md-4">
        <GamesPanelExpanded
            title="Watchlist"
            icon="binoculars"
            :gameList="watchlist"
        ></GamesPanelExpanded>
    </main>
</template>
