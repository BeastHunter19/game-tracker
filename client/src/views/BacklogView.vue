<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useGamesStore } from '@/stores/games'
import { mapState, mapActions } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    computed: {
        ...mapState(useGamesStore, ['backlog'])
    },
    methods: {
        ...mapActions(useGamesStore, ['fetchAllBacklog'])
    },
    mounted() {
        this.fetchAllBacklog()
    }
}
</script>

<template>
    <main class="p-4 px-2 px-md-4">
        <GamesPanelExpanded
            title="Backlog"
            icon="clock-history"
            :gameList="backlog"
        ></GamesPanelExpanded>
    </main>
</template>
