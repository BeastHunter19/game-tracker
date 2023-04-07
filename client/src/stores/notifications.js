import { defineStore } from 'pinia'

export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        notifications: []
    }),
    actions: {
        createNotification(notification) {
            this.notifications.push({
                ...notification,
                id: import.meta.env.DEV
                    ? Date.now().toString(36) + Math.random().toString(36).slice(2)
                    : crypto.randomUUID()
            })
        },
        removeNotification(notification) {
            this.notifications = this.notifications.filter((value) => value.id !== notification.id)
        }
    }
})
