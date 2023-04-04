<script>
import GameCard from '@/components/GameCard.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { GameCard, ContentPanel },
    emits: ['reachedBottom', 'reached-bottom'],
    props: {
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String
        },
        gameList: {
            type: Array,
            required: true
        },
        allowClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            bottomOberver: undefined
        }
    },
    computed: {
        iconClass() {
            return `bi-${this.icon}`
        }
    },
    methods: {
        closePanel() {
            this.$router.back()
        },
        onReachedBottom(entries) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    this.$emit('reachedBottom')
                    this.bottomObserver.unobserve(entry.target)
                }
            }
        },
        updateObservedItem() {
            const lastCard = this.$refs.cardsContainer.querySelector(':scope>*:last-child')
            if (lastCard) {
                this.bottomObserver.disconnect()
                this.bottomObserver.observe(lastCard)
            }
        }
    },
    mounted() {
        // this will make a new request when user reaches the bottom of the panel
        const observerOptions = {
            root: this.$refs.cardsContainer,
            threshold: 1
        }
        this.bottomObserver = new IntersectionObserver(this.onReachedBottom, observerOptions)
        this.updateObservedItem()
    },
    watch: {
        gameList: {
            handler(newList, oldList) {
                if (newList[newList.length - 1] !== oldList[oldList.length - 1]) {
                    this.updateObservedItem()
                }
            },
            flush: 'post'
        }
    }
}
</script>

<template>
    <ContentPanel class="h-100">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <h2 class="ms-4 mb-0 fs-3 text-start text-nowrap">
                <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
            </h2>
            <span
                v-if="allowClose"
                @click="closePanel"
                class="fs-4 me-4 link-primary"
                role="button"
            >
                Close
                <i class="bi bi-x-lg"></i>
            </span>
        </div>
        <div ref="cardsContainer" class="cards-container w-100 h-100 overflow-auto py-4">
            <GameCard v-for="(game, index) in gameList" :key="index" :gameInfo="game"></GameCard>
        </div>
    </ContentPanel>
</template>

<style scoped>
.cards-container {
    display: grid;
    column-gap: 10px;
    row-gap: 30px;
    grid-template-columns: repeat(auto-fill, 12rem);
    justify-content: space-evenly;
}
</style>
