<script>
import GamesPanelExpanded from '@/components/GamesPanelExpanded.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    name: 'CategoryView',
    components: { GamesPanelExpanded },
    data() {
        return {
            gameList: [],
            limit: 30,
            offset: 0
        }
    },
    computed: {
        categoryName() {
            return this.$route.query.name
        },
        categoryID() {
            return this.$route.params.id
        }
    },
    watch: {
        '$route.params': {
            handler(newValue, oldValue) {
                if (newValue !== oldValue && this.$route.name === 'category') {
                    this.offset = 0
                    this.gameList = []
                    this.getGames()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['createNotification']),
        async getGames() {
            try {
                const query = new URLSearchParams()
                query.set('limit', this.limit)
                query.set('offset', this.offset)
                const response = await this.$axios.get(
                    `/api/categories/${this.categoryID}?${query.toString()}`
                )
                this.gameList = this.gameList.concat(response.data)
                this.offset += this.limit
            } catch (err) {
                console.log(err)
                this.createNotification({
                    type: 'danger',
                    message: 'An error occurred while fetching games of genre ' + this.categoryName
                })
            }
        }
    }
}
</script>

<template>
    <main class="p-4 px-2 px-md-4">
        <GamesPanelExpanded
            @reachedBottom="getGames"
            :title="categoryName"
            :gameList="gameList"
        ></GamesPanelExpanded>
    </main>
</template>
