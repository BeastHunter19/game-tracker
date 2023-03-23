<script>
import { useNotificationsStore } from '@/stores/notifications'
import { mapActions } from 'pinia'

export default {
    async mounted() {
        try {
            // ajax request to verify email
            await this.$axios.patch('/auth/verify/email', { token: this.$route.query.token })
            this.createNotification({
                type: 'success',
                message: 'You have successfully verified your email!'
            })
        } catch (err) {
            console.log(err)
            this.createNotification({
                type: 'danger',
                message:
                    'Email verification failed. You can request a new verification email from your profile page.'
            })
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['createNotification'])
    },
    beforeRouteEnter(to) {
        if (!to.query.token) {
            return { name: 'home' }
        }
    }
}
</script>

<template>
    <main class="h-100 d-flex flex-column justify-content-center align-items-center">
        <h2>Click down here to return to the homepage</h2>
        <RouterLink class="btn btn-primary shadow" to="/">Homepage</RouterLink>
    </main>
</template>
