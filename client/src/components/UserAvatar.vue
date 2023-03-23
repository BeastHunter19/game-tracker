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
            return names[0][0].toUpperCase() + names[1][0].toUpperCase()
        }
    }
}
</script>

<template>
    <span class="avatar rounded-circle shadow">{{ userInitials }}</span>
</template>

<style scoped>
.avatar {
    padding: 12px;
    background-color: var(--gt-color-main-lighter);
}
</style>
