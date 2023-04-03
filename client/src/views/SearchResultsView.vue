<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    components: { GamesPanelExpanded },
    data() {
        return {
            searchResults: []
        }
    },
    computed: {
        searchQuery() {
            return this.$route.query.query
        }
    },
    watch: {
        '$route.query': {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.search()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['createNotification']),
        async search() {
            try {
                const query = new URLSearchParams()
                query.set('query', this.$route.query.query)
                const response = await this.$axios.get('/api/search?' + query.toString())
                this.searchResults = response.data
            } catch (err) {
                console.log(err)
                this.createNotification({
                    type: 'danger',
                    message: 'An error occurred during search.'
                })
            }
        }
    }
}
</script>

<template>
    <main>
        <GamesPanelExpanded
            :title="`Search: ${searchQuery}`"
            icon="search"
            :gameList="searchResults"
        ></GamesPanelExpanded>
    </main>
</template>
