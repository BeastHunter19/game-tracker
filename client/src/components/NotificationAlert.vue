<script>
import { mapActions } from 'pinia'
import { useNotificationsStore } from '@/stores/notifications'
import { Alert } from 'bootstrap'

export default {
    data() {
        return {
            timeout: null
        }
    },
    props: {
        notification: {
            type: Object,
            validator(value) {
                return ['success', 'danger', 'warning', 'info'].includes(value.type)
            }
        }
    },
    computed: {
        typeClass() {
            return `alert-${this.notification.type}`
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['removeNotification']),
        closeNotification() {
            const bsAlert = Alert.getOrCreateInstance(this.$refs.alert)
            this.$refs.alert.addEventListener('closed.bs.alert', () => {
                this.removeNotification(this.notification)
            })
            bsAlert.close()
        }
    },
    created() {
        this.timeout = setTimeout(() => {
            this.closeNotification()
        }, 5000)
    },
    beforeUnmount() {
        clearTimeout(this.timeout)
    }
}
</script>

<template>
    <div
        ref="alert"
        class="alert alert-dismissable mt-2 mx-2 fade show d-flex"
        :class="typeClass"
        role="alert"
    >
        {{ notification.message }}
        <button
            @click.prevent="closeNotification"
            type="button"
            class="btn-close"
            aria-label="Close"
        ></button>
    </div>
</template>
