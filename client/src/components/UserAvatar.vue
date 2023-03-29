<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    props: {
        size: {
            type: String,
            default: '45px'
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
        }
    }
}
</script>

<template>
    <span
        class="d-inline-block avatar rounded-circle shadow fw-bold text-center d-flex align-items-center justify-content-center"
        :style="sizeStyle"
    >
        <span>{{ userInitials }}</span>
    </span>
</template>

<style scoped>
.avatar {
    padding: 12px;
    background-color: var(--gt-color-main-lighter);
    line-height: 21px;
    margin-top: -5px;
    margin-bottom: -5px;
}
</style>
