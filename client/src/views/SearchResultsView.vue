<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    name: 'SearchResultsView',
    components: { GamesPanelExpanded },
    data() {
        return {
            searchResults: [],
            limit: 30,
            offset: 0
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
                if (newValue !== oldValue && this.$route.name === 'search') {
                    this.offset = 0
                    this.searchResults = []
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
                query.set('limit', this.limit)
                query.set('offset', this.offset)
                const response = await this.$axios.get('/api/search?' + query.toString())
                this.searchResults = this.searchResults.concat(response.data)
                this.offset += this.limit
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
    <main class="p-4 px-2 px-md-4">
        <GamesPanelExpanded
            @reachedBottom="search"
            title="Search"
            icon="search"
            :gameList="searchResults"
        ></GamesPanelExpanded>
    </main>
</template>
