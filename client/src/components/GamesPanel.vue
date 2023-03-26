<script>
import GameCard from '@/components/GameCard.vue'
import ContentPanel from '@/components/ContentPanel.vue'

export default {
    components: { GameCard, ContentPanel },
    data() {
        return {
            testInfo: {
                title: 'Bloodborne',
                release: '2015',
                developer: 'From Software',
                genres: ['Adventure', 'Role-playing (RPG)', 'Action', 'Souls-like'],
                platforms: ['PlayStation 4', 'PC (magari)'],
                image: 'https://assets.reedpopcdn.com/-1616688899670.jpg/BROK/thumbnail/1600x900/quality/100/-1616688899670.jpg',
                added: true
            },
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
        // TODO: start using this to get the games
        gameList: {
            type: Array,
            required: true
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
            }
        },
        updateObservedLeft() {
            const firstCard = this.$refs.cardsContainer.querySelector(':scope>*:first-child')
            this.leftObserver.disconnect()
            this.leftObserver.observe(firstCard)
        },
        updateObservedRight() {
            const lastCard = this.$refs.cardsContainer.querySelector(':scope>*:last-child')
            this.rightObserver.disconnect()
            this.rightObserver.observe(lastCard)
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
        gameList(newList, oldList) {
            if (newList[0] !== oldList[0]) {
                this.updateObservedLeft()
            }
            if (newList[newList.length - 1] !== oldList[oldList.length - 1]) {
                this.updateObservedRight()
            }
        }
    }
}
</script>

<template>
    <ContentPanel>
        <div class="d-flex flex-row justify-content-between align-items-center">
            <h2 class="ms-4 text-start">
                <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
            </h2>
            <span class="fs-4 link-primary cursor" role="button">
                View all
                <i class="bi bi-chevron-expand"></i>
            </span>
        </div>
        <div class="d-flex align-items-center">
            <button @click="scrollLeft" class="btn btn-link p-0" :disabled="!leftChevronActive">
                <i class="bi bi-chevron-left fs-3"></i>
            </button>
            <div
                ref="cardsContainer"
                class="cards-container d-flex flex-row justify-content-start overflow-auto w-100"
            >
                <GameCard v-for="(card, index) in 20" :key="index" :gameInfo="testInfo"></GameCard>
            </div>
            <button @click="scrollRight" class="btn btn-link p-0" :disabled="!rightChevronActive">
                <i class="bi bi-chevron-right fs-3"></i>
            </button>
        </div>
    </ContentPanel>
</template>

<style scoped>
.link-primary {
    cursor: pointer;
}

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
