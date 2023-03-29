<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    props: {
        size: {
            type: String,
            default: '45px'
        },
        textSize: {
            type: String,
            default: '5'
        }
    },
    computed: {
        ...mapState(useUserStore, ['user', 'loggedIn']),
        userInitials() {
            if (!this.loggedIn) {
                return '?'
            }
            const names = this.user.name.split(/\s+/, 2)
            return names[0][0]?.toUpperCase() + names[1][0]?.toUpperCase()
        },
        sizeStyle() {
            return `width: ${this.size}; height: ${this.size};`
        },
        fontSize() {
            return `fs-${this.textSize}`
        }
    }
}
</script>

<template>
    <span
        class="d-inline-block avatar rounded-circle shadow fw-bold text-center d-flex align-items-center justify-content-center"
        :style="sizeStyle"
    >
        <span class="" :class="fontSize">{{ userInitials }}</span>
    </span>
</template>

<style scoped>
.avatar {
    background-color: var(--gt-color-main-lighter);
    margin-top: -5px;
    margin-bottom: -5px;
}
</style>
