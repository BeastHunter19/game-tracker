<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useNotificationsStore } from '@/stores/notifications'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'

export default {
    components: { LoadingSpinner },
    data() {
        return {
            loading: true
        }
    },
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
        } finally {
            this.loading = false
        }
    },
    methods: {
        ...mapActions(useNotificationsStore, ['createNotification']),
        ...mapActions(useUserStore, ['setEmailVerified'])
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
        <LoadingSpinner v-if="loading"></LoadingSpinner>
        <template v-else>
            <h2>Click down here to return to the homepage</h2>
            <RouterLink class="btn btn-primary shadow" to="/">Homepage</RouterLink>
        </template>
    </main>
</template>
