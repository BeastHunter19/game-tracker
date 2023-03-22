<script>
import NotificationAlert from '@/components/NotificationAlert.vue'
import { mapState } from 'pinia'
import { useNotificationsStore } from '@/stores/notifications'

export default {
    components: { NotificationAlert },
    computed: {
        ...mapState(useNotificationsStore, ['notifications'])
    }
}
</script>

<template>
    <div class="notifications-list">
        <NotificationAlert
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
        ></NotificationAlert>
    </div>
</template>

<style scoped>
.notifications-list {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-right: 15px;
    width: 320px;
    z-index: 1060;
}
</style>
