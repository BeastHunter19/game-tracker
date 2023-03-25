<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
    computed: {
        ...mapState(useUserStore, ['user', 'loggedIn']),
        userInitials() {
            if (!this.loggedIn) {
                return '?'
            }
            const names = this.user.name.split(/\s+/, 2)
            return names[0][0]?.toUpperCase() + names[1][0]?.toUpperCase()
        }
    }
}
</script>

<template>
    <span class="d-inline-block avatar rounded-circle shadow fw-bold text-center">{{
        userInitials
    }}</span>
</template>

<style scoped>
.avatar {
    padding: 12px;
    background-color: var(--gt-color-main-lighter);
    width: 45px;
    height: 45px;
    line-height: 21px;
    margin-top: -5px;
    margin-bottom: -5px;
}
</style>
