<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useGamesStore } from '@/stores/games'
import { mapState, mapActions } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    computed: {
        ...mapState(useGamesStore, ['played'])
    },
    methods: {
        ...mapActions(useGamesStore, ['fetchAllPlayed'])
    },
    mounted() {
        this.fetchAllPlayed()
    }
}
</script>

<template>
    <main class="p-4 px-2 px-md-4">
        <GamesPanelExpanded
            title="Already Played"
            icon="controller"
            :gameList="played"
        ></GamesPanelExpanded>
    </main>
</template>
