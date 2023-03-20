<script>
export default {
    data() {
        return {
            verificationStatus: 'waiting'
        }
    },
    async mounted() {
        try {
            // ajax request to verify email
            await this.$axios.patch('/auth/verify/email', { token: this.$route.query.token })
            this.verificationStatus = 'success'
        } catch (err) {
            console.log(err)
            this.verificationStatus = 'failure'
        }
    }
}
</script>

<template>
    <main>
        <div v-if="verificationStatus == 'success'" class="alert alert-success" role="alert">
            You have successfully verified your email. Click
            <RouterLink to="/" class="alert-link"> here </RouterLink>
            to return to the homepage.
        </div>
        <div v-else-if="verificationStatus == 'failure'" class="alert alert-danger" role="alert">
            Email verification failed. You can request a new verification email from your profile
            page. Click <RouterLink to="/" class="alert-link"> here </RouterLink>
            to return to the homepage.
        </div>
    </main>
</template>
