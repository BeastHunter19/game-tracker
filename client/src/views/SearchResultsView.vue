<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    name: 'SearchResultsView',
    components: { GamesPanelExpanded, LoadingSpinner },
    data() {
        return {
            searchResults: [],
            limit: 30,
            offset: 0,
            loading: true
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
                    this.loading = true
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
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<template>
    <main class="p-4 px-2 px-md-4 h-100">
        <LoadingSpinner v-if="loading"></LoadingSpinner>
        <GamesPanelExpanded
            v-else
            @reachedBottom="search"
            title="Search"
            icon="search"
            :gameList="searchResults"
        ></GamesPanelExpanded>
    </main>
</template>
