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
        },
        name: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState(useUserStore, ['user', 'loggedIn']),
        userInitials() {
            const name = this.name !== '' ? this.name : this.user?.name
            if (name === undefined) {
                return '?'
            }
            const names = name.split(/\s+/, 2)
            if (names.length === 1) {
                return names[0][0]?.toUpperCase()
            } else {
                return names[0][0]?.toUpperCase() + names[1][0]?.toUpperCase()
            }
        },
        sizeStyle() {
            return `width: ${this.size}; height: ${this.size}; min-width: ${this.size}; min-height: ${this.size};`
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
