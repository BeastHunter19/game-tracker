<script>
import ContentPanel from '@/components/ContentPanel.vue'
import GamesPanel from '@/components/GamesPanel.vue'
export default {
    components: { ContentPanel, GamesPanel }
}
</script>

<template>
    <ContentPanel>
        <GamesPanel title="Backlog" icon="clock-history"></GamesPanel>
    </ContentPanel>
    <ContentPanel>
        <GamesPanel title="Watch List" icon="binoculars"></GamesPanel>
    </ContentPanel>
    <ContentPanel>
        <GamesPanel title="Already Played" icon="controller"></GamesPanel>
    </ContentPanel>
</template>
