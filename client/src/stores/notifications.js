import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: []
    }),
    actions: {
        createNotification(notification) {
            this.notifications.push({
                ...notification,
                id: crypto.randomUUID()
            })
        },
        removeNotification(notification) {
            this.notifications = this.notifications.filter((value) => value.id !== notification.id)
        }
    }
})
