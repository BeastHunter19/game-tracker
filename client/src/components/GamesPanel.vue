<script>
import GameCard from '@/components/GameCard.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { GameCard, ContentPanel },
    data() {
        return {
            leftChevronActive: false,
            rightChevronActive: true,
            leftObserver: undefined,
            rightObserver: undefined
        }
    },
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
        extendedRoute: {
            type: Object
        }
    },
    computed: {
        iconClass() {
            return `bi-${this.icon}`
        }
    },
    methods: {
        scrollLeft() {
            this.$refs.cardsContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            })
        },
        scrollRight() {
            this.$refs.cardsContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            })
        },
        toggleLeftChevron(entries) {
            for (const entry of entries) {
                this.leftChevronActive = !entry.isIntersecting
                return
            }
        },
        toggleRightChevron(entries) {
            for (const entry of entries) {
                this.rightChevronActive = !entry.isIntersecting
                return
            }
        },
        updateObservedLeft() {
            const firstCard = this.$refs.cardsContainer.querySelector(':scope>*:first-child')
            if (firstCard) {
                this.leftObserver.disconnect()
                this.leftObserver.observe(firstCard)
            }
        },
        updateObservedRight() {
            const lastCard = this.$refs.cardsContainer.querySelector(':scope>*:last-child')
            if (lastCard) {
                this.rightObserver.disconnect()
                this.rightObserver.observe(lastCard)
            }
        }
    },
    mounted() {
        // this allows to disable the chevrons when they aren't needed
        const observerOptions = {
            root: this.$refs.cardsContainer,
            threshold: [1.0]
        }
        this.leftObserver = new IntersectionObserver(this.toggleLeftChevron, observerOptions)
        this.rightObserver = new IntersectionObserver(this.toggleRightChevron, observerOptions)
        this.updateObservedLeft()
        this.updateObservedRight()
    },
    watch: {
        gameList: {
            handler(newList, oldList) {
                if (newList[0] !== oldList[0]) {
                    this.updateObservedLeft()
                }
                if (newList[newList.length - 1] !== oldList[oldList.length - 1]) {
                    this.updateObservedRight()
                }
            },
            flush: 'post'
        }
    }
}
</script>

<template>
    <ContentPanel class="mb-4 mx-2 mx-md-4">
        <div class="d-flex flex-row justify-content-between align-items-center">
            <h2 class="ms-4 mb-0 fs-3 text-start text-nowrap">
                <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
            </h2>
            <RouterLink
                v-if="extendedRoute"
                :to="extendedRoute"
                class="fs-4 me-4 text-decoration-none text-nowrap"
                role="button"
            >
                View all
                <i class="bi bi-chevron-expand"></i>
            </RouterLink>
        </div>
        <div class="d-flex align-items-center">
            <button @click="scrollLeft" class="btn btn-link p-0" :disabled="!leftChevronActive">
                <i class="bi bi-chevron-left fs-3"></i>
            </button>
            <div
                ref="cardsContainer"
                class="cards-container d-flex flex-row justify-content-start overflow-auto w-100"
            >
                <GameCard
                    v-for="(game, index) in gameList"
                    :key="index"
                    :gameInfo="game"
                    class="mx-2 my-4 m-md-4"
                ></GameCard>
            </div>
            <button @click="scrollRight" class="btn btn-link p-0" :disabled="!rightChevronActive">
                <i class="bi bi-chevron-right fs-3"></i>
            </button>
        </div>
    </ContentPanel>
</template>

<style scoped>
.chevron-active {
    cursor: pointer;
}

.cards-container {
    scroll-snap-type: x mandatory;
    scroll-padding: 15px;
}

.cards-container * {
    scroll-snap-align: start;
}
</style>
