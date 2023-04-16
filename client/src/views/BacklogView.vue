<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useGamesStore } from '@/stores/games'
import { mapState } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    computed: {
        ...mapState(useGamesStore, ['backlog'])
    }
}
</script>

<template>
    <main class="pt-2 px-md-4">
        <GamesPanelExpanded
            title="Backlog"
            icon="clock-history"
            :gameList="backlog"
        ></GamesPanelExpanded>
    </main>
</template>
