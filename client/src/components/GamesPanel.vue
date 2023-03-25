<script>
import GameCardList from '@/components/GameCardList.vue'
export default {
    components: { GameCardList },
    props: {
        title: {
            type: String
        },
        icon: {
            type: String
        }
    },
    computed: {
        iconClass() {
            return `bi-${this.icon}`
        }
    }
}
</script>

<template>
    <h2 v-if="title" class="ms-4 pb-2 border-dark text-start">
        <i v-if="icon" class="bi" :class="iconClass"></i> {{ title }}
    </h2>
    <div class="d-flex flex-row justify-content-start overflow-auto">
        <GameCardList></GameCardList>
    </div>
</template>
